import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from 'src/styles/texts/colors.js';
import {StackActions} from '@react-navigation/native';
import i18n from 'src/locale/i18n';

export default SetupProfile = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <LottieView
        style={{alignSelf: 'center', height: 200, width: 200}}
        source={require('./lottie-animation/success.json')}
        autoPlay
        loop
      />
      <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>
        {i18n.t('asSetupComplete.profileComplete')}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.replace('Tabs'))}
        style={{
          backgroundColor: colors.appGreen,
          marginHorizontal: 10,
          maxHeight: 40,
          padding: 10,
          borderRadius: 10,
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: colors.defaultWhite}}>
          {i18n.t('asSetupComplete.done')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
