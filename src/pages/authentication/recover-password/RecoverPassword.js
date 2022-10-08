import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './RecoverPassword.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {useTranslation} from 'react-i18next';
import {forgotPassword} from 'src/services/http.service';
import ErrorText from 'src/components/error-text/ErrorText';
import LottieView from 'lottie-react-native';
import colors from 'src/styles/texts/colors';
import FastImage from 'react-native-fast-image';

const RecoverPassword = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (setKey, text) => {
    setKey(text);
  };
  const validate = () => {
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';

    if (!email.length) {
      emailError = [t('recoverPassword.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('recoverPassword.validEmail')];
    } else {
      emailError = [];
    }

    if (emailError.length) {
      setError({...error, email: emailError});
      return false;
    }
    return true;
  };
  const handlePress = () => {
    const isValid = validate();
    if (isValid) {
      setIsLoading(true);
      setError('');
      forgotPassword({
        email: email,
      })
        .then((res) => {
          setIsLoading(false);
          console.log('recover password', res?.data);
          navigation.navigate('RecoverOtpVerification', {email: email});
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.data) {
            console.log('gfjfj', error?.response?.data?.message);
            setError(error?.response?.data?.errors);
          } else {
            console.error(error);
          }
        });
    }
  };

  return (
    <Container>
      <View style={styles.upperHalf}>
        <LottieView
          style={styles.signupImage}
          source={require('src/assets/lottie-animation/global.json')}
          autoPlay
          loop
        />
        <Text style={styles.receiveText}>
          {t('recoverPassword.bannerText')}
        </Text>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </View>
      <Text style={styles.welcomeText}>
        {t('recoverPassword.recoverPassword')}
      </Text>
      <Text style={styles.label}>{t('recoverPassword.enterAnEmail')}</Text>

      <CustomInput
        style={[
          styles.input,
          error.email?.length && {borderColor: colors.appRed},
        ]}
        value={email}
        handleChange={handleChange}
        setKey={setEmail}
        isEmail={true}
      />
      {error?.email && (
        <ErrorText style={{marginHorizontal: 20}} text={error.email[0]} />
      )}
      <CustomButton
        style={styles.signUpButton}
        mode={1}
        isLoading={isLoading}
        handlePress={handlePress}>
        <Text style={styles.signUpButtonText}>{t('recoverPassword.send')}</Text>
      </CustomButton>

      <View style={styles.footer}>
        <Text style={styles.noAccountText}>
          {t('recoverPassword.dontHaveAnAccount')}
        </Text>

        <CustomButton handlePress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpText}>{t('recoverPassword.signup')}</Text>
        </CustomButton>
      </View>
    </Container>
  );
};

export default RecoverPassword;
