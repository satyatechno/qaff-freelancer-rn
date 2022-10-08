import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {FlatList, Platform, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {UPDATE_SAVE_STATUS} from 'src/actions/action';
import {SETUP_FRESHCHAT_USER} from 'src/actions/freshchat';
import {FETCH_MORE_NEWSFEED, FETCH_NEWSFEED} from 'src/actions/jobs';
import {SETUP_NOTIFICATION_EVENTS} from 'src/actions/notification';
import {SETUP_QUICKBLOX} from 'src/actions/quickblox';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import ProfileCompleted from 'src/components/profile-completed/ProfileCompleted';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import {loginFirebase} from 'src/firebase';
import {Icon} from 'src/Icon';
import {oneSignalPlayerIdRegister} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Jobs.styles';
import Newsfeed from './newsfeed/Newsfeed';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      onEndReachedCalledDuringMomentum: true,
      isRefreshing: false,
      search: '',
    };
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('ids', this.onIds);
  }

  onIds = (device) => {
    console.log('Device info: ', device);

    OneSignal.getPermissionSubscriptionState((subs) => {
      if (subs.userSubscriptionEnabled) {
        console.log('one sub permission', subs.userSubscriptionEnabled);
        oneSignalPlayerIdRegister({
          data: {player_id: device.userId, device_type: Platform.OS},
          token: this.props.token,
        })
          .then((res) => {})
          .catch((err) => {
            console.error('omnesignalPlayerIdeerr', err.response);
          });
      }
    });
  };

  async componentDidMount() {
    const {currentFilters} = this.props;

    await this.props.dispatch(
      FETCH_NEWSFEED({
        page: this.state.page,
        search: this.state.search,
        sort_by: currentFilters[0]?.sort ? currentFilters[0]?.sort : 'newest',
        proposal_count:
          currentFilters[0]?.proposal_count &&
          currentFilters[0]?.proposal_count,
        budget: currentFilters[0]?.bdRange && currentFilters[0]?.bdRange,
        project_timeline:
          currentFilters[0]?.timeline && currentFilters[0]?.timeline,
        categories_id:
          currentFilters[0]?.category && currentFilters[0]?.category,
      }),
    );
    this.props.dispatch(SETUP_NOTIFICATION_EVENTS());
    loginFirebase();
    // this.props.dispatch(SETUP_QUICKBLOX());
    this.props.dispatch(SETUP_FRESHCHAT_USER());
  }

  loadMoreNewsfeed = (page1) => {
    const {currentFilters} = this.props;
    // console.log('filters aplied', currentFilters);
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_newsfeed_page === true) {
        this.props.dispatch(
          FETCH_MORE_NEWSFEED({
            page: page1 + 1,
            sort_by: currentFilters[0]?.sort
              ? currentFilters[0]?.sort
              : 'newest',
            proposal_count:
              currentFilters[0]?.proposal_count &&
              currentFilters[0]?.proposal_count,
            budget: currentFilters[0]?.bdRange && currentFilters[0]?.bdRange,
            project_timeline:
              currentFilters[0]?.timeline && currentFilters[0]?.timeline,
            categories_id:
              currentFilters[0]?.category && currentFilters[0]?.category,
            search: this.state.search,
          }),
        );
        this.setState({page: page1 + 1});
      }
    }
  };

  handleApply = (id, proposal) => {
    if (proposal?.published_at === '') {
      this.props.navigation.navigate('ProposalDetails', {
        id: proposal?.id,
      });
    } else {
      this.props.navigation.navigate('ProjectDetails', {
        projectId: id,
      });
    }
  };

  onRefresh = async () => {
    this.setState({isRefreshing: true});
    await this.props.dispatch(
      FETCH_NEWSFEED({page: 1, search: this.state.search}),
    );
    this.setState({isRefreshing: false});
  };
  handleSave = (id, status) => {
    this.props.dispatch(UPDATE_SAVE_STATUS({id, status}));
  };

  handleSearch = async (text) => {
    await this.setState({search: text});
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.search != this.state.search) {
      const {currentFilters} = this.props;
      await this.props.dispatch(
        FETCH_NEWSFEED({
          page: 1,
          search: this.state.search,
          sort_by: currentFilters[0]?.sort ? currentFilters[0]?.sort : 'newest',
          proposal_count:
            currentFilters[0]?.proposal_count &&
            currentFilters[0]?.proposal_count,
          budget: currentFilters[0]?.bdRange && currentFilters[0]?.bdRange,
          project_timeline:
            currentFilters[0]?.timeline && currentFilters[0]?.timeline,
          categories_id:
            currentFilters[0]?.category && currentFilters[0]?.category,
        }),
      );
    }
  }

  render() {
    const {
      loading,
      newsfeed,

      has_more_newsfeed_page,
      t,
      route,
      currentFilters,
      navigation,
    } = this.props;

    if (!loading && newsfeed.length === 0) {
      return (
        <>
          <Header
            title={t('jobs.jobs')}
            logo
            searchButton
            notificationButton
            navigation={this.props.navigation}
            onSearch={this.handleSearch}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
              {t('jobs.noData')}
            </Text>
          </View>

          <CustomButton
            handlePress={() => navigation.navigate('Filter')}
            mode={3}
            style={{position: 'absolute', bottom: 10, right: 20}}>
            <View
              style={
                currentFilters[0]?.filterCount === 0
                  ? [styles.filterBedge, {backgroundColor: 'transparent'}]
                  : styles.filterBedge
              }>
              {currentFilters[0]?.filterCount > 0 && (
                <Text
                  style={{
                    color: colors.defaultWhite,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  {currentFilters[0]?.filterCount}
                </Text>
              )}
            </View>
            <Icon name="filter" color={colors.defaultWhite} size={25} />
          </CustomButton>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={t('jobs.jobs')}
            logo
            searchButton
            notificationButton
            navigation={this.props.navigation}
            onSearch={this.handleSearch}
          />

          <Text style={styles.newsfeedText}>{t('jobs.newsfeed')}</Text>
          {Array(4)
            .fill()
            .map((_, i) => (
              <ShimmerCard key={i} />
            ))}
        </>
      );
    }
    return (
      <>
        <Header
          title={t('jobs.jobs')}
          logo
          searchButton
          notificationButton
          navigation={this.props.navigation}
          onSearch={this.handleSearch}
        />
        <ProfileCompleted />

        <Text style={styles.newsfeedText}>{t('jobs.newsfeed')}</Text>

        <View style={{flex: 1}}>
          <FlatList
            data={newsfeed}
            ListEmptyComponent={Array(4)
              .fill()
              .map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            renderItem={({item, index}) => (
              <View
                style={
                  index === newsfeed?.length - 1 && {
                    marginBottom: 5,
                  }
                }>
                <Newsfeed
                  title={item.title}
                  description={item.description}
                  postedBy={item.posted_by?.name}
                  time={item.published_at}
                  location={item.posted_by?.country}
                  budget={item.budget}
                  currency={item.currency}
                  handleApply={() => this.handleApply(item.id, item?.proposal)}
                  isSaved={item.is_saved}
                  handleSave={() => this.handleSave(item.id, item.is_saved)}
                  isLoading={loading}
                  moreLoading={has_more_newsfeed_page}
                  milestone={item.milestone}
                  timeline={item.timeline}
                  proposal={item?.proposal}
                  navigation={navigation}
                  id={item?.id}
                />

                {has_more_newsfeed_page && index === newsfeed?.length - 1 && (
                  <ShimmerCard />
                )}
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() =>
              this.setState({onEndReachedCalledDuringMomentum: false})
            }
            onEndReached={() => this.loadMoreNewsfeed(this.state.page)}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isRefreshing}
          />
          <CustomButton
            handlePress={() => navigation.navigate('Filter')}
            mode={3}
            style={{position: 'absolute', bottom: 10, right: 20}}>
            <View
              style={
                currentFilters[0]?.filterCount === 0
                  ? [styles.filterBedge, {backgroundColor: 'transparent'}]
                  : styles.filterBedge
              }>
              {currentFilters[0]?.filterCount > 0 && (
                <Text
                  style={{
                    color: colors.defaultWhite,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  {currentFilters[0]?.filterCount}
                </Text>
              )}
            </View>
            <Icon name="filter" color={colors.defaultWhite} size={25} />
          </CustomButton>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.jobsReducer.newsfeedLoading,
  newsfeed: state.jobsReducer.newsfeed,
  has_more_newsfeed_page: state.jobsReducer.has_more_newsfeed_page,
  token: state.myReducer.user.token,
  currentFilters: state.jobsReducer.currentFilters,
});

export default connect(mapStateToProps)(withTranslation()(Jobs));
