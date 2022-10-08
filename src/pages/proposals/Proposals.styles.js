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
    // fontFamily: fonts.primatSB,
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  tabsContainerStyle: {
    marginVertical: 20,
    marginHorizontal: 16,
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
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
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
  },
});
export default styles;
