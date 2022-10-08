import React, {Component, createRef} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import styles from './AddEmployment.styles';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {connect} from 'react-redux';
import {
  FETCH_PROFILE,
  IS_PROFILE_COMPLETED,
  LOADER,
  MODAL_VISIBLE,
  UPDATE_PROFILE,
} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {addEmployment, fetchCountriesList} from 'src/services/http.service';
import DropDownPicker from 'react-native-dropdown-picker';
import {UPDATE_EMPLOYMENT} from 'src/actions/publicProfile';
import Snackbar from 'react-native-snackbar';
import CityContainer from 'src/components/city/CityContainer';
import ShowCities from 'src/components/show-cities/ShowCities';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import Countries from 'src/components/countries/Countries';
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
      country: null,
      countrySearch: '',
      citySearch: '',
      city: null,
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
      country,
      currentlyWorking,
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
        text: i18n.t('addEmployment.fromAndToDate'),
        backgroundColor: colors.appRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.props.dispatch(LOADER(true));

      addEmployment({
        token: this.props.token,
        data: {
          company_name: companyName,
          city: city?.name,
          country: country?.name,
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
          this.props.dispatch(LOADER(false));
          // console.log('data', JSON.stringify(res.data, null, 2));

          // this.props.dispatch(FETCH_PROFILE());
          // this.props.dispatch(
          //   UPDATE_PROFILE({data: res.data?.data?.employment}),
          // );
          this.props.dispatch(
            UPDATE_EMPLOYMENT({
              data: res.data?.data?.employment,

              message: res.data?.message,
              type: 'add',
            }),
          );
          this.props.dispatch(
            IS_PROFILE_COMPLETED(res?.data?.data?.is_profile_completed),
          );
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
          this.props.navigation.navigate('ViewProfile');
        })
        .catch((err) => {
          this.props.dispatch(LOADER(false));
          if (err.response.data) {
            console.log('errrrmdssss', err.response.data);
          }
          console.log('error to add Education', err);
        });
    }
  };
  // componentDidMount() {
  //   this.setState({isLoading: true});
  //   fetchCountriesList()
  //     .then((countries) => {
  //       let tempCountries = countries.data.data.country_list?.map((data) => ({
  //         label: `${data.name}(+${data.phonecode})`,
  //         value: data.iso,
  //         name: data.name,
  //       }));
  //       this.setState({countries: [...tempCountries]});

  //       this.setState({isLoading: false});
  //     })
  //     .catch((err) => {
  //       console.error('Couldnot get countries list', err);
  //       this.setState({isLoading: false});
  //     });
  // }
  render() {
    if (this.state.isLoading) {
      return (
        <>
          <Header
            backButton
            navigation={this.props.navigation}
            title={i18n.t('addEmployment.addEmployment')}
            notificationButton={true}
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
          title={i18n.t('addEmployment.addEmployment')}
          notificationButton={true}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View style={styles.container}>
            <Text style={styles.label}>
              {i18n.t('addEmployment.companyName')}
            </Text>
            <CustomInput
              value={this.state.companyName}
              handleChange={(text) => {
                this.setState({companyName: text});
              }}
              isClass={true}
            />
            {this.state.errorCompanyName && (
              <ErrorText text={i18n.t('addEmployment.required')} />
            )}
            <Text style={styles.label}>{i18n.t('addEmployment.country')}</Text>
            {/* <DropDownPicker
              controller={(instance) => (this.controller = instance)}
              dropDownMaxHeight={300}
              style={{paddingVertical: 10}}
              containerStyle={{height: 50}}
              dropDownStyle={{backgroundColor: 'orange'}}
              labelStyle={{
                fontSize: 16,
                textAlign: 'left',
                color: '#000',
              }}
              selectedLabelStyle={{color: colors.appGreen}}
              activeLabelStyle={{color: colors.appGreen}}
              items={this.state.countries}
              searchable={true}
              searchablePlaceholder="Search countries"
              searchablePlaceholderTextColor="gray"
              defaultValue={null}
              placeholder="Select a country"
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => this.setState({country: item.name})}
            /> */}
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
                {this.state.country?.name ?? 'Select a country'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>{i18n.t('addEmployment.city')}</Text>
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
                {this.state.city?.name ?? i18n.t('addEmployment.selectCity')}
              </Text>
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.label}>
                  {i18n.t('addEmployment.fromDate')}
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
                      ? i18n.t('addEmployment.selectDate')
                      : moment(this.state.fromDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
                {this.state.errorFromDate && (
                  <ErrorText text={i18n.t('addEmployment.required')} />
                )}
              </View>

              {!this.state.currentlyWorking && (
                <View>
                  <Text style={styles.label}>
                    {i18n.t('addEmployment.toDate')}
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
                        ? i18n.t('addEmployment.selectDate')
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
                {i18n.t('addEmployment.currentlyWorking')}
              </Text>
            </View>
            <Text style={[styles.label, {marginTop: 20}]}>
              {i18n.t('addEmployment.description')}
            </Text>
            <TextInput
              multiline={true}
              style={styles.textArea}
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
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
                    <Text>{i18n.t('addEmployment.selectDate')}</Text>
                    <CustomButton handlePress={this.closeDatePicker}>
                      <Text style={{fontSize: 16}}>
                        {i18n.t('addEmployment.done')}
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
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            backgroundColor: colors.appBackground,
            paddingHorizontal: 10,
          }}>
          <CustomButton
            isLoading={this.props.loading}
            mode={1}
            style={{marginVertical: 10}}
            handlePress={this.onSave}>
            <Text style={styles.buttonText}>
              {i18n.t('addEmployment.save')}
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
