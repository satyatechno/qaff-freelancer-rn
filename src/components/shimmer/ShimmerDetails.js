import React, {Component} from 'react';
import Container from 'src/components/container/Container';
import {I18nManager, View} from 'react-native';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
class ShimmerDetails extends Component {
  render() {
    return (
      <>
        <Container style={{paddingHorizontal: 5, marginBottom: 5}}>
          <ShimmerPlaceholder
            isReversed={I18nManager.isRTL ? true : false}
            visible={false}
            shimmerStyle={{
              height: 10,
              marginTop: 30,
              width: '60%',
              marginBottom: 5,
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
              marginTop: 10,
              width: '40%',
              marginBottom: 5,
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
              marginTop: 10,
              width: '30%',
              marginBottom: 5,
            }}
            shimmerColors={[
              colors.appGray1,
              colors.appGray2,
              colors.appGray1,
            ]}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[
              colors.appGray1,
              colors.appGray2,
              colors.appGray1,
            ]}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            isReversed={I18nManager.isRTL ? true : false}
            visible={false}
            shimmerStyle={{
              height: 100,
              marginTop: 10,
              width: '95%',
              marginBottom: 5,
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
              height: 25,
              marginTop: 10,
              width: '80%',
              marginBottom: 5,
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
              height: 25,
              marginTop: 10,
              width: '70%',
              marginBottom: 5,
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
              height: 25,
              marginTop: 10,
              width: '60%',
              marginBottom: 5,
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
              marginTop: 10,
              width: '40%',
              marginBottom: 5,
            }}
            shimmerColors={[
              colors.appGray1,
              colors.appGray2,
              colors.appGray1,
            ]}></ShimmerPlaceholder>
          <View style={{paddingBottom: 10}}>
            {Array(2)
              .fill('')
              .map((item, i) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,

                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.appGray,
                    }}
                    key={i}>
                    <ShimmerPlaceholder
                      isReversed={I18nManager.isRTL ? true : false}
                      visible={false}
                      shimmerStyle={{
                        height: 50,
                        marginTop: 10,
                        width: 80,
                        marginBottom: 5,
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
                        height: 5,
                        marginTop: 10,
                        width: '60%',
                        marginBottom: 5,
                        marginStart: 10,
                      }}
                      shimmerColors={[
                        colors.appGray1,
                        colors.appGray2,
                        colors.appGray1,
                      ]}></ShimmerPlaceholder>
                  </View>
                );
              })}
          </View>
          <ShimmerPlaceholder
            isReversed={I18nManager.isRTL ? true : false}
            visible={false}
            shimmerStyle={{
              height: 50,
              marginTop: 10,
              width: '95%',
              marginBottom: 5,
            }}
            shimmerColors={[
              colors.appGray1,
              colors.appGray2,
              colors.appGray1,
            ]}></ShimmerPlaceholder>
        </Container>
      </>
    );
  }
}

export default ShimmerDetails;
