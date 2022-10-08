import React, {Component, createRef} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from './OtpVerification.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {withTranslation} from 'react-i18next';
import ErrorDialog from 'src/components/error-dialog/ErrorDialog';
import {emailVerification, resendOTP} from 'src/services/http.service';
import ErrorText from 'src/components/error-text/ErrorText';
import ConfirmationDialog from 'src/components/confirmation-dialog/ConfirmationDialog';
import colors from 'src/styles/texts/colors';
import FastImage from 'react-native-fast-image';

export class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      errorModalVisible: false,
      error: '',
      isLoading: false,
      errorModalText: '',
      confirmationModalText: '',
      confirmationModalVisible: false,
      resendTimer: 0,
      resendLoading: false,
    };
    this.ref_input1 = createRef();
    this.ref_input2 = createRef();
    this.ref_input3 = createRef();
    this.ref_input4 = createRef();
  }

  verifyOTP = () => {
    const {input1, input2, input3, input4, error} = this.state;
    if (input1 === '' || input2 === '' || input3 === '' || input4 === '')
      this.setState({error: this.props.t('otpVerification.otpRequire')});
    else this.setState({error: ''});
    console.log('eerlen', error);
    if (error.length === 0) {
      this.setState({isLoading: true});
      let otp = input1 + input2 + input3 + input4;
      emailVerification({otp: otp, token: this.props.route.params?.token})
        .then((response) => {
          this.setState({isLoading: false});
          this.props.navigation.navigate('CreatePassword', {
            otp: otp,
            token: this.props.route.params?.token,
          });
        })
        .catch((err) => {
          this.setState({isLoading: false});
          if (err.response.data) {
            if (err.response.data.message.length > 0 && otp.length === 4) {
              this.setState({
                errorModalText: 'Incorrect OTP',
                errorModalVisible: true,
              });

              setTimeout(() => {
                this.setState({errorModalVisible: false});
              }, 2000);
            }
          } else {
            console.error(err);
          }
        });
    }
  };

  componentDidMount() {
    const {route} = this.props;

    // if (route.params?.account_found === true) {
    //   Keyboard.dismiss();
    //   this.setState({
    //     errorModalVisible: true,
    //     errorModalText: 'Account found and verification required',
    //   });
    //   setTimeout(() => {
    //     this.setState({errorModalVisible: false});
    //   }, 10000);
    // }
    this.setState({resendTimer: 60});

    this.interval = setInterval(
      () =>
        this.setState((prevState) => ({
          resendTimer: prevState.resendTimer - 1,
        })),
      1000,
    );
  }

  closeErrorModal = () => this.setState({errorModalVisible: false});

  onResend = () => {
    const {t} = this.props
    this.setState({resendLoading: true});

    resendOTP({
      token: this.props.route.params?.token,
    })
      .then((response) => {
        this.setState({
          confirmationModalText: t('otpVerification.otpSentToEmail'),
          confirmationModalVisible: true,
          resendLoading: false,
          resendTimer: 60,
        });
      })
      .catch((error) => {
        if (error.response.data) {
          console.error('errMessage', error.response.data.message);
        } else {
          console.error('error in testing >>', error);
        }
      });
  };

  closeConfirmationDialog = () => {
    this.setState({confirmationModalVisible: false});
  };

  componentDidUpdate() {
    if (this.state.resendTimer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {t} = this.props;
    const {
      input1,
      input2,
      input3,
      input4,
      errorModalVisible,
      errorModalText,
      error,
      isLoading,
      confirmationModalText,
      confirmationModalVisible,
    } = this.state;
    const {ref_input1, ref_input2, ref_input3, ref_input4} = this;

    return (
      <Container style={styles.container}>
        <View style={styles.upperHalf}>
          <FastImage
            style={styles.createAccountImage}
            source={require('src/assets/images/create.png')}
          />
          <Text style={styles.becomeText}>
            {t('otpVerification.bannerText')}
          </Text>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </View>
        <Text style={styles.createAccountText}>
          {t('otpVerification.createAccount')}
        </Text>
        <Text style={styles.enterOtpText}>{t('otpVerification.enterOtp')}</Text>
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.input}
            autoFocus={true}
            maxLength={1}
            keyboardType="number-pad"
            value={input1}
            onChangeText={(input1) => {
              this.setState({input1});
              input1.length && ref_input2.current.focus();
            }}
            ref={ref_input1}
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="number-pad"
            value={input2}
            onChangeText={(input2) => {
              this.setState({input2});
              input2.length && ref_input3.current.focus();
            }}
            ref={ref_input2}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' &&
              !input2.length &&
              ref_input1.current.focus()
            }
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="number-pad"
            value={input3}
            onChangeText={(input3) => {
              this.setState({input3});
              input3.length && ref_input4.current.focus();
            }}
            ref={ref_input3}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' &&
              !input3.length &&
              ref_input2.current.focus()
            }
          />
          <TextInput
            style={styles.input}
            maxLength={1}
            keyboardType="number-pad"
            value={input4}
            onChangeText={(input4) => this.setState({input4})}
            ref={ref_input4}
            onKeyPress={(e) =>
              e.nativeEvent.key === 'Backspace' &&
              !input4.length &&
              ref_input3.current.focus()
            }
          />
        </View>
        {error.length >= 0 && (
          <ErrorText text={error} style={{marginStart: 20}} />
        )}

        <CustomButton
          disabled={this.state.resendLoading || this.state.resendTimer !== 0}
          handlePress={this.onResend}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={
              this.state.resendTimer !== 0
                ? [
                    styles.resend,
                    {color: colors.appGray, textDecorationLine: 'none'},
                  ]
                : styles.resend
            }>
            {t('otpVerification.resendOtp')}{' '}
          </Text>
          {this.state.resendLoading == true && (
            <ActivityIndicator
              size={14}
              style={{marginStart: 2}}
              color={colors.appGreen}
            />
          )}
          {this.state.resendTimer !== 0 && (
            <Text
              style={{
                color: colors.appGray,
                marginTop: -1,
              }}>{`(${this.state.resendTimer})`}</Text>
          )}
        </CustomButton>
        <CustomButton
          isLoading={isLoading}
          style={styles.verifyButton}
          mode={1}
          handlePress={this.verifyOTP}>
          <Text style={styles.verifyText}>{t('otpVerification.verify')}</Text>
        </CustomButton>
        {errorModalVisible === true && (
          <ErrorDialog
            title={errorModalText}
            modalVisible={this.state.errorModalVisible}
            onClose={this.closeErrorModal}
          />
        )}
        <ConfirmationDialog
          message={confirmationModalText}
          modalVisible={confirmationModalVisible}
          onClose={this.closeConfirmationDialog}
        />
      </Container>
    );
  }
}

export default withTranslation()(OtpVerification);
