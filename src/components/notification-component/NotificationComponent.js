import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  Dimensions,
  SafeAreaView,
  Platform,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import styles from './NotificationComponent.styles';
import * as Animatable from 'react-native-animatable';
import colors from 'src/styles/texts/colors';
export const {width, height} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {Icon} from 'src/Icon';
import {
  FETCH_MORE_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,
  UNREAD_NOTIFICATION,
} from 'src/actions/notification';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {readNotification} from 'src/services/http.service';
import {withTranslation} from 'react-i18next';
import Header from '../header/Header';

class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      onEndReachedCalledDuringMomentum: true,
      isRefreshing: false,
    };
  }
  componentDidMount() {
    readNotification({token: this.props.token})
      .then((res) => {
        this.props.dispatch(UNREAD_NOTIFICATION(0));
        console.log('notification read', res.data);
      })
      .catch((err) => console.error('notification', err));
  }
  LoadMoreNotification = (Page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_notifications_page === true) {
        this.props.dispatch(
          FETCH_MORE_NOTIFICATIONS({
            page: Page1 + 1,
          }),
        );
        this.setState({page: Page1 + 1});
      }
    }
  };
  onRefresh = async () => {
    this.setState({isRefreshing: true, page: 1});
    await this.props.dispatch(FETCH_NOTIFICATIONS());
    this.setState({isRefreshing: false});
  };

  handleNotificationPress = (item) => {
    const {navigation} = this.props;
    const {type} = item;
    const {data} = item;
    switch (type) {
      case 'App\\Notifications\\ProposalReceiveNotification':
        navigation.navigate('ProposalDetails', {
          id: data?.proposal_id,
        });
        break;
      case 'App\\Notifications\\Job\\JobPostedNotification':
        navigation.navigate('ProjectDtails', {
          projectId: data?.project_id,
        });
        break;
      case 'App\\Notifications\\Contract\\RequestMilestonePaymentNotification':
        navigation.navigate('ContractRoom', {
          contractId: data?.contract_id,
        });
        break;
      case 'App\\Notifications\\Invitation\\RecieveNotification':
        navigation.navigate('InvitationDetails', {
          id: data?.invitation_id,
        });
        break;

      default:
        console.log('Default');
    }
  };

  renderFooter = () => {
    const {isLoadingMore} = this.props;
    return isLoadingMore ? (
      <ActivityIndicator
        size="large"
        style={{alignSelf: 'center', marginVertical: 10}}
        color={colors.skyBlue}
      />
    ) : null;
  };

  render() {
    const {notifications, latestNotification, t} = this.props;
    // console.log(' ❎', JSON.stringify(notifications, null, 2));
    // console.log(' 🗞', JSON.stringify(latestNotification, null, 2));
    return (
      <View style={{flex: 1}}>
        <Header
          backButton
          title={t('notification.notification')}
          notificationButton
          navigation={this.props.navigation}
        />

        {!notifications.length && !latestNotification.length ? (
          <View style={styles.body}>
            <View style={styles.imageContainer}>
              <LottieView
                style={styles.image}
                source={require('./lottie-animation/empty-notification.json')}
                autoPlay
                loop
              />
              <Text style={styles.imageContainerText}>
                {t('notification.noData')}
              </Text>
              <Text style={styles.imageContainerText}>
                {t('notification.moment')}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <SectionList
              renderToHardwareTextureAndroid={
                Platform.OS === 'android' ? true : false
              }
              sections={[
                {
                  title: t('notification.latest'),
                  data: latestNotification,
                },
                {
                  title: t('notification.earlier'),
                  data: notifications,
                },
              ]}
              listKey={(item) => item.id}
              keyExtractor={(item, index) => item?.id + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.handleNotificationPress(item)}
                  activeOpacity={0.5}
                  delayPressIn={0}
                  delayPressOut={0}
                  style={styles.sectionItem}>
                  <Icon
                    name={'project'}
                    color={colors.skyBlue}
                    size={30}
                    style={{margin: 15, marginStart: 8}}
                  />

                  <View style={styles.sectionItemTitleView}>
                    <Text style={styles.sectionItemTitle}>{item.message}</Text>
                    <Text style={styles.sectionItemTime}>
                      {moment.unix(item.created_at).format('DD MMM, h:mm a')}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    style={{alignItems: 'flex-end', marginStart: 10}}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      color={colors.appGray}
                      size={25}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
              )}
              renderSectionHeader={({section: {title, data}}) => {
                if (data.length > 0)
                  return <Text style={styles.sectionHeader}>{title}</Text>;
              }}
              ItemSeparatorComponent={() => <View style={styles.saperator} />}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.LoadMoreNotification(this.state.page)}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              renderSectionFooter={this.renderFooter}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  notifications: state.notificationReducer.notifications,
  notification_loading: state.notificationReducer.notification_loading,
  has_more_notifications_page:
    state.notificationReducer.has_more_notifications_page,
  latestNotification: state.notificationReducer.latestNotification,
  isLoadingMore: state.notificationReducer.isLoadingMore,
  token: state.myReducer.user.token,
});
export default connect(mapStateToProps)(
  withTranslation()(NotificationComponent),
);
