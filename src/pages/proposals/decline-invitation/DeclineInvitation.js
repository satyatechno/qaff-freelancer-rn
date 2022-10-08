import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_INVITATIONS} from 'src/actions/proposals';
import {SEND_CHAT_MESSAGE} from 'src/actions/sendChatMessage';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {sendExtraMessage} from 'src/firebase';
import {declineInvitation} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';

const DeclineInvitation = ({navigation, route: {params}}) => {
  const [declineReason, setDeclineReason] = useState('');
  const [declineInput, setDeclineInput] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.myReducer.user?.token);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const data = [
    {
      id: 1,
      name: t('declineInvitation.jobNotFit'),
    },
    {
      id: 2,
      name: t('declineInvitation.notInterested'),
    },
    {
      id: 3,
      name: t('declineInvitation.tooBusy'),
    },
    {
      id: 4,
      name: t('declineInvitation.littleExperience'),
    },
    {
      id: 5,
      name: t('declineInvitation.lowBudget'),
    },
    {
      id: 6,
      name: t('declineInvitation.spam'),
    },
    {
      id: 7,
      name: t('declineInvitation.freeWork'),
    },
    {
      id: 8,
      name: t('declineInvitation.outsideQaff'),
    },
    {
      id: 9,
      name: t('declineInvitation.other'),
    },
  ];

  const radioSelect = ({selection}) => {
    setDeclineReason(selection?.name);
  };

  const onDeclineInvitation = () => {
    if (!declineReason.length) {
      if (!declineReason.length) {
        Snackbar.show({
          text: t('declineInvitation.selectReasonToDecline'),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.appRed,
        });
      }
    } else {
      setLoading(true);
      declineInvitation({
        invitationId: params?.invitationId,
        data: {
          decline_reason: declineReason,
          freelancer_message: declineInput,
        },
        token: token,
      })
        .then((res) => {
          setLoading(false);
          dispatch(
            UPDATE_INVITATIONS({
              invitationId: res.data?.data?.invitation.id,
              message: res?.data?.message,
            }),
          );
          navigation.navigate('Proposals');
          // dispatch(
          //   SEND_CHAT_MESSAGE({
          //     params: {
          //       sendType: 'DeclineInvitation',
          //       sendId: params?.invitationId.toString(),
          //       projectName: params?.projectTitle,
          //       declineReason: declineReason,
          //     },
          //     qbId: params?.quickblox?.qb_id,
          //     message: declineInput,
          //     name: params?.employerName,
          //   }),
          // );
          // console.log('decline response', JSON.stringify(res.data, null, 2));
          let extraData = {
            sendType: 'Decine Invitation',
            sendId: params?.invitationId?.toString(),
            projectName: params?.projectTitle,
            declineReason: declineReason,
          };
          sendExtraMessage(declineInput, [], extraData, params?.firebaseUserId);
        })
        .catch((err) => {
          setLoading(false);
          console.error(JSON.stringify(err, null, 2));
        });
    }
  };

  console.log('Decline Params', JSON.stringify(params, null, 2));

  return (
    <>
      <Header
        title={t('declineInvitation.decline')}
        navigation={navigation}
        backButton
        notificationButton
      />
      <ScrollView>
        <Text style={styles.headerText}>
          {t('declineInvitation.notifyTheClient')}
        </Text>
        <Text style={styles.reasonText}>{t('declineInvitation.reason')}</Text>
        <RadioGroup data={{data: data}} onSelect={radioSelect} />
        <Text style={styles.messageText}>{t('declineInvitation.message')}</Text>
        <Text style={styles.messageSubText}>
          {t('declineInvitation.optionalMessage')}
        </Text>
        <TextInput
          onChangeText={(text) => setDeclineInput(text)}
          style={styles.declineInput}
        />
        <CustomButton
          isLoading={loading}
          style={styles.declineButton}
          mode={1}
          handlePress={onDeclineInvitation}>
          <Text style={styles.declineButtonText}>
            {t('declineInvitation.submit')}
          </Text>
        </CustomButton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: colors.appBlack,
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'left',
    paddingVertical: 10,
  },
  reasonText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'left',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  messageText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'left',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  messageSubText: {
    color: colors.appGray,
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'left',
    paddingBottom: 10,
  },
  declineInput: {
    fontSize: 14,
    height: 40,
    borderWidth: 1,
    borderColor: colors.appViolet,
    paddingStart: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  declineButton: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  declineButtonText: {
    color: colors.defaultWhite,
    fontSize: 16,
  },
});

export default DeclineInvitation;
