import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Expertise.styles';
const Expertise = ({data, navigation, edit}) => {
  const [readMore, setReadMore] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      {data.category === null ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.summaryHeading}>Expertise</Text>
          <Text style={styles.summaryText}>
            Tell us about the work you do.{'\n'}What is the main service you
            offer?
          </Text>
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('AddExpertise');
            }}>
            <Text style={styles.buttonText}>{'Add Expertise'}</Text>
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
            <Text style={styles.summaryHeading}>{'Expertise'}</Text>

            {edit && (
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('AddExpertise', {
                    categoryName: data?.category?.name,
                    subCategoryIds: data.subCategories?.map((x) => x.id),
                    subCategoryNames: data.subCategories?.map((x) => x.name),
                    // jobCount: this.state.jobCount,
                    categoryId: data?.category?.id,
                  });
                }}>
                <Icon name="edit" size={20} color={colors.appGray} />
              </CustomButton>
            )}
          </View>
          <Text
            style={{
              color: colors.appBlack,
              fontSize: 16,
              marginHorizontal: 16,
              fontFamily: fonts.primarySB,
              marginVertical: 5,
            }}>
            {data?.category?.name}
          </Text>
          {data?.subCategories?.map((item, i) => (
            <Text
              key={item.id}
              style={[
                styles.summaryText,
                i === data?.subCategories?.length - 1 && {marginBottom: 16},
              ]}>
              {i + 1}. {item.name}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default Expertise;
