import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  I18nManager,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_PROFILE, LOADER, UPDATE_MOBILE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {updateAuthDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './OtpVerification.styles';

function OtpVerification({navigation, route}) {
  const [loading, setLoading] = useState(false);
  let redux_data = useSelector((state) => state.myReducer);
  // const loading = redux_data?.loading;
  const token = redux_data?.user?.token;
  const {t} = useTranslation();
  const [input1, setInput1] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const ref_input1 = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    ref_input1.current.focus();
  }, []);
  const onVerifyOTP = () => {
    input1 === '' ? setError(true) : setError(false);
    if (!error) {
      setLoading(true);
      // dispatch(LOADER(true));
      var otp = input1;
      updateAuthDetails({
        token: token,
        type: route?.params?.type,
        data: {otp: otp, verify: route.params?.verify},
      })
        .then((response) => {
          Snackbar.show({
            text: response.data.message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.appViolet,
          });
          console.log(
            'chngeAuth details',
            JSON.stringify(response.data, null, 2),
          );
          dispatch(LOADER(false));
          if (response.status === 200) {
            dispatch(FETCH_PROFILE());
            dispatch(UPDATE_MOBILE(route.params?.verify.split(' ')));
            navigation.navigate('SetupComplete');
            // navigation.dispatch(StackActions.replace('Tabs'));
          }
        })
        .catch((error) => {
          dispatch(LOADER(false));
          if (error?.response?.data) {
            console.log('errMessage', error.response.data.message);
            if (error.response.data.message.length > 0 && otp.length === 4) {
              Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.appRed,
              });
            }
          } else {
            console.log('error in testing >>', error);
          }
        })
        .finally(() => setLoading(false));
    }
  };
  const onResendOTP = () => {};
  return (
    <>
      <Header
        backButton={true}
        navigation={navigation}
        title={i18n.t('asOtpVerification.verifyOtp')}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.childContainer}>
            <Text style={styles.headng}>
              {i18n.t('asOtpVerification.verifyMobile')}
            </Text>

            <Text style={styles.enterOtpText}>
              {i18n.t('asOtpVerification.enterOtp')} {route?.params?.phone}
            </Text>

            <TextInput
              style={{
                marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                paddingStart: 10,
                width: '50%',
                fontSize: 19,
                letterSpacing: 33,
                paddingBottom: 0,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              caretHidden={true}
              keyboardType="numeric"
              returnKeyType="done"
              maxLength={4}
              value={input1}
              ref={ref_input1}
              onChangeText={(text) => {
                setInput1(text);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',

                width: '50%',
              }}>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <View
                    key={i}
                    style={{
                      borderBottomWidth: input1.charAt(i) !== '' ? 0 : 2,
                      width: 10,
                      paddingEnd: 20,
                      borderBottomColor: colors.skyBlue,
                    }}
                  />
                ))}
            </View>

            {error && (
              <ErrorText
                style={{marginStart: 20}}
                text={i18n.t('asOtpVerification.required')}
              />
            )}

            {/* <View style={styles.resendContainer}>
            <TouchableOpacity onPress={onResendOTP}>
              <Text style={styles.resendText}>
                {t('otpVerification.resendOtp')}
              </Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={onVerifyOTP}>
        {loading ? (
          <ActivityIndicator color={colors.defaultWhite} size={30} />
        ) : (
          <Text style={styles.submitText}>
            {i18n.t('asOtpVerification.verifyAndNext')}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
}

export default OtpVerification;
