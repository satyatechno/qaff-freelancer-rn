import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  I18nManager,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './GettingStarted.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import translation from 'src/locale/i18n';

const GettingStarted = ({navigation, route: {params}}) => {
  const [swipeIndex, setSwipeIndex] = useState(0);
  const user = useSelector((state) => state.myReducer.user.freelancer_profile);
  const [data] = useState([
    {
      id: 1,
      heading: translation.t('asGettingStarted.heading1'),
      subHeading: `${translation.t('asGettingStarted.subHeading1')} ${
        user?.first_name
      } ${user?.last_name}`,
      body: translation.t('asGettingStarted.body1'),
    },
    {
      id: 2,
      heading: translation.t('asGettingStarted.heading2'),
      subHeading: translation.t('asGettingStarted.subHeading2'),
      subHeading1: translation.t('asGettingStarted.subHeading3'),
      body: translation.t('asGettingStarted.body2'),
    },
  ]);

  return (
    <SafeAreaView style={{backgroundColor: colors.appBackground, flex: 1}}>
      <StatusBar backgroundColor={colors.skyBlue} />

      <ImageBackground
        style={{width: Dimensions.get('window').width, height: 200}}
        source={require('./images/getting-started.jpg')}>
        {params?.showBackButton && (
          <TouchableOpacity
            style={{marginTop: 5}}
            onPress={() => navigation?.goBack()}>
            <Ionicons
              name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
              size={30}
              color={colors.defaultWhite}
              style={{textAlign: 'left'}}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
      <SwiperFlatList
        showPagination={true}
        paginationActiveColor={colors.skyBlue}
        paginationDefaultColor={colors.defaultGray}
        paginationStyle={{marginBottom: 40}}
        data={data}
        onChangeIndex={(index) => {
          setSwipeIndex(index);
        }}
        renderItem={({item, index}) => (
          // <View style={styles.child}>
          //   <Image style={styles.logo} source={item.logo} />
          //   <Text style={styles.header}>{item.heading}</Text>

          //   <Text style={styles.description}>{item.description}</Text>
          // </View>
          <View style={styles.container}>
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.subHeading}>{item.subHeading}</Text>
            {item?.subHeading1 && (
              <Text
                style={[
                  styles.subHeading,
                  {textAlign: 'left', fontWeight: 'bold'},
                ]}>
                {item.subHeading1}
              </Text>
            )}
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.skipStepButton}
        onPress={() => navigation.navigate('Expertise')}>
        <Text style={styles.skipStepText}>Skip this step</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GettingStarted;
