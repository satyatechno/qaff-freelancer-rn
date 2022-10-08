import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import * as RNLocalize from 'react-native-localize';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {fetchCountriesList, sendOtp} from 'src/services/http.service';
import styles from './ChangeEmail.styles';

class ChangeEmail extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      country: {name: '', callingCode: ['']},
      cca2: '',
      showCountryPicker: false,
      phoneNo: '',
      emailError: '',
      phoneError: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({cca2: RNLocalize.getCountry()});
    console.log('sdfsf', RNLocalize.getCountry());
    fetchCountriesList({search: ''})
      .then((countries) => {
        countries.data.data.country_list?.map((data, i) => {
          if (RNLocalize?.getCountry() === data?.iso) {
            console.log('data', data);
            this.setState({
              country: {name: data?.name, callingCode: [data?.phonecode]},
            });
          }
        });
      })
      .catch((err) => {
        console.error('Couldnot get countries list', err);
      });
  }
  checkValidation = () => {
    const {country, phoneNo, inputValue} = this.state;
    if (this.props.route?.params?.type === 'email') {
      let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let check = emreg.test(inputValue.toLowerCase());
      if (inputValue === '')
        this.setState({emailError: i18n.t('changeEmail.emailRequired')});
      else if (check === false)
        this.setState({emailError: i18n.t('changeEmail.validEmail')});
      else {
        this.setState({emailError: ''});
        this.onNext();
      }
    } else {
      if (phoneNo === '')
        this.setState({phoneError: i18n.t('changeEmail.mobileRequired')});
      else if (phoneNo.length < 9 || phoneNo.length > 11)
        this.setState({phoneError: i18n.t('changeEmail.validMobile')});
      else {
        this.setState({phoneError: ''});
        this.onNext();
      }
    }
  };
  onNext = () => {
    this.setState({loading: true});
    const {country, phoneNo, inputValue} = this.state;
    let verify = '';
    this.props.route?.params?.type === 'email'
      ? (verify = inputValue)
      : (verify = country.callingCode[0] + ' ' + phoneNo);

    sendOtp({
      token: this.props.token,
      data: {
        otp_type:
          this.props.route?.params?.type === 'email'
            ? 'email_verification'
            : 'mobile_verification',
        verify: verify,
      },
    })
      .then((res) => {
        this.props.dispatch(LOADER(false));
        this.props.navigation.navigate('OtpVerification', {
          verify: verify,
          type: this.props.route?.params?.type,
        });
      })
      .catch((err) => {
        this.props.dispatch(LOADER(false));
        console.log('error on send otp', err?.response?.data);
        if (err?.response?.data) {
          if (this.props.route?.params?.type === 'email') {
            this.setState({emailError: err.response.data.message});
          } else if (this.props.route?.params?.type === 'mobile') {
            this.setState({phoneError: err.response.data.message});
          } else {
            this.setState({emailError: '', phoneError: ''});
          }
        }
      })
      .finally(() => this.setState({loading: false}));
  };
  render() {
    const {
      showCountryPicker,
      cca2,
      country,
      phoneNo,
      emailError,
      phoneError,
      loading,
    } = this.state;
    console.log('country', country);
    return (
      <>
        <Header
          backButton={true}
          navigation={this.props.navigation}
          title={i18n.t('changeEmail.editProfile')}
          notificationButton={true}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.headng}>
              {i18n.t('changeEmail.updateYour')}{' '}
              {this.props.route?.params?.type === 'email'
                ? i18n.t('changeEmail.emailAddress')
                : i18n.t('changeEmail.mobileNumber')}
            </Text>
            <View style={styles.inputContainer}>
              <>
                <Text style={styles.label}>
                  {i18n.t('changeEmail.enterNew')}{' '}
                  {this.props.route?.params?.type === 'email'
                    ? i18n.t('changeEmail.emailAddress')
                    : i18n.t('changeEmail.mobileNumber')}
                </Text>
                {this.props.route?.params?.type === 'email' ? (
                  <View>
                    <TextInput
                      value={this.state.inputValue}
                      onChangeText={(text) => {
                        this.setState({inputValue: text});
                      }}
                      style={styles.input}
                      keyboardType={
                        this.props.route?.params?.type === 'email'
                          ? 'email-address'
                          : 'number-pad'
                      }
                    />
                    {emailError.length > 0 && (
                      <ErrorText
                        style={{marginHorizontal: 20}}
                        text={emailError}
                      />
                    )}
                  </View>
                ) : (
                  <View>
                    <View style={[styles.phoneContainer]}>
                      <View style={styles.countryPicker}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({showCountryPicker: true})
                          }>
                          <CountryPicker
                            countryCode={cca2}
                            onSelect={(value) =>
                              this.setState({
                                country: value,
                                cca2: value.cca2,
                              })
                            }
                            cca2={cca2}
                            withFlagButton={true}
                            withCallingCodeButton={true}
                            withFilter={true}
                            withAlphaFilter={true}
                            visible={showCountryPicker}
                            onClose={() =>
                              this.setState({showCountryPicker: false})
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        value={phoneNo}
                        onChangeText={(text) => this.setState({phoneNo: text})}
                        style={styles.phoneInput}
                        placeholder={i18n.t('changeEmail.mobileNumber')}
                      />
                    </View>
                    {phoneError.length > 0 && (
                      <ErrorText
                        text={phoneError}
                        style={{marginHorizontal: 20}}
                      />
                    )}
                  </View>
                )}
              </>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                width: '90%',
                marginHorizontal: 20,
              }}>
              <CustomButton
                handlePress={this.checkValidation}
                isLoading={loading}
                mode={1}>
                <Text style={styles.buttonText}>
                  {i18n.t('changeEmail.next')}
                </Text>
              </CustomButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user?.token,
  loading: state.myReducer?.loading,
});
export default connect(mapStateToProps)(ChangeEmail);
