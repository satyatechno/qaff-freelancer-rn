import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {UPDATE_SAVE_STATUS} from 'src/actions/action';
import {FETCH_PROJECT_DETAILS} from 'src/actions/jobs';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import ShimmerDetails from 'src/components/shimmer/ShimmerDetails';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {downloadFile} from 'src/helpers/downloadFile';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './ProjectDetails.styles';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

class ProjectDetails extends Component {
  componentDidMount() {
    this.props.dispatch(
      FETCH_PROJECT_DETAILS({projectId: this.props.route.params?.projectId}),
    );
  }

  handleSave = (id, status) => {
    this.props.dispatch(UPDATE_SAVE_STATUS({id, status}));
  };

  render() {
    const {projectDetails, loading, navigation, t} = this.props;
    console.log('skills', JSON.stringify(projectDetails?.skills, null, 2));
    if (!projectDetails && !loading) {
      return (
        <>
          <Header
            title={t('projectDetails.projectDetails')}
            cancelButton
            navigation={this.props.navigation}
            notificationButton
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
              {t('projectDetails.noData')}
            </Text>
          </View>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={t('projectDetails.projectDetails')}
            cancelButton
            navigation={this.props.navigation}
            notificationButton
          />
          <ShimmerDetails />
        </>
      );
    }
    return (
      <>
        <Header
          title={t('projectDetails.projectDetails')}
          cancelButton
          navigation={this.props.navigation}
          notificationButton
        />
        <Container style={styles.container}>
          <View style={styles.titleAndBudgetContainer}>
            <Text style={styles.titleText}>{projectDetails?.title}</Text>
            <Text style={styles.budgetText}>
              {/* {projectDetails.currency === 'sar' ? ( */}
              <Text>
                SR {projectDetails.budget?.sar?.from}-
                {projectDetails.budget?.sar?.to}
              </Text>
              {/* ) : (
                <Text>
                  USD {projectDetails.budget?.usd?.from}-
                  {projectDetails.budget?.usd?.to}
                </Text>
              )} */}
            </Text>
          </View>

          <View style={styles.experienceAndTimeContainer}>
            {/* <Text style={styles.experienceText}>{t("projectDetails.experience")}</Text> */}
            <Text style={styles.timeText}>
              {moment.unix(projectDetails.published_at).fromNow()}
            </Text>
          </View>

          <Text style={styles.postedBy}>{projectDetails.posted_by?.name}</Text>
          {projectDetails.posted_by?.country ? (
            <View style={styles.locationContainer}>
              <Icon name="location" size={15} color={colors.appBlack} />
              <Text style={styles.locationText}>
                {projectDetails.posted_by?.country}
              </Text>
            </View>
          ) : null}

          <Text style={styles.description}>{projectDetails.description}</Text>

          <Text style={styles.timelineText}>
            {t('projectDetails.timeline')}
          </Text>
          <Text style={styles.timelineInfo}>
            {projectDetails.timeline?.title}
          </Text>

          <Text style={styles.milestoneText}>
            {t('projectDetails.milestonePayments')}
          </Text>
          <Text style={styles.milestoneInfo}>
            {projectDetails.milestone?.title}
          </Text>
          <Text style={styles.milestoneText}>
            {t('projectDetails.proposals')}
          </Text>
          <Text style={styles.milestoneInfo}>
            {projectDetails?.proposals_count}{' '}
            {t('projectDetails.proposalsReceived')}
          </Text>

          {projectDetails?.skills !== null || '' ? (
            <>
              <Text style={styles.skillsText}>
                {t('projectDetails.skillsRequired')}
              </Text>
              <View style={styles.skillsInfo}>
                {projectDetails.skills?.map((x, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor: colors.appViolet,
                      padding: 10,
                      marginEnd: 5,
                      borderRadius: 10,
                      marginBottom: 5,
                    }}>
                    <Text style={{color: colors.defaultWhite}}>{x}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          <Text style={styles.projectIdText}>
            {t('projectDetails.projectId')}
          </Text>
          <Text style={styles.projectIdInfo}>
            {projectDetails.project_serial}
          </Text>

          <Text style={styles.attachmentText}>
            {projectDetails.files?.length > 0
              ? t('projectDetails.attachment')
              : t('projectDetails.noAttachment')}
          </Text>

          <View style={styles.attachmentOuterContainer}>
            {projectDetails.files?.map((item, i) => {
              return (
                <View style={styles.attachmentContainer} key={i}>
                  {item.mime_type.includes('image') ? (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ImageViewer', {
                          uri: projectDetails?.files,
                          id: item?.id,
                        })
                      }>
                      <FastImage
                        style={styles.attachmentImage}
                        source={{uri: item.path}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        downloadFile({...item, type: item?.mime_type})
                      }
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                        flex: 0.2,
                      }}>
                      <ShowFileType file={{...item, type: item?.mime_type}} />
                    </TouchableOpacity>
                  )}

                  {/* <Text style={styles.attachmentName}> {item.name}</Text> */}
                </View>
              );
            })}
          </View>

          <View style={styles.footerButtonContainer}>
            <CustomButton
              handlePress={() =>
                this.handleSave(projectDetails?.id, projectDetails?.is_saved)
              }
              mode={2}
              style={styles.saveButton}>
              {projectDetails?.is_saved ? (
                <>
                  <Text style={styles.saveText}>
                    {t('projectDetails.saved')}
                  </Text>
                  <FontAwesome
                    name="star"
                    color={colors.defaultWhite}
                    size={15}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.saveText}>
                    {t('projectDetails.save')}
                  </Text>
                  <Icon name="star" color={colors.defaultWhite} size={15} />
                </>
              )}
            </CustomButton>
            <CustomButton
              disabled={projectDetails?.proposal?.published_at?.length > 0}
              handlePress={() => {
                if (projectDetails?.proposal?.published_at === '') {
                  this.props.navigation.navigate('ProposalDetails', {
                    id: projectDetails?.proposal?.id,
                  });
                } else {
                  navigation.navigate('MySuggestion', {
                    projectDetails: projectDetails,
                  });
                }
              }}
              mode={1}
              style={[
                styles.applyButton,
                projectDetails?.proposal?.published_at?.length > 0 && {
                  backgroundColor: colors.appGray,
                },
              ]}>
              <Text style={styles.applytext}>
                {projectDetails?.proposal?.published_at?.length > 0
                  ? t('projectDetails.applied')
                  : t('projectDetails.apply')}
              </Text>
              <Icon name="tick" color={colors.defaultWhite} size={15} />
            </CustomButton>
          </View>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projectDetails: state.jobsReducer.projectDetails,
  loading: state.jobsReducer.isProjectLoading,
});

export default connect(mapStateToProps)(withTranslation()(ProjectDetails));
