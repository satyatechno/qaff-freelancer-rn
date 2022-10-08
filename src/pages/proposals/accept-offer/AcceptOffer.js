import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {acceptOffer} from 'src/services/http.service';
import Snackbar from 'react-native-snackbar';
import CustomButton from 'src/components/button/CustomButton';
import {useDispatch} from 'react-redux';
import {SEND_CHAT_MESSAGE} from 'src/actions/sendChatMessage';
import {useTranslation} from 'react-i18next';
import {sendExtraMessage} from 'src/firebase';

const AcceptOffer = ({navigation, route: {params}}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messageInputError, setMessageInputError] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  console.log('Accept offer params', JSON.stringify(params, null, 2));

  const handleAcceptOffer = () => {
    if (isChecked) {
      if (!messageInput.length) {
        setMessageInputError(true);
        Snackbar.show({
          text: t('acceptOffer.enterMessage'),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.appRed,
        });
      } else {
        setIsLoading(true);
        acceptOffer({
          contractId: params?.contractId,
          token: params?.token,
          data: {freelancer_message: messageInput},
        })
          .then((res) => {
            setIsLoading(false);
            setMessageInput('');
            Snackbar.show({
              text: res.data.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.appGreen,
            });
            navigation.pop(3);
            navigation.navigate('Contracts');
            // dispatch(
            //   SEND_CHAT_MESSAGE({
            //     params: {
            //       sendType: 'AcceptOffer',
            //       sendId: params?.contractId?.toString(),
            //       projectName: params?.projectTitle,
            //     },
            //     qbId: params?.quickblox?.qb_id,
            //     message: messageInput,
            //     name: params?.employerName,
            //   }),
            // );
            let extraData = {
              sendType: 'Accept Offer',
              sendId: params?.contractId?.toString(),
              projectName: params?.projectTitle,
            };
            sendExtraMessage(
              messageInput,
              [],
              extraData,
              params?.firebaseUserId,
            );
          })
          .catch((err) => {
            setIsLoading(false);
            console.error('Error while accepting offer', err);
          });
      }
    } else {
      Snackbar.show({
        text: t('acceptOffer.acceptTerms'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    }
  };

  return (
    <>
      <Header
        title={t('acceptOffer.acceptOffer')}
        navigation={navigation}
        backButton
        notificationButton
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Text style={styles.messageText}>
          {t('acceptOffer.messageToClient')}
        </Text>
        <TextInput
          style={[
            styles.messageInput,
            messageInputError && {borderColor: colors.appRed},
          ]}
          onChangeText={(text) => setMessageInput(text)}
          onFocus={() => setMessageInputError(false)}
        />
        <Text style={styles.agreeText}>{t('acceptOffer.agreeTerms')}</Text>
        <TouchableOpacity
          style={styles.agreeInfoContainer}
          onPress={() => setIsChecked(!isChecked)}>
          {!isChecked ? (
            <Ionicons name="stop-outline" color={colors.appViolet} size={25} />
          ) : (
            <Ionicons name="checkbox" color={colors.appViolet} size={25} />
          )}
          <Text
            style={[
              styles.agreeInfoText,
              isChecked && {color: colors.appViolet},
            ]}>
            {t('acceptOffer.userAgreement')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomButton
        isLoading={isLoading}
        style={styles.acceptOfferButton}
        handlePress={handleAcceptOffer}>
        <Text style={styles.acceptOfferText}>
          {t('acceptOffer.acceptOffer')}
        </Text>
      </CustomButton>
    </>
  );
};
const styles = StyleSheet.create({
  messageText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.appBlack,
  },
  messageInput: {
    borderWidth: 1.5,
    borderColor: colors.appViolet,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 60,
  },
  agreeText: {
    paddingVertical: 10,
    paddingStart: 10,
    fontSize: 16,
  },
  agreeInfoText: {
    paddingHorizontal: 10,
    color: colors.appGray,
    flexWrap: 'wrap',
  },
  agreeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  acceptOfferButton: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appGreen,
    borderRadius: 10,
  },
  acceptOfferText: {
    color: colors.defaultWhite,
    fontSize: 16,
  },
});

export default AcceptOffer;
