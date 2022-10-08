import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './CreatePassword.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {withTranslation} from 'react-i18next';
import PasswordInput from 'src/components/input/password-input/PasswordInput';
import {createPassword} from 'src/services/http.service';
import {StackActions} from '@react-navigation/native';
import ErrorText from 'src/components/error-text/ErrorText';
import colors from 'src/styles/texts/colors';
import {connect} from 'react-redux';
import {FETCH_PROFILE, USER_ACTION} from 'src/actions/action';
import FastImage from 'react-native-fast-image';
class CreatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: '',
      passwordNote: false,
      passwordError: '',
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
      errorPassword = [
        t('createPassword.passwordRequired')

      ];
    } else if (!capitalAndSmallLetterRegex.test(password)) {
      errorPassword = [
        t('createPassword.passwordUpperCase')
      ];
    } else if (!specialCharacterRegex.test(password)) {
      errorPassword = [
        t('createPassword.passwordSpecialChar')
      ];
    } else if (!numberRegex.test(password)) {
      errorPassword = [t('createPassword.passwordOneNum')];
    } else if (password.length < 8) {
      errorPassword = [t('createPassword.passwordLength')];
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
  createAccount = () => {
    this.setState({passwordNote: false});
    const isValid = this.validate();
    if (isValid) {
      const {password} = this.state;
      const {route, navigation} = this.props;
      this.setState({isLoading: true, passwordNote: false, error: ''});

      createPassword({
        password: password,
        otp: route.params?.otp,
        token: route.params?.token,
      })
        .then((response) => {
          this.setState({isLoading: false});
          this.props.dispatch(USER_ACTION(response.data.data));
          this.props.dispatch(FETCH_PROFILE());
          // navigation.dispatch(StackActions.replace('Tabs'));
          navigation.dispatch(StackActions.replace('AfterSignUp'));
        })
        .catch((error) => {
          this.setState({isLoading: false});
          if (error?.response?.data) {
            this.setState({error: error?.response?.data?.errors});
          } else {
            console.error('Error', error);
          }
        });
    }
  };
  render() {
    const {t} = this.props;
    const {
      password,
      confirmPassword,
      error,
      passwordError,
      passwordNote,
    } = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.upperHalf}>
          <FastImage
            style={styles.createAccountImage}
            source={require('src/assets/images/create.png')}
          />
          <Text style={styles.becomeText}>
            {t('createPassword.bannerText')}
          </Text>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </View>
        <Text style={styles.createAccountText}>
          {t('createPassword.createAccount')}
        </Text>
        <Text style={styles.passwordText}>
          {t('createPassword.createPassword')}
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
            {t('createPassword.passwordNote')}
          </Text>
        )}
        {error?.password && !passwordNote && (
          <ErrorText style={{marginStart: 20}} text={error?.password[0]} />
        )}
        <Text style={styles.passwordText}>
          {t('createPassword.confirmPassword')}
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
          style={styles.createAccountButton}
          handlePress={this.createAccount}>
          <Text style={styles.createAccountButtonText}>
            {t('createPassword.createAccountButton')}
          </Text>
        </CustomButton>
      </Container>
    );
  }
}

export default connect()(withTranslation()(CreatePassword));
