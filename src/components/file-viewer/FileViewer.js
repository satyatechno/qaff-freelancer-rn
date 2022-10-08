import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import colors from 'src/styles/texts/colors';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.defaultWhite,
    flex: 1,
    width: '100%',
  },
});

const FileViewer = ({navigation, route: {params}}) => {
  const [loading, setLoading] = useState(true);

  const downloadFile = () => {};
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={downloadFile}
          activeOpacity={0.5}
          delayPressIn={0}
          delayPressOut={0}>
          <MaterialIcons
            name={'file-download'}
            color={colors.defaultBlack}
            size={25}
            style={{paddingEnd: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  console.log('path', params?.uri);
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <WebView
        source={{
          html:
            'https://qaff-storage.s3.me-south-1.amazonaws.com/public/project/MjIw/09GrxSxp1sa5nVu85RAYrDYFNA9EVsscJRWBzuDL.pdf',
        }}
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          //   backgroundColor: 'red',
        }}
        // startInLoadingState={false}
        // renderLoading={() => (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       flex: 1,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <Text
        //       style={{color: colors.defaultWhite, fontSize: 18, paddingEnd: 5}}>
        //       Loading
        //     </Text>
        //     <ActivityIndicator color={colors.defaultWhite} size="small" />
        //   </View>
        // )}
      />
    </View>
  );
};

// FileViewer.navigationOptions = () => ({
//   header: null
// })

export default FileViewer;
