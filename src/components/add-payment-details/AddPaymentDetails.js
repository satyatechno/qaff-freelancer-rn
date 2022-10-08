import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import CustomButton from '../button/CustomButton';
import Header from '../header/Header';
import CustomInput from '../input/custom-input/CustomInput';
import {addBeneficiary, updateBeneficiary} from 'src/services/http.service';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import ErrorText from '../error-text/ErrorText';
import {useTranslation} from 'react-i18next';
import SegmentTab from 'react-native-segmented-control-tab';

export default function AddPaymentDetails({navigation, route}) {
  const token = useSelector((state) => state.myReducer?.user?.token);

  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [name, setName] = useState('');
  const [accountId, setAccountId] = useState('');
  const [bankId, setbankId] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentType, setPaymentType] = useState('account');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [paypalType, setPaypalType] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [paypalId, setPaypalId] = useState('');
  const {t} = useTranslation();

  const handleChange = (setKey, text) => {
    setKey(text);
  };

  const validate = () => {
    let nameError = '';
    let accountIdError = '';
    let bankIdError = '';
    let address1Error = '';
    let address2Error = '';
    let address3Error = '';
    let emailError = '';
    let phoneNoError = '';
    let paypalIdError = '';
    if (selectedTabIndex === 0) {
      if (!name.trim().length) {
        nameError = [t('addPaymentDetails.required')];
      } else {
        nameError = [];
      }
      if (!accountId.trim().length) {
        accountIdError = [t('addPaymentDetails.required')];
      } else {
        accountIdError = [];
      }
      if (!bankId.trim().length) {
        bankIdError = [t('addPaymentDetails.required')];
      } else {
        bankIdError = [];
      }
      if (!address1.trim().length) {
        address1Error = [t('addPaymentDetails.required')];
      } else {
        address1Error = [];
      }
      if (!address2.trim().length) {
        address2Error = [t('addPaymentDetails.required')];
      } else {
        address2Error = [];
      }
      if (!address3.trim().length) {
        address3Error = [t('addPaymentDetails.required')];
      } else {
        address3Error = [];
      }

      if (
        nameError.length ||
        accountIdError.length ||
        bankIdError.length ||
        address1Error.length ||
        address2Error.length ||
        address3Error.length
      ) {
        setError({
          ...error,
          name: nameError,
          accountId: accountIdError,
          bankId: bankIdError,
          address1: address1Error,
          address2: address2Error,
          address3: address3Error,
        });
        return false;
      }
    } else {
      if (!email.trim().length && paypalType === 'email') {
        emailError = [t('addPaymentDetails.required')];
      } else {
        emailError = [];
      }

      if (!phoneNo.trim().length && paypalType === 'phoneNo') {
        phoneNoError = [t('addPaymentDetails.required')];
      } else {
        phoneNoError = [];
      }

      if (!paypalId.trim().length && paypalType === 'paypalId') {
        paypalIdError = [t('addPaymentDetails.required')];
      } else {
        paypalIdError = [];
      }

      if (emailError.length || phoneNoError.length || paypalIdError.length) {
        setError({
          ...error,

          email: emailError,
          phoneNo: phoneNoError,
          paypalId: paypalIdError,
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    const isValidate = validate();
    if (isValidate) {
      setLoading(true);
      let accountData = {
        name: name,
        account_id: accountId,
        bank_id_bic: bankId,
        transfer_currency: 'sar',
        payout_beneficiary_address_1: address1,
        payout_beneficiary_address_2: address2,
        payout_beneficiary_address_3: address3,
        type: 'account',
      };
      let paypalData = {
        type: 'paypal',
        ppl_recipient_type:
          paypalType === 'email'
            ? 'EMAIL'
            : paypalType === 'phoneNo'
            ? 'PHONE'
            : 'PAYPAL_ID',
        ppl_receiver:
          paypalType === 'email'
            ? email
            : paypalType === 'phoneNo'
            ? phoneNo
            : paypalId,
        name: '123',
      };
      addBeneficiary({
        token: token,
        data: selectedTabIndex === 0 ? accountData : paypalData,
      })
        .then((res) => {
          setLoading(false);

          console.log('response Add Beneficiary', res.data);
          navigation?.goBack();
          Snackbar.show({
            text: res.data.message,
            duration: 1200,
            backgroundColor: colors.appGreen,
            textColor: colors.defaultWhite,
          });
        })
        .catch((err) => {
          setLoading(false);

          if (err?.response?.data?.message) {
            Snackbar.show({
              text: err?.response?.data?.message,
              duration: 1000,
              backgroundColor: colors.appRed,
              textColor: colors.defaultWhite,
            });
          }
          console.log('error', err);
        });
    }
  };

  useEffect(() => {
    if (route?.params?.beneficiaryData) {
      if (route?.params?.beneficiaryData?.type === 'account') {
        setSelectedTabIndex(0);
        const {beneficiaryData} = route?.params;

        setBeneficiaryId(beneficiaryData?.id);
        setName(beneficiaryData?.name);
        setAccountId(beneficiaryData?.account_id);
        setbankId(beneficiaryData?.bank_id_bic);
        setAddress1(beneficiaryData?.payout_beneficiary_address_1);
        setAddress2(beneficiaryData?.payout_beneficiary_address_2);
        setAddress3(beneficiaryData?.payout_beneficiary_address_3);
      } else {
        const {beneficiaryData} = route?.params;
        setBeneficiaryId(beneficiaryData?.id);

        setSelectedTabIndex(1);
        if (beneficiaryData?.ppl_recipient_type === 'EMAIL') {
          setPaypalType('email');
          setEmail(beneficiaryData?.ppl_receiver);
        }
        if (beneficiaryData?.ppl_recipient_type === 'PAYPAL_ID') {
          setPaypalType('paypalId');

          setPaypalId(beneficiaryData?.ppl_receiver);
        }
        if (beneficiaryData?.ppl_recipient_type === 'PHONE') {
          setPaypalType('phoneNo');

          setPhoneNo(beneficiaryData?.ppl_receiver);
        }
      }
    }
  }, []);

  const handleUpdate = () => {
    const isValidate = validate();
    if (isValidate) {
      setLoading(true);
      let accountData = {
        name: name,
        account_id: accountId,
        bank_id_bic: bankId,
        transfer_currency: 'sar',
        payout_beneficiary_address_1: address1,
        payout_beneficiary_address_2: address2,
        payout_beneficiary_address_3: address3,
        type: 'account',
      };
      let paypalData = {
        type: 'paypal',
        ppl_recipient_type:
          paypalType === 'email'
            ? 'EMAIL'
            : paypalType === 'phoneNo'
            ? 'PHONE'
            : 'PAYPAL_ID',
        ppl_receiver:
          paypalType === 'email'
            ? email
            : paypalType === 'phoneNo'
            ? phoneNo
            : paypalId,
        name: '123',
      };
      updateBeneficiary({
        token: token,
        beneficiaryId: beneficiaryId,
        data: selectedTabIndex === 0 ? accountData : paypalData,
      })
        .then((res) => {
          setLoading(false);

          console.log('response Add Beneficiary', res.data);
          Snackbar.show({
            text: res.data.message,
            duration: 1200,
            backgroundColor: colors.appGreen,
            textColor: colors.defaultWhite,
          });
        })
        .catch((err) => {
          setLoading(false);

          if (err?.response?.data?.message) {
            Snackbar.show({
              text: err?.response?.data?.message,
              duration: 1000,
              backgroundColor: colors.appRed,
              textColor: colors.defaultWhite,
            });
          }
          console.log('error', err);
        })
        .finally(() => {
          navigation?.goBack();
        });
    }
  };

  return (
    <>
      <Header
        title={t('addPaymentDetails.addBeneficiary')}
        backButton={true}
        navigation={navigation}
      />
      <SegmentTab
        values={[t('paymentSetting.account'), t('paymentSetting.paypal')]}
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
      <ScrollView style={{flex: 1}}>
        {selectedTabIndex === 0 ? (
          <>
            <Text style={styles.label}>
              {t('addPaymentDetails.accountHolderName')}
            </Text>
            <CustomInput
              style={[styles.input]}
              value={name}
              handleChange={handleChange}
              setKey={setName}
            />
            {error?.name?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.name[0]} />
            )}
            <Text style={styles.label}>{t('addPaymentDetails.accountId')}</Text>
            <CustomInput
              style={[styles.input]}
              value={accountId}
              handleChange={handleChange}
              setKey={setAccountId}
              isNumber
            />
            {error?.accountId?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.accountId[0]} />
            )}
            <Text style={styles.label}>{t('addPaymentDetails.bankId')}</Text>
            <CustomInput
              style={[styles.input]}
              value={bankId}
              handleChange={handleChange}
              setKey={setbankId}
            />
            {error?.bankId?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.bankId[0]} />
            )}
            <Text style={styles.label}>{t('addPaymentDetails.address1')}</Text>
            <CustomInput
              style={[styles.input]}
              value={address1}
              handleChange={handleChange}
              setKey={setAddress1}
            />
            {error?.address1?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.address1[0]} />
            )}
            <Text style={styles.label}>{t('addPaymentDetails.address2')}</Text>
            <CustomInput
              style={[styles.input]}
              value={address2}
              handleChange={handleChange}
              setKey={setAddress2}
            />
            {error?.address2?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.address2[0]} />
            )}
            <Text style={styles.label}>{t('addPaymentDetails.address3')}</Text>
            <CustomInput
              style={[styles.input]}
              value={address3}
              handleChange={handleChange}
              setKey={setAddress3}
            />
            {error?.address3?.length > 0 && (
              <ErrorText style={{marginStart: 20}} text={error?.address3[0]} />
            )}
          </>
        ) : (
          <>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={() => setPaypalType('email')}
                style={{
                  backgroundColor:
                    paypalType === 'email' ? colors.appGreen : colors.appGray,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  // padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: colors.defaultWhite,
                    padding: 7,
                  }}>
                  {t('addPaymentDetails.email')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaypalType('phoneNo')}
                style={{
                  backgroundColor:
                    paypalType === 'phoneNo' ? colors.appGreen : colors.appGray,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  // padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: colors.defaultWhite,
                    padding: 7,
                  }}>
                  {t('addPaymentDetails.phoneNo')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaypalType('paypalId')}
                style={{
                  backgroundColor:
                    paypalType === 'paypalId'
                      ? colors.appGreen
                      : colors.appGray,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  // padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: colors.defaultWhite,
                    padding: 7,
                  }}>
                  {t('addPaymentDetails.paypalId')}
                </Text>
              </TouchableOpacity>
            </View>
            {paypalType === 'email' && (
              <>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: colors.appBlack,
                    marginStart: 20,
                    marginTop: 20,
                    marginBottom: 5,
                  }}>
                  {t('addPaymentDetails.email')}
                </Text>
                <CustomInput
                  value={email}
                  style={[styles.input]}
                  handleChange={handleChange}
                  setKey={setEmail}
                />
                {error?.email?.length > 0 && (
                  <ErrorText style={{marginStart: 20}} text={error?.email[0]} />
                )}
              </>
            )}
            {paypalType === 'phoneNo' && (
              <>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: colors.appBlack,
                    marginStart: 20,
                    marginTop: 20,
                    marginBottom: 5,
                  }}>
                  {t('addPaymentDetails.phoneNo')}
                </Text>
                <CustomInput
                  value={phoneNo}
                  style={[styles.input]}
                  handleChange={handleChange}
                  setKey={setPhoneNo}
                  isNumber
                />
                {error?.phoneNo?.length > 0 && (
                  <ErrorText
                    style={{marginStart: 20}}
                    text={error?.phoneNo[0]}
                  />
                )}
              </>
            )}
            {paypalType === 'paypalId' && (
              <>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: colors.appBlack,
                    marginStart: 20,
                    marginTop: 20,
                    marginBottom: 5,
                  }}>
                  {t('addPaymentDetails.paypalId')}
                </Text>
                <CustomInput
                  value={paypalId}
                  style={[styles.input]}
                  handleChange={handleChange}
                  setKey={setPaypalId}
                />
                {error?.paypalId?.length > 0 && (
                  <ErrorText
                    style={{marginStart: 20}}
                    text={error?.paypalId[0]}
                  />
                )}
              </>
            )}
          </>
        )}
        <CustomButton
          isLoading={loading}
          mode={1}
          style={styles.submitButton}
          handlePress={beneficiaryId ? handleUpdate : handleSubmit}>
          <Text style={styles.submitButtonText}>
            {beneficiaryId
              ? t('addPaymentDetails.update')
              : t('addPaymentDetails.submit')}
          </Text>
        </CustomButton>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginStart: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    marginHorizontal: 20,

    fontSize: 14,
    fontFamily: fonts.primary,
  },
  submitButton: {
    margin: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 2,
    borderRadius: 10,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.secondarySB,
    fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
    elevation: 2,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 16,
    fontFamily: fonts.secondarySB,
  },
});
