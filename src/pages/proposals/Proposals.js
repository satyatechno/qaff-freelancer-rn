import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, I18nManager, Text} from 'react-native';
import SegmentTab from 'react-native-segmented-control-tab';
import {useSelector} from 'react-redux';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import {fetchStatistics} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Proposals.styles';

const Proposals = ({navigation, route}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [statistics, setStatistics] = useState({});
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      setStatisticsLoading(true);
      fetchStatistics(token)
        .then((res) => {
          setStatistics(res.data?.data);
          console.log('Statistics', JSON.stringify(res?.data?.data, null, 2));
          setStatisticsLoading(false);
        })
        .catch((err) => {
          console.error('Couldnot get statistics', err);
          setStatisticsLoading(false);
        });
    }, []),
  );
  const handleProposal = ({name, id}) => {
    console.log(id);
    navigation.navigate('ProposalLists', {
      headerTitle: name,
      proposalType: id,
      statistics: statistics,
    });
  };

  const StatisticsCount = ({count}) =>
    statisticsLoading ? (
      <ActivityIndicator size={16} color={colors.appGreen} />
    ) : (
      <Text style={{paddingEnd: 5, fontSize: 16}}>{count}</Text>
    );
  return (
    <>
      <Header
        title={t('proposals.proposals')}
        logo
        searchButton
        notificationButton
        navigation={navigation}
      />

      <SegmentTab
        values={[t('proposals.active'), t('proposals.archived')]}
        selectedIndex={selectedTabIndex}
        onTabPress={(index) => {
          setSelectedTabIndex(index);
        }}
        tabsContainerStyle={styles.tabsContainerStyle}
        tabStyle={styles.tabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabStyle={styles.activeTabStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
      />

      {selectedTabIndex === 0 ? (
        <>
        <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.offers'),
                id: 'offer',
              })
            }>
            <Text style={styles.sectionText}>{t('proposals.offers')}</Text>
            <StatisticsCount
              count={statistics?.statics?.contracts?.pending ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.submittedProposal'),
                id: 'published',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.submittedProposal')}
            </Text>

            <StatisticsCount
              count={statistics?.statics?.proposals?.published ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.activeProposals'),
                id: 'active',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.activeProposals')}
            </Text>

            <StatisticsCount
              count={statistics?.statics?.proposals?.active ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.invitationToInterview'),
                id: 'invitation',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.invitationToInterview')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.invitations?.pending ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.draftProposals'),
                id: 'draft',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.draftProposals')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.proposals?.draft ?? 0}
            />
            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
         
        
         
          
        </>
      ) : (
        <>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.archivedProposals'),
                id: 'archived',
              })
            }>
            <Text style={styles.sectionText}>{t('proposals.proposals')}</Text>

            <StatisticsCount
              count={statistics?.statics?.proposals?.archived ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.invitationExpired'),
                id: 'invitationExpired',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.invitationExpired')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.invitations?.expired ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.invitationDeclined'),
                id: 'invitationDeclined',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.invitationDeclined')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.invitations?.declined ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.offerExpired'),
                id: 'offerExpired',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.offerExpired')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.contracts?.expired ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
          <CustomButton
            style={styles.sectionHeader}
            handlePress={() =>
              handleProposal({
                name: t('proposals.offerDeclined'),
                id: 'offerDeclined',
              })
            }>
            <Text style={styles.sectionText}>
              {t('proposals.offerDeclined')}
            </Text>
            <StatisticsCount
              count={statistics?.statics?.contracts?.rejected ?? 0}
            />

            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={15}
              color={colors.appViolet}
            />
          </CustomButton>
        </>
      )}
    </>
  );
};
// const mapStateToProps = (state) => ({
//   totalActiveProposals: state.proposalsReducer.totalActiveProposals,
//   totalDraftProposals: state.proposalsReducer.totalDraftProposals,
// });

export default Proposals;
