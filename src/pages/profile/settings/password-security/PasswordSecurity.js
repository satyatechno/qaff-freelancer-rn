import React, {Component} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';
import {fetchUserSettings, updateUserSettings} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './PasswordSecurity.styles';

class PasswordSecurity extends Component {
  state = {
    userSetting: [],
    isTwoStepOtpEnabled: false,
    isSecurityQuestionsEnabled: false,
    isModalVisible: false,
    securityQuestions: [],
    securityAnswer: '',
    selectedSecurityQuestion: '',
    showSecurityLoader: false,
    loading: false,
  };
  onLoad = () => {
    fetchUserSettings(this.props?.token)
      .then((settings) => {
        this.setState({userSetting: settings?.data?.data?.settings});
        let twoStepOtp = this.state.userSetting?.filter(
          (setting) => setting.name === 'two_step_otp_text',
        );

        let twoStepSecurityQuestion = this.state.userSetting?.filter(
          (setting) => setting.name === 'two_step_security_question',
        );

        let securityQuestions = twoStepSecurityQuestion[0]?.options?.map(
          (x) => ({
            id: Math.random(),
            name: x,
          }),
        );
        // console.log('jj', JSON.stringify(securityQuestions, null, 2));
        this.setState({
          isTwoStepOtpEnabled: twoStepOtp[0].value,
          isSecurityQuestionsEnabled:
            twoStepSecurityQuestion[0].value?.is_enabled,
          securityQuestions: securityQuestions,
          selectedSecurityQuestion: twoStepSecurityQuestion[0].value?.question,
        });
      })
      .catch((err) => {
        console.error('Couldnot fetch settings', err);
      });
  };
  componentDidMount() {
    this.onLoad();
  }

  handleTwoStepOtp = (isEnabled) => {
    this.setState({loading: true});
    const userSetting = {
      setting_name: 'two_step_otp_text',
      value: !isEnabled,
    };

    updateUserSettings({setting: userSetting, token: this.props?.token})
      .then((res) => {
        this.setState({isTwoStepOtpEnabled: !isEnabled});
      })
      .catch((err) => {
        console.error('Couldnot update user setting', err);
      })
      .finally(() => this.setState({loading: false}));
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.onLoad();
    }
  }
  render() {
    const {
      isTwoStepOtpEnabled,
      isSecurityQuestionsEnabled,
      isModalVisible,
      securityQuestions,
      showSecurityLoader,
      selectedSecurityQuestion,
      loading,
    } = this.state;
    const {handleTwoStepOtp, handleRadioSelect} = this;

    return (
      <>
        <Header
          title={i18n.t('passwordAndSecurity.passwordAndSecurity')}
          backButton={true}
          navigation={this.props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.card1}
              onPress={() => this.props.navigation.navigate('UpdatePassword')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                }}>
                <Icon
                  name="project"
                  color={colors.appGray}
                  size={15}
                  style={{marginEnd: 5}}
                />
                <Text style={styles.passwordText}>
                  {i18n.t('passwordAndSecurity.password')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Ionicons
                  name="checkmark"
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.passwordSetText}>
                    {i18n.t('passwordAndSecurity.passwordSet')}
                  </Text>
                  <Text style={styles.passwordDetailText}>
                    {i18n.t('passwordAndSecurity.createStrongPassword')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.card1}>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="settings"
                    color={colors.appGray}
                    size={17}
                    style={{marginEnd: 5}}
                  />
                  <Text style={styles.passwordText}>
                    {i18n.t('passwordAndSecurity.twoStep')}
                  </Text>
                </View>
                <Text style={styles.passwordDetailText}>
                  {i18n.t('passwordAndSecurity.helpProject')}
                </Text>
              </View>

              {/* <View style={{ padding: 15, borderBottomColor: colors.appGray1, borderBottomWidth: 1 }}>
                                <Text style={styles.passwordSetText}>
                                    Authenticator verification
                                </Text>
                                <Text style={styles.passwordDetailText}>
                                    Enter a code provided by your authenticatio app along with your password.
                            </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Enable</Text>
                                </TouchableOpacity>
                            </View> */}
              <View
                style={{
                  padding: 10,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>
                  {i18n.t('passwordAndSecurity.textVerification')}
                </Text>
                <Text style={styles.passwordDetailText}>
                  {i18n.t('passwordAndSecurity.receiveFourDigit')}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleTwoStepOtp(isTwoStepOtpEnabled)}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.defaultWhite}
                    />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isTwoStepOtpEnabled ? 'Disable' : 'Enable'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SecurityQuestion', {
                    question: selectedSecurityQuestion,
                    isEnabled: isSecurityQuestionsEnabled,
                  });
                  // this.setState({isModalVisible: true})
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <Icon
                    name="project"
                    color={colors.appGray}
                    size={15}
                    style={{marginEnd: 5}}
                  />
                  <Text style={styles.passwordText}>
                    {i18n.t('passwordAndSecurity.securityQuestion')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', padding: 10}}>
                  {isSecurityQuestionsEnabled ? (
                    <Ionicons
                      name="checkmark"
                      size={23}
                      color={colors.defaultWhite}
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Ionicons
                      name="ellipse-outline"
                      size={23}
                      color={colors.skyBlue}
                      style={[
                        styles.checkIcon,
                        {backgroundColor: 'transparent'},
                      ]}
                    />
                  )}

                  <View style={{flex: 1}}>
                    <Text style={styles.passwordSetText}>
                      {isSecurityQuestionsEnabled ? 'Enabled' : 'Disabled'}
                    </Text>
                    <Text style={styles.passwordDetailText}>
                      {isSecurityQuestionsEnabled
                        ? selectedSecurityQuestion
                        : i18n.t('passwordAndSecurity.confirmIdentity')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
      // <Modal
      //   style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
      //   isVisible={isModalVisible}
      //   animationIn="slideInUp"
      //   animationInTiming={300}
      //   animationOut="slideOutDown"
      //   animationOutTiming={300}
      //   hasBackdrop={true}
      //   backdropOpacity={0.2}
      //   onBackdropPress={() => this.setState({isModalVisible: false})}
      //   swipeDirection={['left', 'right']}
      //   onSwipeComplete={() => this.setState({isModalVisible: false})}>
      //   <View
      //     style={{
      //       //   justifyContent: 'center',
      //       //   alignItems: 'center',
      //       flex: 0.6,
      //       width: '100%',
      //       // height: '75%',
      //       paddingBottom: 20,

      //       backgroundColor: colors.defaultWhite,
      //     }}>
      //     <TouchableOpacity
      //       style={{
      //         justifyContent: 'flex-end',
      //         padding: 10,
      //         backgroundColor: colors.skyBlue,
      //         margin: 10,
      //         borderRadius: 5,
      //       }}
      //       onPress={this.disableSecurityQuestion}>
      //       {loading ? (
      //         <ActivityIndicator size="small" color={colors.defaultWhite} />
      //       ) : (
      //         <Text
      //           style={{
      //             color: colors.defaultWhite,
      //             textAlign: 'center',

      //             fontSize: 16,
      //           }}>
      //           Disable Security Questions
      //         </Text>
      //       )}
      //     </TouchableOpacity>
      //     {/* <ScrollView
      //       contentContainerStyle={{
      //         paddingHorizontal: 10,

      //         paddingVertical: 10,
      //       }}> */}
      //     {/* <View style={{backgroundColor: 'white'}}> */}
      //     <RadioGroup
      //       data={{data: securityQuestions}}
      //       onSelect={handleRadioSelect}
      //     />
      //     {/* </View> */}
      //     {/* </ScrollView> */}
      //     <Text
      //       style={{
      //         fontSize: 16,
      //         marginStart: 10,
      //         marginVertical: 10,
      //         marginTop: 10,
      //         color: colors.appGreen1,
      //       }}>
      //       Answer
      //     </Text>
      //     <KeyboardAvoidingView
      //       behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      //       <TextInput
      //         style={{
      //           borderWidth: 1,
      //           borderColor: colors.skyBlue,
      //           borderRadius: 10,
      //           marginHorizontal: 10,
      //           height: 40,
      //         }}
      //         onChangeText={(text) => this.setState({securityAnswer: text})}
      //       />
      //     </KeyboardAvoidingView>
      //     <TouchableOpacity
      //       onPress={this.submitSecurityQuestion}
      //       style={{
      //         backgroundColor: colors.skyBlue,
      //         marginHorizontal: 10,
      //         borderRadius: 10,
      //         padding: 10,
      //         justifyContent: 'center',
      //         marginTop: 30,
      //       }}>
      //       {showSecurityLoader ? (
      //         <ActivityIndicator size="small" color={colors.defaultWhite} />
      //       ) : (
      //         <Text
      //           style={{
      //             textAlign: 'center',
      //             color: colors.defaultWhite,
      //             fontSize: 16,
      //           }}>
      //           Submit Answer
      //         </Text>
      //       )}
      //     </TouchableOpacity>
      //   </View>
      // </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  // loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(PasswordSecurity);
