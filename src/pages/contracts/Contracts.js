import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, FlatList, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SegmentTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_CONTRACTS, FETCH_MORE_CONTRACTS} from 'src/actions/contracts';
import Header from 'src/components/header/Header';
import ShimmerCard from 'src/components/shimmer/ShimmerCard';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import ContractCard from './contract-card/ContractCard';
import styles from './Contracts.styles';

function Contracts(props) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  // const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loading = useSelector(
    (state) => state.contractsReducer.isContractLoading,
  );
  const activeContracts = useSelector(
    (state) => state.contractsReducer.activeContracts,
  );
  const closedContracts = useSelector(
    (state) => state.contractsReducer.closedContracts,
  );
  const disputedContracts = useSelector(
    (state) => state.contractsReducer.disputedContracts,
  );
  const has_more_contracts_page = useSelector(
    (state) => state.contractsReducer.has_more_contracts_page,
  );
  const {t} = useTranslation();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchData('active');
    }, []),
  );
  const fetchData = (type) => {
    // this.setState({page: 1});
    setPage(1);

    dispatch(FETCH_CONTRACTS({page: 1, type: type}));
  };
  const fetchMoredata = (type, page1) => {
    // console.log('more', has_more_contracts_page);
    if (!onEndReachedCalledDuringMomentum) {
      // this.setState({onEndReachedCalledDuringMomentum: true});
      setOnEndReachedCalledDuringMomentum(true);
      if (has_more_contracts_page === true) {
        // console.log('if k ander');
        dispatch(FETCH_MORE_CONTRACTS({type: type, page: page1 + 1}));
        // this.setState({page: page1 + 1});
        setPage(page1 + 1);
      }
    }
  };
  const onRefresh = async (type) => {
    // this.setState({isRefreshing: true});
    setIsRefreshing(true);
    await fetchData(type);
    // this.setState({isRefreshing: false});
    setIsRefreshing(false);
  };

  if (loading) {
    return (
      <>
        <Header
          title={t('contracts.contracts')}
          logo
          searchButton
          notificationButton
          navigation={props.navigation}
        />
        <View style={styles.hederContainer}>
          <View style={{width: Dimensions.get('screen').width * 0.8}}>
            <SegmentTab
              values={[
                t('contracts.active'),
                t('contracts.closed'),
                t('contracts.disputed'),
              ]}
              selectedIndex={selectedTabIndex}
              onTabPress={(index) => {
                setSelectedTabIndex(index);
                index === 0
                  ? fetchData('active')
                  : index === 1
                  ? fetchData('completed')
                  : fetchData('disputed');
              }}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />
          </View>
          {/* <CustomButton
            handlePress={() => setToggle(!toggle)}
            style={styles.iconContainer}>
            {toggle ? (
              <Icon name="arrow-up" size={18} color={colors.defaultWhite} />
            ) : (
              <Icon name="arrow-down" size={18} color={colors.defaultWhite} />
            )}
          </CustomButton> */}
        </View>
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
        title={t('contracts.contracts')}
        logo
        searchButton
        notificationButton
        navigation={props.navigation}
      />
      {/* {toggle && (
        <View style={styles.toggleContainer}>
          <CustomButton
            style={styles.toggleMenuItem}
            handlePress={() => {
              setToggle(!toggle);
            }}>
            <Text style={styles.toggleMenuText}>
              {t('contracts.cancelledProjects')}
            </Text>
          </CustomButton>
          <View style={styles.devider} />
          <CustomButton
            style={styles.toggleMenuItem}
            handlePress={() => {
              setToggle(!toggle);
            }}>
            <Text style={styles.toggleMenuText}>
              {t('contracts.disputedProjects')}
            </Text>
          </CustomButton>
        </View>
      )} */}
      <View style={styles.hederContainer}>
        <View style={{width: Dimensions.get('screen').width * 0.8}}>
          <SegmentTab
            values={[
              t('contracts.active'),
              t('contracts.closed'),
              t('contracts.disputed'),
            ]}
            selectedIndex={selectedTabIndex}
            onTabPress={(index) => {
              setSelectedTabIndex(index);
              index === 0
                ? fetchData('active')
                : index === 1
                ? fetchData('completed')
                : fetchData('disputed');
            }}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
          />
        </View>
        {/* <CustomButton
          handlePress={() => setToggle(!toggle)}
          style={styles.iconContainer}>
          {toggle ? (
            <Icon name="arrow-up" size={18} color={colors.defaultWhite} />
          ) : (
            <Icon name="arrow-down" size={18} color={colors.defaultWhite} />
          )}
        </CustomButton> */}
      </View>

      {selectedTabIndex === 0 ? (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
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
                {t('contracts.noData')}
              </Text>
            </View>
          }
          data={activeContracts}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={
                index === activeContracts?.length - 1 && {marginBottom: 30}
              }>
              <ContractCard
                id={item?.id}
                title={item?.title}
                description={item?.work_details}
                budget={item?.amount}
                user={item?.employer.name}
                navigation={props.navigation}
              />
              {has_more_contracts_page &&
                index === activeContracts?.length - 1 && <ShimmerCard />}
            </View>
          )}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
          onEndReached={() => {
            console.log('object');
            fetchMoredata('active', page);
          }}
          onRefresh={() => onRefresh('active')}
          refreshing={isRefreshing}
        />
      ) : selectedTabIndex === 1 ? (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
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
                {t('contracts.noData')}
              </Text>
            </View>
          }
          data={closedContracts}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={
                index === closedContracts?.length - 1 && {marginBottom: 30}
              }>
              <ContractCard
                id={item?.id}
                title={item?.title}
                description={item?.work_details}
                budget={item?.amount}
                user={item?.employer.name}
                navigation={props.navigation}
              />
              {has_more_contracts_page &&
                index === closedContracts?.length - 1 && <ShimmerCard />}
            </View>
          )}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
          onEndReached={() => {
            fetchMoredata('completed', page);
          }}
          onRefresh={() => onRefresh('completed')}
          refreshing={isRefreshing}
        />
      ) : (
        <FlatList
          data={disputedContracts}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
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
                {t('contracts.noData')}
              </Text>
            </View>
          }
          renderItem={({item, index}) => (
            <View
              style={
                index === disputedContracts?.length - 1 && {marginBottom: 30}
              }>
              <ContractCard
                id={item?.id}
                title={item?.title}
                description={item?.work_details}
                budget={item?.amount}
                user={item?.employer.name}
                navigation={props.navigation}
              />
              {has_more_contracts_page &&
                index === disputedContracts?.length - 1 && <ShimmerCard />}
            </View>
          )}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
          onEndReached={() => {
            fetchMoredata('disputed', page);
          }}
          onRefresh={() => onRefresh('disputed')}
          refreshing={isRefreshing}
        />
      )}
    </>
  );
}
// const mapStateToProps = (state) => ({
//   loading: state.myReducer.loading,
//   activeContracts: state.contractsReducer.activeContracts,
//   closedContracts: state.contractsReducer.closedContracts,
//   has_more_contracts_page: state.contractsReducer.has_more_contracts_page,
// });
export default Contracts;
