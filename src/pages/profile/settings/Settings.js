import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './Settings.styles';
import colors from 'src/styles/texts/colors';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';

const DUMMY_DATA1 = [
  {
    id: 1,
    title: i18n.t('settings.passwordAndSecurity'),
  },
  {
    id: 2,
    title: i18n.t('settings.paymentSettings'),
  },
];
// {
//   id: 2,
//   title: 'Notification settings',
// },
// {
//   id: 3,
//   title: 'Members & Permissions',
// },
// {
//   id: 4,
//   title: 'Tax information',
// },
const DUMMY_DATA2 = [
  {
    id: 25,
    title: i18n.t('settings.privacyPolicy'),
    url: 'https://qaff.com/privacy-policy',
  },

  {
    id: 3,
    title: i18n.t('settings.termsOfService'),
    url: 'https://qaff.com/term_and_condition',
  },
  {
    id: 4,
    title: i18n.t('settings.aboutUs'),
    url: 'https://qaff.com/about',
  },
  {
    id: 5,
    title: i18n.t('settings.howItWorks'),
    url: 'https://qaff.com/how_its_work',
  },
  {
    id: 6,
    title: i18n.t('settings.copyright'),
    url: 'https://qaff.com/copy-right',
  },
  {
    id: 7,
    title: i18n.t('settings.codeOfConduct'),
    url: 'https://qaff.com/code_of_conduct',
  },
  {
    id: 8,
    title: i18n.t('settings.feesAndCharges'),
    url: 'https://qaff.com/fees',
  },
];

export class Settings extends Component {
  handleClick = (item) => {
    if (item?.id === 1) {
      this.props.navigation.navigate('PasswordSecurity');
    } else if (item?.id === 2) {
      this.props.navigation.navigate('PaymentSetting');
    } else {
      this.props.navigation.navigate('SettingsWebView', {
        url: item?.url,
      });
    }
  };
  render() {
    return (
      <>
        <Header
          title="Settings"
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <View style={styles.settingsContainer}>
            {DUMMY_DATA1.map((item, index) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={
                  index === 0
                    ? [
                        styles.settingContainer,
                        {
                          borderBottomWidth: 0,
                          borderTopColor: 'white',
                          marginTop: -15,
                        },
                      ]
                    : styles.settingContainer
                }
                onPress={() => this.handleClick(item)}>
                <Text style={styles.settingName}>{item.title}</Text>
                <Icon
                  name="arrow-next"
                  color={colors.appViolet}
                  size={20}
                  style={{}}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.legalText}>{i18n.t('settings.legal')}</Text>
          <View style={styles.settingsContainer}>
            {DUMMY_DATA2.map((item, index) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={[
                  styles.settingContainer,
                  index === 0 && {borderTopWidth: 0},
                ]}
                onPress={() => this.handleClick(item)}>
                <Text style={styles.settingName}>{item.title}</Text>
                <Icon
                  name="arrow-next"
                  color={colors.skyBlue}
                  size={20}
                  style={{}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </>
    );
  }
}

export default Settings;
