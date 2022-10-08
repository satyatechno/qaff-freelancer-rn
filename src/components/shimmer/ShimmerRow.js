import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
import {I18nManager} from 'react-native';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
function ShimmerRow() {
  return (
    <ShimmerPlaceholder
      isReversed={I18nManager.isRTL ? true : false}
      visible={false}
      shimmerStyle={{width: '95%', marginHorizontal: 10, marginTop: 10}}
      shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
    />
  );
}

export default ShimmerRow;
