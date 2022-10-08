import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, I18nManager, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {FETCH_PROPOSAL_DETAILS} from 'src/actions/proposals';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import ShimmerRow from 'src/components/shimmer/ShimmerRow';
import {Icon} from 'src/Icon';
import {withdrawProposal} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import JobCard from '../job-card/JobCard';
import styles from './ProposalDetails.styles';

export class ProposalDetails extends Component {
  state = {
    withdrawLoading: false,
  };
  componentDidMount() {
    this.props.dispatch(
      FETCH_PROPOSAL_DETAILS({id: this.props.route.params.id}),
    );
  }
  onWithdraw = () => {
    this.setState({withdrawLoading: true});
    withdrawProposal({
      token: this.props.token,
      proposalId: this.props.proposalDetails?.id,
    })
      .then((res) => {
        console.log('res withdraw', res.data);
        this.setState({withdrawLoading: false});
        this.props.navigation.navigate('Proposals');
      })
      .catch((err) => {
        this.setState({withdrawLoading: false});
        console.log('err withdraw', err);
        if (err?.response?.data) {
          console.log('errrmesss', err?.response?.data);
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 2,
              message: err?.response?.data?.message,
            }),
          );
        }
      });
  };
  withdrawAlert = () => {
    Alert.alert(
      this.props.t('proposalDetails.withdraw'),
      this.props.t('proposalDetails.withdrawProposalConfirm'),
      [
        {
          text: this.props.t('proposalDetails.no'),
          onPress: () => console.log('Cancelled withdrawing proposal'),
          style: 'cancel',
        },
        {
          text: this.props.t('proposalDetails.yes'),
          onPress: () => this.onWithdraw(),
        },
      ],
      {cancelable: false},
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route?.params?.id !== this.props?.route?.params?.id) {
      // this.props.dispatch(LOADER(true));
      this.props.dispatch(
        FETCH_PROPOSAL_DETAILS({id: this.props.route.params.id}),
      );
    }
  }

  render() {
    const {proposalDetails, loading, t, navigation} = this.props;
    // console.log('Prop', JSON.stringify(proposalDetails, null, 2));
    if (!proposalDetails && !loading) {
      return (
        <>
          <Header
            title={t('proposalDetails.proposalDetails')}
            backButton
            navigation={this.props.navigation}
            notificationButton
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
              {t('proposalDetails.noData')}
            </Text>
          </View>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={t('proposalDetails.proposalDetails')}
            backButton
            navigation={this.props.navigation}
            notificationButton
          />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerRow />
          <ShimmerRow />
        </>
      );
    }

    return (
      <>
        <Header
          title={t('proposalDetails.proposalDetails')}
          backButton
          navigation={this.props.navigation}
          notificationButton
        />
        <Container style={{flex: 1}}>
          <JobCard
            title={proposalDetails?.project?.title}
            budget={
              // proposalDetails?.project?.currency == 'sar'
              //   ?
              proposalDetails?.project?.budget?.sar?.to === null
                ? `>${proposalDetails?.project?.budget?.sar?.from} SR`
                : proposalDetails?.project?.budget?.sar?.from === null
                ? `<${proposalDetails?.project?.budget?.sar?.to} SR`
                : `${proposalDetails?.project?.budget?.sar?.from}-${proposalDetails?.project?.budget?.sar?.to} SR`
              // : proposalDetails?.project?.budget?.usd?.to === null
              // ? `>${proposalDetails?.project?.budget?.usd?.from} USD`
              // : proposalDetails?.project?.budget?.usd?.from === null
              // ? `<${proposalDetails?.project?.budget?.usd?.to} USD`
              // : `${proposalDetails?.project?.budget?.usd?.from}-${proposalDetails?.project?.budget?.usd?.to} USD`
            }
            time={proposalDetails?.project?.published_at}
            name={proposalDetails?.project?.posted_by?.name}
            location={proposalDetails?.project?.posted_by?.country}
            discription={proposalDetails?.project?.description}
            id={proposalDetails?.project?.id}
            navigation={this.props.navigation}
          />
          <View style={styles.container}>
            <View style={styles.proposedItemContainer}>
              <Text style={styles.proposedItemText}>
                {t('proposalDetails.yourProposedTerms')}{' '}
              </Text>
            </View>
            <View style={styles.clientBudgetContainer}>
              <Text style={styles.clientbBudgetText}>
                {t('proposalDetails.budget')}
              </Text>
              <Text style={styles.budgetText}>
                {proposalDetails?.price + ' '}
                {proposalDetails?.price_currency === 'sar' ? 'SR' : 'USD'}
              </Text>
            </View>
            <View style={styles.milestoneContainer}>
              <Text style={styles.milestoneText}>
                {t('proposalDetails.howToPaid')}{' '}
              </Text>
              <Text style={styles.milestone}>
                {proposalDetails?.milestones?.length}{' '}
                {t('proposalDetails.milestone')}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {!proposalDetails?.is_contract_created &&
                proposalDetails?.token_balanced_used === 1 && (
                  <CustomButton
                    mode={2}
                    style={styles.withdrawButton}
                    handlePress={() => {
                      if (proposalDetails.is_contract_created) {
                        Snackbar.show({
                          text: 'Contract already created on this proposal.',
                          duration: Snackbar.LENGTH_LONG,
                        });
                      } else {
                        this.withdrawAlert();
                      }
                    }}>
                    <Text style={styles.withdrawButtonText}>
                      {t('proposalDetails.withdrawProposal')}{' '}
                    </Text>
                  </CustomButton>
                )}

              <CustomButton
                style={styles.changeButton}
                mode={1}
                handlePress={() => {
                  if (proposalDetails.is_contract_created) {
                    Snackbar.show({
                      text: 'Contract already created on this proposal.',
                      duration: Snackbar.LENGTH_LONG,
                    });
                  } else {
                    navigation.navigate('ChangeTerms', {
                      projectDetails: proposalDetails?.project,
                      proposalDetails: proposalDetails,
                    });
                  }
                }}>
                <Text style={styles.changeButtonText}>
                  {t('proposalDetails.changeTerms')}
                </Text>
              </CustomButton>
            </View>
          </View>
          <View style={styles.container}>
            <CustomButton
              handlePress={() => {
                this.props.navigation.navigate('ProjectDtails', {
                  id: proposalDetails?.project?.id,
                });
              }}>
              <View style={styles.clientBudgetContainer}>
                <Text style={styles.clientbBudgetText}>
                  {t('proposalDetails.viewJobPostingButton')}
                </Text>
                <Icon
                  name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
                  size={20}
                  color={colors.appBlue}
                />
              </View>
            </CustomButton>
            <CustomButton
              handlePress={() => {
                this.props.navigation.navigate('ViewOffer', {
                  id: proposalDetails?.id,
                });
              }}>
              <View style={styles.milestoneContainer}>
                <Text style={styles.milestoneText}>
                  {t('proposalDetails.viewOffer')}{' '}
                </Text>
                <Icon
                  name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
                  size={20}
                  color={colors.appBlue}
                />
              </View>
            </CustomButton>
          </View>
          {this.state.withdrawLoading && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: colors.appGray2,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
              }}>
              <ActivityIndicator
                size={50}
                color={colors.skyBlue}
                // style={{flex: 1}}
              />
            </View>
          )}
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  proposalDetails: state.proposalsReducer?.proposalDetails,
  loading: state.proposalsReducer?.isProposalDetailLoading,
  token: state.myReducer?.user?.token,
});
export default connect(mapStateToProps)(withTranslation()(ProposalDetails));
