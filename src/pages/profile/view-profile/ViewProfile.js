import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {ActivityIndicator, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SegmentTab from 'react-native-segmented-control-tab';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import i18n from 'src/locale/i18n';
import {fetchReviews} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import Education from './education/Education';
import Employment from './employment/Employment';
import Expertise from './expertise/Expertise';
import PersonalInfo from './personal-info/PersonalInfo';
import Portfolio from './portfolio/Portfolio';
import Reviews from './reviews/Reviews';
import Skills from './skills/Skills';
import Summary from './summary/Summary';
import styles from './ViewProfile.styles';

// const REVIEW_DUMMY = [
//   {
//     title: 'Jone Kelly',
//     time: '1 month ago',
//     rating: 5,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod.',
//   },
//   {
//     title: 'Kristen Handy',
//     time: '3 month ago',
//     rating: 3.5,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod. Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod.',
//   },
//   {
//     title: 'Mike Ross',
//     time: '3 month ago',
//     rating: 2.2,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod. Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod.',
//   },
// ];

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
      edit: false,
      isLoading: false,
      editButton: false,
      reviewsLoading: false,
      reviews: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(LOADER(false));
    this.getReviews();
    if (this.props.route?.params) {
      this.setState({
        edit: true,
        editButton: true,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading === true) {
      if (!this.props.loading) {
        this.setState({
          edit: false,
          editButton: false,
        });
      }
    }
    if (prevProps.route !== this.props.route) {
      this.setState({
        edit: true,
        editButton: true,
      });
    }
  }

  handleEdit = () => {
    this.setState({edit: !this.state.edit, editButton: !this.state.edit});
  };
  handleUpdate = () => {
    const {userProfile, route} = this.props;
    let data = {
      title: route?.params?.title ? route?.params?.title : userProfile?.title,
      about: route?.params?.description
        ? route?.params?.description
        : userProfile?.about,
      skills: route?.params?.skills
        ? route?.params?.skills
        : userProfile?.skills,
      category_id: [6],
    };
    if (!data.title) {
      alert('Summary is required');
    } else {
      this.props.dispatch(LOADER(true));
      this.props.dispatch(UPDATE_PROFILE({data: data, modal: true}));
    }
  };
  getReviews = () => {
    this.setState({reviewsLoading: true});
    const {user} = this.props;
    fetchReviews({
      token: user?.token,
      id: user?.freelancer_profile?.id,
    })
      .then((res) => {
        // console.log(('reviews', res.data.data));
        this.setState({reviews: res.data.data?.ratings?.data});
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        this.setState({reviewsLoading: false});
      });
  };

  render() {
    const {userProfile, navigation, route, user, t} = this.props;

    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          notificationButton
          title={t('viewProfile.viewProfile')}
        />
        <Container style={styles.container}>
          <PersonalInfo
            profileImage={user?.freelancer_profile?.profile_image}
            coverImage={user?.freelancer_profile?.cover_image}
            title={userProfile?.title}
            location={
              user?.freelancer_profile?.country
                ? `${user?.freelancer_profile?.city},${user?.freelancer_profile?.country}`
                : ''
            }
            name={
              user?.freelancer_profile?.first_name +
              ' ' +
              user?.freelancer_profile?.last_name
            }
            rating={user?.freelancer_profile?.rating}
            gender={user?.freelancer_profile?.gender}
            navigation={navigation}
            handleEdit={this.handleEdit}
          />
          <SegmentTab
            values={[t('viewProfile.about'), t('viewProfile.reviews')]}
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
          {this.state.selectedTabIndex === 0 ? (
            <>
              <Summary
                title={
                  route?.params?.title
                    ? route?.params?.title
                    : userProfile?.title
                }
                discription={
                  route?.params?.description
                    ? route?.params?.description
                    : userProfile?.about
                }
                navigation={navigation}
                edit={this.state.edit}
              />
              <Expertise
                data={{
                  category: userProfile?.main_category,
                  subCategories: userProfile?.categories,
                }}
                navigation={navigation}
                edit={this.state.edit}
              />
              <Portfolio
                data={userProfile?.portfolio}
                edit={this.state.edit}
                navigation={navigation}
              />
              <Skills
                data={userProfile?.skills}
                edit={this.state.edit}
                navigation={navigation}
              />

              <Education
                data={userProfile?.educations}
                edit={this.state.edit}
                navigation={navigation}
              />
              <Employment
                data={userProfile?.employments}
                edit={this.state.edit}
                navigation={navigation}
              />
            </>
          ) : (
            <>
              {this.state.reviewsLoading ? (
                <ActivityIndicator size="large" color={colors.skyBlue} />
              ) : this.state.reviews?.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.primarySB,
                      fontSize: 16,
                      color: colors.appBlack,
                    }}>
                    {t('viewProfile.noReviewsYet')}
                  </Text>
                </View>
              ) : (
                <>
                  {this.state.reviews.map((item, index) => (
                    <Reviews key={item?.id.toString()} data={item} />
                  ))}
                </>
              )}
            </>
          )}
          {this.state.editButton ? (
            <CustomButton
              style={{margin: 16}}
              isLoading={this.props.loading}
              mode={1}
              handlePress={() => {
                this.handleUpdate();
              }}>
              <Text style={{alignSelf: 'center', color: colors.defaultWhite}}>
                {t('viewProfile.save')}
              </Text>
            </CustomButton>
          ) : null}
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfile: state.myReducer.userProfile,
  user: state.myReducer.user,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(ViewProfile));
