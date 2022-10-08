import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import colors from 'src/styles/texts/colors';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.defaultBlack,
    flex: 1,
    width: '100%',
  },
  backButtonView: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    top: 10,
    width: 45,
    zIndex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
const RenderImage = ({item}) => {
  const [loading, setLoading] = useState(false);
  return (
    <FastImage
      resizeMode="contain"
      onLoadStart={() => setLoading(true)}
      onLoad={() => {
        setLoading(false);
      }}
      source={{uri: item?.id ? item?.path : item}}
      style={styles.image}>
      {loading && (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.defaultWhite,
              fontSize: 18,
              paddingEnd: 5,
            }}>
            Loading
          </Text>
          <ActivityIndicator
            color={colors.defaultWhite}
            size="small"
            // style={styles.loader}
          />
        </View>
      )}
    </FastImage>
  );
};
const ImageViewer = ({navigation, route: {params}}) => {
  // const [loading, setLoading] = useState(false);
  let images = [];
  if (Array.isArray(params?.uri)) {
    let filter = params?.uri?.filter((x) => x?.mime_type?.includes('image'));
    // images = filter?.map((x) => x.path);
    images = [...filter];
  }
  // else {
  //   images = [...params?.uri];
  // }
  // console.log('uri', JSON.stringify(images, null, 2));
  // console.log('urihhhh', params.uri);

  return (
    <View style={styles.safeArea}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="black" />
      <View style={styles.backButtonView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          tintColor={colors.white}
        />
      </View> */}

      <Carousel
        // layout={'stack'}
        // ref={(ref) => (this.carousel = ref)}
        firstItem={
          params?.id ? [...images].findIndex((x) => x.id == params?.id) : 0
        }
        data={params?.id ? images : [params?.uri]}
        sliderWidth={SLIDER_WIDTH}
        sliderHeight={ITEM_HEIGHT}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => {}}
        renderItem={({item, index}) => <RenderImage item={item} />}
      />
    </View>
  );
};

// ImageViewer.navigationOptions = () => ({
//   header: null
// })

export default ImageViewer;
