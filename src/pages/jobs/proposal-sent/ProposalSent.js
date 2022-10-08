import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

const ProposalSent = ({ route, navigation }) => {

  const { t } = useTranslation()


  useEffect(() => {
    setTimeout(() => {
      navigation?.goBack()
    },8000)
  }, [])
  return (
    <>
      <Header
        cancelButton
        notificationButton
        title={t("proposalSent.proposalSent")}
        navigation={navigation}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.9,
          // width: '100%',
          // height: '100%',
        }}>
        <LottieView
          style={{
            width: 100,
            height: 100,
            //   backgroundColor: 'orange',
          }}
          source={require('./lottie-animation/offer-sent.json')}
          autoPlay
          loop={true}
        />

        <Text
          style={{
            fontSize: 16,
            color: colors.appBlack,
            fontFamily: fonts.primarySB,
          }}>
          {t("proposalSent.offerSentTo")} {route?.params?.client_name}{' '}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: colors.appBlack,
            fontFamily: fonts.primary,
            width: '70%',
            textAlign: 'center',
            marginTop: 5,
          }}>
          {t("proposalSent.notifyText")} {route?.params?.client_name} {t("proposalSent.respondText")}
        </Text>
      </View>
    </>
  );
};

export default ProposalSent;
