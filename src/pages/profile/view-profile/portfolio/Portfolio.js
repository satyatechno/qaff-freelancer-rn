import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import styles from './Portfolio.styles';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
const Portfolio = ({data, edit, navigation}) => {
  // console.log('dd', JSON.stringify(data, null, 2));
  const {t} = useTranslation();
  return (
    <>
      {data?.length === 0 ? (
        <View
          style={[
            styles.container,
            {borderBottomEndRadius: 10, borderBottomStartRadius: 10},
          ]}>
          <Text style={styles.portfolioHeading}>
            {t('portfolio.portfolio')}
          </Text>
          <Text style={styles.portfolioText}>
            {t('portfolio.portfolioText')}
          </Text>
          <FastImage
            source={require('./images/portfolio.png')}
            style={styles.image}
          />
          <CustomButton
            // isLoading={isLoading}
            mode={1}
            style={styles.button}
            handlePress={() => {
              navigation.navigate('AddPortfolio');
            }}>
            <Text style={styles.buttonText}>{t('portfolio.addPortfolio')}</Text>
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
            <Text style={styles.portfolioHeading}>
              {t('portfolio.portfolio')}
            </Text>
            {edit ? (
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('PortfolioList', {edit: true});
                }}>
                <Icon name="edit" size={20} color={colors.appGray} />
              </CustomButton>
            ) : (
              <CustomButton
                style={{marginTop: 16}}
                handlePress={() => {
                  navigation.navigate('PortfolioList', {edit: false});
                }}>
                <Text style={styles.seeAllText}>{t('portfolio.seeAll')}</Text>
              </CustomButton>
            )}
          </View>

          <ScrollView
            style={styles.portfolioImageContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {data?.[0]?.images?.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageViewer', {
                    uri: data?.[0]?.images,
                    id: item?.id,
                  })
                }
                style={{marginEnd: 10}}
                key={item.id.toString()}>
                <FastImage
                  source={{uri: item?.path}}
                  style={styles.portfolioImage}
                />
                <Text style={styles.portfolioTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};
Portfolio.propTypes = {
  data: PropTypes.array,
};
Portfolio.defaultProps = {
  data: [],
};
export default Portfolio;
