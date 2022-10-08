import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import fonts from 'src/styles/texts/fonts';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from 'src/components/button/CustomButton';
import {
  getBeneficiaryList,
  requestMilestonePayment,
} from 'src/services/http.service';
import Snackbar from 'react-native-snackbar';
import {FETCH_CONTRACT_DETAILS} from 'src/actions/contracts';
import {useDispatch, useSelector} from 'react-redux';
import ErrorText from 'src/components/error-text/ErrorText';
import {useFocusEffect} from '@react-navigation/core';
import i18n from 'src/locale/i18n';

const RequestPayment = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [milestoneData, setMilestoneData] = useState(false);
  const [contractData, setContractData] = useState(false);
  const [beneficiary, setBeneficiary] = useState([]);

  const token = useSelector((state) => state.myReducer?.user?.token);

  const dispatch = useDispatch();

  const ActionSheetRef = useRef();

  const handleChange = (setKey, text) => {
    setKey(text);
  };
  const onActionSheetItemPress = async (index) => {
    if (index == 0) {
      ImagePicker.openCamera({
        cropping: false,
        includeBase64: false,
      }).then((image) => {
        setAttachment([
          ...attachment,
          {
            name: Math.random().toString(),
            uri: image.path,
            type: image.mime,
          },
        ]);
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        includeBase64: false,
        multiple: true,
      }).then((image) => {
        console.log('cpi', image);

        for (const res of image) {
          setAttachment((prevState) => [
            ...prevState,
            {
              name: Math.random().toString(),
              uri: res.path,
              type: res.mime,
            },
          ]);
        }
      });
    } else if (index === 2) {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        // console.log('rr', results);
        // this.setState({files: [...this.state.files, results]});
        for (const res of results) {
          setAttachment((prevState) => [
            ...prevState,
            {
              name: res.name,
              uri: res.uri,
              type: res.type,
            },
          ]);
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker,');
        } else {
          throw err;
        }
      }
    }
  };

  const removeAttachment = (index) => {
    let temp = [...attachment];
    temp.splice(index, 1);
    setAttachment([...temp]);
  };

  useEffect(() => {
    setMilestoneData(route?.params?.milestoneData);
    setContractData(route?.params?.contractData);
    if (route?.params?.milestoneData?.status !== 'pending') {
      setMessage(route?.params?.milestoneData?.freelancer_message);
      for (const res of route?.params?.milestoneData
        ?.freelancer_submitted_files) {
        setAttachment((prevState) => [
          ...prevState,
          {
            name: res.name,
            uri: res.path,
            type: res.mime_type,
          },
        ]);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBeneficiary();
    }, []),
  );

  const fetchBeneficiary = () => {
    getBeneficiaryList({token: token})
      .then((res) => {
        console.log('ress', res.data.data);
        setBeneficiary(res.data.data?.beneficiary);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const validate = () => {
    if (!message.trim().length) {
      setMessageError(true);
      return false;
    } else if (!beneficiary.length) {
      Alert.alert(
        i18n.t('requestPayment.beneficiary'),
        i18n.t('requestPayment.pleaseAddBeneficairy'),
        [
          {
            text: i18n.t('requestPayment.cancel'),
            onPress: () => {
              return false;
            },
          },
          {
            text: i18n.t('requestPayment.ok'),
            onPress: () => {
              navigation.navigate('AddPaymentDetails');
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    const isvailid = validate();
    if (isvailid) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('milestone_id', milestoneData?.id);
      formdata.append('message', message);
      attachment.length > 0 &&
        attachment.map((file, i) => {
          formdata.append('files[]', {
            name: file.name,
            type: file.type,
            uri:
              Platform.OS === 'android'
                ? file.uri
                : file.uri.replace('file://', ''),
          });
        });
      requestMilestonePayment({
        token: token,
        contractId: contractData?.id,
        data: formdata,
      })
        .then((res) => {
          dispatch(FETCH_CONTRACT_DETAILS({id: contractData?.id}));
          setLoading(false);

          console.log('response milestone payment', res.data);
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
        title={i18n.t('requestPayment.requestPayment')}
        backButton
        notificationButton
        navigation={navigation}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: colors.defaultWhite,
        }}>
        <View>
          <Text style={{marginVertical: 5}}>
            {i18n.t('requestPayment.useThisForm')}
          </Text>
          <Text style={styles.heading}>
            {i18n.t('requestPayment.milestone')} {milestoneData?.title}
          </Text>
          {/* <Text style={{color: colors.defaultBlack, fontSize: 16}}>
           {milestoneData?.title}
          </Text> */}
          <Text style={styles.heading}>{i18n.t('requestPayment.amount')}</Text>
          <Text style={styles.amount}>SAR {milestoneData?.amount}</Text>
          <Text style={[styles.heading, {marginTop: 10}]}>
            {i18n.t('requestPayment.message')}
          </Text>
          <CustomInput
            style={[styles.input]}
            value={message}
            handleChange={handleChange}
            setKey={setMessage}
            multiline={true}
          />
          {messageError && <ErrorText text="Required." />}
          <Text style={{marginTop: 10, color: colors.appGray}}>
            {i18n.t('requestPayment.attachingWork')}
          </Text>

          <View style={styles.attachmentContainer}>
            <Text style={styles.attachmentText}>
              {i18n.t('requestPayment.attachment')}{' '}
              <Text style={styles.addAttachmentOptionalText}>
                {i18n.t('requestPayment.optional')}
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                ActionSheetRef.current.show();
              }}>
              <Ionicons
                name="add-outline"
                size={25}
                color={colors.defaultWhite}
              />
            </TouchableOpacity>
          </View>

          {attachment.map((item, i) => {
            return (
              attachment?.length > 0 && (
                <View style={styles.attachmentImageContainer} key={i}>
                  {item?.type?.includes('image') ? (
                    <FastImage
                      style={styles.attachmentImage}
                      source={{uri: item.uri}}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                        flex: 0.2,
                      }}>
                      <ShowFileType file={item} />
                    </View>
                  )}
                  {/* <Text style={styles.attachmentImageText}>{item.name}</Text> */}
                  <TouchableOpacity onPress={() => removeAttachment(i)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={30}
                      color={colors.appGray}
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                </View>
              )
            );
          })}

          {milestoneData?.status == 'pending' && (
            <CustomButton
              isLoading={loading}
              mode={1}
              style={styles.submitButton}
              handlePress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {i18n.t('requestPayment.submit')}
              </Text>
            </CustomButton>
          )}
        </View>
      </ScrollView>
      <ActionSheet
        ref={ActionSheetRef}
        title={i18n.t('requestPayment.addAttachment')}
        options={[
          i18n.t('requestPayment.takePhoto'),
          i18n.t('requestPayment.fromGallery'),
          i18n.t('requestPayment.otherFile'),
          i18n.t('requestPayment.cancel'),
        ]}
        cancelButtonIndex={3}
        onPress={(index) => {
          onActionSheetItemPress(index);
        }}
      />
    </>
  );
};
export default RequestPayment;
const styles = StyleSheet.create({
  heading: {
    color: colors.defaultBlack,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  amount: {
    color: colors.defaultWhite,
    fontSize: 18,
    backgroundColor: colors.appViolet,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginVertical: 5,
  },
  input: {
    // marginHorizontal: 10,

    fontSize: 14,
    fontFamily: fonts.primary,
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  attachmentContainer: {
    // borderTopWidth: 0.5,
    borderColor: colors.appGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  attachmentText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 0,
    flex: 1,
  },
  addAttachmentOptionalText: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    fontSize: 14,
  },
  attachmentImageContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  attachmentImage: {
    width: 70,
    height: 70,

    alignSelf: 'center',

    flex: 0.2,
    justifyContent: 'flex-start',
  },
  attachmentImageText: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray,
    marginHorizontal: 10,
    flex: 0.8,
    textAlign: 'left',
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButton: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});
