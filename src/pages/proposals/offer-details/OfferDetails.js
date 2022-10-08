import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import {getContractDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

const OfferDetails = ({navigation, route: {params}}) => {
  const [contractDetails, setContractDetails] = useState({});
  const token = useSelector((state) => state.myReducer?.user?.token);
  const {t} = useTranslation();
  // console.log('offer Details', JSON.stringify(contractDetails, null, 1));
  useEffect(() => {
    getContractDetails({
      id: params?.data?.id,
      token,
    })
      .then((res) => {
        setContractDetails(res?.data?.data?.contract);
      })
      .catch((err) => {
        console.error('Get contract details', err);
      });
  }, []);
  console.log('JSON', JSON.stringify(contractDetails, null, 1));
  return (
    <>
      <Header
        title={t('offerDetails.offerDetails')}
        navigation={navigation}
        backButton
        notificationButton
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.statusText}>{t('offerDetails.status')}</Text>
        <Text style={styles.statusInfo}>{contractDetails?.status}</Text>
        <Text style={styles.contractText}>
          {t('offerDetails.contractTitle')}
        </Text>
        <Text style={styles.contractInfo}>
          {contractDetails.project?.title}
        </Text>
        <Text style={styles.relatedJobText}>
          {t('offerDetails.relatedJobText')}
        </Text>
        <Text style={styles.relatedJobInfo}>
          {t('offerDetails.relatedJobInfo')}
        </Text>
        <Text style={styles.jobCategoryText}>
          {t('offerDetails.jobCategory')}
        </Text>
        <Text style={styles.jobCategoryInfo}>
          {contractDetails?.project?.category?.name}
        </Text>
        <Text style={styles.offerExpiresText}>
          {t('offerDetails.offerExpires')}
        </Text>
        <Text style={styles.offerExpiresInfo}>
          {moment
            .unix(contractDetails?.created_at)
            .add(params?.statistics?.offer_expiry_time?.value, 'days')
            .format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.offerDateText}>{t('offerDetails.offerDate')}</Text>
        <Text style={styles.offerDateInfo}>
          {moment.unix(contractDetails?.start_date).format('MMM DD, YYYY')}
        </Text>
        <Text style={styles.bidText}>{t('offerDetails.bid')}</Text>
        <Text style={styles.totalAmountText}>
          {t('offerDetails.totalAmountClientWillSee')}
        </Text>
        <Text
          style={styles.amountInfo}>{`SAR ${contractDetails?.amount}`}</Text>
        <Text style={styles.serviceFeeText}>{t('offerDetails.qaffFee')}</Text>
        <Text style={styles.serviceFeeInfo}>{`SAR ${
          contractDetails?.amount * 0.1
        }`}</Text>
        <Text style={styles.receiveText}>
          {t('offerDetails.youWillReceive')}
        </Text>
        <Text style={styles.receiveSubText}>
          {t('offerDetails.estimatedAmount')}
        </Text>
        <Text style={styles.receiveInfo}>{`SAR ${
          contractDetails?.amount - contractDetails.amount * 0.1
        }`}</Text>
        <Text style={styles.mileStoneInfoText}>
          {t('offerDetails.firstMilestoneFunded')}
        </Text>
        <View style={styles.milestoneContainer}>
          <View style={styles.milestoneHeading}>
            <Text
              style={[
                styles.milestoneHeadingText,
                {flex: 0.4, textAlign: 'left'},
              ]}>
              {t('offerDetails.milestoneCaps')}
            </Text>
            <Text
              style={[
                styles.milestoneHeadingText,
                {flex: 0.3, textAlign: 'left'},
              ]}>
              {t('offerDetails.amountCaps')}
            </Text>
            <Text
              style={[
                styles.milestoneHeadingText,
                {flex: 0.3, textAlign: 'left'},
              ]}>
              {t('offerDetails.dueDateCaps')}
            </Text>
          </View>
          <View style={styles.milestoneBody}>
            {contractDetails?.milestones?.map((x) => (
              <View
                key={x.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.milestoneTitle}>{x.title}</Text>
                <Text style={styles.milestoneAmount}>{`SAR ${x.amount}`}</Text>
                <Text style={styles.milestoneDate}>
                  {moment.unix(x.due_date).format('MMM DD, YYYY')}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.workDescriptionText}>
          {t('offerDetails.workDesc')}
        </Text>
        <Text style={styles.workInfo}>
          {contractDetails?.project?.description}
        </Text>
        <View style={styles.profileContainer}>
          <FastImage
            source={{uri: contractDetails?.employer?.profile_image}}
            style={styles.clientImage}
          />
          <Text style={styles.clientName}>
            {contractDetails?.employer?.name}
          </Text>
        </View>
        <Text style={styles.aboutClientText}>
          {t('offerDetails.aboutClient')}
        </Text>
        <Text style={styles.verifiedText}>
          {t('offerDetails.paymentMethodNotVerified')}
        </Text>
        <Text style={styles.countryName}>
          {contractDetails?.employer?.country}
        </Text>
        <Text style={styles.cityName}>{contractDetails?.employer?.city}</Text>
        <Text style={styles.jobsPosted}>{`${
          contractDetails?.employer?.posted_jobs_count
        } ${t('offerDetails.jobsPosted')}`}</Text>
        <Text style={styles.hire}>{`${
          contractDetails?.employer?.hiring_rate
        }% ${t('offerDetails.hireRate')}, ${
          contractDetails?.employer?.open_jobs_count
        } ${t('offerDetails.openJobs')}`}</Text>
        <Text style={styles.memberSince}>{`${t(
          'offerDetails.memberSince',
        )} ${moment
          .unix(contractDetails?.employer?.created_at)
          .format('MMM DD, YYYY')}`}</Text>
        <CustomButton
          handlePress={() =>
            navigation.navigate('AcceptOffer', {
              contractId: contractDetails?.id,
              token: token,
              projectTitle: contractDetails?.project?.title,
              employerName: contractDetails?.employer?.name,
              firebaseUserId: contractDetails?.employer?.firebase_user_id,
            })
          }
          mode={1}
          style={styles.acceptOfferButton}>
          <Text style={styles.acceptOfferButtonText}>
            {t('offerDetails.acceptOffer')}
          </Text>
        </CustomButton>
        <CustomButton
          handlePress={() =>
            navigation.navigate('DeclineOffer', {
              contractId: contractDetails?.id,
              projectTitle: contractDetails?.project?.title,
              employerName: contractDetails?.employer?.name,
              firebaseUserId: contractDetails?.employer?.firebase_user_id,
            })
          }
          mode={2}
          style={styles.declineOfferButton}>
          <Text style={styles.declineOfferButtonText}>
            {t('offerDetails.declineOffer')}
          </Text>
        </CustomButton>
        <CustomButton
          handlePress={() =>
            navigation.navigate('FirebaseChat', {
              userName: contractDetails?.project?.posted_by?.name,
              userPhoto: contractDetails?.project?.posted_by?.profile_image,
              uid: contractDetails?.project?.posted_by?.firebase_user_id,
            })
          }
          mode={1}
          style={styles.messageButton}>
          <Text style={styles.messageButtonText}>
            {t('offerDetails.message')}
          </Text>
        </CustomButton>
        <CustomButton
          handlePress={() =>
            navigation.navigate('ProposalDetails', {
              id: params?.data?.proposal_id,
            })
          }
          mode={1}
          style={styles.originalPropsoalButton}>
          <Text style={styles.oroginalPropsoalButtonText}>
            {t('offerDetails.originalProposal')}
          </Text>
        </CustomButton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    padding: 10,
  },

  statusText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
    textTransform: 'capitalize',
  },
  statusInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  contractText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  contractInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  relatedJobText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  relatedJobInfo: {
    fontSize: 14,
    color: colors.appViolet,
    paddingBottom: 10,
  },
  jobCategoryText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  jobCategoryInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  offerExpiresText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  offerExpiresInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  offerDateText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  offerDateInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  bidText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 10,
  },
  totalAmountText: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  amountInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  serviceFeeText: {
    paddingTop: 10,
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  serviceFeeInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  receiveText: {
    paddingTop: 10,
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  receiveSubText: {
    fontSize: 15,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  receiveInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  mileStoneInfoText: {
    fontSize: 14,
    color: colors.appGray,

    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  milestoneHeading: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  milestoneHeadingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.appBlack,
    paddingBottom: 5,
  },
  milestoneBody: {
    // alignItems: 'center',
    // flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
    paddingBottom: 20,
  },
  workDescriptionText: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.appBlack,
    paddingBottom: 5,
  },
  workInfo: {
    fontSize: 14,
    color: colors.appBlack,
    paddingBottom: 10,
  },
  milestoneTitle: {
    flex: 0.4,
    textAlign: 'left',
  },
  milestoneAmount: {
    flex: 0.3,
    textAlign: 'left',
  },
  milestoneDate: {
    flex: 0.3,
    textAlign: 'left',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  clientImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginEnd: 10,
  },
  aboutClientText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.appBlack,
    paddingBottom: 10,
  },
  verifiedText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.appBlack,
    paddingBottom: 10,
  },
  countryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.appBlack,
  },
  cityName: {
    fontSize: 14,
    color: colors.appGray,
    paddingBottom: 10,
  },
  jobsPosted: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.appBlack,
  },
  hire: {
    fontSize: 14,
    color: colors.appGray,
    paddingBottom: 10,
  },
  memberSince: {
    fontSize: 15,
    color: colors.appGray,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
    marginBottom: 10,
    paddingTop: 10,
  },
  acceptOfferButton: {
    backgroundColor: colors.appGreen,
    height: 40,
    marginVertical: 10,
  },
  acceptOfferButtonText: {
    color: colors.defaultWhite,
  },
  declineOfferButton: {
    borderColor: colors.appRed,
    height: 40,
    marginVertical: 10,
  },
  declineOfferButtonText: {
    color: colors.appRed,
  },
  messageButton: {
    backgroundColor: colors.appViolet,
    height: 40,
    marginVertical: 10,
  },
  messageButtonText: {
    color: colors.defaultWhite,
  },
  originalPropsoalButton: {
    backgroundColor: colors.skyBlue,
    height: 40,
    marginVertical: 10,
  },
  oroginalPropsoalButtonText: {
    color: colors.defaultWhite,
  },
});

export default OfferDetails;
