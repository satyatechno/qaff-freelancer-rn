import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import styles from './Summary.styles';
const Summary = ({title, discription, navigation, edit}) => {
  const [readMore, setReadMore] = useState(false);
  const {t} = useTranslation();
  return (
    <>
      {!title ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.summaryHeading}>{t('summary.summary')}</Text>
          <Text style={styles.summaryText}>{t('summary.summaryText')}</Text>
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('EditSummary');
            }}>
            <Text style={styles.buttonText}>{t('summary.addSummary')}</Text>
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
            <Text style={styles.summaryHeading}>{title}</Text>
            {edit && (
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('EditSummary', {
                    title: title,
                    description: discription,
                    headerTitle: t('summary.editSummary'),
                  });
                }}>
                <Icon name="edit" size={20} color={colors.appGray} />
              </CustomButton>
            )}
          </View>
          <Text style={styles.summaryText} numberOfLines={readMore ? null : 5}>
            {discription}
          </Text>
          {discription?.length > 200 && (
            <CustomButton
              handlePress={() => {
                setReadMore(!readMore);
              }}>
              <Text style={styles.readMoreText}>
                {readMore ? 'Read less' : 'Read more...'}
              </Text>
            </CustomButton>
          )}
        </View>
      )}
    </>
  );
};

export default Summary;
