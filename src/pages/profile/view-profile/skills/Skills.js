import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './Skills.styles';
import {Icon} from 'src/Icon';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
const RANDOM_COLORS = [
  colors.appRed,
  colors.appViolet,
  colors.appBlue,
  colors.appGreen,
  colors.appYellow,
];
let skillColor = 0;
const Skills = ({data, edit, navigation}) => {
  // console.log('data', data);
  const {t} = useTranslation();
  return (
    <>
      {data.length === 0 ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.skillsHeading}>{t('skills.skills')}</Text>
          <Text style={styles.skillsText}>{t('skills.skillsText')}</Text>
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('AddSkills', {
                navigationScreenName: 'ViewProfile',
              });
            }}>
            <Text style={styles.buttonText}>{t('skills.selectSkills')}</Text>
          </CustomButton>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingEnd: 16,
            }}>
            <Text style={styles.skillsHeading}>{t('skills.skills')}</Text>
            {edit && (
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('EditSkills', {
                    data: data,
                    headerTitle: t('skills.editSkills'),
                  });
                }}>
                <Icon name="edit" size={20} color={colors.appGray} />
              </CustomButton>
            )}
          </View>
          <View style={styles.skillsInfoContainer}>
            {data.map((item, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles.skill,
                    {
                      backgroundColor:
                        RANDOM_COLORS[
                          skillColor === RANDOM_COLORS.length - 1
                            ? (skillColor = 0)
                            : ++skillColor
                        ],
                    },
                  ]}>
                  <Text style={styles.skillName}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
};
Skills.propTypes = {
  data: PropTypes.array,
};
Skills.defaultProps = {
  data: [],
};
export default Skills;
