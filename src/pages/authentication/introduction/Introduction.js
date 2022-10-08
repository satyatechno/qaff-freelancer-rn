import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  I18nManager,
  ImageBackground,
} from 'react-native';
import styles from './Introduction.styles';
import colors from 'src/styles/texts/colors';
import Logo from './images/qaffLogo.png';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Container from 'src/components/container/Container';
import 'src/locale/en.json';
import {useTranslation} from 'react-i18next';
import CustomButton from 'src/components/button/CustomButton';
import RNRestart from 'react-native-restart';
import FastImage from 'react-native-fast-image';

const Introduction = ({navigation}) => {
  const [swipeIndex, setSwipeIndex] = useState(0);
  const {t, i18n} = useTranslation();
  const flatlistRef = useRef();
  const screenData = [
    {
      index: 0,
      background: require('./images/1.jpg'),
      heading: t('introduction.intro-header1'),
      description: t('introduction.intro-desc1'),
    },
    {
      index: 1,
      background: require('./images/2.jpg'),
      heading: t('introduction.intro-header2'),
      description: t('introduction.intro-desc2'),
    },
    {
      index: 2,
      background: require('./images/3.jpg'),

      heading: t('introduction.intro-header3'),
      description: t('introduction.intro-desc3'),
    },
    {
      index: 3,
      background: require('./images/4.jpg'),

      heading: t('introduction.intro-header4'),
      description: t('introduction.intro-desc4'),
    },
    {
      index: 4,
      background: require('./images/5.jpg'),

      heading: t('introduction.intro-header5'),
      description: t('introduction.intro-desc5'),
    },
  ];
  const handleNext = () => {
    let index = flatlistRef.current.getCurrentIndex();

    if (index < 4) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: index + 1,
      });
      setSwipeIndex(index + 1);
    } else {
      navigation.replace('Welcome');
    }
  };
  return (
    <Container style={styles.container} statusBarColor="dark-content">
      <FastImage style={styles.logo} source={Logo} resizeMode="contain" />

      <SwiperFlatList
        ref={flatlistRef}
        showPagination={true}
        paginationActiveColor={colors.skyBlue}
        paginationDefaultColor={colors.defaultGray}
        paginationStyleItemActive={{width: 30, height: 5}}
        paginationStyleItem={{width: 20, height: 5}}
        paginationStyleItemInactive={{width: 15, height: 15, borderRadius: 15}}
        paginationStyle={{
          position: 'absolute',
          bottom: 30,
        }}
        data={screenData}
        onChangeIndex={(index) => {
          setSwipeIndex(index);
        }}
        renderItem={({item, index}) => (
          <View style={styles.child}>
            <ImageBackground
              source={item?.background}
              style={{
                width: '100%',
                height: '100%',

                marginTop: 60,
              }}
              resizeMode="cover">
              <Text style={styles.header}>{item.heading}</Text>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item) => item.index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Welcome');
          }}
          activeOpacity={0.5}
          style={{
            backgroundColor: colors.defaultBlack,
            height: 40,
            width: 70,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 22,
            left: 10,
          }}>
          <Text style={{fontSize: 16, color: colors.defaultWhite}}>
            {t('introduction.skip')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.5}
          style={{
            backgroundColor:
              swipeIndex?.index !== 4 ? colors.skyBlue : colors.appGreen,
            height: 40,
            width: 70,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 22,
            right: 10,
          }}>
          <Text style={{fontSize: 16, color: colors.defaultWhite}}>
            {swipeIndex?.index === 4 ? 'Go' : t('introduction.next')}
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Introduction;
