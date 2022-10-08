import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  FETCH_PROFILE,
  LOADER,
  MODAL_VISIBLE,
  USER_ACTION,
} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import CustomButton from 'src/components/button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import NetInfoStatus from 'src/components/net-info-status/NetInfoStatus';
import {TwoStepLogin} from 'src/services/http.service';
import styles from './SecurityQuestion.styles';
import translation from 'src/locale/i18n'

function SecurityQuestion({navigation, route}) {
  let redux_data = useSelector((state) => state.myReducer);
  const [loading, setLoading] = useState(false);
  // const {t} = translation
  // const loading = redux_data.loading;

  const [answer, setAnswer] = useState('');
  const [Error, setError] = useState('');

  const dispatch = useDispatch();
  const onConfirm = () => {
    if (answer === '') {
      setError(translation.t('securityQuestion.required'));
    } else {
      setError('');
      // dispatch(LOADER(true));
      setLoading(true);
      TwoStepLogin({
        token: route.params?.token,
        data: {
          two_step_otp_text: route.params?.otp,
          two_step_security_question: answer,
          is_final_step: JSON.stringify(route.params?.isFinalStep),
        },
      })
        .then((response) => {
          dispatch(LOADER(false));
          dispatch(USER_ACTION(response.data.data));
          dispatch(FETCH_PROFILE());
          dispatch(FETCH_NOTIFICATIONS());
          navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((error) => {
          if (error.response.data) {
            dispatch(LOADER(false));
            console.log('errMessage', error.response.data.message);
            if (error.response.data.message.length > 0) {
              dispatch(
                MODAL_VISIBLE({
                  visible: true,
                  type: 2,
                  message: error.response.data.message,
                }),
                setAnswer(''),
              );
            }
          } else {
            console.log('Error at Security Question', error);
          }
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <NetInfoStatus />

      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.banner}
          source={require('src/assets/images/create.png')}>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </ImageBackground>

        <Text style={styles.logIn}>{translation.t('securityQuestion.logIn')}</Text>
        <Text style={styles.queText}>
      {translation.t('securityQuestion.pleaseProvide')}
        </Text>
        <Text style={styles.label}> {route?.params?.question}</Text>
        <TextInput
          value={answer}
          onChangeText={(text) => {
            setAnswer(text);
          }}
          style={[styles.input]}
          keyboardType="default"
        />
        {Error.length > 0 && (
          <ErrorText style={{marginStart: 20}} text={Error} />
        )}
        <CustomButton
          mode={1}
          isLoading={loading}
          style={{margin: 20}}
          handlePress={onConfirm}>
          <Text style={styles.buttonText}>{translation.t('securityQuestion.submit')}</Text>
        </CustomButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SecurityQuestion;
