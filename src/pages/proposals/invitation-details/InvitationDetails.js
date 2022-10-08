import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import styles from './InvitationDetails.styles';
import moment from 'moment';
import {getInvitationDetail} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
const InvitationDetails = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const {t} = useTranslation();
  useEffect(() => {
    getInvitationDetail({
      token: token,
      id: route?.params?.id,
    }).then((res) => setData(res?.data?.data?.invitation));
  }, [route?.params?.id]);

  // console.log('Invitation Details', JSON.stringify(data, null, 2));
  return (
    <>
      <Header
        title={t('invitationDetails.invitationToInterview')}
        navigation={navigation}
        backButton
        notificationButton
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.jobDetailsText}>
            {t('invitationDetails.jobDetails')}
          </Text>
          <Text style={styles.projectTitle}>{data?.project?.title}</Text>
          <Text style={styles.projectDescription}>
            {data?.project?.description}
          </Text>
          <CustomButton
            style={styles.jobPostingButton}
            handlePress={() => {
              navigation.navigate('ProjectDtails', {
                id: data?.project?.id,
              });
            }}>
            <Text style={styles.jobPostingText}>
              {t('invitationDetails.viewJobPosting')}
            </Text>
          </CustomButton>
          <Text style={styles.aboutClientText}>
            {t('invitationDetails.aboutClient')}
          </Text>
          <Text style={styles.paymentMethodText}>
            {t('invitationDetails.paymentMethodNotVerified')}
          </Text>
          <Text style={styles.locationText}>
            {t('invitationDetails.location')}
          </Text>
          <Text style={styles.countryText}>{data?.employer?.country}</Text>
          <Text style={styles.countryText}>{data?.employer?.city}</Text>
          <Text style={styles.historyText}>
            {t('invitationDetails.history')}
          </Text>
          <Text style={styles.historySubText}>{`${
            data?.employer?.proposal_count ?? 0
          } ${t('invitationDetails.proposals')}`}</Text>
          <Text style={styles.historySubText}>{`${
            data?.employer?.total_invitation_count ?? 0
          } ${t('invitationDetails.interviews')}`}</Text>
          <Text style={styles.historySubText}>{`${
            data?.employer?.posted_jobs_count ?? 0
          } ${t('invitationDetails.jobPosted')}`}</Text>
          <Text style={styles.historySubText}>{`${
            data?.employer?.open_jobs_count ?? 0
          } ${t('invitationDetails.openJobs')}`}</Text>
          <Text style={styles.createdAt}>{`${t(
            'invitationDetails.memberSince',
          )} ${moment
            .unix(data?.employer?.created_at)
            .format('MMM DD,YYYY')}`}</Text>
        </View>
        <View style={styles.activityContainer}>
          <Text style={styles.activityText}>
            {t('invitationDetails.activityOnJob')}
          </Text>
          <Text style={styles.proposalCount}>{`${t(
            'invitationDetails.proposals',
          )} ${data?.project?.proposal_count ?? 0}`}</Text>
          <Text style={styles.interviewingText}>{`${t(
            'invitationDetails.interviewing',
          )} ${data?.project?.active_interview_count ?? 0}`}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() =>
              navigation.navigate('DeclineInvitation', {
                invitationId: data?.id,
                firebaseUserId: data?.employer?.firebase_user_id,
                projectTitle: data?.project?.title,
                employerName: data?.employer?.name,
              })
            }>
            <Text style={styles.declineText}>
              {t('invitationDetails.decline')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            mode={1}
            onPress={() => {
              navigation.pop(2);
              navigation.navigate('Jobs', {
                screen: 'MySuggestion',
                params: {projectDetails: data?.project},
              });
            }}>
            <Text style={styles.acceptText}>
              {t('invitationDetails.accept')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default InvitationDetails;
