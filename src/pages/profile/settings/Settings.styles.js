import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  settingsContainer: {
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
    borderTopColor: colors.appGray1,
    // borderTopWidth: 1,

    marginTop: 15,
  },
  settingName: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appBlack,
  },
  settingContainer: {
    borderTopColor: colors.appGray1,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    paddingStart: 0,
    marginStart: 15,
  },
  legalText: {
    fontFamily: fonts.primarySB,
    fontSize: 20,
    color: colors.skyBlue,
    marginStart: 15,
    marginTop: 20,
  },
});

export default styles;
