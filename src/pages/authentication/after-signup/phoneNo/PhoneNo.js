import {StackActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import * as RNLocalize from 'react-native-localize';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {fetchCountriesList, sendOtp} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './PhoneNo.styles';

class PhoneNo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {name: 'India', callingCode: ['']},
      cca2: 'US',
      showCountryPicker: false,
      phoneNo: '',
      phoneError: '',
      loading: false,
    };
  }

  checkValidation = () => {
    const {phoneNo, country} = this.state;
    const {profileData} = this.props;
    if (phoneNo === '')
      this.setState({phoneError: i18n.t('asPhoneNo.mobileFieldRequired')});
    // else if (phoneNo.length < 9 || phoneNo.length > 11)
    //   this.setState({phoneError: 'Enter vailid mobile number.'});
    else if (
      phoneNo === profileData?.phone &&
      profileData?.country_obj?.phonecode == country?.callingCode[0]
    ) {
      this.props.navigation.dispatch(StackActions.replace('Tabs'));
      this.setState({phoneError: ''});
    } else {
      this.setState({phoneError: ''});

      this.onNext();
    }
  };
  onNext = () => {
    this.setState({loading: true});
    const {country, phoneNo} = this.state;
    let verify = country.callingCode[0] + ' ' + phoneNo;
    // this.props.dispatch(LOADER(true));
    sendOtp({
      token: this.props.token,
      data: {
        otp_type: 'mobile_verification',
        verify: verify,
      },
    })
      .then((res) => {
        this.props.dispatch(LOADER(false));
        this.props.navigation.navigate('OtpVerification', {
          verify: verify,
          type: 'mobile',
          phone: this.state.phoneNo,
        });
      })
      .catch((err) => {
        this.props.dispatch(LOADER(false));
        console.log('error on send otp', err?.response?.data);
        if (err?.response?.data) {
          if (err?.response?.data?.message?.length > 0) {
            this.setState({phoneError: err.response.data.message});
          }
        }
      })
      .finally(() => this.setState({loading: false}));
  };
  componentDidMount() {
    const {profileData} = this.props;
    this.setState({phoneNo: profileData?.phone ? profileData.phone : ''});
    if (profileData?.country_obj) {
      this.setState({
        cca2: profileData?.country_obj?.iso,
        phonecode: profileData?.country_obj?.phonecode,
        country: {
          name: profileData?.country_obj?.name,
          callingCode: [profileData?.country_obj?.phonecode],
        },
      });
    } else {
      this.setState({cca2: RNLocalize.getCountry()});

      console.log('profile', profileData);
      fetchCountriesList({search: ''})
        .then((countries) => {
          countries.data.data.country_list?.map((data, i) => {
            if (RNLocalize?.getCountry() === data?.iso) {
              // console.log('data', data);
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
  }
  onSkip = () => {
    this.props.navigation.dispatch(StackActions.replace('Tabs'));
  };
  render() {
    const {showCountryPicker, cca2, phoneNo, phoneError, country} = this.state;
    console.log('country', country);
    return (
      <>
        <Header
          backButton={true}
          navigation={this.props.navigation}
          title={i18n.t('asPhoneNo.mobile')}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.headng}>{i18n.t('asPhoneNo.addMobile')}</Text>
            <View style={styles.inputContainer}>
              <>
                {/* <Text style={styles.label}>Enter Mobile Number</Text> */}

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
                      keyboardType="number-pad"
                      style={styles.phoneInput}
                      placeholder={'Mobile Number'}
                      returnKeyType="done"
                    />
                  </View>
                  {phoneError.length > 0 && (
                    <ErrorText
                      text={phoneError}
                      style={{marginHorizontal: 20}}
                    />
                  )}
                </View>
              </>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {this.props.profileData?.phone ? (
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              marginBottom: 60,
            }}>
            {/* <TouchableOpacity
              style={[styles.submitButton, {backgroundColor: colors.skyBlue}]}
              onPress={this.onSkip}>
              <Text style={styles.submitText}>{`Next`}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.checkValidation}>
              {!this.state.loading ? (
                <Text style={styles.submitText}>{`Submit & Next`}</Text>
              ) : (
                <ActivityIndicator size="small" color={colors.defaultWhite} />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.checkValidation}>
            {!this.state.loading ? (
              <Text style={styles.submitText}>{`Submit & Next`}</Text>
            ) : (
              <ActivityIndicator size="small" color={colors.defaultWhite} />
            )}
          </TouchableOpacity>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user?.token,
  loading: state.myReducer?.loading,
  profileData: state.myReducer.user.freelancer_profile,
});
export default connect(mapStateToProps)(PhoneNo);
