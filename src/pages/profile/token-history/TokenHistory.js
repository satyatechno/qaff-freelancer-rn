import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Header from 'src/components/header/Header';
import {tokenDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const TokenCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.pop();
        navigation.navigate('ProposalDetail', {
          id: item?.reference_id,
        });
        // navigation.navigate('Proposals', {
        //   screen: 'ProposalDetails',
        //   params: {id: item?.reference_id},
        // });
      }}
      disabled={item?.reference_type === null || item?.reference_id === null}
      style={{
        backgroundColor: colors.defaultWhite,
        paddingHorizontal: 10,
        paddingTop: 20,
      }}>
      <Text style={{fontSize: 12, color: colors.appGray}}>
        {moment.unix(item?.created_at).format('dddd, MMM DD')}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor:
              item?.transaction_type === 'cr' ? colors.appGreen : colors.appRed,
            borderRadius: 15,
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          {item?.transaction_type === 'cr' ? (
            <Ionicons
              name="add-outline"
              size={20}
              color={colors.defaultWhite}
            />
          ) : (
            <Ionicons
              name="remove-outline"
              size={20}
              color={colors.defaultWhite}
            />
          )}
        </View>
        <Text style={{paddingStart: 20, fontSize: 16, flex: 1}}>
          {item.reference_text?.length
            ? item?.reference_text.charAt(0).toUpperCase() +
              item?.reference_text.slice(1)
            : item?.remark}
        </Text>
        {item?.transaction_type === 'cr' ? (
          <Text
            style={{
              color: colors.appGreen,
              fontSize: 18,
              fontWeight: 'bold',
            }}>{`+${item?.token_count}`}</Text>
        ) : (
          <Text
            style={{
              color: colors.appRed,
              fontSize: 18,
              fontWeight: 'bold',
            }}>{`-${item?.token_count}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const TokenHistory = ({navigation, route: {params}}) => {
  const [tokenHistory, setTokenHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTokenBalance, setCurrentTokenBalance] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const startDateRbSheet = useRef();
  const [showStartRbSheet, setShowStartRbSheet] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const endDateRbSheet = useRef();
  const [showEndRbSheet, setShowEndRbSheet] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(false);
  const {t} = useTranslation();
  useEffect(() => {
    onLoadData();
  }, []);
  const onLoadData = () => {
    setLoading(true);
    tokenDetails({
      token: params?.token,
      from_date:
        startDate !== null ? moment(startDate).format('YYYY-MM-DD') : '',
      to_date: endDate !== null ? moment(endDate).format('YYYY-MM-DD') : '',
      page: 1,
    })
      .then((res) => {
        setTokenHistory(res?.data?.data?.token_history?.data);
        setCurrentTokenBalance(res?.data?.data?.current_token_balance);
        setHasMorePage(res.data.data?.token_history?.meta?.has_more_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Couldnot fetch token history', err?.response?.data);
        setLoading(false);
      });
  };
  const closeStartDatePicker = () => {
    setShowStartRbSheet(false);
  };
  useEffect(() => {
    showStartRbSheet === true && startDateRbSheet.current.open();
  }, [showStartRbSheet]);
  const handleStartDateRbSheet = async () => {
    setShowStartRbSheet(true);
    // showStartRbSheet === true && startDateRbSheet.current.open();
  };
  const closeEndDatePicker = () => {
    setShowEndRbSheet(false);
  };
  useEffect(() => {
    showEndRbSheet === true && endDateRbSheet.current.open();
  }, [showEndRbSheet]);
  const handleEndDateRbSheet = async () => {
    setShowEndRbSheet(true);
    // showEndRbSheet === true && wEndDateRbSheet.current.open();
  };
  const onFilterAply = () => {
    if (startDate == null) {
      alert(t('tokenHistory.selectStartDate'));
    } else if (endDate == null) {
      alert(t('tokenHistory.selectEndDate'));
    } else {
      onLoadData();
    }
  };
  const loadMoreNewsfeed = (page1) => {
    // console.log('filters aplied', currentFilters);
    if (onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true);
      if (hasMorePage === true) {
        setLoading(true);
        tokenDetails({
          token: params?.token,
          from_date:
            startDate !== null ? moment(startDate).format('YYYY-MM-DD') : '',
          to_date: endDate !== null ? moment(endDate).format('YYYY-MM-DD') : '',
          page: page1 + 1,
        })
          .then((res) => {
            setTokenHistory([
              ...tokenHistory,
              ...res?.data?.data?.token_history?.data,
            ]);
            setCurrentTokenBalance(res?.data?.data?.current_token_balance);
            setHasMorePage(res.data.data?.token_history?.meta?.has_more_pages);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Couldnot fetch token history', err?.response?.data);
            setLoading(false);
          });
        setPage(page1 + 1);
      }
    }
  };
  return (
    <>
      <Header
        title={t('tokenHistory.tokenHistory')}
        backButton
        notificationButton
        navigation={navigation}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.skyBlue}
          style={{flex: 1}}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.tokenBalanceText}>
            <Text style={styles.availableText}>
              {t('tokenHistory.availableBalance')}
            </Text>
            <Text style={styles.remainingTokens}>
              {currentTokenBalance ?? 0}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View>
              <Text style={{color: colors.appGray}}>
                {t('tokenHistory.fromDate')}
              </Text>
              <TouchableOpacity
                onPress={handleStartDateRbSheet}
                style={{
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.appViolet,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: colors.defaultWhite, fontSize: 14}}>
                  {startDate
                    ? moment(startDate).format('DD/MM/YYYY')
                    : t('tokenHistory.selectStartDate')}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{color: colors.appGray}}>
                {t('tokenHistory.toDate')}
              </Text>
              <TouchableOpacity
                disabled={startDate == null}
                onPress={handleEndDateRbSheet}
                style={{
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.appViolet,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: colors.defaultWhite, fontSize: 14}}>
                  {endDate
                    ? moment(endDate).format('DD/MM/YYYY')
                    : t('tokenHistory.selectEndDate')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => onFilterAply()}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.appGreen,
                borderRadius: 10,
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              <Text style={{color: colors.defaultWhite, fontSize: 14}}>
                {t('tokenHistory.filter')}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={tokenHistory}
            renderItem={({item, index}) => (
              <>
                <TokenCard
                  key={item?.id.toString()}
                  item={item}
                  navigation={navigation}
                />
                {hasMorePage && index === tokenHistory.length - 1 && (
                  <ActivityIndicator
                    size={25}
                    style={{alignItems: 'center', marginVertical: 10}}
                    color={colors.skyBlue}
                  />
                )}
              </>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{t('tokenHistory.noTokenHistory')}</Text>
              </View>
            )}
            keyExtractor={(item) => item?.id.toString()}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() =>
              setonEndReachedCalledDuringMomentum(false)
            }
            onEndReached={() => loadMoreNewsfeed(page)}
          />
        </View>
      )}
      {showStartRbSheet && (
        <RBSheet
          closeOnDragDown
          closeOnPressBack
          closeOnPressMask
          onClose={closeStartDatePicker}
          ref={startDateRbSheet}
          height={250}
          openDuration={250}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 30,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <Text>{t('tokenHistory.selectDate')}</Text>
            <TouchableOpacity onPress={closeStartDatePicker}>
              <Text style={{fontSize: 16}}>{t('tokenHistory.done')}</Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            androidVariant="iosClone"
            date={startDate ?? new Date()}
            // minimumDate={new Date()}
            maximumDate={new Date()}
            onDateChange={(date) => {
              setStartDate(date);
            }}
            mode={'date'}
            style={{
              alignSelf: 'center',
            }}
          />
        </RBSheet>
      )}
      {showEndRbSheet && (
        <RBSheet
          closeOnDragDown
          closeOnPressBack
          closeOnPressMask
          onClose={closeEndDatePicker}
          ref={endDateRbSheet}
          height={250}
          openDuration={250}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 30,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <Text>{t('tokenHistory.selectDate')}</Text>
            <TouchableOpacity onPress={closeEndDatePicker}>
              <Text style={{fontSize: 16}}>{t('tokenHistory.done')}</Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            androidVariant="iosClone"
            date={endDate ?? new Date()}
            minimumDate={startDate}
            maximumDate={new Date()}
            onDateChange={(date) => {
              setEndDate(date);
            }}
            mode={'date'}
            style={{
              alignSelf: 'center',
            }}
          />
        </RBSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  tokenBalanceText: {
    backgroundColor: colors.defaultWhite,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  availableText: {
    fontSize: 14,
    color: colors.appBlack,
  },
  remainingTokens: {
    color: colors.appGreen,
    fontSize: 25,
    paddingTop: 5,
  },
});

export default TokenHistory;
