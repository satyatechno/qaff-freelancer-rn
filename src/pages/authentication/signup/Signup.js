import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from './Signup.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {useTranslation} from 'react-i18next';
import LottieView from 'lottie-react-native';
import {
  LoginManager,
  GraphRequestManager,
  AccessToken,
  GraphRequest,
} from 'react-native-fbsdk';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {StackActions} from '@react-navigation/native';
import {FETCH_PROFILE, USER_ACTION} from 'src/actions/action';
import {socialAuthApi, socialLogin} from 'src/services/http.service';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const Signup = ({navigation, route}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [socialLoading, setSocialLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '624462542238-eomoquutg22qiu7k0jff91qvv8b8e35u.apps.googleusercontent.com',

      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      ginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    });
  }, []);

  useEffect(() => {
    if (route?.params?.type === 'linkedin') {
      getUserCredentials(route?.params?.code, route?.params?.type);
    }
  }, [route?.params?.code]);
  const getUserCredentials = (code, type) => {
    // setFullLoader(true);
    setSocialLoading(true);
    socialAuthApi({
      authType: type,
      code: code,
    })
      .then((res) => {
        console.log('authResponse', res?.data);
        if (res?.data?.data?.user?.id !== undefined) {
          const {
            id,
            email,
            avatar_original,
            first_name,
            last_name,
          } = res?.data?.data?.user;
          socialLogin({
            data: {
              provider_user_id: id,
              email,
              avatar_original,
              first_name,
              last_name,
              account_type: 'freelancer',
            },
            name: 'linkedin',
          })
            .then((response) => {
              console.log('Linkedin login successfull', response);

              if (response.data.data?.account_security.length > 0) {
                if (
                  response.data.data?.account_security.find(
                    (x) => x.name === 'two_step_otp_text',
                  )
                ) {
                  navigation.replace('TwoStepWithOtp', {
                    token: response.data.data.token,
                    isFinalStep:
                      response.data.data?.account_security.length === 1,
                    account_security: response.data.data?.account_security,
                  });
                } else if (
                  response.data.data?.account_security.find(
                    (x) => x.name === 'two_step_security_question',
                  )
                ) {
                  navigation.replace('SecurityQuestion', {
                    token: response.data.data.token,
                    isFinalStep:
                      response.data.data?.account_security.length === 1,
                    question:
                      response.data.data?.account_security[
                        response.data.data?.account_security.findIndex(
                          (x) => x.name === 'two_step_security_question',
                        )
                      ].question,
                  });
                }
              } else {
                dispatch(USER_ACTION(response.data.data));
                dispatch(FETCH_PROFILE());
                dispatch(FETCH_NOTIFICATIONS());
                // dispatch(UNREAD_NOTIFICATION(response.data.data.unread_notificaiton_count))
                navigation.dispatch(StackActions.replace('Tabs'));
              }
            })
            .catch((err) => {
              if (
                err?.response?.data?.data
                  ?.account_found_nd_profile_not_created === true
              ) {
                navigation.replace('CreateProfile', {
                  client_email:
                    err?.response?.data?.data?.employer_profile?.email,
                  client_first_name:
                    err?.response?.data?.data?.employer_profile?.first_name,
                  client_last_name:
                    err?.response?.data?.data?.employer_profile?.last_name,
                  token: err?.response?.data?.data?.token,
                });
              } else if (
                err?.response?.data?.data?.registration_required === true
              ) {
                navigation.replace('SocialSignup', {
                  user_first_name: first_name,
                  user_last_name: last_name,
                  userEmail: email,
                  provider_user_id: id,
                  site_name: 'linkedin',
                });
              } else {
                console.error('api login linkedin error', err?.response?.data);
              }
            });
        }
      })
      .catch((err) => {
        // setFullLoader(false);
        console.log('linkedin auth err', err);
      })
      .finally(() => setSocialLoading(false));
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      socialLogin({
        data: {
          provider_user_id: userInfo.user.id,
          email: userInfo.user.email,
          account_type: 'freelancer',
        },
        name: 'google',
      })
        .then((response) => {
          if (response.data?.data?.account_security.length > 0) {
            if (
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_otp_text',
              )
            ) {
              navigation.navigate('TwoStepWithOtp', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
                account_security: response.data.data?.account_security,
              });
            } else if (
              response?.data.data?.account_security.find(
                (x) => x.name === 'two_step_security_question',
              )
            ) {
              navigation.navigate('SecurityQuestion', {
                token: response?.data?.data?.token,
                isFinalStep:
                  response?.data?.data?.account_security.length === 1,
                question:
                  response?.data?.data?.account_security[
                    response?.data?.data?.account_security.findIndex(
                      (x) => x.name === 'two_step_security_question',
                    )
                  ].question,
              });
            }
          } else {
            dispatch(USER_ACTION(response?.data?.data));
            dispatch(FETCH_PROFILE());
            dispatch(FETCH_NOTIFICATIONS());
            // dispatch(UNREAD_NOTIFICATION(response.data.data.unread_notificaiton_count))
            navigation.dispatch(StackActions.replace('Tabs'));
          }
        })
        .catch((err) => {
          if (
            err?.response?.data?.data?.account_found_nd_profile_not_created ===
            true
          ) {
            navigation.navigate('CreateProfile', {
              client_email: err?.response?.data?.data.employer_profile?.email,
              client_first_name:
                err?.response?.data?.data?.employer_profile?.first_name,
              client_last_name:
                err?.response?.data?.data?.employer_profile?.last_name,
              token: err?.response?.data?.data?.token,
            });
          } else if (
            err?.response?.data?.data?.registration_required === true
          ) {
            navigation.navigate('SocialSignup', {
              user_first_name: userInfo.user.givenName,
              user_last_name: userInfo.user.familyName,
              userEmail: userInfo.user.email,
              provider_user_id: userInfo.user.id,
              site_name: 'google',
            });
          } else {
            console.error('api login google error', err?.response?.data);
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error('google error', error.code);
      }
    }
  };

  const onFacebookLogin = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login Canceled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();

            const PROFILE_REQUEST_PARAMS = {
              fields: {
                string: 'id, name, first_name, last_name, birthday, email',
              },
            };
            const profileRequest = new GraphRequest(
              '/me',
              {accessToken, parameters: PROFILE_REQUEST_PARAMS},
              (error, result) => {
                if (error) {
                  console.log('Login Info has an error:', error);
                } else {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                  }
                  if (result.email === undefined) {
                    Alert.alert(
                      t('signUp.error'),
                      t('signUp.toContinue'),

                      t('signUp.ok'),
                    );
                  } else {
                    socialLogin({
                      data: {
                        provider_user_id: result.id,
                        email: result.email,
                        account_type: 'freelancer',
                      },
                      name: 'facebook',
                    })
                      .then((response) => {
                        // console.log('api Login FB', response);
                        dispatch(USER_ACTION(response.data.data));
                        dispatch(FETCH_PROFILE());
                        navigation.dispatch(StackActions.replace('Tabs'));
                      })
                      .catch((err) => {
                        console.error(
                          'api login fb error',
                          err?.response?.data,
                        );
                        if (
                          err?.response?.data?.data?.registration_required ===
                          true
                        ) {
                          navigation.navigate('SocialSignup', {
                            user_first_name: result.first_name,
                            user_last_name: result.last_name,
                            userEmail: result.email,
                            provider_user_id: result.id,
                            site_name: 'facebook',
                          });
                        }
                      });
                  }
                }
              },
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          });
        }
      },
      (error) => {
        console.log('Error in facebook social login ', error);
      },
    );
  };
  const linkedinLogin = () => {
    navigation.navigate('LinkedinWebView', {navigationScreen: 'Signup'});
  };
  return (
    <Container>
      <View style={styles.upperHalf}>
        {/* <Image
          style={styles.signupImage}
          source={require('./images/signup.png')}
        /> */}
        <LottieView
          style={styles.signupImage}
          source={require('./lottie-animation/office-boy-and-girl.json')}
          autoPlay
          loop
        />
        <Text style={styles.receiveText}>{t('signUp.bannerText')}</Text>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </View>
      <Text style={styles.welcomeText}>{t('signUp.joinToQaff')}</Text>
      <CustomButton
        style={styles.signUpButton}
        mode={1}
        handlePress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.signUpButtonText}>{t('signUp.emailSignUp')}</Text>
      </CustomButton>
      <Text style={styles.orText}>{t('signUp.orViaSocialAccounts')}</Text>
      <View style={styles.socialIcon}>
        <CustomButton handlePress={googleLogin}>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/Google1.png')}
            />
          </View>
        </CustomButton>
        <CustomButton handlePress={linkedinLogin}>
          <View style={styles.footerLogoContainer}>
            <Image
              style={styles.socialIconAlign}
              source={require('src/assets/images/linkedin1.png')}
            />
          </View>
        </CustomButton>
        <CustomButton handlePress={onFacebookLogin}>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/facebook1.png')}
            />
          </View>
        </CustomButton>
        {/* <CustomButton handlePress={() => {}}>
          <View style={styles.footerLogoContainer}>
            <Image
              style={styles.socialIconAlign}
              source={require('src/assets/images/twitter1.png')}
            />
          </View>
        </CustomButton> */}
      </View>
      <Text style={styles.footerTopText}>{t('signUp.bySigningUp')}</Text>
      <Text style={styles.footerBottomText}>{t('signUp.terms')}</Text>
      <Modal visible={socialLoading} transparent={true}>
        <View
          style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: colors.appGray2,
            opacity: 0.7,
          }}>
          <ActivityIndicator color={colors.skyBlue} size={50} />
          <Text
            style={{
              color: colors.skyBlue,
              fontSize: 20,
              fontFamily: fonts.primarySB,
            }}>
            {t('signUp.loggingIn')}
          </Text>
        </View>
      </Modal>
    </Container>
  );
};

export default Signup;
