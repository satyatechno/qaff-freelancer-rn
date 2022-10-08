import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';

const Container = ({style, children, statusBarColor}) => {
  return (
    <KeyboardAvoidingView
      style={[style, {flex: 1}]}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <SafeAreaView style={[style, {flex: 1}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style}>
          {children}
        </ScrollView>
      </SafeAreaView>
      <View style={{height: 10}} />
    </KeyboardAvoidingView>
  );
};

export default Container;
