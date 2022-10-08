import React, {Component, createRef} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './RecoverOtpVerification.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {withTranslation} from 'react-i18next';
import ErrorDialog from 'src/components/error-dialog/ErrorDialog';
import {
  forgotPassword,
  otpVerification,
  resendOTP,
} from 'src/services/http.service';
import ErrorText from 'src/components/error-text/ErrorText';
import ConfirmationDialog from 'src/components/confirmation-dialog/ConfirmationDialog';
import colors from 'src/styles/texts/colors';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

class RecoverOtpVerification extends Component {
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
      resendLoading: false,
      resendTimer: 0,
    };
    this.ref_input1 = createRef();
    this.ref_input2 = createRef();
    this.ref_input3 = createRef();
    this.ref_input4 = createRef();
  }

  componentDidMount() {
    this.setState({resendTimer: 60});

    this.interval = setInterval(
      () =>
        this.setState((prevState) => ({
          resendTimer: prevState.resendTimer - 1,
        })),
      1000,
    );
  }
  componentDidUpdate() {
    if (this.state.resendTimer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  verifyOTP = () => {
    const {input1, input2, input3, input4, error} = this.state;
    const {t} = this.props;
    if (input1 === '' || input2 === '' || input3 === '' || input4 === '')
      this.setState({error: t('recoverOtpVerification.otpRequired')});
    else this.setState({error: ''});
    console.log('eerlen', error);
    if (error.length === 0) {
      this.setState({isLoading: true});
      let otp = input1 + input2 + input3 + input4;
      otpVerification({otp: otp, email: this.props.route.params?.email})
        .then((response) => {
          this.setState({isLoading: false});
          console.log('res', response);
          this.props.navigation.navigate('CreateNewPassword', {
            otp: otp,
            email: this.props.route.params?.email,
          });
        })
        .catch((err) => {
          this.setState({isLoading: false});
          if (err?.response?.data) {
            // console.log("gaaaa", err.response.data)
            if (err?.response?.data?.message?.length > 0 && otp?.length === 4) {
              this.setState({
                errorModalText: t('recoverOtpVerification.incorrectOtp'),
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

  closeErrorModal = () => this.setState({errorModalVisible: false});

  onResend = () => {
    this.setState({resendLoading: true});
    forgotPassword({
      email: this.props.route.params?.email,
    })
      .then((response) => {
        // console.log('res', response.data);
        this.setState({
          resendLoading: false,
          confirmationModalText: response?.data?.message,
          confirmationModalVisible: true,
          resendTimer: 60,
        });
        this.interval = setInterval(
          () =>
            this.setState((prevState) => ({
              resendTimer: prevState.resendTimer - 1,
            })),
          1000,
        );
      })
      .catch((error) => {
        this.setState({resendLoading: false});
        if (error?.response?.data) {
          console.error('errMessage', error?.response?.data?.message);
        } else {
          console.error('error in testing >>', error);
        }
      });
  };

  closeConfirmationDialog = () => {
    this.setState({confirmationModalVisible: false});
  };

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
          <LottieView
            style={styles.createAccountImage}
            source={require('src/assets/lottie-animation/global.json')}
            autoPlay
            loop
          />
          <Text style={styles.becomeText}>
            {t('recoverOtpVerification.bannerText')}
          </Text>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </View>
        <Text style={styles.createAccountText}>
          {t('recoverOtpVerification.recoverPassword')}
        </Text>
        <Text style={styles.enterOtpText}>
          {t('recoverOtpVerification.enterOtp')}
        </Text>
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

        <TouchableOpacity
          disabled={this.state.resendLoading || this.state.resendTimer !== 0}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={this.onResend}>
          <Text
            style={
              this.state.resendTimer !== 0
                ? [
                    styles.resend,
                    {color: colors.appGray, textDecorationLine: 'none'},
                  ]
                : styles.resend
            }>
            {t('recoverOtpVerification.resendOtp')}{' '}
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
        </TouchableOpacity>
        <CustomButton
          isLoading={isLoading}
          style={styles.verifyButton}
          mode={1}
          handlePress={this.verifyOTP}>
          <Text style={styles.verifyText}>
            {t('recoverOtpVerification.verify')}
          </Text>
        </CustomButton>
        {/* {errorModalVisible === true && ( */}
        <ErrorDialog
          title={errorModalText}
          modalVisible={this.state.errorModalVisible}
          onClose={this.closeErrorModal}
        />
        {/* )} */}
        <ConfirmationDialog
          message={confirmationModalText}
          modalVisible={confirmationModalVisible}
          onClose={this.closeConfirmationDialog}
        />
      </Container>
    );
  }
}

export default withTranslation()(RecoverOtpVerification);
