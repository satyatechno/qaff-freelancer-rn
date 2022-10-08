import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {
  FETCH_MORE_PROPOSAL_LIST,
  FETCH_PROPOSAL_LIST,
  FETCH_INVITATIONS,
  FETCH_OFFERS,
  FETCH_MORE_INVITATIONS,
  FETCH_MORE_OFFERS,
} from 'src/actions/proposals';
import Header from 'src/components/header/Header';
import InvitationCard from 'src/components/invitation-card/InvitationCard';
import OfferCard from 'src/components/offer-card/OfferCard';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import ProposalCard from '../proposal-card/ProposalCard';

export class ProposalLists extends Component {
  state = {
    page: 1,
    onEndReachedCalledDuringMomentum: true,
    isRefreshing: false,
    search: '',
  };

  componentDidMount() {
    const {proposalType} = this.props.route?.params;
    if (proposalType === 'invitation')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'pending',
          search: this.state.search,
        }),
      );
    else if (proposalType === 'invitationDeclined')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'rejected',
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offer')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'pending',
          page: 1,
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offerExpired')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'expired',
          page: 1,
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offerDeclined')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'rejected',
          page: 1,
          search: this.state.search,
        }),
      );
    else if (proposalType === 'invitationExpired')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'expired',
          search: this.state.search,
        }),
      );
    else this.onLoadData(this.props.route?.params?.proposalType);
  }
  onLoadData(type) {
    this.setState({page: 1});
    this.props.dispatch(LOADER(true));
    this.props.dispatch(
      FETCH_PROPOSAL_LIST({type: type, page: 1, search: this.state.search}),
    );
  }
  onMoreLoadData(type, page1) {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (
        type === 'invitation' &&
        this.props.has_more_pending_invitations === true
      ) {
        this.props.dispatch(
          FETCH_MORE_INVITATIONS({
            type: 'pending',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else if (
        type === 'invitationExpired' &&
        this.props.has_more_expired_invitations === true
      ) {
        this.props.dispatch(
          FETCH_MORE_INVITATIONS({
            type: 'expired',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else if (
        type === 'invitationDeclined' &&
        this.props.has_more_declined_invitations === true
      ) {
        this.props.dispatch(
          FETCH_MORE_INVITATIONS({
            type: 'rejected',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else if (
        type === 'offer' &&
        this.props.has_more_pending_offers === true
      ) {
        this.props.dispatch(
          FETCH_MORE_OFFERS({
            type: 'pending',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else if (
        type === 'offerDeclined' &&
        this.props.has_more_declined_offers === true
      ) {
        this.props.dispatch(
          FETCH_MORE_OFFERS({
            type: 'rejected',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else if (
        type === 'offerExpired' &&
        this.props.has_more_expired_offers === true
      ) {
        this.props.dispatch(
          FETCH_MORE_OFFERS({
            type: 'expired',
            page: page1 + 1,
            search: this.state.search,
          }),
        );
      } else {
        if (this.props.has_more_proposals_page === true) {
          this.props.dispatch(
            FETCH_MORE_PROPOSAL_LIST({
              type: type,
              page: page1 + 1,
              search: this.state.search,
            }),
          );
          this.setState({page: page1 + 1});
        }
      }
    }
  }
  onRefresh = async () => {
    this.setState({isRefreshing: true});
    const {proposalType} = this.props.route?.params;
    if (proposalType === 'invitation')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'pending',
          search: this.state.search,
        }),
      );
    else if (proposalType === 'invitationDeclined')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'rejected',
          search: this.state.search,
        }),
      );
    else if (proposalType === 'invitationExpired')
      this.props.dispatch(
        FETCH_INVITATIONS({
          page: 1,
          type: 'expired',
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offer')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'pending',
          page: 1,
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offerExpired')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'expired',
          page: 1,
          search: this.state.search,
        }),
      );
    else if (proposalType === 'offerDeclined')
      this.props.dispatch(
        FETCH_OFFERS({
          type: 'rejected',
          page: 1,
          search: this.state.search,
        }),
      );
    else this.onLoadData(this.props.route?.params?.proposalType);
    this.setState({isRefreshing: false});
  };

  handleSearch = (text) => {
    this.setState({search: text});
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.search != this.state.search) {
      const {proposalType} = this.props.route?.params;
      await this.props.dispatch(LOADER(true));
      if (proposalType === 'invitation')
        this.props.dispatch(
          FETCH_INVITATIONS({
            page: 1,
            type: 'pending',
            search: this.state.search,
          }),
        );
      else if (proposalType === 'invitationDeclined')
        this.props.dispatch(
          FETCH_INVITATIONS({
            page: 1,
            type: 'rejected',
            search: this.state.search,
          }),
        );
      else if (proposalType === 'invitationExpired')
        this.props.dispatch(
          FETCH_INVITATIONS({
            page: 1,
            type: 'expired',
            search: this.state.search,
          }),
        );
      else if (proposalType === 'offer')
        this.props.dispatch(
          FETCH_OFFERS({
            type: 'pending',
            page: 1,
            search: this.state.search,
          }),
        );
      else if (proposalType === 'offerExpired')
        this.props.dispatch(
          FETCH_OFFERS({
            type: 'expired',
            page: 1,
            search: this.state.search,
          }),
        );
      else if (proposalType === 'offerDeclined')
        this.props.dispatch(
          FETCH_OFFERS({
            type: 'rejected',
            page: 1,
            search: this.state.search,
          }),
        );
      else {
        await this.props.dispatch(
          FETCH_PROPOSAL_LIST({
            type: this.props.route?.params?.proposalType,
            page: 1,
            search: this.state.search,
          }),
        );
        // this.onLoadData(this.props.route?.params?.proposalType);
      }

      this.setState({isRefreshing: false});
    }
  }

  render() {
    const {
      route: {
        params: {headerTitle, proposalType},
      },
      activeProposals,
      draftProposals,
      submittedProposals,
      archivedProposals,
      has_more_proposals_page,
      pendingInvitations,
      loading,
      declinedInvitations,
      pendingOffers,
      expiredInvitations,
      expiredOffers,
      declinedOffers,
      t,
    } = this.props;

    let data =
      proposalType === 'published'
        ? submittedProposals
        : proposalType === 'active'
        ? activeProposals
        : proposalType === 'draft'
        ? draftProposals
        : proposalType === 'archived'
        ? archivedProposals
        : proposalType === 'invitation'
        ? pendingInvitations
        : proposalType === 'invitationDeclined'
        ? declinedInvitations
        : proposalType === 'offer'
        ? pendingOffers
        : proposalType === 'invitationExpired'
        ? expiredInvitations
        : proposalType === 'offerExpired'
        ? expiredOffers
        : proposalType === 'offerDeclined'
        ? declinedOffers
        : [];

    if (!loading && data?.length === 0) {
      return (
        <>
          <Header
            title={headerTitle}
            backButton
            notificationButton
            navigation={this.props.navigation}
            searchButton
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
              {i18n.t('proposalLists.noData')}
            </Text>
          </View>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Header
            title={headerTitle}
            backButton
            notificationButton
            navigation={this.props.navigation}
            searchButton
            onSearch={this.handleSearch}
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
        <Header
          title={headerTitle}
          backButton
          notificationButton
          searchButton
          navigation={this.props.navigation}
          onSearch={this.handleSearch}
        />
        <View style={{flex: 1}}>
          {proposalType === 'published' ? (
            <FlatList
              data={submittedProposals}
              initialNumToRender={5}
              renderItem={({item, index}) => (
                <View
                  style={
                    index === submittedProposals?.length - 1 && {
                      marginBottom: 20,
                    }
                  }>
                  <ProposalCard
                    item={item}
                    navigation={this.props.navigation}
                    isLoading={loading}
                  />
                  {has_more_proposals_page &&
                    index === submittedProposals?.length - 1 && <ShimmerCard />}
                </View>
              )}
              keyExtractor={(item) => item?.id?.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => {
                this.onMoreLoadData('published', this.state.page);
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          ) : proposalType === 'draft' ? (
            <FlatList
              data={draftProposals}
              renderItem={({item, index}) => (
                <View
                  style={
                    index === draftProposals?.length - 1 && {
                      marginBottom: 20,
                    }
                  }>
                  <ProposalCard
                    item={item}
                    navigation={this.props.navigation}
                  />
                  {has_more_proposals_page &&
                    index === draftProposals?.length - 1 && <ShimmerCard />}
                </View>
              )}
              keyExtractor={(item) => item?.id?.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => {
                this.onMoreLoadData('draft', this.state.page);
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          ) : proposalType === 'active' ? (
            <FlatList
              data={activeProposals}
              renderItem={({item, index}) => (
                <View
                  style={
                    index === activeProposals?.length - 1 && {
                      marginBottom: 20,
                    }
                  }>
                  <ProposalCard
                    item={item}
                    navigation={this.props.navigation}
                  />
                  {has_more_proposals_page &&
                    index === activeProposals?.length - 1 && <ShimmerCard />}
                </View>
              )}
              keyExtractor={(item) => item?.id?.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => {
                this.onMoreLoadData('active', this.state.page);
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          ) : proposalType === 'archived' ? (
            <FlatList
              data={archivedProposals}
              renderItem={({item, index}) => (
                <View
                  style={
                    index === archivedProposals?.length - 1 && {
                      marginBottom: 20,
                    }
                  }>
                  <ProposalCard
                    item={item}
                    navigation={this.props.navigation}
                  />
                  {has_more_proposals_page &&
                    index === archivedProposals?.length - 1 && <ShimmerCard />}
                </View>
              )}
              keyExtractor={(item) => item?.id?.toString()}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              onEndReached={() => {
                this.onMoreLoadData('archived', this.state.page);
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          ) : proposalType === 'invitation' ? (
            <>
              <FlatList
                data={pendingInvitations}
                renderItem={({item, index}) => (
                  <InvitationCard
                    item={item}
                    navigation={this.props.navigation}
                    invitationExpiryDays={
                      this.props?.route?.params?.statistics
                        ?.invitation_expiry_time?.value
                    }
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('invitation', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : proposalType === 'invitationDeclined' ? (
            <>
              <FlatList
                data={declinedInvitations}
                renderItem={({item, index}) => (
                  <InvitationCard
                    item={item}
                    navigation={this.props.navigation}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('invitationDeclined', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : proposalType === 'offer' ? (
            <>
              <FlatList
                data={pendingOffers}
                renderItem={({item, index}) => (
                  <OfferCard
                    item={item}
                    navigation={this.props.navigation}
                    statistics={this.props?.route?.params?.statistics}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('offer', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : proposalType === 'invitationExpired' ? (
            <>
              <FlatList
                data={expiredInvitations}
                renderItem={({item, index}) => (
                  <InvitationCard
                    item={item}
                    navigation={this.props.navigation}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('invitationExpired', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : proposalType === 'offerExpired' ? (
            <>
              <FlatList
                data={expiredOffers}
                renderItem={({item, index}) => (
                  <OfferCard
                    item={item}
                    navigation={this.props.navigation}
                    statistics={this.props?.route?.params?.statistics}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('offerExpired', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : proposalType === 'offerDeclined' ? (
            <>
              <FlatList
                data={declinedOffers}
                renderItem={({item, index}) => (
                  <OfferCard
                    item={item}
                    navigation={this.props.navigation}
                    statistics={this.props?.route?.params?.statistics}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() =>
                  this.setState({onEndReachedCalledDuringMomentum: false})
                }
                onEndReached={() => {
                  this.onMoreLoadData('offerDeclined', this.state.page);
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </>
          ) : null}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  activeProposals: state.proposalsReducer.activeProposals,
  draftProposals: state.proposalsReducer.draftProposals,
  submittedProposals: state.proposalsReducer.submittedProposals,
  archivedProposals: state.proposalsReducer.archivedProposals,
  totalActiveProposals: state.proposalsReducer.totalActiveProposals,
  totalDraftProposals: state.proposalsReducer.totalDraftProposals,
  has_more_proposals_page: state.proposalsReducer.has_more_proposals_page,
  pendingInvitations: state.proposalsReducer.pendingInvitations,
  pendingOffers: state.proposalsReducer.pendingOffers,
  expiredOffers: state.proposalsReducer.expiredOffers,
  declinedOffers: state.proposalsReducer.declinedOffers,
  declinedInvitations: state.proposalsReducer.declinedInvitations,
  expiredInvitations: state.proposalsReducer.expiredInvitations,
  has_more_pending_invitations:
    state.proposalsReducer.has_more_pending_invitations,
  has_more_pending_offers: state.proposalsReducer.has_more_pending_offers,
  has_more_declined_offers: state.proposalsReducer.has_more_declined_offers,
  has_more_expired_offers: state.proposalsReducer.has_more_expired_offers,
  has_more_expired_invitations:
    state.proposalsReducer.has_more_expired_invitations,

  has_more_declined_invitations:
    state.proposalsReducer.has_more_declined_invitations,
});

export default connect(mapStateToProps)(withTranslation()(ProposalLists));
