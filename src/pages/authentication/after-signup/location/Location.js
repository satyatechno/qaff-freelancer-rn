import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {IS_PROFILE_COMPLETED, LOADER, UPDATE_USER} from 'src/actions/action';
import CityContainer from 'src/components/city/CityContainer';
import Countries from 'src/components/countries/Countries';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';
import {updateProfile} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Location.styles';

const Location = ({navigation, route}) => {
  const [countryError, setCountryError] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [cityError, setCityError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    id: 194,
    name: 'Saudi Arabia',
    iso: 'SA',
    iso3: 'SAU',
    phonecode: '966',
    flag: 'https://dev.qaff.com/back-dev/images/flags/sa.svg',
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [city, setCity] = useState(null);

  const rbSheetRef = useRef();
  const cityRbSheet = useRef();

  const {t} = useTranslation();
  const token = useSelector((state) => state.myReducer.user?.token);
  // const loading = useSelector((state) => state.myReducer.loading);
  const first_name = useSelector(
    (state) => state.myReducer.user?.freelancer_profile?.first_name,
  );
  const last_name = useSelector(
    (state) => state.myReducer.user?.freelancer_profile?.last_name,
  );
  const freelancer_profile = useSelector(
    (state) => state.myReducer.user?.freelancer_profile,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (freelancer_profile?.country?.length) {
      setCountry(freelancer_profile?.country_obj);
      setCity(freelancer_profile?.city_obj);
    }
  }, []);

  let controller;

  const handleCountrySelect = (country) => {
    setCountry(country);
    setCity(null);
    rbSheetRef.current?.close();
  };
  const handleCitySelect = (city) => {
    setCity(city);
    cityRbSheet.current?.close();
  };

  const handleCountrySearch = (text) => {
    setCountrySearch(text);
  };
  const handleCitySearch = (text) => {
    setCitySearch(text);
  };

  const updateLocation = () => {
    if (country == null || city == null) {
      if (country == null) {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (city == null) {
        setCityError(true);
      } else {
        setCityError(false);
      }
    } else {
      setLoading(true);
      const fd = new FormData();

      fd.append('first_name', first_name);

      fd.append('last_name', last_name);
      fd.append('city_id', city?.id);
      fd.append('country_id', country?.id);
      fd.append('language', 'en');

      updateProfile({data: fd, token: token})
        .then((res) => {
          dispatch(LOADER(false));

          Snackbar.show({
            text: i18n.t('asLocation.locationAdded'),
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.appViolet,
          });
          // console.log('daattaaa', res?.data?.data);
          dispatch(UPDATE_USER(res.data.data.profile));
          dispatch(
            IS_PROFILE_COMPLETED(
              res?.data?.data?.profile?.is_profile_completed,
            ),
          );
          navigation.navigate('PhoneNo');
        })
        .catch((error) => {
          dispatch(LOADER(false));

          console.log('err', error);
          console.log('errdata', error?.response?.data);
          console.log('errmsg', error?.response?.data?.message);
          if (error?.response?.data?.message?.length > 0) {
            Snackbar.show({
              text: error.response.data.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.appRed,
            });
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <Header
        backButton={true}
        navigation={navigation}
        title={i18n.t('asLocation.location')}
      />

      <View style={{flex: 1}}>
        <Text style={styles.addSchoolText}>
          {i18n.t('asLocation.addCurrLocation')}
        </Text>
        <Text style={styles.countryText}>{i18n.t('asLocation.country')}</Text>

        {/* <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.defaultWhite,
            elevation: 2,
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate('SelectCountry')}>
          <Text style={{flex: 1, color: colors.appBlack}}>
            {route?.params?.country?.value.length
              ? route?.params?.country?.name
              : freelancer_profile?.country.length
              ? freelancer_profile?.country
              : 'Select Country'}
          </Text>
          <Icon name="arrow-next" color={colors.skyBlue} size={18} />
        </TouchableOpacity> */}
        <TouchableOpacity
          disabled
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.defaultWhite,
            elevation: 2,
            marginHorizontal: 10,
          }}
          onPress={() => rbSheetRef.current?.open()}>
          <Text style={{flex: 1, color: colors.appBlack, textAlign: 'left'}}>
            {country?.name ?? 'Select a Country'}
          </Text>
          <Icon
            name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
            color={colors.skyBlue}
            size={18}
          />
        </TouchableOpacity>
        {countryError && (
          <ErrorText text="Required" style={{marginHorizontal: 10}} />
        )}
        <Text style={styles.cityText}>City</Text>
        <TouchableOpacity
          disabled={!country?.name}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.defaultWhite,
            elevation: 2,
            marginHorizontal: 10,
          }}
          onPress={() => cityRbSheet.current?.open()}>
          <Text style={{flex: 1, color: colors.appBlack}}>
            {city?.name ?? 'Select a City'}
          </Text>
          <Icon name="arrow-next" color={colors.skyBlue} size={18} />
        </TouchableOpacity>
        {cityError && (
          <ErrorText text="Required" style={{marginHorizontal: 10}} />
        )}
      </View>
      <View
        style={{
          marginBottom: 60,
        }}>
        {/* <TouchableOpacity
          style={[styles.submitButton, {backgroundColor: colors.skyBlue}]}
          onPress={() => {
            navigation.navigate('PhoneNo');
          }}>
          <Text style={styles.submitText}>{`Skip this Step`}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.submitButton} onPress={updateLocation}>
          {!loading ? (
            <Text style={styles.submitText}>
              {i18n.t('asLocation.submitAndNext')}
            </Text>
          ) : (
            <ActivityIndicator size={30} color={colors.defaultWhite} />
          )}
        </TouchableOpacity>
      </View>
      <RBSheet
        closeOnDragDown
        closeOnPressBack
        closeDuration={10}
        closeOnPressMask
        children={
          <Countries search={countrySearch}>
            {(isCountriesLoading, countries) => (
              <ShowCountries
                handleCountrySearch={handleCountrySearch}
                countrySearch={countrySearch}
                loading={isCountriesLoading}
                countries={countries}
                handleCountrySelect={handleCountrySelect}
              />
            )}
          </Countries>
        }
        animationType="slide"
        // onClose={this.closeDatePicker}
        ref={rbSheetRef}
        height={350}
        openDuration={100}
      />
      <RBSheet
        closeOnDragDown
        closeOnPressBack
        closeDuration={0}
        closeOnPressMask
        children={
          <CityContainer search={citySearch} countryId={country?.id}>
            {(loading, error, cities) => (
              <ShowCities
                handleCitySearch={handleCitySearch}
                citySearch={citySearch}
                loading={loading}
                cities={cities}
                handleCitySelect={handleCitySelect}
                error={error}
              />
            )}
          </CityContainer>
        }
        animationType="slide"
        // onClose={this.closeDatePicker}
        ref={cityRbSheet}
        height={350}
        openDuration={100}
      />
    </>
  );
};

export default Location;
