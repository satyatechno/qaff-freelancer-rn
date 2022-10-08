import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './Employment.styles';
import {Icon} from 'src/Icon';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import momemt from 'moment';

const Employment = ({data, edit, navigation}) => {
  const {t} = useTranslation();
  return (
    <>
      {data.length === 0 ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.ExamsHeading}>Employment</Text>
          <Text style={styles.ExamsText}>
            Build your credibility by showcasing the projects and jobs you have
            completed.
          </Text>
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('AddEmployment');
            }}>
            <Text style={styles.buttonText}>Add Employment</Text>
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
            <Text style={styles.ExamsHeading}>Employment</Text>
            {
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('AddEmployment');
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
                      {i + 1}- {item?.company_name}
                    </Text>
                    <Text
                      style={{
                        color: colors.appGray,
                        fontSize: 12,
                        marginTop: -5,
                      }}>
                      ({item?.city},{item?.country})
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: colors.appRed}}>
                      {!item?.to_month_year && 'Since'}{' '}
                      {momemt(item?.from_month_year, 'YYYY-MM-DD').format(
                        'YYYY',
                      )}
                      {item?.to_month_year &&
                        `-${momemt(item?.to_month_year, 'YYYY-MM-DD').format(
                          'YYYY',
                        )}`}
                    </Text>
                    {edit && (
                      <CustomButton
                        handlePress={() => {
                          navigation.navigate('EditEmployment', {
                            employment: item,
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
Employment.propTypes = {
  data: PropTypes.array,
};
Employment.defaultProps = {
  data: [],
};
export default Employment;
