import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Header from 'src/components/header/Header';
import EmploymentCard from 'src/components/employment-card/Employment';
import styles from './Employment.styles';
import {Icon} from 'src/Icon';
import {useSelector} from 'react-redux';
import colors from 'src/styles/texts/colors';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import i18n from 'src/locale/i18n';

// const DATA = [
//   {
//     id: 1,
//     company_name: 'Pairroxz Technologies Pvt Ltd',
//     city: 'Jaipur',
//     country: 'India',
//     from_month_year: '2013-06-01',
//     to_month_year: '2017-04-01',
//     currently_working: true,
//     description: 'dkjfhsldhf ldskhf lakhd fa',
//   },
//   {
//     id: 2,
//     company_name: 'Numeric Infosystem Pvt Ltd',
//     city: 'Gwalior',
//     country: 'India',
//     from_month_year: '2019-09-01',
//     to_month_year: '2020-09-20',
//     currently_working: false,
//     description: 'Bsjs dkdkd fkdkd dkdkd dkdkd',
//   },
// ];

const Employment = ({navigation}) => {
  const employmentData = useSelector(
    (state) => state.myReducer.userProfile?.employments,
  );
  const onSubmit = () => {
    if (!employmentData?.length) {
      alert(i18n.t('asEmployment.pleaseAddEmployment'));
    } else navigation.navigate('Skills');
  };
  const onAdd = () => {
    navigation.navigate('AddEmployment');
  };
  return (
    <>
      <Header
        title={i18n.t('asEmployment.employment')}
        backButton
        navigation={navigation}
      />

      <View style={{flex: 1, backgroundColor: colors.defaultWhite}}>
        {employmentData?.length ? (
          <EmploymentCard data={employmentData} navigation={navigation} />
        ) : (
          <>
            <View style={styles.addEmploymentCard}>
              <Text style={styles.educationText}>
                {i18n.t('asEmployment.employmentUpdates')}
              </Text>
              <Text style={styles.addSchoolText}>
                {i18n.t('asEmployment.buildCredibility')}
              </Text>
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  onPress={onAdd}
                  style={styles.addButton}
                  activeOpacity={0.4}>
                  <LinearGradient
                    colors={[colors.skyBlue1, colors.appGreen2]}
                    style={styles.linearGradient}>
                    <Icon name="add" size={28} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <FastImage
                source={require('./image/employment.png')}
                style={{flex: 1, height: null, width: null}}
              />
            </View>
          </>
        )}
        <View style={{position: 'absolute', bottom: 40, width: '100%'}}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              // !employmentData?.length && {backgroundColor: colors.skyBlue},
            ]}
            onPress={onSubmit}>
            <Text style={styles.submitText}>{i18n.t('asEmployment.next')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Employment;
