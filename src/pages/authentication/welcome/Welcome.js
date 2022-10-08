import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Welcome.styles';
import {useTranslation} from 'react-i18next';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

function Welcome({navigation}) {
  const {t, i18n} = useTranslation();

  const onLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <Container style={styles.container}>
      <View style={styles.upperHalf}>
        {/* <Image
          style={styles.welcomeImage}
          source={require('./images/welcome.png')}
        /> */}
        <LottieView
          style={styles.welcomeImage}
          source={require('./lottie-animation/search-engine-ranking-animation.json')}
          autoPlay
          loop
        />
        <Text style={styles.applyText}>{t('welcome.bannerText')}</Text>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </View>

      <Text style={styles.welcomeText}>{t('welcome.welcome')}</Text>
      <CustomButton
        mode={1}
        style={styles.signUpButton}
        handlePress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpButtonText}>{t('welcome.signUp')}</Text>
      </CustomButton>
      <Text style={styles.orText}>{t('welcome.or')}</Text>
      <CustomButton mode={2} style={styles.logInButton} handlePress={onLogIn}>
        <Text style={styles.logInButtonText}>{t('welcome.logIn')}</Text>
      </CustomButton>
    </Container>
  );
}

export default Welcome;
