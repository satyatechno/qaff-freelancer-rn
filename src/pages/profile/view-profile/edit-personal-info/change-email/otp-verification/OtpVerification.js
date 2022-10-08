import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOADER,
  MODAL_VISIBLE,
  UPDATE_EMAIL,
  UPDATE_MOBILE,
} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {updateAuthDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './OtpVerification.styles';

function OtpVerification({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const [loading, setLoading] = useState(false);
  // const loading = redux_data?.loading;
  const token = redux_data?.user?.token;
  const {t} = useTranslation();
  const [input1, setInput1] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const ref_input1 = useRef();

  useEffect(() => {
    ref_input1.current.focus();
  }, []);

  const dispatch = useDispatch();
  const onVerifyOTP = () => {
    input1 === '' ? setError(true) : setError(false);
    if (!error) {
      setLoading(true);
      var otp = input1;
      updateAuthDetails({
        token: token,
        type: route?.params?.type,
        data: {otp: otp, verify: route.params?.verify},
      })
        .then((response) => {
          console.log('chngeAuth details', response.data);
          dispatch(LOADER(false));
          if (response.status === 200) {
            route?.params?.type === 'email'
              ? dispatch(UPDATE_EMAIL(route.params?.verify))
              : dispatch(UPDATE_MOBILE(route.params?.verify.split(' ')));

            dispatch(
              MODAL_VISIBLE({
                visible: true,
                type: 1,
                message: response.data.message,
              }),
            );
            navigation.navigate('EditPersonalInfo');
          }
        })
        .catch((error) => {
          dispatch(LOADER(false));
          if (error?.response?.data) {
            console.log('errMessage', error.response.data.message);
            if (error.response.data.message.length > 0 && otp.length === 4) {
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: error.response.data.message,
                }),
              );
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
        title={i18n.t('vpOtpVerification.editProfile')}
        notificationButton={true}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.childContainer}>
            <Text style={styles.headng}>
              {i18n.t('vpOtpVerification.updateYour')}{' '}
              {route?.params?.type === 'email'
                ? i18n.t('vpOtpVerification.emailAddress')
                : i18n.t('vpOtpVerification.mobileNumber')}
            </Text>

            <Text style={styles.enterOtpText}>
              {i18n.t('vpOtpVerification.enterOtp')}{' '}
              {route?.params?.type === 'email'
                ? i18n.t('vpOtpVerification.emailAddress')
                : i18n.t('vpOtpVerification.mobileNumber')}
            </Text>

            <TextInput
              style={{
                marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                paddingStart: 10,
                width: '50%',
                fontSize: 19,
                letterSpacing: 33,
                paddingBottom: 0,
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
              <ErrorText name={i18n.t('vpOtpVerification.otpRequired')} />
            )}

            {/* <View style={styles.resendContainer}>
            <TouchableOpacity onPress={onResendOTP}>
            <Text style={styles.resendText}>
                {t('otpVerification.resendOtp')}
                </Text>
            </TouchableOpacity>
          </View> */}
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                width: '90%',
                marginHorizontal: 20,
              }}>
              <CustomButton
                isLoading={loading}
                handlePress={onVerifyOTP}
                mode={1}>
                <Text style={styles.buttonText}>
                  {i18n.t('vpOtpVerification.verify')}
                </Text>
              </CustomButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default OtpVerification;
