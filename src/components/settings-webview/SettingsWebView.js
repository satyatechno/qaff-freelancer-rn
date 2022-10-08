import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import colors from 'src/styles/texts/colors';

const SettingsWebView = ({route}) => {
  const {url} = route?.params;
  console.log('url', url);
  return (
    <WebView
      source={{uri: url}}
      //   javaScriptEnabled={true}
      //   domStorageEnabled={true}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={30} color={colors.skyBlue} />
        </View>
      )}
    />
  );
};

export default SettingsWebView;
