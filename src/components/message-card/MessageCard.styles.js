import {StyleSheet} from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  userCard: {
    backgroundColor: colors.defaultWhite,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginEnd: 10,
    // resizeMode: 'contain',
  },
  userName: {
    fontFamily: fonts.primarySB,
    fontSize: 16,
    // flex: 1,
  },
  userProfile: {
    fontFamily: fonts.primary,
    color: colors.appGray,
  },
  time: {
    fontFamily: fonts.secondary,
    color: colors.appGray,
    marginEnd: 10,
  },
  message: {
    fontFamily: fonts.primary,
    color: colors.appGray,
    paddingTop: 5,
    flex: 1
    // paddingEnd: 20,
  },
});

export default styles;
