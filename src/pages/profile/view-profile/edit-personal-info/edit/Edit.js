import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import colors from 'src/styles/texts/colors';
import styles from './Edit.styles';

import DatePicker from 'react-native-date-picker';
import {withTranslation} from 'react-i18next';
import moment from 'moment';

export class Edit extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: '',
      birthday: moment().subtract(18, 'years').toDate(),
    };
  }
  componentDidMount() {
    const {first_name, last_name, birthday} = this.props.route.params;
    this.setState({
      inputValue: first_name ? first_name : last_name ? last_name : '',
      birthday: birthday
        ? moment(birthday, 'DD-MM-YYYY').toDate()
        : moment().subtract(18, 'years').toDate(),
    });
  }

  onNext = () => {
    const {first_name, last_name, birthday} = this.props.route.params;
    if (first_name) {
      this.props.navigation.navigate('EditPersonalInfo', {
        first_name: this.state.inputValue,
      });
    } else if (last_name) {
      this.props.navigation.navigate('EditPersonalInfo', {
        last_name: this.state.inputValue,
      });
    } else if (birthday) {
      this.props.navigation.navigate('EditPersonalInfo', {
        birthday: this.state.inputValue,
      });
    }
  };
  render() {
    const {first_name, last_name, birthday} = this.props.route.params;
    const {t, navigation} = this.props;
    return (
      <>
        <Header
          backButton
          navigation={navigation}
          title={t('editProfile.editProfile')}
          notificationButton={true}
        />
        <Container style={styles.container}>
          <View style={styles.inputContainer}>
            {birthday ? (
              <>
                <Text style={styles.label}>
                  {t('editProfile.selectBirthday')}{' '}
                </Text>
                <View style={{marginTop: 30}}>
                  <DatePicker
                    date={this.state.birthday}
                    maximumDate={moment().subtract(18, 'years').toDate()}
                    onDateChange={(date) => {
                      this.setState({
                        birthday: date,
                        inputValue: `${date.getDate()}-${
                          date.getMonth() + 1
                        }-${date.getFullYear()}`,
                      });
                    }}
                    mode={'date'}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>
                  {t('editProfile.enter')}{' '}
                  {first_name
                    ? t('editProfile.firstName')
                    : last_name && t('editProfile.lastName')}
                </Text>
                <CustomInput
                  value={this.state.inputValue}
                  handleChange={(text) => {
                    this.setState({inputValue: text});
                  }}
                  isClass={true}
                />
              </>
            )}
          </View>

          <CustomButton
            // style={{ bottom: 20 }}
            mode={1}
            handlePress={this.onNext}>
            <Text style={{alignSelf: 'center', color: colors.defaultWhite}}>
              {t('editProfile.next')}
            </Text>
          </CustomButton>
        </Container>
      </>
    );
  }
}

export default withTranslation()(Edit);
