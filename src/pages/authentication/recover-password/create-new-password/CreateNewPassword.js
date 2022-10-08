import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './CreateNewPassword.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {withTranslation} from 'react-i18next';
import PasswordInput from 'src/components/input/password-input/PasswordInput';
import {createNewPassword} from 'src/services/http.service';
import ErrorText from 'src/components/error-text/ErrorText';
import colors from 'src/styles/texts/colors';
import ConfirmationDialog from 'src/components/confirmation-dialog/ConfirmationDialog';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

class CreateNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: '',
      passwordNote: false,
      passwordError: '',
      confirmationModalText: '',
      confirmationModalVisible: false,
    };
  }
  validate = () => {
    const {t} = this.props;

    const {password, confirmPassword, error} = this.state;
    let capitalAndSmallLetterRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    let specialCharacterRegex = /[@$!%*?&]/;
    let numberRegex = /\d/;
    let errorPassword = '';
    let confirmPasswordError = false;
    if (!password.length) {
      errorPassword = [t('createNewPassword.passwordRequired')];
    } else if (!capitalAndSmallLetterRegex.test(password)) {
      errorPassword = [t('createNewPassword.passwordUpperCase')];
    } else if (!specialCharacterRegex.test(password)) {
      errorPassword = [t('createNewPassword.passwordSpecialChar')];
    } else if (!numberRegex.test(password)) {
      errorPassword = t('createNewPassword.passwordOneNum');
    } else if (password.length < 8) {
      errorPassword = [t('createNewPassword.passwordLength')];
    } else {
      errorPassword = [];

      if (password !== confirmPassword) {
        confirmPasswordError = t('createPassword.passwordNotMatched');
      } else {
        confirmPasswordError = '';
      }
    }
    if (errorPassword.length || confirmPasswordError.length) {
      this.setState({
        error: {
          password: errorPassword,
        },
        passwordError: confirmPasswordError,
      });

      return false;
    }
    return true;
  };
  changePassword = () => {
    this.setState({passwordNote: false});
    const isValid = this.validate();
    if (isValid) {
      this.setState({isLoading: true, error: ''});
      const {password} = this.state;
      const {route, navigation} = this.props;

      createNewPassword({
        password: password,
        otp: route.params?.otp,
        email: route.params?.email,
      })
        .then((response) => {
          this.setState({
            isLoading: false,
            confirmationModalText: this.props.t(
              'createNewPassword.passwordChangeSuccess',
            ),
            confirmationModalVisible: true,
          });
          // console.log("gggg", response.data);
          setTimeout(() => {
            navigation.navigate('Login');
          }, 1000);
        })
        .catch((error) => {
          this.setState({isLoading: false});
          if (error?.response?.data) {
            this.setState({error: error.response.data.errors});

            console.log('errMessage', error.response.data.message);

            console.log('Errors=====', error.response.data.errors);
          } else {
            console.error(error);
          }
        });
    }
  };
  closeConfirmationDialog = () => {
    this.setState({confirmationModalVisible: false});
  };
  render() {
    const {t} = this.props;
    const {
      password,
      confirmPassword,
      error,
      passwordError,
      passwordNote,
      confirmationModalText,
      confirmationModalVisible,
      isLoading,
    } = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.upperHalf}>
          <LottieView
            style={styles.createAccountImage}
            source={require('src/assets/lottie-animation/global.json')}
            autoPlay
            loop
          />
          <Text style={styles.becomeText}>
            {t('createNewPassword.bannerText')}
          </Text>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </View>
        <Text style={styles.createAccountText}>
          {t('createNewPassword.recoverPassword')}
        </Text>
        <Text style={styles.passwordText}>
          {t('createNewPassword.createNewPassword')}
        </Text>
        <PasswordInput
          isClass={true}
          style={[
            styles.input,
            error?.password?.length && {borderColor: colors.appRed},
          ]}
          handleChange={(password) => this.setState({password})}
          value={password}
          onFocus={() => this.setState({passwordNote: true})}
          inputStyle={styles.inputStyle}
          // onEndEditing={() => this.setState({passwordNote: false})}
        />
        {passwordNote && (
          <Text
            style={{
              fontSize: 12,
              color: colors.appGray,
              marginHorizontal: 20,
            }}>
            {t('createNewPassword.passwordNote')}
          </Text>
        )}
        {error?.password && !passwordNote && (
          <ErrorText style={{marginStart: 20}} text={error?.password[0]} />
        )}
        <Text style={styles.passwordText}>
          {t('createNewPassword.confirmPassword')}
        </Text>
        <PasswordInput
          isClass={true}
          style={[
            styles.input,
            passwordError?.length && {borderColor: colors.appRed},
          ]}
          handleChange={(confirmPassword) => this.setState({confirmPassword})}
          value={confirmPassword}
          inputStyle={styles.inputStyle}
        />
        {passwordError !== '' && (
          <ErrorText style={{marginStart: 20}} text={passwordError} />
        )}
        <CustomButton
          mode={1}
          isLoading={isLoading}
          style={styles.createAccountButton}
          handlePress={this.changePassword}>
          <Text style={styles.createAccountButtonText}>
            {t('createNewPassword.changeButton')}
          </Text>
        </CustomButton>
        <ConfirmationDialog
          message={confirmationModalText}
          modalVisible={confirmationModalVisible}
          onClose={this.closeConfirmationDialog}
        />
      </Container>
    );
  }
}

export default withTranslation()(CreateNewPassword);
