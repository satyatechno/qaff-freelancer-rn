import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_PROFILE, USER_ACTION} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import ErrorDialog from 'src/components/error-dialog/ErrorDialog';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {login, socialAuthApi, socialLogin} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Login.styles';

const Login = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({email: [], password: []});
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState('');
  const [passwordNote, setPasswordNote] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showPassward, setShowPassward] = useState(true);
  const passwordInputRef = useRef();
  const [socialLoading, setSocialLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '624462542238-eomoquutg22qiu7k0jff91qvv8b8e35u.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      //  ,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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

  const handleChange = (setKey, text) => {
    setKey(text);
  };

  const forgotPassword = () => {
    navigation.navigate('RecoverPassword');
  };

  const validate = () => {
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';
    let passwordError = '';
    if (!email.length) {
      emailError = [t('login.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('login.validEmail')];
    } else {
      emailError = [];
    }
    if (!password.length) {
      passwordError = [t('login.passwordRequired')];
    } else if (password.length < 8) {
      passwordError = [t('login.passwordLength')];
    } else {
      passwordError = [];
    }

    if (emailError.length || passwordError.length) {
      setError({...error, email: emailError, password: passwordError});
      return false;
    }
    return true;
  };
  // console.log('e', error);
  const onLogin = () => {
    const isValid = validate();
    if (isValid) {
      setIsLoading(true);
      setError({email: [], password: []});
      setPasswordNote(false);
      login({email: email, password: password})
        .then((response) => {
          setIsLoading(false);

          if (response.data.data?.account_security.length > 0) {
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
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_security_question',
              )
            ) {
              navigation.navigate('SecurityQuestion', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
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
        .catch((error) => {
          setIsLoading(false);
          if (error?.response?.data) {
            if (
              email.length > 0 &&
              password.length >= 8 &&
              error.response.data.message !== '' &&
              !error.response?.data.data.account_found_nd_profile_not_created
            ) {
              setErrorModalVisible(true);
              setErrorModalTitle(error.response.data.message);
              setTimeout(() => {
                setErrorModalVisible(false);
              }, 3000);
            }

            if (
              email.length > 0 &&
              password.length > 0 &&
              error.response.data.errors
                ?.account_found_nd_verification_required === true
            ) {
              navigation.navigate('OtpVerification', {
                token: error.response.data.data.token,
                account_found: true,
              });
            }
            if (
              error.response?.data.data.account_found_nd_profile_not_created ===
              true
            ) {
              navigation.navigate('CreateProfile', {
                client_email: error.response.data.data.employer_profile?.email,
                client_first_name:
                  error.response.data.data.employer_profile?.first_name,
                client_last_name:
                  error.response.data.data.employer_profile?.last_name,
                token: error.response.data.data?.token,
              });
            }

            console.log(error.response.data.message);
            console.log(
              'errrrrrr',
              JSON.stringify(error.response.data.data, null, 2),
            );
            setError(error.response.data.errors);
          } else {
            console.error(error);
          }
        });
    }
  };
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      setSocialLoading(true);
      socialLogin({
        data: {
          provider_user_id: userInfo.user.id,
          email: userInfo.user.email,
          account_type: 'freelancer',
        },
        name: 'google',
      })
        .then((response) => {
          if (response.data.data?.account_security.length > 0) {
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
              response.data.data?.account_security.find(
                (x) => x.name === 'two_step_security_question',
              )
            ) {
              navigation.navigate('SecurityQuestion', {
                token: response.data.data.token,
                isFinalStep: response.data.data?.account_security.length === 1,
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
            err?.response?.data?.data?.account_found_nd_profile_not_created ===
            true
          ) {
            navigation.navigate('CreateProfile', {
              client_email: err?.response?.data?.data?.employer_profile?.email,
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
        })
        .finally(() => setSocialLoading(false));
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
                      t('login.error'),
                      t('login.toContinue'),
                      t('login.ok'),
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
                        if (response.data.data?.account_security.length > 0) {
                          if (
                            response.data.data?.account_security.find(
                              (x) => x.name === 'two_step_otp_text',
                            )
                          ) {
                            navigation.navigate('TwoStepWithOtp', {
                              token: response.data.data.token,
                              isFinalStep:
                                response.data.data?.account_security.length ===
                                1,
                              account_security:
                                response.data.data?.account_security,
                            });
                          } else if (
                            response.data.data?.account_security.find(
                              (x) => x.name === 'two_step_security_question',
                            )
                          ) {
                            navigation.navigate('SecurityQuestion', {
                              token: response.data.data.token,
                              isFinalStep:
                                response.data.data?.account_security.length ===
                                1,
                              question:
                                response.data.data?.account_security[
                                  response.data.data?.account_security.findIndex(
                                    (x) =>
                                      x.name === 'two_step_security_question',
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
                        console.error('api login fb error', err.response.data);
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
  const twitterLogin = () => {};
  const linkedinLogin = () => {
    navigation.navigate('LinkedinWebView', {navigationScreen: 'Login'});
  };

  // console.log('state', JSON.stringify(state, null, 2));
  return (
    <Container style={styles.container}>
      <View style={styles.upperHalf}>
        <LottieView
          style={styles.loginImage}
          source={require('src/assets//lottie-animation/global.json')}
          autoPlay
          loop
        />
        <Text style={styles.searchText}>{t('login.bannerText')}</Text>
        <FastImage
          style={styles.logo}
          source={require('src/assets/images/Logo.png')}
        />
      </View>

      <Text style={styles.logIn}>{t('login.login')}</Text>

      <Text style={styles.label}>{t('login.email')}</Text>
      <CustomInput
        style={[
          styles.input,
          error?.email?.length > 0 && {borderColor: colors.appRed},
        ]}
        value={email}
        handleChange={handleChange}
        setKey={setEmail}
        isEmail={true}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      {error?.email?.length > 0 && (
        <ErrorText style={{marginHorizontal: 20}} text={error.email[0]} />
      )}
      <Text style={styles.label}>{t('login.password')}</Text>
      {/* <PasswordInput
        style={styles.passwordContainer}
        value={password}
        handleChange={handleChange}
        setKey={setPassword}
        onFocus={() => setPasswordNote(true)}
      /> */}
      <View
        style={[
          styles.passwardContainer,
          error?.password?.length > 0 && {borderColor: colors.appRed},
        ]}>
        <TextInput
          value={password}
          ref={passwordInputRef}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.passwardInput}
          keyboardType="default"
          secureTextEntry={showPassward}
          onSubmitEditing={onLogin}
        />
        <TouchableOpacity
          onPress={() => setShowPassward(!showPassward)}
          style={{alignSelf: 'center', paddingHorizontal: 5}}>
          {showPassward ? (
            <Ionicons name={'eye-off-outline'} size={20} style={styles.icon} />
          ) : (
            <Ionicons name={'eye-outline'} size={20} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>

      {/* {passwordNote && (
        <Text
          style={{
            fontSize: 12,
            color: colors.appGray,
            marginHorizontal: 20,
          }}>
          Note: Password must be at least 8 characters
        </Text>
      )} */}
      {error?.password?.length > 0 && (
        <ErrorText style={{marginStart: 20}} text={error?.password[0]} />
      )}
      <CustomButton handlePress={forgotPassword}>
        <Text style={styles.forgotPassword}>{t('login.forgot')}</Text>
      </CustomButton>
      <CustomButton
        isLoading={isLoading}
        mode={1}
        style={styles.loginButton}
        handlePress={onLogin}>
        <Text style={styles.loginButtonText}>{t('login.loginButton')}</Text>
      </CustomButton>
      <Text style={styles.socialNetworkText}>{t('login.orVia')}</Text>
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
            <FastImage
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
        {/* <CustomButton handlePress={twitterLogin}>
          <View style={styles.footerLogoContainer}>
            <FastImage
              style={styles.socialIconAlign}
              source={require('src/assets/images/twitter1.png')}
            />
          </View>
        </CustomButton> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.noAccountText}>{t('login.dontHaveAnAccount')}</Text>

        <CustomButton handlePress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpText}>{t('login.signUp')}</Text>
        </CustomButton>
      </View>
      <ErrorDialog
        title={errorModalTitle}
        onClose={() => setErrorModalVisible(false)}
        modalVisible={errorModalVisible}
      />
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
            {t('login.loggingIn')}...
          </Text>
        </View>
      </Modal>
    </Container>
  );
};

export default Login;
