import {StyleSheet, StatusBar, Platform, I18nManager} from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skyBlue,

    height: Platform.OS === 'android' ? 60 : 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  headerLeft: {
    justifyContent: 'flex-start',
    flex: 0.3,
    marginStart: 10,
    alignItems: 'flex-start',
  },
  logo: {
    height: 30,
    width: 50,
  },
  headerCenter: {
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.defaultWhite,
    fontSize: 18,
    fontFamily: fonts.primarySB,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.defaultWhite,
    marginHorizontal: 20,
    paddingBottom: 0,
    marginBottom: 5,
    color: colors.defaultWhite,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  headerRight: {
    justifyContent: 'flex-end',
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 10,
  },
  headerRightImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default styles;
