import {StackActions} from '@react-navigation/native';
import React, {Component, createRef} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {FETCH_PROFILE, USER_ACTION} from 'src/actions/action';
import {FETCH_NOTIFICATIONS} from 'src/actions/notification';
import CustomButton from 'src/components/button/CustomButton';
import CityContainer from 'src/components/city/CityContainer';
import Container from 'src/components/container/Container';
import Countries from 'src/components/countries/Countries';
import ErrorText from 'src/components/error-text/ErrorText';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import {createClientProfile} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './CreateProfile.styles';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      gender: 'male',
      email: '',
      error: '',
      isLoading: false,
      country: {
        id: 194,
        name: 'Saudi Arabia',
        iso: 'SA',
        iso3: 'SAU',
        phonecode: '966',
        flag: 'https://dev.qaff.com/back-dev/images/flags/sa.svg',
      },
      countrySearch: '',
      citySearch: '',
      city: null,
    };
    this.RBSheet = createRef();
    this.cityRbSheet = createRef();
  }
  handleCountrySelect = (country) => {
    this.setState({country});
    this.RBSheet.close();
  };
  handleCitySelect = (city) => {
    this.setState({city});
    this.cityRbSheet.close();
  };

  handleCountrySearch = (text) => {
    this.setState({countrySearch: text});
  };
  handleCitySearch = (text) => {
    this.setState({citySearch: text});
  };
  validate = () => {
    const {error, city, country} = this.state;
    const {t} = this.props

    let cityError = '';
    let countryError = '';

    if (!city) {
      cityError = t('createProfile.pleaseSelectCity');
    } else {
      cityError = '';
    }

    if (!country) {
      countryError = t('createProfile.pleaseSelectCountry')
    } else {
      countryError = '';
    }

    if (cityError.length || countryError.length) {
      this.setState({
        error: {
          ...error,

          city: cityError,
          country: countryError,
        },
      });

      return false;
    }
    return true;
  };
  createAccount = () => {
    const isValid = this.validate();
    if (isValid) {
      this.setState({isLoading: true});
      const {route} = this.props;
      createClientProfile({
        data: {
          first_name:
            this.state.firstName !== null
              ? this.state.firstName
              : route.params?.client_first_name,
          last_name:
            this.state.lastName !== null
              ? this.state.lastName
              : route.params?.client_last_name,
          gender: this.state.gender,
          country_id: this.state.country?.id,
          city_id: this.stacity?.id,
        },
        token: route.params?.token,
      })
        .then((response) => {
          this.setState({isLoading: false});
          this.props.dispatch(USER_ACTION(response.data.data));
          this.props.dispatch(FETCH_PROFILE());
          this.props.dispatch(FETCH_NOTIFICATIONS());
          this.props.navigation.dispatch(StackActions.replace('Tabs'));
        })
        .catch((err) => {
          this.setState({isLoading: false});

          console.error('create client profile error', err);
        });
    }
  };

  render() {
    const {t, navigation, route} = this.props;
    const {firstName, lastName, gender, email, error, isLoading} = this.state;
    return (
      <>
        <Container style={styles.container}>
          <View style={styles.upperHalf}>
            <FastImage
              style={styles.createAccountImage}
              source={require('src/assets/images/create.png')}
            />
            <Text style={styles.becomeText}>
             {t('createProfile.becomeIndependent')}
            </Text>
            <FastImage
              style={styles.logo}
              source={require('src/assets/images/Logo.png')}
            />
          </View>
          <Text style={styles.createAccountText}>{t('createProfile.createProfile')}</Text>
          <View style={styles.nameContainer}>
            <View style={{width: '45%', marginEnd: 20}}>
              <Text style={styles.fnameText}>{t('createProfile.firstName')}</Text>
              <CustomInput
                style={styles.input}
                value={
                  firstName !== null
                    ? firstName
                    : route.params?.client_first_name
                }
                handleChange={(firstName) => this.setState({firstName})}
                isClass={true}
              />

              {error.first_name && <ErrorText text={error.first_name[0]} />}
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.fnameText}>{t('createProfile.lastName')}</Text>
              <CustomInput
                style={styles.input}
                value={
                  lastName !== null ? lastName : route.params?.client_last_name
                }
                handleChange={(lastName) => this.setState({lastName})}
                isClass={true}
              />

              {error.last_name && <ErrorText text={error.last_name[0]} />}
            </View>
          </View>

          <Text style={styles.genderText}>{t('createProfile.gender')}</Text>
          <View style={styles.genderTypeContainer}>
            <CustomButton handlePress={() => this.setState({gender: 'male'})}>
              <View style={styles.genderBox}>
                <FastImage
                  style={styles.genderImage}
                  source={require('./images/Male.png')}
                />
              </View>
              {gender === 'male' && (
                <Ionicons
                  name="checkmark"
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
              )}
            </CustomButton>
            <CustomButton handlePress={() => this.setState({gender: 'female'})}>
              <View style={styles.genderBox}>
                <FastImage
                  style={styles.genderImage}
                  source={require('./images/Female.png')}
                />
              </View>
              {gender === 'female' && (
                <Ionicons
                  name="checkmark"
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
              )}
            </CustomButton>
          </View>

          <Text style={styles.emailText}>{t('createProfile.email')}</Text>
          <CustomInput
            editable={false}
            isEmail={true}
            value={route.params?.client_email}
            isClass={true}
            handleChange={(email) => this.setState({email})}
            style={styles.emailInput}
          />
          <Text style={[styles.emailText, {marginTop: 10}]}>{t('createProfile.country')}</Text>

          <TouchableOpacity
            disabled
            delayPressIn={0}
            delayPressOut={0}
            onPress={() => this.RBSheet.open()}
            activeOpacity={0.5}
            style={{
              marginHorizontal: 20,
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: colors.appBackground,
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: colors.skyBlue,
            }}>
            <Text style={{fontSize: 16, color: colors.appBlack}}>
              {this.state.country?.name ?? t('createProfile.selectCountry')}
            </Text>
          </TouchableOpacity>
          {error?.country ? (
            <ErrorText text={error.country} style={{marginStart: 20}} />
          ) : null}

          <Text style={[styles.emailText, {marginTop: 10}]}>{t('createProfile.city')}</Text>

          <TouchableOpacity
            disabled={!this.state.country}
            delayPressIn={0}
            delayPressOut={0}
            onPress={() => this.cityRbSheet.open()}
            activeOpacity={0.5}
            style={{
              marginHorizontal: 20,
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: !this.state.country
                ? colors.appGray1
                : colors.appBackground,
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: colors.skyBlue,
            }}>
            <Text style={{fontSize: 16, color: colors.appBlack}}>
              {this.state.city?.name ?? t('createProfile.selectCity')}
            </Text>
          </TouchableOpacity>
          {error?.city ? (
            <ErrorText text={error.city} style={{marginStart: 20}} />
          ) : null}
          <CustomButton
            isLoading={isLoading}
            style={styles.nextButton}
            mode={1}
            handlePress={this.createAccount}>
            <Text style={styles.nextButtonText}>{'createProfile.createProfile'}</Text>
            <Ionicons
              name="checkmark-outline"
              color={colors.defaultWhite}
              size={25}
            />
          </CustomButton>
        </Container>
        <RBSheet
          closeOnDragDown
          closeOnPressBack
          closeDuration={10}
          closeOnPressMask
          children={
            <Countries search={this.state.countrySearch}>
              {(isCountriesLoading, countries) => (
                <ShowCountries
                  handleCountrySearch={this.handleCountrySearch}
                  countrySearch={this.state.countrySearch}
                  loading={isCountriesLoading}
                  countries={countries}
                  handleCountrySelect={this.handleCountrySelect}
                />
              )}
            </Countries>
          }
          animationType="slide"
          // onClose={this.closeDatePicker}
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={350}
          openDuration={100}
        />
        <RBSheet
          closeOnDragDown
          closeOnPressBack
          closeDuration={0}
          closeOnPressMask
          children={
            <CityContainer
              search={this.state.citySearch}
              countryId={this.state.country?.id}>
              {(loading, error, cities) => (
                <ShowCities
                  handleCitySearch={this.handleCitySearch}
                  citySearch={this.state.citySearch}
                  loading={loading}
                  cities={cities}
                  handleCitySelect={this.handleCitySelect}
                  error={error}
                />
              )}
            </CityContainer>
          }
          animationType="slide"
          // onClose={this.closeDatePicker}
          ref={(ref) => {
            this.cityRbSheet = ref;
          }}
          height={350}
          openDuration={100}
        />
      </>
    );
  }
}

export default connect()(withTranslation()(CreateProfile));
