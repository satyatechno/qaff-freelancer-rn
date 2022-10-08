import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {MODAL_VISIBLE, UPDATE_USER} from 'src/actions/action';
import CityContainer from 'src/components/city/CityContainer';
import Countries from 'src/components/countries/Countries';
import Header from 'src/components/header/Header';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import {Icon} from 'src/Icon';
import {updateProfile} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Location.styles';

const Location = ({navigation, route}) => {
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
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  const token = useSelector((state) => state.myReducer.user?.token);
  // const loading = useSelector((state) => state.myReducer.loading);
  const dispatch = useDispatch();
  const rbSheetRef = useRef();
  const cityRbSheet = useRef();

  const handleCountrySelect = (country) => {
    setCountry(country);
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
    if (!country?.name?.length || !city?.name.length) {
      alert(t('editProfile.pleaseFill'));
    } else {
      setIsLoading(true);
      const fd = new FormData();

      fd.append('first_name', route.params?.firstName);

      fd.append('last_name', route.params?.lastName);
      fd.append('city_id', city?.id);
      fd.append('country_id', country?.id);
      fd.append('language', 'en');

      updateProfile({data: fd, token: token})
        .then((res) => {
          console.log(' 🍗', JSON.stringify(res.data?.data?.profile, null, 2));
          dispatch(UPDATE_USER(res.data.data.profile));

          setIsLoading(false);
          navigation.navigate('EditPersonalInfo');
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
        })
        .catch((error) => {
          console.log('err', error);
          console.log('errdata', error?.response?.data);
          console.log('errmsg', error?.response?.data?.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Header
        backButton={true}
        navigation={navigation}
        title={t('editProfile.editProfile')}
        notificationButton={true}
      />

      <>
        <Text style={styles.countryText}>{t('editProfile.country')}</Text>

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
          <Text style={{flex: 1, color: colors.appBlack}}>
            {country?.name ?? t('editProfile.selectCountry')}
          </Text>
          <Icon name="arrow-next" color={colors.skyBlue} size={18} />
        </TouchableOpacity>
        <Text style={styles.cityText}>{t('editProfile.city')}</Text>
        {/* <TextInput
          style={styles.cityInput}
          onChangeText={(text) => setCityInput(text)}
        /> */}
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
            {city?.name ?? t('editProfile.selectCity')}
          </Text>
          <Icon name="arrow-next" color={colors.skyBlue} size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={updateLocation}
          style={styles.updateProfileButton}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.defaultWhite} />
          ) : (
            <Text style={styles.updateProfileText}>
              {t('editProfile.updateProfile')}
            </Text>
          )}
        </TouchableOpacity>
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
    </>
  );
};

export default Location;
