import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import styles from './EditEducation.styles';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {connect} from 'react-redux';
import {FETCH_PROFILE, LOADER, MODAL_VISIBLE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {deleteEducation, editEducation} from 'src/services/http.service';
import {UPDATE_EDUCATION} from 'src/actions/publicProfile';
import i18n from 'src/locale/i18n';

const ATTACHMENT_LIMIT = 20;
class EditEducation extends Component {
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
      edit: false,
      deleteLoading: false,
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
    } else {
      this.props.dispatch(LOADER(true));

      editEducation({
        token: this.props.token,
        educationId: this.props.route?.params?.education?.id,
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
          // console.log('edit employment', JSON.stringify(res.data, null, 2));
          this.props.dispatch(
            UPDATE_EDUCATION({
              data: res.data?.data?.education,
              type: 'edit',
            }),
          );
          this.props.dispatch(LOADER(false));

          this.props.dispatch(FETCH_PROFILE());
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
          if (err.response.data) {
            console.log('err msg edit education', err.response.data);
          } else {
            console.log('error to edit Education', err);
          }
        });
    }
  };
  componentDidMount() {
    const {education} = this.props.route?.params;
    this.setState({
      school: education?.school_name,
      degree: education?.degree,
      areaOfStudy: education?.area_of_study,
      fromDate:
        education?.date_from &&
        moment(education?.date_from, 'YYYY-MM-DD').toDate(),
      toDate:
        education?.date_to && moment(education?.date_to, 'YYYY-MM-DD').toDate(),
      description: education?.description,
    });
  }
  handleDelete = () => {
    Alert.alert(
      i18n.t('addEducation.delete'),
      i18n.t('addEducation.deleteConfirmation'),
      [
        {
          text: i18n.t('addEducation.cancel'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: i18n.t('addEducation.ok'),
          onPress: () => {
            this.setState({deleteLoading: true});
            deleteEducation({
              token: this.props.token,
              educationId: this.props.route?.params?.education?.id,
            })
              .then((res) => {
                this.setState({deleteLoading: false});
                console.log(
                  'education deleted',
                  JSON.stringify(res?.data, null, 2),
                );
                this.props.dispatch(
                  UPDATE_EDUCATION({
                    educationId: this.props.route?.params?.education?.id,
                    type: 'delete',
                  }),
                ),
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
    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={i18n.t('addEducation.editEducation')}
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
            editable={this.state.edit}
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
            editable={this.state.edit}
          />
          <Text style={styles.label}>{i18n.t('addEducation.degree')}</Text>
          <CustomInput
            value={this.state.degree}
            handleChange={(text) => {
              this.setState({degree: text});
            }}
            isClass={true}
            editable={this.state.edit}
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
                    ? i18n.t('addEducation.selectDate')
                    : moment(this.state.fromDate).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('addEducation.toDate')}</Text>
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
                  <Text>{i18n.t('addEducation.selectDate')}</Text>
                  <CustomButton handlePress={this.closeDatePicker}>
                    <Text style={{fontSize: 16}}>
                      {i18n.t('addEducation.done')}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              left: 10,
              bottom: 0,
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
                  {i18n.t('addEducation.delete')}
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
                    ? i18n.t('addEducation.save')
                    : i18n.t('addEducation.edit')}
                </Text>
              </CustomButton>
            </View>
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
export default connect(mapStateToProps)(EditEducation);
