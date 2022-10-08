import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './Education.styles';
import {Icon} from 'src/Icon';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import momemt from 'moment';
const RANDOM_COLORS = [
  colors.appRed,
  colors.appViolet,
  colors.appBlue,
  colors.appGreen,
  colors.appYellow,
];
let skillColor = 0;
const Education = ({data, edit, navigation}) => {
  const {t} = useTranslation();
  return (
    <>
      {data.length === 0 ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.ExamsHeading}>Education</Text>
          <Text style={styles.ExamsText}>
            Add school you attended, area of study and degrees earned.
          </Text>
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('AddEducation');
            }}>
            <Text style={styles.buttonText}>Add Education</Text>
          </CustomButton>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingEnd: 16,
              alignItems: 'center',
            }}>
            <Text style={styles.ExamsHeading}>Education</Text>
            {
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('AddEducation');
                }}>
                <Icon
                  name="add"
                  size={15}
                  color={colors.defaultWhite}
                  style={{
                    backgroundColor: colors.skyBlue,
                    borderRadius: 15,
                    padding: 5,
                  }}
                />
              </CustomButton>
            }
          </View>
          <View style={styles.ExamInfoContainer}>
            {data.map((item, i) => {
              return (
                <View key={i} style={[styles.Exam]}>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.ExamName}>
                      {i + 1}- {item?.degree}
                    </Text>
                    <Text
                      style={{
                        color: colors.appGray,
                        fontSize: 12,
                        marginTop: -5,
                      }}>
                      ({item?.school_name})
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: colors.appGreen}}>
                      {item?.date_to &&
                        momemt(item?.date_to, 'YYYY-MM-DD').format(
                          'DD/MM/YYYY',
                        )}
                    </Text>
                    {edit && (
                      <CustomButton
                        handlePress={() => {
                          navigation.navigate('EditEducation', {
                            education: item,
                          });
                        }}>
                        <Icon
                          name="edit"
                          size={16}
                          color={colors.appGray}
                          style={{marginStart: 5}}
                        />
                      </CustomButton>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
};
Education.propTypes = {
  data: PropTypes.array,
};
Education.defaultProps = {
  data: [],
};
export default Education;
