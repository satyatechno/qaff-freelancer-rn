import React, {Component, createRef} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import styles from './EditEmployment.styles';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {connect} from 'react-redux';
import {FETCH_PROFILE, LOADER, MODAL_VISIBLE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  addEmployment,
  deleteEmployment,
  editEmployment,
  fetchCountriesList,
} from 'src/services/http.service';
import {UPDATE_EMPLOYMENT} from 'src/actions/publicProfile';
import Countries from 'src/components/countries/Countries';
import ShowCountries from 'src/components/show-countries/ShowCountries';
import CityContainer from 'src/components/city/CityContainer';
import ShowCities from 'src/components/show-cities/ShowCities';
import i18n from 'src/locale/i18n';

// import DropDownPicker from 'react-native-dropdown-picker';
class EditEmployment extends Component {
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
      deleteLoading: false,
      edit: false,
      EmploymentId: '',
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

  componentDidMount() {
    // this.setState({isLoading: true});
    const {employment} = this.props.route?.params;
    console.log('params emp', JSON.stringify(employment, null, 2));
    this.setState({
      EmploymentId: employment?.id,
      companyName: employment?.company_name,
      city: {name: employment?.city, city_id: null},
      country: {name: employment?.country, country_id: null},
      fromDate:
        employment?.from_month_year &&
        moment(employment?.from_month_year, 'YYYY-MM-DD').toDate(),
      toDate:
        employment?.to_month_year &&
        moment(employment?.to_month_year, 'YYYY-MM-DD').toDate(),
      description: employment?.description,
      currentlyWorking: employment?.currently_working,
    });
    // fetchCountriesList()
    //   .then((countries) => {
    //     let tempCountries = countries.data.data.country_list?.map((data) => ({
    //       label: `${data.name}(+${data.phonecode})`,
    //       value: data.iso,
    //       name: data.name,
    //     }));
    //     this.setState({countries: [...tempCountries]});

    //     this.setState({isLoading: false});
    //   })
    //   .catch((err) => {
    //     console.error('Couldnot get countries list', err);
    //     this.setState({isLoading: false});
    //   });
  }
  onSave = () => {
    const {
      companyName,
      fromDate,
      toDate,
      city,
      description,
      country,
      currentlyWorking,
      EmploymentId,
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
    } else {
      this.props.dispatch(LOADER(true));

      editEmployment({
        token: this.props.token,
        employmentId: EmploymentId,
        data: {
          company_name: companyName,
          city: city?.name,
          country: country?.name,
          from_month_year: moment(fromDate).format('YYYY-MM-DD'),
          to_month_year: toDate && moment(toDate).format('YYYY-MM-DD'),
          description: description,
          currently_working: currentlyWorking,
        },
      })
        .then((res) => {
          // this.props.dispatch(LOADER(false));
          console.log('employment edited', JSON.stringify(res?.data, null, 2));
          this.props.dispatch(
            UPDATE_EMPLOYMENT({
              data: res.data?.data?.employment,
              type: 'edit',
            }),
          );
          // this.props.dispatch(FETCH_PROFILE());
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
          this.props.navigation.replace('ViewProfile');
        })
        .catch((err) => {
          this.props.dispatch(LOADER(false));
          if (err?.response?.data) {
            console.log('errrrmdssss', err.response.data);
          }
          console.log('error to add Education', err);
        });
    }
  };
  handleDelete = () => {
    Alert.alert(
      i18n.t('addEmployment.delete'),
      i18n.t('addEmployment.deleteConfirmation'),
      [
        {
          text: i18n.t('addEmployment.cancel'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: i18n.t('addEmployment.ok'),
          onPress: () => {
            this.setState({deleteLoading: true});
            deleteEmployment({
              token: this.props.token,
              employmentId: this.props.route?.params?.employment?.id,
            })
              .then((res) => {
                this.setState({deleteLoading: false});
                // this.props.dispatch(FETCH_PROFILE());
                this.props.dispatch(
                  UPDATE_EMPLOYMENT({
                    employmentId: this.props.route?.params?.employment?.id,
                    type: 'delete',
                  }),
                ),
                  this.props.dispatch(
                    MODAL_VISIBLE({
                      visible: true,
                      type: 1,
                      message: res.data.message,
                    }),
                  );
                this.props.navigation.replace('ViewProfile');
              })
              .catch((err) => {
                this.setState({deleteLoading: false});
                if (err?.response?.data) {
                  console.log('err msg delet education', err.response.data);
                } else {
                  console.log('error to delete Education', err);
                }
              });
          },
        },
      ],
      {cancelable: true},
    );
  };
  render() {
    console.log(
      'liffffff',
      this.state.countries.find((x) => x.name === this.state.country)?.value,
    );
    if (this.state.isLoading) {
      return (
        <>
          <Header
            backButton
            navigation={this.props.navigation}
            title={i18n.t('addEmployment.editEmployment')}
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
          title={i18n.t('addEmployment.editEmployment')}
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
              editable={this.state.edit}
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
              defaultValue={
                this.state.countries.find((x) => x.name === this.state.country)
                  ?.value
              }
              placeholder="Select a country"
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => this.setState({country: item.name})}
              disabled={!this.state.edit}
            /> */}
            <TouchableOpacity
              disabled={!this.state.edit}
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
                  i18n.t('addEmployment.selectCountry')}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>{i18n.t('addEmployment.city')}</Text>
            <TouchableOpacity
              disabled={!this.state.country || !this.state.edit}
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
                  disabled={!this.state.edit}
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
              <View>
                <Text style={styles.label}>
                  {i18n.t('addEmployment.toDate')}
                </Text>
                <TouchableOpacity
                  disabled={!this.state.edit}
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
              editable={this.state.edit}
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: colors.appBackground,
          }}>
          <View style={{width: '48%'}}>
            <CustomButton
              isLoading={this.state.deleteLoading}
              mode={1}
              style={{marginVertical: 10, backgroundColor: colors.appRed}}
              handlePress={() => {
                this.handleDelete();
              }}>
              <Text style={styles.buttonText}>
                {i18n.t('addEmployment.delete')}
              </Text>
            </CustomButton>
          </View>
          <View style={{width: '48%'}}>
            <CustomButton
              isLoading={this.props.loading}
              mode={1}
              style={{
                marginVertical: 10,
                backgroundColor: this.state.edit
                  ? colors.skyBlue
                  : colors.appGreen,
              }}
              handlePress={() => {
                this.state.edit ? this.onSave() : this.setState({edit: true});
              }}>
              <Text style={styles.buttonText}>
                {this.state.edit
                  ? i18n.t('addEmployment.save')
                  : i18n.t('addEmployment.edit')}
              </Text>
            </CustomButton>
          </View>
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
export default connect(mapStateToProps)(EditEmployment);
