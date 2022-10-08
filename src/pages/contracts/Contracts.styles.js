import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: colors.defaultWhite,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,

    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  sectionText: {
    color: colors.appViolet,
    fontFamily: fonts.secondarySB,
    fontSize: 16,
    flex: 1,
  },
  content: {
    marginHorizontal: 10,
  },
  hederContainer: {
    flexDirection: 'row',
    // backgroundColor: colors.appBackground,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    backgroundColor: colors.appViolet,
    // height: 35,
    // width: 35,
    padding: 6,
    borderRadius: 5,
    elevation: 2,
    // alignItems: "center",
    // justifyContent: "center"
  },
  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.appGray2,
    padding: 2,
    borderRadius: 10,
  },
  tabStyle: {
    backgroundColor: colors.appGray2,
    borderColor: colors.appGray2,
    borderWidth: 0,
    // borderTopEndRadius: 10,
    // borderBottomEndRadius: 10,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.secondarySB,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  activeTabStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    borderColor: colors.appGray2,
    borderWidth: 0,
    elevation: 2,
  },
  activeTabTextStyle: {
    color: colors.skyBlue,
    fontSize: 16,
    // fontWeight: 'bold',

    fontFamily: fonts.secondarySB,
  },
  toggleContainer: {
    backgroundColor: colors.defaultWhite,
    position: 'absolute',
    end: 10,
    zIndex: 1,
    top: 120,
    borderRadius: 10,
    elevation: 5,
  },
  toggleMenuText: {
    fontFamily: fonts.primary,
    fontSize: 16,
    color: colors.appBlack,
    textAlign: 'center',
  },
  devider: {
    height: 1,
    backgroundColor: colors.appGray1,
    // width: "100%"
  },
  toggleMenuItem: {
    padding: 10,
    paddingHorizontal: 15,
  },
});
export default styles;
