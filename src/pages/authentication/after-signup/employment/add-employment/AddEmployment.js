import moment from 'moment';
import React, {Component, createRef} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {IS_PROFILE_COMPLETED, LOADER} from 'src/actions/action';
import {UPDATE_EMPLOYMENT} from 'src/actions/publicProfile';
import CustomButton from 'src/components/button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import {addEmployment} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './AddEmployment.styles';
import Countries from 'src/components/countries/Countries';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import CityContainer from 'src/components/city/CityContainer';
import ShowCities from 'src/components/show-cities/ShowCities';
import i18n from 'src/locale/i18n';

const ATTACHMENT_LIMIT = 20;
class AddEmployment extends Component {
  constructor(props) {
    super();
    this.state = {
      companyName: '',

      description: '',
      fromDate: '',
      toDate: '',
      currentlyWorking: false,
      errorCompanyName: false,
      errorFromDate: false,
      showDatePicker: false,
      dateIndex: 0,
      countries: [],
      isLoading: false,
      loading: false,
      country: null,
      countrySearch: '',
      citySearch: '',
      city: null,
      error: '',
    };
    this.countryRBSheet = createRef();
    this.cityRbSheet = createRef();
  }

  handleCountrySelect = (country) => {
    this.setState({country});
    this.countryRBSheet.close();
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

  openDatePicker = async (i) => {
    await this.setState({
      showDatePicker: !this.state.showDatePicker,
      dateIndex: i,
    });
    if (this.state.showDatePicker) {
      this.RBSheet.open();
    }
  };
  closeDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  };
  onSave = () => {
    const {
      companyName,
      fromDate,
      toDate,
      city,
      description,
      currentlyWorking,
      country,
    } = this.state;
    if (companyName === '' || fromDate === '') {
      if (companyName === '') {
        this.setState({errorCompanyName: true});
      } else {
        this.setState({errorCompanyName: false});
      }
      if (fromDate === '') {
        this.setState({errorFromDate: true});
      } else {
        this.setState({errorFromDate: false});
      }
    } else if (
      moment(fromDate).format('YYYYMMDD') === moment(toDate).format('YYYYMMDD')
    ) {
      Snackbar.show({
        text: i18n.t('asAddEmployment.fromAndToDate'),
        backgroundColor: colors.appRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.setState({loading: true});

      addEmployment({
        token: this.props.token,
        data: {
          company_name: companyName,
          city: city?.name ?? '',
          country: country?.name ?? '',
          from_month_year: moment(fromDate).format('YYYY-MM-DD'),
          to_month_year:
            toDate && !currentlyWorking
              ? moment(toDate).format('YYYY-MM-DD')
              : null,
          description: description,
          currently_working: currentlyWorking,
        },
      })
        .then((res) => {
          console.log('Add Employment', res?.data?.data, null, 2);
          // Snackbar.show({
          //   text: res.data.message,
          //   duration: Snackbar.LENGTH_SHORT,
          //   backgroundColor: colors.appViolet,
          // });
          this.props.dispatch(LOADER(false));
          // this.props.dispatch(FETCH_PROFILE());
          // this.props.dispatch(
          //   UPDATE_PROFILE({
          //     data: res.data?.data?.employment,
          //     modal: false,
          //     navigation: this.props.navigation.navigate('Employment'),
          //   }),
          // );
          this.props.dispatch(
            UPDATE_EMPLOYMENT({
              data: res.data?.data?.employment,
              modal: false,
              navigation: this.props.navigation.navigate('Employment'),
              message: res.data?.message,
              type: 'add',
            }),
          );
          this.props.dispatch(
            IS_PROFILE_COMPLETED(res?.data?.data?.is_profile_completed),
          );
        })
        .catch((err) => {
          this.props.dispatch(LOADER(false));

          if (err.response.data) {
            if (err?.response?.data?.message?.length > 0) {
              Snackbar.show({
                text: err.response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.appRed,
              });
            }
          }
          console.log('error to add Education', err);
        })
        .finally(() => this.setState({loading: false}));
    }
  };

  render() {
    const {error} = this.state;
    if (this.state.isLoading) {
      return (
        <>
          <Header
            backButton
            navigation={this.props.navigation}
            title={i18n.t('asAddEmployment.addEmployment')}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.skyBlue} size="large" />
          </View>
        </>
      );
    }
    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={i18n.t('asAddEmployment.addEmployment')}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <ScrollView style={styles.container}>
            <Text style={styles.label}>
              {i18n.t('asAddEmployment.companyName')}
            </Text>
            <CustomInput
              value={this.state.companyName}
              handleChange={(text) => {
                this.setState({companyName: text});
              }}
              isClass={true}
            />
            {this.state.errorCompanyName && (
              <ErrorText text={i18n.t('asAddEmployment.required')} />
            )}
            <Text style={styles.label}>
              {i18n.t('asAddEmployment.country')}
            </Text>

            {/* <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: colors.defaultWhite,
                elevation: 2,
                // marginHorizontal: 10,
              }}
              onPress={() =>
                this.props.navigation.navigate('SelectEmploymentCountry', {
                  screen: 'AddEmployment',
                })
              }>
              <Text style={{flex: 1, color: colors.appBlack}}>
                {this.props.route?.params?.country?.value.length
                  ? this.props.route?.params?.country?.name
                  : 'Select a Country'}
              </Text>
              <Icon name="arrow-next" color={colors.skyBlue} size={18} />
            </TouchableOpacity> */}
            <TouchableOpacity
              delayPressIn={0}
              delayPressOut={0}
              onPress={() => this.countryRBSheet.open()}
              activeOpacity={0.5}
              style={{
                // marginHorizontal: 20,
                height: 40,
                paddingHorizontal: 10,
                backgroundColor: colors.appBackground,
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: colors.skyBlue,
              }}>
              <Text style={{fontSize: 16, color: colors.appBlack}}>
                {this.state.country?.name ??
                  i18n.t('asAddEmployment.selectCountry')}
              </Text>
            </TouchableOpacity>
            {error?.country ? (
              <ErrorText text={error.country} style={{marginStart: 20}} />
            ) : null}

            <Text style={styles.label}>{i18n.t('asAddEmployment.city')}</Text>
            {/* <CustomInput
              value={this.state.city}
              handleChange={(text) => {
                this.setState({city: text});
              }}
              isClass={true}
            /> */}
            <TouchableOpacity
              disabled={!this.state.country}
              delayPressIn={0}
              delayPressOut={0}
              onPress={() => this.cityRbSheet.open()}
              activeOpacity={0.5}
              style={{
                // marginHorizontal: 20,
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
                {this.state.city?.name ?? i18n.t('asAddEmployment.selectCity')}
              </Text>
            </TouchableOpacity>
            {error?.city ? (
              <ErrorText text={error.city} style={{marginStart: 20}} />
            ) : null}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.label}>
                  {i18n.t('asAddEmployment.fromDate')}
                </Text>
                <TouchableOpacity
                  style={[styles.content]}
                  onPress={() => this.openDatePicker(0)}>
                  <Icon
                    name="calendar"
                    size={18}
                    color={colors.skyBlue}
                    style={{marginEnd: 10}}
                  />
                  <Text>
                    {!this.state.fromDate
                      ? i18n.t('asAddEmployment.selectDate')
                      : moment(this.state.fromDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
                {this.state.errorFromDate && (
                  <ErrorText text={i18n.t('asAddEmployment.required')} />
                )}
              </View>
              {!this.state.currentlyWorking && (
                <View>
                  <Text style={styles.label}>
                    {i18n.t('asAddEmployment.toDate')}
                  </Text>
                  <TouchableOpacity
                    style={[styles.content]}
                    onPress={() => this.openDatePicker(1)}>
                    <Icon
                      name="calendar"
                      size={18}
                      color={colors.skyBlue}
                      style={{marginEnd: 10}}
                    />
                    <Text>
                      {!this.state.toDate
                        ? i18n.t('asAddEmployment.selectDate')
                        : moment(this.state.toDate).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {!this.state.currentlyWorking ? (
                <CustomButton
                  handlePress={() =>
                    this.setState({
                      currentlyWorking: !this.state.currentlyWorking,
                    })
                  }>
                  <Icon name="box" color={colors.appGray} size={20} />
                </CustomButton>
              ) : (
                <CustomButton
                  handlePress={() =>
                    this.setState({
                      currentlyWorking: !this.state.currentlyWorking,
                    })
                  }>
                  <Icon
                    name="tick"
                    color={colors.defaultWhite}
                    size={18}
                    style={{
                      backgroundColor: colors.skyBlue,
                      paddingStart: 1,
                      borderRadius: 2,
                      height: 20,
                      width: 20,
                    }}
                  />
                </CustomButton>
              )}
              <Text style={[styles.label, {marginTop: 0, marginStart: 10}]}>
                {i18n.t('asAddEmployment.currentlyWorking')}
              </Text>
            </View>
            <Text style={[styles.label, {marginTop: 20}]}>
              {i18n.t('asAddEmployment.descriptionOptional')}
            </Text>
            <TextInput
              multiline={true}
              style={styles.textArea}
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
              returnKeyType="done"
            />
            {this.state.showDatePicker && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RBSheet
                  closeOnDragDown
                  closeOnPressBack
                  closeOnPressMask
                  onClose={this.closeDatePicker}
                  ref={(ref) => {
                    this.RBSheet = ref;
                  }}
                  height={250}
                  openDuration={250}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 30,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                    }}>
                    <Text>{i18n.t('asAddEmployment.selectDate')}</Text>
                    <CustomButton handlePress={this.closeDatePicker}>
                      <Text style={{fontSize: 16}}>
                        {i18n.t('asAddEmployment.done')}
                      </Text>
                    </CustomButton>
                  </View>
                  <DatePicker
                    androidVariant="iosClone"
                    date={
                      !this.state.dateIndex
                        ? this.state.fromDate
                          ? this.state.fromDate
                          : new Date()
                        : this.state.toDate
                        ? this.state.toDate
                        : new Date()
                    }
                    onDateChange={async (date) => {
                      !this.state.dateIndex
                        ? this.setState({fromDate: date})
                        : this.setState({toDate: date});
                    }}
                    mode={'date'}
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                </RBSheet>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            backgroundColor: colors.appBackground,
            paddingHorizontal: 10,
          }}>
          <CustomButton
            isLoading={this.state.loading}
            mode={1}
            style={{marginVertical: 10}}
            handlePress={this.onSave}>
            <Text style={styles.buttonText}>
              {i18n.t('asAddEmployment.save')}
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
            this.countryRBSheet = ref;
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
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(AddEmployment);
