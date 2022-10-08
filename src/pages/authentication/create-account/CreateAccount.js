import React, {Component, createRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './CreateAccount.styles';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import {withTranslation} from 'react-i18next';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';

import {register} from 'src/services/http.service';
import ErrorText from 'src/components/error-text/ErrorText';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import Countries from 'src/components/countries/Countries';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import CityContainer from 'src/components/city/CityContainer';
import ShowCities from 'src/components/show-cities/ShowCities';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      error: '',
      isLoading: false,
      country: {id: 194,
      name: "Saudi Arabia",
      iso: "SA",
      iso3: "SAU",
      phonecode: "966",
      flag: "https://dev.qaff.com/back-dev/images/flags/sa.svg"},
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
    const {email, firstName, lastName, error, city, country} = this.state;
    const {t} = this.props
    let emreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailError = '';
    let firstNameError = '';
    let lastNameError = '';
    let cityError = '';
    let countryError = '';
    if (!email.length) {
      emailError = [t('createAccount.emailRequired')];
    } else if (!emreg.test(email)) {
      emailError = [t('createAccount.validEmail')];
    } else {
      emailError = [];
    }
    if (!firstName.length) {
      firstNameError = [t('createAccount.required')];
    } else {
      firstNameError = [];
    }
    if (!lastName.length) {
      lastNameError = [t('createAccount.required')];
    } else {
      lastNameError = [];
    }
    if (!city) {
      cityError = t('createAccount.selectCity')
    } else {
      cityError = '';
    }

    if (!country) {
      countryError = t('createAccount.selectCountry');
    } else {
      countryError = '';
    }

    if (
      emailError.length ||
      firstNameError.length ||
      lastNameError.length ||
      cityError.length ||
      countryError.length
    ) {
      this.setState({
        error: {
          ...error,
          email: emailError,
          first_name: firstNameError,
          last_name: lastNameError,
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
      const {firstName, lastName, email, gender, city, country} = this.state;
      this.setState({isLoading: true});
      register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
        country_id: country?.id,
        city_id: city?.id,
      })
        .then((response) => {
          this.setState({isLoading: false});
          this.props.navigation.navigate('OtpVerification', {
            token: response.data.data.token,
          });
        })
        .catch((err) => {
          this.setState({isLoading: false});

          if (err?.response?.data) {
            if (
              email.length > 0 &&
              err?.response?.data?.errors
                ?.account_found_nd_verification_required === true
            ) {
              this.props.navigation.navigate('OtpVerification', {
                token: err?.response?.data?.data?.token,
                account_found: true,
              });
            }

            this.setState({error: err?.response?.data?.errors});
          } else {
            console.error(err);
          }
        });
    }
  };

  render() {
    const {t, navigation} = this.props;
    const {firstName, lastName, gender, email, error, isLoading} = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.upperHalf}>
          <FastImage
            style={styles.createAccountImage}
            source={require('src/assets/images/create.png')}
          />
          <Text style={styles.becomeText}>{t('createAccount.bannerText')}</Text>
          <FastImage
            style={styles.logo}
            source={require('src/assets/images/Logo.png')}
          />
        </View>
        <Text style={styles.createAccountText}>
          {t('createAccount.createAccount')}
        </Text>
        <View style={styles.nameContainer}>
          <View style={{width: '45%', marginEnd: 20}}>
            <Text style={styles.fnameText}>{t('createAccount.firstName')}</Text>
            <CustomInput
              style={[
                styles.input,
                error.first_name?.length && {borderColor: colors.appRed},
              ]}
              value={firstName}
              handleChange={(firstName) => this.setState({firstName})}
              isClass={true}
              autoCaptalize="words"
            />

            {error.first_name && <ErrorText text={error.first_name[0]} />}
          </View>
          <View style={{width: '45%'}}>
            <Text style={styles.fnameText}>{t('createAccount.lastName')}</Text>
            <CustomInput
              style={[
                styles.input,
                error.last_name?.length && {borderColor: colors.appRed},
              ]}
              value={lastName}
              handleChange={(lastName) => this.setState({lastName})}
              isClass={true}
            />

            {error.last_name && <ErrorText text={error.last_name[0]} />}
          </View>
        </View>

        <Text style={styles.genderText}>{t('createAccount.gender')}</Text>
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
                size={18}
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
                size={18}
                color={colors.defaultWhite}
                style={styles.checkIcon}
              />
            )}
          </CustomButton>
        </View>

        <Text style={styles.emailText}>{t('createAccount.email')}</Text>
        <CustomInput
          isEmail={true}
          value={email}
          isClass={true}
          handleChange={(email) => this.setState({email})}
          style={[
            styles.emailInput,
            error.email?.length && {borderColor: colors.appRed},
          ]}
          autoCapitalize="none"
        />

        {error.email && (
          <ErrorText style={{marginStart: 20}} text={error.email[0]} />
        )}
        <Text style={[styles.emailText, {marginTop: 10}]}>Country</Text>

        <TouchableOpacity
        disabled={true}
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
            {this.state.country?.name ?? 'Select a country'}
          </Text>
        </TouchableOpacity>
        {error?.country ? (
          <ErrorText text={error.country} style={{marginStart: 20}} />
        ) : null}

        <Text style={[styles.emailText, {marginTop: 10}]}>City</Text>

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
            {this.state.city?.name ?? 'Select a city'}
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
          <Text style={styles.nextButtonText}>{t('createAccount.next')}</Text>
          <Ionicons
            name="checkmark-outline"
            color={colors.defaultWhite}
            size={25}
          />
        </CustomButton>
        <View style={styles.footer}>
          <Text style={styles.footerLeftText}>
            {t('createAccount.already')}
          </Text>

          <CustomButton handlePress={() => navigation.navigate('Login')}>
            <Text style={styles.footerRightText}>
              {t('createAccount.signIn')}
            </Text>
          </CustomButton>
        </View>
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
      </Container>
    );
  }
}

export default withTranslation()(CreateAccount);
