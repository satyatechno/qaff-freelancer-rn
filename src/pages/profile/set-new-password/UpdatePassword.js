import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import {updateUserPassword} from 'src/services/http.service';
import {MODAL_VISIBLE} from 'src/actions/action';
import Snackbar from 'react-native-snackbar';
import {useTranslation} from 'react-i18next';

const UpdatePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const updatePassword = () => {
    if (!currentPassword.length) {
      setCurrentPasswordError(true);
      Snackbar.show({
        text: t('updatePassword.enterCurrPass'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (!newPassword.length) {
      setNewPasswordError(true);
      Snackbar.show({
        text: t('updatePassword.enterNewPass'),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.appRed,
      });
    } else if (newPassword.length !== confirmPassword.length) {
      setConfirmPasswordError(true);
    } else {
      setLoading(true);
      updateUserPassword({
        token: token,
        data: {
          account_type: 'freelancer',
          current_password: currentPassword,
          new_password: newPassword,
        },
      })
        .then((res) => {
          setLoading(false);
          setCurrentPasswordError(false);
          setNewPasswordError(false);
          setCurrentPasswordError(false);
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 1,
              message: res.data.message,
            }),
          );
          navigation.pop();
        })
        .catch((err) => {
          setLoading(false);
          dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 2,
              message: err.response?.data?.message,
            }),
          );
        });
    }
  };
  console.log('aa', currentPassword, newPassword);
  return (
    <>
      <Header
        title={t('updatePassword.updatePassword')}
        notificationButton
        backButton
        navigation={navigation}
      />
      <View
        style={{
          backgroundColor: colors.appBackground,
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {t('updatePassword.enterCurrPass')}
        </Text>
        <TextInput
          onFocus={() => setCurrentPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !currentPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {t('updatePassword.enterNewPass')}
        </Text>
        <TextInput
          onFocus={() => setNewPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !newPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={{color: colors.appGray, fontSize: 12}}>
          {t('updatePassword.passLength')}
        </Text>
        <Text style={{fontSize: 16, color: colors.appGray, paddingTop: 20}}>
          {t('updatePassword.confirmPassword')}
        </Text>
        <TextInput
          onFocus={() => setNewPasswordError(false)}
          style={{
            borderWidth: 1.5,
            borderColor: !confirmPasswordError ? colors.skyBlue : colors.appRed,
            height: 40,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {confirmPasswordError && (
          <Text style={{color: colors.appRed}}>
            {t('updatePassword.passNotMatched')}
          </Text>
        )}

        <CustomButton
          isLoading={loading}
          mode={1}
          handlePress={updatePassword}
          style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 18,
              color: colors.defaultWhite,
              fontWeight: 'bold',
            }}>
            {t('updatePassword.update')}
          </Text>
        </CustomButton>
      </View>
    </>
  );
};

export default UpdatePassword;
