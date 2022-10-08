import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {FlatList, ScrollView, StatusBar, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {
  FETCH_MORE_SAVED_POST,
  FETCH_SAVED_POST,
  LOADER,
  UPDATE_SAVE_STATUS,
} from 'src/actions/action';
import Header from 'src/components/header/Header';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import Newsfeed from 'src/pages/jobs/newsfeed/Newsfeed';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Saved.styles';

class Saved extends Component {
  constructor(props) {
    super();
    this.state = {
      activeIndex: 1,

      savedData: [],
      isLoading: true,
      haveMorePages: false,
      page: 1,
      onReachEndLoadin: false,
      onEndReachedCalledDuringMomentum: false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.onLoadData();
  }
  onLoadData = () => {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(FETCH_SAVED_POST({page: 1}));
  };

  onMoreLoadData = (page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_saved_page === true) {
        this.props.dispatch(FETCH_MORE_SAVED_POST({page: page1 + 1}));

        this.setState({page: page1 + 1});
      }
    }
  };

  handleApply = (id) => {
    this.props.navigation.navigate('ProjectDetails', {
      projectId: id,
    });
  };

  handleSave = (id, status) => {
    this.props.dispatch(UPDATE_SAVE_STATUS({id, status}));
  };
  onRefresh = async () => {
    this.setState({isRefreshing: true});
    await this.onLoadData();
    this.setState({isRefreshing: false});
  };
  render() {
    const {loading, t} = this.props;
    if (loading) {
      return (
        <>
          <Header
            title={t('saved.saved')}
            backButton={true}
            navigation={this.props.navigation}
            notificationButton={true}
          />
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
        <StatusBar backgroundColor={colors.skyBlue} />
        <Header
          title="Saved"
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {this.props.savedPosts?.length === 0 ? (
           <View
           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
               style={{ width: 150,
                 height: 160,
                 alignSelf: 'center',}}
               source={require('src/assets/images/no-jobs.png')}
               resizeMode="contain"
             />
             <Text style={{fontSize: 16, color: colors.appGray, marginTop: 10, fontFamily: fonts.primary}}>{t('saved.noData')}</Text>
         </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={this.props.savedPosts}
              renderItem={({item, index}) => (
                <View
                  style={
                    index === this.state.savedData.length - 1 && {
                      marginBottom: 60,
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
                    handleApply={() => this.handleApply(item.id)}
                    isSaved={true}
                    handleSave={() => this.handleSave(item.id, true)}
                    milestone={item.milestone}
                    timeline={item.timeline}
                  />
                  {this.props.has_more_saved_page &&
                    index === this.props.savedPosts.length - 1 && (
                      <ShimmerCard />
                    )}
                </View>
              )}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => this.onMoreLoadData(this.state.page)}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  savedPosts: state.myReducer.savedPosts,
  loading: state.myReducer.loading,
  has_more_saved_page: state.myReducer.has_more_saved_page,
});

export default connect(mapStateToProps)(withTranslation()(Saved));
