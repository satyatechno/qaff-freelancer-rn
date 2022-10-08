import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';
import {updateUserSettings} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './SecurityQuestion.styles';

class SecurityQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      disableLoading: false,
      ckeckBox: false,
      loading: false,
    };
  }
  disableSecurityQuestion = () => {
    this.setState({disableLoading: true});

    const userSetting = {
      setting_name: 'two_step_security_question',
      value: {
        is_enabled: false,
        question: '',
        answer: '',
      },
    };
    updateUserSettings({setting: userSetting, token: this.props?.token})
      .then((res) => {
        this.setState({disableLoading: false});
        this.props.navigation.navigate('PasswordSecurity', {
          twoStepSecurityQuestionEnable: false,
        });
      })
      .catch((err) => {
        console.error('Couldnot disable security question', err);
        this.setState({disableLoading: false});
      });
  };
  submitSecurityQuestion = () => {
    if (!this.props.route?.params?.question && this.state.answer === '') {
      alert(i18n.t('securityQuestion.selectSecurityQuestion'));
    } else if (!this.state.answer && this.props.route?.params?.question) {
      alert(i18n.t('securityQuestion.provideAnswer'));
    } else {
      this.setState({loading: true});
      const setting = {
        setting_name: 'two_step_security_question',
        value: {
          is_enabled: true,
          question: this.props.route?.params?.question,
          answer: this.state.answer,
        },
      };

      updateUserSettings({setting: setting, token: this.props?.token})
        .then((res) => {
          this.props.dispatch(LOADER(false));
          this.props.navigation.navigate('PasswordSecurity', {
            twoStepSecurityQuestionEnable: true,
          });
        })
        .catch((err) => {
          console.error('Couldnot submit security question', err);
          this.props.dispatch(LOADER(false));
        })
        .finally(() => this.setState({loading: false}));
    }
  };

  render() {
    const {loading} = this.state;
    return (
      <>
        <Header
          title={i18n.t('securityQuestion.securityQuestion')}
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ShowSecurityQuestion');
            }}
            style={styles.questionContainer}>
            <Text
              style={{
                color: colors.appBlack,
                fontSize: 16,
                flex: 1,
              }}>
              {this.props.route?.params?.question
                ? this.props.route?.params?.question
                : i18n.t('securityQuestion.selectQuestion')}
            </Text>
            <Icon name="arrow-next" color={colors.skyBlue} size={18} />
          </TouchableOpacity>
          <Text style={styles.label}>{i18n.t('securityQuestion.answer')}</Text>
          <CustomInput
            style={{margin: 10}}
            value={this.state.answer}
            handleChange={(text) => {
              this.setState({answer: text});
            }}
            isClass={true}
            editable={this.props.route?.params?.question?.length > 0}
          />
          <View style={{flexDirection: 'row', padding: 10}}>
            {this.state.ckeckBox === false ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ckeckBox: !this.state.ckeckBox});
                }}>
                <Icon name="box" color={colors.appGray} size={18} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ckeckBox: !this.state.ckeckBox});
                }}>
                <Icon
                  name={'tick'}
                  color={colors.defaultWhite}
                  size={15}
                  style={{
                    backgroundColor: colors.skyBlue,
                    height: 18,
                    width: 18,
                    borderRadius: 2,
                    padding: 1,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: colors.appGray,
                paddingStart: 10,
                flex: 1,
                textAlignVertical: 'center',
              }}>
              {i18n.t('securityQuestion.iUnderstand')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              left: 9,
              bottom: 0,
            }}>
            {this.props.route?.params?.isEnabled && (
              <View style={{width: '48%'}}>
                <CustomButton
                  isLoading={this.state.disableLoading}
                  mode={1}
                  style={{marginVertical: 10, backgroundColor: colors.appRed}}
                  handlePress={this.disableSecurityQuestion}>
                  <Text style={styles.buttonText}>
                    {i18n.t('securityQuestion.disable')}
                  </Text>
                </CustomButton>
              </View>
            )}
            <View
              style={{
                width: this.props.route?.params?.isEnabled ? '48%' : '98%',
              }}>
              <CustomButton
                isLoading={loading}
                mode={1}
                style={{
                  marginVertical: 10,
                  backgroundColor: colors.skyBlue,
                }}
                handlePress={() => {
                  if (this.state.ckeckBox) {
                    this.submitSecurityQuestion();
                  } else {
                    alert(i18n.t('securityQuestion.acceptTerms'));
                  }
                }}>
                <Text style={styles.buttonText}>
                  {i18n.t('securityQuestion.save')}
                </Text>
              </CustomButton>
            </View>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  // loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(SecurityQuestion);
