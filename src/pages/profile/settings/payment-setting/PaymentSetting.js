import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from 'src/components/header/Header';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from 'src/styles/texts/colors';
import {Icon} from 'src/Icon';
import {
  deleteBeneficiary,
  getBeneficiaryList,
  makeBeneficiaryDefault,
} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import Snackbar from 'react-native-snackbar';
import fonts from 'src/styles/texts/fonts';
import {useTranslation} from 'react-i18next';

const PaymentSetting = ({navigation}) => {
  const token = useSelector((state) => state.myReducer?.user?.token);

  const [beneficiary, setBeneficiary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const {t} = useTranslation();
  useFocusEffect(
    useCallback(() => {
      fetchBeneficiary();
    }, []),
  );

  const fetchBeneficiary = () => {
    setLoading(true);
    getBeneficiaryList({token: token})
      .then((res) => {
        console.log('ress', res.data.data);
        setBeneficiary(res.data.data?.beneficiary);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error', err);
        setLoading(false);
      });
  };
  const makeDefaultAccout = (beneficiaryId) => {
    makeBeneficiaryDefault({
      token: token,
      beneficiaryId: beneficiaryId,
    })
      .then((res) => {
        fetchBeneficiary();
        Snackbar.show({
          text: res.data.message,
          duration: 1200,
          backgroundColor: colors.appGreen,
          textColor: colors.defaultWhite,
        });
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          Snackbar.show({
            text: err?.response?.data?.message,
            duration: 1000,
            backgroundColor: colors.appRed,
            textColor: colors.defaultWhite,
          });
        }
      });
  };
  const onDeleleBeneficiary = (item) => {
    Alert.alert(
      t('paymentSetting.delete'),
      t('paymentSetting.deleteConfirmation'),
      [
        {
          text: t('paymentSetting.cancel'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: t('paymentSetting.ok'),
          onPress: async () => {
            setLoadingDelete(true);
            setDeleteId(item?.id);
            deleteBeneficiary({
              token: token,
              beneficiaryId: item?.id,
            })
              .then((res) => {
                setDeleteId('');

                let temp = beneficiary.filter((x) => x.id !== item?.id);
                console.log('temp', JSON.stringify(temp, null, 2));
                if (temp.length > 0 && item?.is_default) {
                  makeDefaultAccout(temp[0].id);
                } else {
                  setBeneficiary([...temp]);
                }
                setLoadingDelete(false);

                Snackbar.show({
                  text: res.data.message,
                  duration: 1200,
                  backgroundColor: colors.appGreen,
                  textColor: colors.defaultWhite,
                });
              })
              .catch((err) => {
                setDeleteId('');

                setLoadingDelete(false);

                if (err?.response?.data?.message) {
                  Snackbar.show({
                    text: err?.response?.data?.message,
                    duration: 1000,
                    backgroundColor: colors.appRed,
                    textColor: colors.defaultWhite,
                  });
                }
              });
          },
        },
      ],
      {cancelable: true},
    );
  };
  if (beneficiary.length == 0) {
    return (
      <>
        <Header
          title={t('paymentSetting.paymentDetails')}
          backButton={true}
          navigation={navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.primary,
              fontSize: 16,
            }}>
            {t('paymentSetting.noBeneficiaryAdded')} {'\n'}
            {t('paymentSetting.addBeneficiary')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPaymentDetails')}
          style={styles.addButton}
          activeOpacity={0.4}>
          <Icon
            name="add"
            size={35}
            color={colors.defaultWhite}
            style={{marginStart: 2}}
          />
        </TouchableOpacity>
      </>
    );
  }

  console.log('beneficiary', JSON.stringify(beneficiary, null, 2));

  return (
    <>
      <Header
        title={t('paymentSetting.paymentDetails')}
        backButton={true}
        navigation={navigation}
      />

      <ScrollView style={{flex: 1, paddingHorizontal: 10, paddingVertical: 5}}>
        {loading && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{marginHorizontal: 10}}>
              {t('paymentSetting.updating')}
            </Text>
            <ActivityIndicator size="small" color={colors.defaultBlack} />
          </View>
        )}
        {beneficiary.map((item, i) => (
          <React.Fragment key={item?.id?.toString()}>
            <View
              key={item?.id?.toString()}
              style={{
                backgroundColor: colors.defaultWhite,
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
              }}>
              {item?.type === 'account' ? (
                <React.Fragment key={item?.id?.toString()}>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          // fontWeight: 'bold',s
                          paddingEnd: 5,
                          fontFamily: fonts.primarySB,
                        },
                      ]}>
                      {t('paymentSetting.name')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',

                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          fontWeight: 'bold',
                          paddingEnd: 5,
                        },
                      ]}>
                      {t('paymentSetting.accountId')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',

                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.account_id}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          fontWeight: 'bold',
                          paddingEnd: 5,
                        },
                      ]}>
                      {t('paymentSetting.bankId')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',

                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.bank_id_bic}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          fontWeight: 'bold',
                          paddingEnd: 5,
                        },
                      ]}>
                      {t('paymentSetting.address1')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',

                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.payout_beneficiary_address_1}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          fontWeight: 'bold',
                          paddingEnd: 5,
                        },
                      ]}>
                      {t('paymentSetting.address2')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',

                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.payout_beneficiary_address_2}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          color: colors.appViolet,
                          fontWeight: 'bold',
                          paddingEnd: 5,
                        },
                      ]}>
                      {t('paymentSetting.address3')}
                    </Text>
                    <Text
                      style={[
                        styles.commonFontSize,
                        {
                          flexWrap: 'wrap',
                          flex: 1,
                          textAlign: 'right',
                          fontFamily: fonts.secondarySB,
                        },
                      ]}>
                      {item?.payout_beneficiary_address_3}
                    </Text>
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment key={item?.id?.toString()}>
                  <Text
                    style={[
                      styles.commonFontSize,
                      {
                        flexWrap: 'wrap',
                        flex: 1,
                        textAlign: 'left',
                        fontFamily: fonts.secondarySB,
                        color: colors.appViolet,
                      },
                    ]}>
                    {item?.type?.toUpperCase()}
                  </Text>
                  <Text
                    key={item?.id?.toString()}
                    style={styles.commonFontSize}>
                    {item?.ppl_receiver}
                  </Text>
                </React.Fragment>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                  paddingVertical: 5,
                }}>
                {item?.is_default ? (
                  <IconAnt
                    name="checkcircle"
                    size={25}
                    color={colors.appGreen1}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Make Primary Beneficiary',
                        'Set this beneficiary as primary.',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                          },
                          {
                            text: 'OK',
                            onPress: async () => {
                              makeDefaultAccout(item?.id);
                            },
                          },
                        ],
                        {cancelable: true},
                      );
                    }}>
                    <IconAnt
                      name="checkcircleo"
                      size={25}
                      color={colors.appGreen1}
                    />
                  </TouchableOpacity>
                )}
                <Text style={{color: colors.appGray}}>|</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddPaymentDetails', {
                      beneficiaryData: item,
                    })
                  }>
                  <IconAnt name="edit" size={25} color={colors.appYellow} />
                </TouchableOpacity>
                <Text style={{color: colors.appGray}}>|</Text>
                <TouchableOpacity
                  disabled={loadingDelete}
                  onPress={() => onDeleleBeneficiary(item)}>
                  {loadingDelete && item?.id === deleteId ? (
                    <ActivityIndicator size="small" color={colors.appRed} />
                  ) : (
                    <IconAnt name="delete" size={25} color={colors.appRed} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPaymentDetails')}
        style={styles.addButton}
        activeOpacity={0.4}>
        <Icon
          name="add"
          size={25}
          color={colors.defaultWhite}
          style={{marginStart: 0}}
        />
      </TouchableOpacity>
    </>
  );
};

export default PaymentSetting;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  commonFontSize: {
    fontSize: 18,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
  },
  addButton: {
    backgroundColor: colors.skyBlue,
    width: 60,
    height: 60,
    borderRadius: 30,

    position: 'absolute',

    right: 20,
    bottom: 20,

    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
