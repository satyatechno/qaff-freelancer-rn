import React, {Component} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import SegmentTab from 'react-native-segmented-control-tab';
import Header from 'src/components/header/Header';
import MessageCard from 'src/components/message-card/MessageCard';
import styles from './Messages.styles';
import Moment from 'moment';
import {showContacts} from 'src/services/http.service';
import {connect} from 'react-redux';
import {
  FETCH_CONTACTS,
  GET_CHAT_DIALOGS,
  SET_DIALOG_LOADING,
} from 'src/actions/messages';
import colors from 'src/styles/texts/colors';
import {SETUP_QUICKBLOX} from 'src/actions/quickblox';
import i18next from 'i18next';
import FastImage from 'react-native-fast-image';
import fonts from 'src/styles/texts/fonts';
import { getChatReducer } from 'src/firebase';

class Messages extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedTabIndex: 0,
      isRetrying: false,
    };
  }

  async componentDidMount() {
    await this.props.dispatch(SET_DIALOG_LOADING(false));
    await this.props.dispatch(FETCH_CONTACTS());
  }

  handleChatNavigation = (userName, userImage, quickblox, item) => {
    console.log('ss0', quickblox);
    const {navigate} = this.props.navigation;
    navigate('FirebaseChat', {
      userName: userName,
      userPhoto: userImage,
      uid: quickblox.uid,
      type: this.state.selectedTabIndex !== 0 ? 'inbox' : null,
      item: item,
    });
  };
  // reconnectToChatServer = async () => {
  //   this.setState({isRetrying: true});
  //   await this.props.dispatch(SETUP_QUICKBLOX());
  //   // if (this.props.chatConnection !== false) { this.setState({ isRetrying: false }); }
  // };
  // componentDidUpdate(prevProps) {
  //   if (prevProps.chatConnection === true) {
  //     if (this.props.chatConnection === false) {
  //       this.setState({isRetrying: false});
  //     }
  //   }
  // }
  onRefresh = async () => {
    const {selectedTabIndex} = this.state;
    console.log('selected tab index', selectedTabIndex);
    if (selectedTabIndex === 0) {
      this.props.dispatch(FETCH_CONTACTS());
    } else {
      this.props.dispatch(GET_CHAT_DIALOGS());
    }
  };
  render() {
    const {selectedTabIndex} = this.state;

    const {
      chatDialogs,
      isConnectedToChatServer,
      contacts,
      chatConnection,
      isContactLoading,
      isContactRefreshing,
      isDialogLoading,
    } = this.props;
    const {channels} = this.props;
    console.log('ccc', JSON.stringify(contacts, null, 2));
    return (
      <>
        <Header
          title={i18next.t('messages.messages')}
          logo={true}
          notificationButton={true}
          navigation={this.props.navigation}
        />
        <SegmentTab
          values={[i18next.t('messages.contacts'), i18next.t('messages.inbox')]}
          selectedIndex={this.state.selectedTabIndex}
          onTabPress={(index) => {
            this.setState({selectedTabIndex: index});
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
        {selectedTabIndex === 0 ? (
          <FlatList
            data={contacts}
            keyExtractor={(item, index) => item?.profile?.user_id.toString()}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isContactLoading === true ? (
                  <ActivityIndicator size="large" color={colors.skyBlue} />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FastImage
                      style={{width: 150, height: 160, alignSelf: 'center'}}
                      source={require('src/assets/images/no-jobs.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.appGray,
                        marginTop: 10,
                        fontFamily: fonts.primary,
                      }}>
                      {i18next.t('messages.noContact')}
                    </Text>
                  </View>
                )}
              </View>
            }
            renderItem={({item: {profile}}) => (
              <MessageCard
                userImage={profile.profile_image}
                userName={profile?.name}
                // quickblox={profile.quickblox}
                quickblox={{
                  uid: profile?.firebase_user_id,
                }}
                handlePress={this.handleChatNavigation}
              />
            )}
            onRefresh={() => this.onRefresh()}
            refreshing={isContactRefreshing}
          />
        ) : (
          <FlatList
            data={channels}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    style={{width: 150, height: 160, alignSelf: 'center'}}
                    source={require('src/assets/images/no-jobs.png')}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.appGray,
                      marginTop: 10,
                      fontFamily: fonts.primary,
                    }}>
                    {i18next.t('messages.noInbox')}
                  </Text>
                </View>
              </View>
            }
            renderItem={({item}) => (
              <MessageCard
                userImage={item?.info?.profilePic}
                userName={item?.info?.name}
                message={item?.lastMessage?.content}
                time={item?.lastUpdated}
                quickblox={{
                  uid: item?.info?.uid,
                }}
                handlePress={this.handleChatNavigation}
                isOnline={item?.info?.online}
                item={item}
                unreadCount = {
                  item?.unreadCount?.[
                    getChatReducer().dialogs?.uid
                  ]}
              />
            )}
            // onRefresh={() => this.onRefresh()}
            // refreshing={isDialogLoading}
          />
        )}
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  token: state.myReducer.user.token,
  quickblox: state.myReducer.user?.employer_profile?.quickblox,
  chatDialogs: state.messagesReducer.chatDialogs,
  isConnectedToChatServer: state.messagesReducer.isConnected,
  contacts: state.messagesReducer.contacts,
  chatConnection: state.messagesReducer.chatConnectionError,
  isContactLoading: state.messagesReducer.isContactLoading,
  isContactRefreshing: state.messagesReducer.isContactRefreshing,
  isDialogLoading: state.messagesReducer.isDialogLoading,
  ////////////////////////////////////////

  channels: state.chatReducer.channels,
});

export default connect(mapStatetoProps)(Messages);
