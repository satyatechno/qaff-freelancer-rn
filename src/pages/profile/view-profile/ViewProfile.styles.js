import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 2,
    borderRadius: 10,
    elevation: 1,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRadius: 10,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  tabTextStyle: {
    color: colors.appGray,
    // fontFamily: fonts.primary,
    fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 16,
    // fontFamily: fonts.secondarySB,
    fontWeight: 'bold',
  },
});
export default styles;
