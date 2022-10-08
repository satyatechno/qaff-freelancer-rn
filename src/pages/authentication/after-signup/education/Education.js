import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import Header from 'src/components/header/Header';
import EducationCard from 'src/components/education-card/Education';
import styles from './Education.styles';
import {useSelector} from 'react-redux';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import translation from 'src/locale/i18n';

const Education = ({navigation}) => {
  const educationData = useSelector(
    (state) => state.myReducer.userProfile?.educations,
  );
  // const loading = useSelector((state) => state.myReducer.loading);
  const onSubmit = () => {
    if (!educationData.length) {
      alert(translation.t('asEducation.addEducation'));
    } else navigation.navigate('Employment');
  };
  const onAdd = () => {
    navigation.navigate('AddEducation');
  };

  // console.log('loading', loading);
  return (
    <>
      <Header
        title={translation.t('asEducation.education')}
        backButton
        navigation={navigation}
      />

      <View style={{flex: 1, backgroundColor: colors.defaultWhite}}>
        {/* <Text style={styles.addSchoolText}>
            Add the schools you attended, areas of study, and degrees earned
          </Text> */}
        {educationData?.length ? (
          <EducationCard data={educationData} navigation={navigation} />
        ) : (
          <>
            <View style={styles.addEducationCard}>
              <Text style={styles.educationText}>
                {translation.t('asEducation.educationUpdate')}
              </Text>
              <Text style={styles.addSchoolText}>
                {translation.t('asEducation.addSchools')}
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
                source={require('./image/education.png')}
                style={{flex: 1, height: null, width: null}}
              />
            </View>
          </>
        )}
        <View style={{position: 'absolute', bottom: 40, width: '100%'}}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              // !educationData?.length && {backgroundColor: colors.skyBlue},
            ]}
            onPress={onSubmit}>
            <Text style={styles.submitText}>
              {translation.t('asEducation.next')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Education;
