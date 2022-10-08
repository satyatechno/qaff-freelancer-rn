import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import {disputeFile, getContractDetails} from 'src/services/http.service';
import styles from './DisputeFile.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import Snackbar from 'react-native-snackbar';
import CustomButton from 'src/components/button/CustomButton';

class DisputeFile extends Component {
  state = {
    amount: undefined,
    freelancerInput: '',
    amountError: false,
    commentError: false,
    contractDetails: [],
    loading: false,
    refundType: '',
    milestoneId: [],
    selfInput: '',
    freelancerInputError: false,
    selfInputError: false,
    buttonLoading: false,
  };
  onDispute = () => {
    const {token, navigation} = this.props;
    const {
      freelancerInput,
      selfInput,
      milestoneId,
      refundType,
      contractDetails,
    } = this.state;
    if (freelancerInput && selfInput && milestoneId?.length) {
      this.setState({
        freelancerInput: '',
        selfInput: '',
        buttonLoading: true,
      });
      let ids = milestoneId.map((x) => x?.id);
      console.log('dsff', ids);
      let data = {
        contract_id: contractDetails.id,
        refund_type: refundType === 'milestone' ? 'milestones' : 'full',
        milestone_ids: ids,
        note_to_client: selfInput,
        note_to_freelancer: freelancerInput,
      };

      disputeFile({
        data,
        token,
      })
        .then((res) => {
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
          // console.log("file dispute successfully", res.data)
          this.setState({selfInput: '', freelancerInput: ''});
          this.props.navigation.navigate('Profile');
        })
        .catch((err) => {
          if (err?.response?.status === 422) {
            this.props.dispatch(
              MODAL_VISIBLE({
                visible: true,
                type: 2,
                message: err?.response?.data?.message,
              }),
            );
          }
          console.log('error in dispute', err?.response);
        })
        .finally(() => this.setState({buttonLoading: false}));
    } else {
      if (!freelancerInput) {
        this.setState({freelancerInputError: true});
      } else {
        this.setState({freelancerInputError: false});
      }
      if (!selfInput) {
        this.setState({selfInputError: true});
      } else {
        this.setState({selfInputError: false});
      }
      if (!milestoneId?.length) {
        Snackbar.show({
          text: this.props.t('fileDispute.selectMilestoneOrFullAmount'),
          backgroundColor: colors.appRed,
        });
      }
    }
  };

  componentDidMount() {
    const {params} = this.props?.route;
    this.setState({loading: true});
    getContractDetails({token: this.props.token, id: params?.contractId})
      .then((res) => {
        // console.log('Contract Details', JSON.stringify(res?.data, null, 2));
        this.setState({contractDetails: res?.data?.data?.contract});
      })
      .catch((err) => {
        console.error('Contract details error', err);
      })
      .finally(() => this.setState({loading: false}));
  }

  handleMilestoneIds = (milestone) => {
    let temp = this.state.milestoneId;
    if (temp?.find((x) => x?.id === milestone?.id)) {
      temp = temp.filter((x) => x.id !== milestone?.id);
    } else {
      temp.push(milestone);
    }

    this.setState({milestoneId: [...temp]});
  };

  render() {
    const {t} = this.props;
    const {
      freelancerInput,
      commentError,
      contractDetails,
      loading,
      refundType,
      milestoneId,
      selfInput,
      freelancerInputError,
      selfInputError,
    } = this.state;
    // console.log(' 🉑', JSON.stringify(contractDetails, null, 2));

    if (loading) {
      return (
        <>
          <Header
            backButton={true}
            title={t('fileDispute.dispute')}
            navigation={this.props.navigation}
            notificationButton={true}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.skyBlue} />
          </View>
        </>
      );
    }

    return (
      <>
        <Header
          backButton={true}
          title={t('fileDispute.dispute')}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <ScrollView style={styles.container}>
          {/* <Text style={{ color: colors.appGray}}>Contract details</Text> */}
          <Text style={styles.titleText}>{contractDetails.title}</Text>
          <Text style={styles.serialText}>
            {contractDetails.contract_serial}
          </Text>

          <Text
            style={{fontSize: 18, paddingVertical: 10, textAlign: 'center'}}>
            {this.props.t('fileDispute.refundRequested')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({refundType: 'milestone', milestoneId: []})
            }
            style={{flexDirection: 'row'}}>
            <Ionicons
              name={refundType === 'milestone' ? 'ellipse' : 'ellipse-outline'}
              size={20}
              color={
                refundType === 'milestone' ? colors.appViolet : colors.appGray
              }
            />
            <Text
              style={{
                fontSize: 18,
                paddingStart: 5,
                color:
                  refundType === 'milestone'
                    ? colors.appViolet
                    : colors.appGray,
              }}>
              {this.props.t('fileDispute.milestones')}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            {contractDetails?.milestones?.map((milestone) => (
              <TouchableOpacity
                onPress={() => this.handleMilestoneIds(milestone)}
                disabled={refundType !== 'milestone'}
                key={milestone?.id}
                style={{
                  flexDirection: 'row',
                  paddingEnd: 20,
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={
                    milestoneId?.find((x) => x?.id === milestone?.id)
                      ? 'checkbox'
                      : 'square-outline'
                  }
                  size={20}
                  color={
                    milestoneId?.find((x) => x?.id === milestone?.id)
                      ? colors.appViolet
                      : colors.appGray
                  }
                />
                <Text
                  style={{
                    fontSize: 16,
                    paddingStart: 2,
                    color: milestoneId.includes(milestone?.id)
                      ? colors.appViolet
                      : colors.appGray,
                  }}>
                  {milestone?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 15}}
            onPress={() =>
              this.setState({
                refundType: 'fullAmount',
                milestoneId: contractDetails?.milestones,
              })
            }>
            <Ionicons
              name={refundType === 'fullAmount' ? 'ellipse' : 'ellipse-outline'}
              size={20}
              color={
                refundType === 'fullAmount' ? colors.appViolet : colors.appGray
              }
            />
            <Text
              style={{
                fontSize: 18,
                paddingStart: 5,
                color:
                  refundType === 'fullAmount'
                    ? colors?.appViolet
                    : colors.appGray,
              }}>
              {this.props.t('fileDispute.fullAmountOfProject')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}>
            {this.props.t('fileDispute.refundAmount')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{paddingEnd: 5, fontSize: 16}}>
              {contractDetails?.currency === 'sar' ? 'SAR' : 'USD'}
            </Text>
            <Text style={{fontSize: 16}}>
              {milestoneId.reduce(
                (accumulator, milestone) =>
                  accumulator + parseFloat(milestone?.amount),
                0,
              )}
            </Text>
          </View>
          <Text style={styles.label}>
            {this.props.t('fileDispute.noteToFreelancer')}
          </Text>
          <TextInput
            numberOfLines={4}
            style={styles.describeInput}
            placeholder={t('fileDispute.describeHere')}
            multiline={true}
            maxLength={300}
            value={freelancerInput}
            onChangeText={(text) => {
              this.setState({freelancerInput: text});
            }}
          />
          {freelancerInputError && (
            <View style={{marginStart: -20}}>
              <ErrorText name={this.props.t('fileDispute.required')} />
            </View>
          )}
          <Text style={styles.label}>
            {this.props.t('fileDispute.noteToSelf')}
          </Text>
          <TextInput
            numberOfLines={4}
            style={styles.describeInput}
            placeholder={t('fileDispute.describeHere')}
            multiline={true}
            maxLength={300}
            value={selfInput}
            onChangeText={(text) => {
              this.setState({selfInput: text});
            }}
          />
          {selfInputError && (
            <View style={{marginStart: -20}}>
              <ErrorText name={this.props.t('fileDispute.required')} />
            </View>
          )}
          <CustomButton
            mode={1}
            isLoading={this.state.buttonLoading}
            handlePress={this.onDispute}>
            <Text style={{color: colors.defaultWhite}}>
              {t('fileDispute.fileADispute')}
            </Text>
          </CustomButton>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
});
export default connect(mapStateToProps)(withTranslation()(DisputeFile));
