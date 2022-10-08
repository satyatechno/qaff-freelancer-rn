import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const ShowCountries = ({
  loading,
  countries,
  handleCountrySelect,
  handleCountrySearch,
  countrySearch,
}) => {
  const itemSeperator = () => {
    return <View style={{height: 1, backgroundColor: colors.appGray1}} />;
  };

  return (
    <>
      <TextInput
        value={countrySearch}
        style={{
          borderWidth: 1.5,
          borderColor: colors.skyBlue,
          borderRadius: 10,
          height: 40,
          textAlignVertical: 'center',
          fontSize: 16,
          paddingStart: 10,
          marginHorizontal: 10,
        }}
        placeholder="Search countries"
        onChange={(e) => handleCountrySearch(e.nativeEvent.text)}
      />
      <FlatList
        keyboardShouldPersistTaps="handled"
        maxToRenderPerBatch={30}
        initialNumToRender={10}
        // ListHeaderComponent={listHeader}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}
        data={countries}
        extraData={countries}
        renderToHardwareTextureAndroid={
          Platform.OS === 'android' ? true : false
        }
        ItemSeparatorComponent={itemSeperator}
        keyExtractor={(item) => item?.id?.toString()}
        listKey={(item, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.skyBlue} />
            ) : (
              <Text>No match found</Text>
            )}
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.5}
            delayPressIn={0}
            delayPressOut={0}
            onPress={() => handleCountrySelect(item)}
            children={
              <>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.primary,
                    color: colors.appBlack,
                  }}>
                  {item?.name}
                </Text>
              </>
            }
            style={{height: 50, justifyContent: 'center'}}
          />
        )}
      />
    </>
  );
};

export default memo(ShowCountries);
