import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import i18n from 'src/locale/i18n';
import {fetchUserSettings} from 'src/services/http.service';
import styles from './ShowSecurityQuestion.styles';

class ShowSecurityQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSetting: '',
      securityQuestions: [],
      isSecurityQuestionsEnabled: false,
    };
  }
  componentDidMount() {
    fetchUserSettings(this.props?.token)
      .then((settings) => {
        this.setState({userSetting: settings?.data?.data?.settings});

        let twoStepSecurityQuestion = this.state.userSetting?.filter(
          (setting) => setting.name === 'two_step_security_question',
        );

        let securityQuestions = twoStepSecurityQuestion[0]?.options?.map(
          (x) => ({
            id: Math.random(),
            name: x,
          }),
        );

        this.setState({
          isSecurityQuestionsEnabled:
            twoStepSecurityQuestion[0].value?.is_enabled,
          securityQuestions: securityQuestions,
        });
      })
      .catch((err) => {
        console.error('Couldnot fetch settings', err);
      });
  }
  handleRadioSelect = (item) => {
    console.log('item', item);
    this.props.navigation.navigate('SecurityQuestion', {
      question: item?.selection?.name,
      isEnabled: this.state.isSecurityQuestionsEnabled,
    });
  };
  render() {
    const {securityQuestions} = this.state;
    return (
      <>
        <Header
          title={i18n.t('securityQuestion.securityQuestion')}
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <Text style={styles.label}>
            {i18n.t('securityQuestion.selectQuestion')}
          </Text>
          <RadioGroup
            data={{data: [...securityQuestions]}}
            onSelect={this.handleRadioSelect}
          />
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(ShowSecurityQuestion);
