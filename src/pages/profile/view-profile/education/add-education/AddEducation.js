import moment from 'moment';
import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {IS_PROFILE_COMPLETED, LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {UPDATE_EDUCATION} from 'src/actions/publicProfile';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';
import {addEducation} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './AddEducation.styles';

const ATTACHMENT_LIMIT = 20;

class AddEducation extends Component {
  constructor(props) {
    super();
    this.state = {
      school: '',
      areaOfStudy: '',
      degree: '',
      description: '',
      fromDate: '',
      toDate: '',
      errorSchool: false,
      errorDegree: false,
      showDatePicker: false,
      dateIndex: 0,
    };
  }
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
      school,
      fromDate,
      toDate,
      degree,
      description,
      areaOfStudy,
    } = this.state;

    if (school === '' || degree === '') {
      if (school === '') {
        this.setState({errorSchool: true});
      } else {
        this.setState({errorSchool: false});
      }
      if (degree === '') {
        this.setState({errorDegree: true});
      } else {
        this.setState({errorDegree: false});
      }
    } else if (
      moment(fromDate).format('YYYYMMDD') === moment(toDate).format('YYYYMMDD')
    ) {
      Snackbar.show({
        text: i18n.t('addEducation.fromAndToDate'),
        backgroundColor: colors.appRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.props.dispatch(LOADER(true));

      addEducation({
        token: this.props.token,
        data: {
          school_name: school,
          area_of_study: areaOfStudy,
          degree: degree,
          date_from: fromDate && moment(fromDate).format('YYYY-MM-DD'),
          date_to: toDate && moment(toDate).format('YYYY-MM-DD'),
          description: description,
        },
      })
        .then((res) => {
          // console.log('data', JSON.stringify(res.data, null, 2));
          this.props.dispatch(LOADER(false));
          // this.props.dispatch(FETCH_PROFILE());
          // this.props.dispatch(
          //   UPDATE_PROFILE({data: res.data?.data?.education}),
          // );
          this.props.dispatch(
            UPDATE_EDUCATION({
              data: res.data?.data?.education,
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
          this.props.navigation.pop();
          this.props.navigation.navigate('ViewProfile');
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
  render() {
    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={i18n.t('addEducation.addEducation')}
          notificationButton={true}
        />
        <Container style={styles.container}>
          <Text style={styles.label}>{i18n.t('addEducation.school')}</Text>
          <CustomInput
            value={this.state.school}
            handleChange={(text) => {
              this.setState({school: text});
            }}
            isClass={true}
          />
          {this.state.errorSchool && (
            <ErrorText text={i18n.t('addEducation.required')} />
          )}
          <Text style={styles.label}>{i18n.t('addEducation.areaOfStudy')}</Text>
          <CustomInput
            value={this.state.areaOfStudy}
            handleChange={(text) => {
              this.setState({areaOfStudy: text});
            }}
            isClass={true}
          />
          <Text style={styles.label}>{i18n.t('addEducation.degree')}</Text>
          <CustomInput
            value={this.state.degree}
            handleChange={(text) => {
              this.setState({degree: text});
            }}
            isClass={true}
          />
          {this.state.errorDegree && (
            <ErrorText text={i18n.t('addEducation.required')} />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.label}>
                {i18n.t('addEducation.fromDate')}
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
                    ? i18n.t('addEducation.selectDate')
                    : moment(this.state.fromDate).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('addEducation.toDate')}</Text>
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
                    ? i18n.t('addEducation.selectDate')
                    : moment(this.state.toDate).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.label, {marginTop: 30}]}>
            {i18n.t('addEducation.description')}
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
                  <Text>{i18n.t('addEducation.selectDate')}</Text>
                  <CustomButton handlePress={this.closeDatePicker}>
                    <Text style={{fontSize: 16}}>
                      {i18n.t('addEducation.done')}
                    </Text>
                  </CustomButton>
                </View>
                <DatePicker
                  androidVariant="iosClone"
                  // maximumDate={this.state.dateIndex === 0 ? new Date() : ''}
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
          <View
            style={{position: 'absolute', bottom: 0, left: 10, width: '100%'}}>
            <CustomButton
              isLoading={this.props.loading}
              mode={1}
              style={{marginVertical: 10}}
              handlePress={this.onSave}>
              <Text style={styles.buttonText}>
                {i18n.t('addEducation.save')}
              </Text>
            </CustomButton>
          </View>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(AddEducation);
