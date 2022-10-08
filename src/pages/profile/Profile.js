import {GoogleSignin} from '@react-native-community/google-signin';
import {StackActions, useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import QB from 'quickblox-react-native-sdk';
import React, {Component, useCallback, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  I18nManager,
  Linking,
  Modal,
  Platform,
  SectionList,
  Share,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import {Freshchat} from 'react-native-freshchat-sdk';
import LinearGradient from 'react-native-linear-gradient';
import OneSignal from 'react-native-onesignal';
import RNRestart from 'react-native-restart';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, useSelector} from 'react-redux';
import {LOGOUT} from 'src/actions/action';
import Header from 'src/components/header/Header';
import {logoutFireBase} from 'src/firebase';
import {Icon} from 'src/Icon';
import i18next from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {fetchStatistics, logout} from '../../services/http.service';
import styles from './Profile.styles';

const SECTIONS = [
  {
    title: i18next.t('profile.myQaff'),
    sectionId: 101,
    // color: colors.appViolet,
    data: [
      {
        iconName: 'profile',
        listName: i18next.t('profile.personalProfile'),
        listId: 1,
      },
      {
        iconName: 'star',
        listName: i18next.t('profile.saved'),
        listId: 2,
      },
      {
        iconName: 'whatsapp',
        listName: i18next.t('profile.chat'),
        listId: 20,
      },
    ],
  },
  {
    title: i18next.t('profile.contracts'),
    sectionId: 105,
    // color: colors.appViolet,
    data: [
      {
        iconName: 'chat',
        listName: i18next.t('profile.fileDispute'),
        listId: 41,
      },
      {
        iconName: 'chat',
        listName: i18next.t('profile.myDisputes'),
        listId: 42,
      },
    ],
  },

  {
    title: i18next.t('profile.general'),
    sectionId: 102,
    data: [
      {
        iconName: 'ellipse-outline',
        listName: i18next.t('profile.onlineStatus'),
        listId: 8,
      },

      {
        iconName: 'profile',
        listName: i18next.t('profile.postAJob'),
        listId: 10,
      },
      {
        iconName: 'invite',
        listName: i18next.t('profile.inviteFriends'),
        listId: 11,
      },
      {
        iconName: 'settings',
        listName: i18next.t('profile.settings'),
        listId: 12,
      },
      {
        iconName: 'swap-horizontal',
        listName: i18next.t('profile.changelanguage'),
        listId: 15,
      },
      {
        iconName: 'exit-outline',
        listName: i18next.t('profile.logout'),
        listId: 13,
      },
    ],
  },
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionListColor: 0,
      listColor: [colors.appYellow, colors.appViolet, colors.skyBllue],
      isOnline: false,
      logoutLoading: false,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.logoutLoading === this.state.logoutLoading) {
  //     return false;
  //   } else return false;
  // }

  removeId = () => {
    console.log('from profile logout');
  };
  Item = (title, section, key) => {
    const listColor =
      section.sectionId === 105
        ? colors.appViolet
        : section.sectionId === 102
        ? colors.skyBlue
        : colors.appYellow;

    const handleLogout = () => {
      Alert.alert(
        i18next.t('profile.logout'),
        i18next.t('profile.logoutConfirmation'),
        [
          {
            text: i18next.t('profile.cancel'),
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: i18next.t('profile.ok'),
            onPress: async () => {
              // OneSignal.removeEventListener('ids', this.removeId);
              console.log(this.props?.token);
              this.setState({logoutLoading: true});

              OneSignal.setSubscription(false);
              // await QB.chat
              //   .disconnect()
              //   .then(async function () {
              //     console.log('Disconnected from chat server');
              //     await QB.auth
              //       .logout()
              //       .then((res) => console.log('Quickblox logout successfull'))
              //       .catch((err) =>
              //         console.log(
              //           `error while logging out from quickblox`,
              //           err,
              //         ),
              //       );
              //   })
              //   .catch(function (err) {
              //     console.error(`Couldnot disconnect from chat server`, err);
              //   });
              logoutFireBase();
              let isSignedInFromGoogle = await GoogleSignin.isSignedIn();
              if (isSignedInFromGoogle) {
                GoogleSignin.signOut()
                  .then((res) => {
                    console.log('Google signed out', res);
                  })
                  .catch((err) => {
                    console.error('Couldnot signout from google', err);
                  });
              }
              await logout({token: this.props.token})
                .then((res) => {
                  console.log('api logout successfull');
                })
                .catch((err) => {
                  console.error('Logout api err', err);
                })
                .finally(() => this.props.dispatch(LOGOUT()));
              this.setState({logoutLoading: false});
              this.props.navigation.dispatch(
                StackActions.replace('Authentication', {screen: 'Login'}),
              );
            },
          },
        ],
        {cancelable: true},
      );
    };
    return (
      <TouchableOpacity
        key={key}
        style={{marginEnd: 15}}
        disabled={title.listId === 8 ? true : false}
        onPress={
          title.listId === 13
            ? () => handleLogout()
            : () => this.handleProfileNavigation(title.listId)
        }>
        <View style={styles.listContainer}>
          {title.listId === 8 ||
          title.listId === 13 ||
          title.listId === 15 ||
          title.listId === 13 ? (
            <Ionicons name={title.iconName} size={20} color={listColor} />
          ) : (
            <Icon
              name={title.iconName}
              size={title.listId === 9 ? 18 : 18}
              color={listColor}
            />
          )}
          <Text
            style={
              title.listId === 8
                ? [styles.listItem, {marginStart: 9}]
                : styles.listItem
            }>
            {title.listName}
          </Text>
          <Text>{[section.length]}</Text>

          {title.listId === 8 ? (
            <Switch
              value={this.state.isOnline}
              style={{marginStart: 10}}
              onValueChange={() =>
                this.setState({isOnline: !this.state.isOnline})
              }
            />
          ) : (
            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={18}
              color={listColor}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  handleProfileNavigation = (id) => {
    if (id === 1) {
      this.props.navigation.navigate('ViewProfile');
    } else if (id === 2) {
      this.props.navigation.navigate('Saved');
    } else if (id === 11) {
      this.inviteFriends();
    } else if (id === 10) {
      this.becomeEmployer();
    } else if (id === 15) {
      this.showActionSheet();
    } else if (id === 12) {
      this.props.navigation.navigate('Settings');
    } else if (id === 20) {
      Freshchat.showConversations();
    } else if (id === 41) {
      this.props.navigation.navigate('MyContracts');
    } else if (id === 42) {
      this.props.navigation.navigate('MyDispute');
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  onActionSheetItemPress = (index) => {
    const {i18n} = this.props;

    if (index === 0 && i18n.language !== 'en') {
      i18n.changeLanguage((i18n.language = 'en')).then(() => {
        I18nManager.forceRTL(false);
        RNRestart.Restart();
      });
    }
    if (index === 1 && i18n.language !== 'ar') {
      i18n.changeLanguage((i18n.language = 'ar')).then(() => {
        I18nManager.forceRTL(true);
        RNRestart.Restart();
      });
    }
  };

  becomeEmployer = () => {
    const employerUrl =
      Platform.OS === 'android' ? 'app://qaffEmployer' : 'qaffEmployer://';
    const playStoreUrl = 'https://play.google.com/';
    const appStoreUrl = 'https://www.apple.com/in/app-store/';
    Linking.canOpenURL(employerUrl)
      .then((supported) => {
        if (supported) {
          console.log('accepted');
          return Linking.openURL(employerUrl);
        } else {
          Linking.canOpenURL(
            Platform.OS === 'android' ? playStoreUrl : appStoreUrl,
          ).then((url) => {
            if (url) {
              return Linking.openURL(
                Platform.OS === 'android' ? playStoreUrl : appStoreUrl,
              );
            } else {
              alert(`Sorry,couldn't open app `);
            }
          });
        }
      })
      .catch((err) => console.log(' error occured', err));
  };

  inviteFriends = async () => {
    try {
      const result = await Share.share({
        url: 'Download app and join now',
        message: `Join Qaff and become part of the largest freelancer marketplace across Saudi Arabia and GCC \n Download app and join now`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type', result.activityType);
        } else {
          console.log('else share part', result);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {t, i18n} = this.props;

    return (
      <>
        <Header
          title={t('profile.myProfile')}
          logo={true}
          notificationButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <SectionList
            initialNumToRender={25}
            style={{flex: 1}}
            sections={SECTIONS}
            keyExtractor={(item, index) => 'menu-item-' + item.listId}
            stickySectionHeadersEnabled={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <>
                {this.props.profile_image === null ? (
                  <LottieView
                    style={styles.profileImage}
                    source={
                      this.props.profileData?.gender === ''
                        ? require('./lottie-animation/male.json')
                        : this.props.profileData?.gender === 'male'
                        ? require('./lottie-animation/male.json')
                        : require('./lottie-animation/female.json')
                    }
                    autoPlay
                    loop
                  />
                ) : (
                  <FastImage
                    source={{uri: this.props.profile_image}}
                    style={[styles.profileImage, {borderRadius: 70}]}
                    defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                  />
                )}
                <Text style={styles.profileOwnerName}>
                  {this.props.profileData?.first_name}{' '}
                  {this.props.profileData?.last_name}
                </Text>
                {this.props.location !== '' && (
                  <View style={styles.locationContainer}>
                    <Icon name="location" color={colors.appGray} size={15} />
                    <Text
                      style={
                        styles.locationName
                      }>{`${this.props.profileData?.city},${this.props.profileData?.country}`}</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TokenHistory', {
                      remainingTokens: this.props.profileData?.token_balance,
                      token: this.props.token,
                    })
                  }>
                  <LinearGradient
                    colors={[colors.appViolet, '#c299e8']}
                    style={styles.tokenContainer}>
                    {/* <View style={styles.tokenContainer}> */}
                    <FontAwesomeIcon
                      name="copyright"
                      color={colors.defaultGold}
                      size={17}
                    />
                    {/* <Text style={styles.tokenText}>
                      {`${this.props.profileData?.token_balance} tokens remaining`}
                    </Text> */}

                    <TabFocus logoutLoading={this.state.logoutLoading}>
                      {(statistics, loading) => (
                        <Text style={styles.tokenText}>
                          {`${
                            statistics?.current_token_balance ?? 0
                          } ${i18next.t('profile.tokensRemaining')}`}
                        </Text>
                      )}
                    </TabFocus>

                    {/* {/* </View> */}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.appGray1,
                  marginHorizontal: 15,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: colors.appGray1}} />
            )}
            renderItem={({item, section}) => {
              return this.Item(item, section, `menu-item-key-${item.listId}`);
            }}
            renderSectionHeader={({section: {title, sectionId}}) => (
              <View style={styles.listItemHeader}>
                <Text
                  style={
                    sectionId === 105
                      ? [styles.listItemHeaderText, {color: colors.appViolet}]
                      : sectionId === 102
                      ? [styles.listItemHeaderText, {color: colors.skyBlue}]
                      : styles.listItemHeaderText
                  }>
                  {title}
                </Text>
              </View>
            )}
          />
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={i18next.t('profile.changeLanguage')}
          options={['English', 'Arabic', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
        <Modal visible={this.state.logoutLoading} transparent={true}>
          <View
            style={{
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: colors.appGray2,
              opacity: 0.7,
            }}>
            <ActivityIndicator color={colors.skyBlue} size={50} />
            <Text
              style={{
                color: colors.skyBlue,
                fontSize: 20,
                fontFamily: fonts.primarySB,
              }}>
              {i18next.t('profile.loggingOut')}
            </Text>
          </View>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profileData: state.myReducer.user?.freelancer_profile,
  profile_image: state.myReducer.user?.freelancer_profile?.profile_image,
  location: state.myReducer.user?.freelancer_profile?.country,
  token: state.myReducer.user?.token,
});

const TabFocus = ({children, logoutLoading}) => {
  const [statistics, setStatistics] = useState({});
  const token = useSelector((state) => state.myReducer?.user?.token);
  const [statisticsLoading, setStatisticsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setStatisticsLoading(true);

      !logoutLoading &&
        fetchStatistics(token)
          .then((res) => {
            setStatistics(res?.data?.data);
            setStatisticsLoading(false);
          })
          .catch((err) => {
            console.error('Couldnot get statistics', err);
            setStatisticsLoading(false);
          });

      // return () => {
      //   // setStatisticsLoading(false);
      //   // setStatistics({});
      // };
    }, []),
  );
  return children(statistics, statisticsLoading);
};

export default connect(mapStateToProps)(withTranslation()(Profile));
