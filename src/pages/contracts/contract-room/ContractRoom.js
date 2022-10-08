import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {FETCH_CONTRACT_DETAILS} from 'src/actions/contracts';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './ContractRoom.styles';

export class ContractRoom extends Component {
  state = {
    paymentMilestone: {},
  };
  componentDidMount() {
    this.props.dispatch(
      FETCH_CONTRACT_DETAILS({id: this.props.route.params.contractId}),
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps?.contractDetails !== this.props?.contractDetails) {
      let milestones = this.props?.contractDetails?.milestones;

      for (var i = 0; milestones[i]; i++) {
        if (milestones[i].status === 'pending') {
          this.setState({paymentMilestone: milestones[i]});
          return;
        } else {
          this.setState({paymentMilestone: ''});
        }
      }
    }
  }
  render() {
    const {contractDetails, loading, navigation, t} = this.props;
    // console.log('dsfs', JSON.stringify(contractDetails, null, 2));
    if (!contractDetails && !loading) {
      return (
        <>
          <Header
            title={t('contractRoom.contractRoom')}
            backButton
            notificationButton
            navigation={this.props.navigation}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              style={{width: 150, height: 160, alignSelf: 'center'}}
              source={require('src/assets/images/no-jobs.png')}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                color: colors.appGray,
                marginTop: 10,
                fontFamily: fonts.primary,
              }}>
              {t('contractRoom.noData')}
            </Text>
          </View>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={t('contractRoom.contractRoom')}
            backButton
            notificationButton
            navigation={this.props.navigation}
          />
          {Array(4)
            .fill()
            .map((_, i) => (
              <ShimmerCard key={i} />
            ))}
        </>
      );
    }

    // console.log('contractDetails', JSON.stringify(contractDetails, null, 2));

    return (
      <>
        <Header
          title={t('contractRoom.contractRoom')}
          backButton
          notificationButton
          navigation={this.props.navigation}
        />

        <Container style={styles.container}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.headingText}>{contractDetails?.title}</Text>
              {/* <Icon name="options" size={20} color={colors.appViolet} /> */}
            </View>
            <Text style={styles.experienceText}>
              {t('contractRoom.activeSince')}{' '}
              {moment.unix(contractDetails?.start_date).format('ll')}
            </Text>
            <View style={styles.experience}>
              <View style={{flex: 1}}>
                <Text style={styles.nameText}>
                  {contractDetails?.employer?.name}
                </Text>
                {contractDetails?.employer?.country ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      // flex: 1,
                      flexWrap: 'wrap',
                    }}>
                    <Icon name="location" size={16} color={colors.appBlue} />
                    <Text style={styles.timeText}>
                      {contractDetails?.employer?.country}
                    </Text>
                    <Text style={styles.timeText}>
                      {moment
                        .unix(contractDetails?.employer?.last_seen_at)
                        .format('LT')}
                    </Text>
                  </View>
                ) : null}
              </View>
              <CustomButton
                style={styles.messageIcon}
                handlePress={() => {
                  this.props.navigation.navigate('FirebaseChat', {
                    userName: contractDetails?.employer?.name,
                    userPhoto: contractDetails?.employer?.profile_image,
                    uid: contractDetails?.employer?.firebase_user_id,
                  });
                }}>
                <Icon name="message" size={25} color={colors.defaultWhite} />
              </CustomButton>
            </View>
          </View>

          <View style={styles.card}>
            <View style={[styles.title, {paddingBottom: 10}]}>
              <Text style={styles.headingText}>
                {t('contractRoom.milestonesPaid')}
              </Text>
              <Text style={[styles.headingText, {textAlign: 'right'}]}>
                SR {contractDetails?.amount}
                {/* {contractDetails?.currency == 'sar' ? 'SR' : 'USD'} */}
              </Text>
            </View>
            {contractDetails?.milestones?.map((item, i) => (
              <TouchableOpacity
                disabled={item.status === 'pending'}
                onPress={() => {
                  navigation.navigate('RequestPayment', {
                    contractData: contractDetails,
                    milestoneData: item,
                  });
                }}
                key={item?.id.toString()}
                style={styles.experience1}>
                <Text
                  style={[
                    styles.milestoneItem,
                    item.status === 'pending' && {color: colors.skyBlue},
                  ]}>
                  {item?.title}
                </Text>
                <Text
                  style={[
                    styles.milestoneItem,
                    item.status === 'pending' && {color: colors.skyBlue},
                  ]}>
                  {item.due_date}
                </Text>
                <Text
                  style={[
                    styles.milestoneItem,
                    item.status === 'pending' && {color: colors.skyBlue},
                  ]}>
                  SR {item.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {this.state.paymentMilestone?.status == 'pending' && (
            <CustomButton
              mode={1}
              style={styles.requestButton}
              handlePress={() => {
                navigation.navigate('RequestPayment', {
                  contractData: contractDetails,
                  milestoneData: this.state.paymentMilestone,
                });
              }}>
              <Text style={styles.requestButtonText}>
                {t('contractRoom.request')} {this.state.paymentMilestone?.title}{' '}
                {t('contractRoom.milestonePayments')}
              </Text>
            </CustomButton>
          )}
          <View style={styles.card}>
            <View style={{padding: 10}}>
              <Text style={styles.headingText}>
                {t('contractRoom.contractInfo')}
              </Text>
            </View>

            <View style={styles.startDateContainer}>
              <Text style={styles.startDate}>
                {t('contractRoom.startDate')}{' '}
              </Text>
              <Text style={styles.startDateValue}>
                {moment.unix(contractDetails?.start_date).format('ll')}
              </Text>
            </View>
            {/* <Text style={styles.viewHistoryText}>
              {t('contractRoom.viewHistory')}
            </Text> */}
            <View style={styles.startDateContainer}>
              <Text style={styles.startDate}>
                {t('contractRoom.contractId')}
              </Text>
              <Text style={styles.startDateValue}>
                {contractDetails?.contract_serial}{' '}
              </Text>
            </View>
            <View style={styles.startDateContainer}>
              <Text style={styles.startDate}>
                {t('contractRoom.description')}
              </Text>
            </View>
            <View style={{padding: 10}}>
              <Text style={styles.description}>
                {contractDetails?.work_details}{' '}
              </Text>
            </View>
            <CustomButton
              handlePress={() => {
                navigation.navigate('ProjectDtails', {
                  id: contractDetails?.project.id,
                });
              }}
              style={styles.startDateContainer}>
              <Text style={styles.startDate}>
                {t('contractRoom.viewJobPosting')}
              </Text>
            </CustomButton>
            <CustomButton
              handlePress={() => {
                navigation.navigate('ViewOffer', {
                  id: contractDetails?.proposal_id,
                });
              }}
              style={styles.startDateContainer}>
              <Text style={styles.startDate}>
                {t('contractRoom.viewOffer')}
              </Text>
            </CustomButton>
          </View>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.contractsReducer.contractDetailsLoading,
  contractDetails: state.contractsReducer.contractDetails,
});
export default connect(mapStateToProps)(withTranslation()(ContractRoom));
