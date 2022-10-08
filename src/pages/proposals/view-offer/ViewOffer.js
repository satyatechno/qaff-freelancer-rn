import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './ViewOffer.styles';
import {connect} from 'react-redux';
import moment from 'moment';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {FETCH_PROPOSAL_DETAILS} from 'src/actions/proposals';
import {LOADER} from 'src/actions/action';
import ShimmerDetails from 'src/components/shimmer/ShimmerDetails';
import {withTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {downloadFile} from 'src/helpers/downloadFile';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import fonts from 'src/styles/texts/fonts';

class ViewOffer extends Component {
  componentDidMount() {
    // this.props.dispatch(LOADER(true));
    this.props.dispatch(
      FETCH_PROPOSAL_DETAILS({id: this.props.route.params.id}),
    );
  }

  render() {
    const {proposalDetails, loading, t} = this.props;
    console.log('Propsal details', JSON.stringify(proposalDetails, null, 2));
    if (!proposalDetails && !loading) {
      return (
        <>
          <Header
            title={t('viewOffer.viewOffer')}
            backButton
            navigation={this.props.navigation}
            notificationButton
          />

<View
           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
               style={{ width: 150,
                 height: 160,
                 alignSelf: 'center',}}
               source={require('src/assets/images/no-jobs.png')}
               resizeMode="contain"
             />
             <Text style={{fontSize: 16, color: colors.appGray, marginTop: 10, fontFamily: fonts.primary}}>{t('viewOffer.noData')}</Text>
         </View>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={t('viewOffer.viewOffer')}
            backButton
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
          title={t('viewOffer.viewOffer')}
          backButton
          navigation={this.props.navigation}
          notificationButton
        />

        <ScrollView style={styles.container}>
          <View style={styles.titleAndBudgetContainer}>
            <Text style={styles.titleText}>
              {proposalDetails?.project?.title}
            </Text>
            <Text style={styles.budgetText}>
              {/* {proposalDetails?.project?.currency === 'sar' ? ( */}
              <Text>
                SR {proposalDetails?.project?.budget?.sar?.from}-
                {proposalDetails?.project?.budget?.sar?.to}
              </Text>
              {/* ) : (
                <Text>
                  USD {proposalDetails?.project?.budget?.usd?.from}-
                  {proposalDetails?.project?.budget?.usd?.to}
                </Text>
              )} */}
            </Text>
          </View>

          <Text style={styles.description}>{proposalDetails?.descripiton}</Text>
          <Text style={styles.timelineText}>{t('viewOffer.timeline')}</Text>
          <Text style={styles.timelineInfo}>
            {proposalDetails?.period} {t('viewOffer.days')}
          </Text>
          <Text style={styles.timelineText}>{t('viewOffer.price')}</Text>
          <Text
            style={[
              styles.milestonePrice,
              {borderBottomColor: colors.appGray, borderBottomWidth: 0.5},
            ]}>
            {proposalDetails?.price_currency === 'sar' ? 'SR ' : 'USD '}{' '}
            {proposalDetails?.price}
          </Text>
          <Text style={styles.milestoneText}>
            {t('viewOffer.milestonePayments')}
          </Text>

          {proposalDetails?.milestones?.map((item, i) => (
            <View style={styles.milestoneItem} key={i}>
              <Text style={styles.milestoneInfo}>
                {item.name}
                <Text style={{color: colors.appGray, fontSize: 14}}>
                  {' '}
                  ({moment.unix(item.due_date).format('DD/MM/YYYY')})
                </Text>
              </Text>
              <Text style={styles.milestonePrice}>
                {proposalDetails?.price_currency === 'sar' ? 'SR ' : 'USD '}
                {item.amount}
              </Text>
            </View>
          ))}

          <Text style={styles.attachmentText}>
            {proposalDetails?.files?.length > 0
              ? t('viewOffer.attachment')
              : t('viewOffer.noAttachment')}
          </Text>
          {/* <View style={styles.attachmentOuterContainer}>
            {proposalDetails?.files?.map((item, i) => {
              return (
                <View style={styles.attachmentContainer} key={i}>
                  <Image
                    style={styles.attachmentImage}
                    source={{ uri: item.path }}
                  />
                  <Text style={styles.attachmentName}> {item.name}</Text>
                </View>
              );
            })}
          </View> */}
          <View style={styles.attachmentOuterContainer}>
            {proposalDetails.files?.map((item, i) => {
              return (
                <View style={styles.attachmentContainer} key={i}>
                  {item.mime_type.includes('image') ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ImageViewer', {
                          uri: proposalDetails.files,
                          id: item?.id
                        });
                      }}>
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
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  proposalDetails: state.proposalsReducer.proposalDetails,
  loading: state.proposalsReducer.isProposalDetailLoading,
});

export default connect(mapStateToProps)(withTranslation()(ViewOffer));
