import React from 'react';
import {View, I18nManager} from 'react-native';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerCard = () => {
  return (
    <View
      style={{
        backgroundColor: colors.defaultWhite,
        marginHorizontal: 10,
        paddingTop: 10,
        marginVertical: 5,
      }}>
      <ShimmerPlaceholder
        isReversed={I18nManager.isRTL ? true : false}
        visible={false}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          width: '70%',
        }}
        shimmerColors={[
          colors.appGray1,
          colors.appGray2,
          colors.appGray1,
        ]}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        isReversed={I18nManager.isRTL ? true : false}
        visible={false}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          marginTop: 5,
          color: colors.skyBlue,
        }}
        shimmerColors={[
          colors.appGray1,
          colors.appGray2,
          colors.appGray1,
        ]}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        isReversed={I18nManager.isRTL ? true : false}
        visible={false}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          marginTop: 5,
          width: '40%',
        }}
        shimmerColors={[
          colors.appGray1,
          colors.appGray2,
          colors.appGray1,
        ]}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        isReversed={I18nManager.isRTL ? true : false}
        visible={false}
        shimmerStyle={{
          height: 150,
          marginHorizontal: 10,
          marginTop: 10,
          width: '95%',
          marginBottom: 10,
        }}
        shimmerColors={[
          colors.appGray1,
          colors.appGray2,
          colors.appGray1,
        ]}></ShimmerPlaceholder>
    </View>
  );
};

export default ShimmerCard;
