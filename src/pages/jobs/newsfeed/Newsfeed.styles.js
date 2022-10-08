import {I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    marginHorizontal: 10,
    paddingTop: 10,
    marginVertical: 5,
  },
  title_budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: colors.appBlack,
    fontSize: 16,
    fontFamily: fonts.primarySB,
    flex: 1,
    paddingEnd: 5,
    textAlign: 'left',
  },
  budget: {
    backgroundColor: colors.appViolet,
    padding: 5,
    maxHeight: 40,

    borderRadius: 5,
    fontSize: 14,
    fontFamily: fonts.secondary,
    textAlignVertical: 'center',
    // marginTop: 5,
    // marginBottom: 3,
  },
  timeline: {
    // padding: 5,
    // maxHeight: ,

    fontSize: 14,
    fontFamily: fonts.secondary,
    textAlignVertical: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    // marginBottom: ,
  },
  experience_timeContainer: {
    //     paddingVertical: 10,
    paddingHorizontal: 10,
  },
  time: {
    color: colors.appGray,
    fontFamily: fonts.secondary,
    fontSize: 12,
    textAlign: 'left',
  },
  budgetHeading: {
    color: colors.appGray,
    fontFamily: fonts.secondary,
    fontSize: 12,
    textAlign: 'left',
  },
  more: {
    color: colors.skyBlue,
    fontFamily: fonts.secondary,
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
  postedBy: {
    color: colors.appBlue,
    fontFamily: fonts.primary,
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  locationContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loacationName: {
    color: colors.appBlue,
    marginStart: 5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.appGray1,
  },
  description: {
    fontFamily: fonts.secondary,
    color: colors.appBlack,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  footerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    color: colors.skyBlue,
    marginEnd: 3,
    fontSize: 16,
  },
  horizontalDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.appGray1,
  },
  applyText: {
    color: colors.appGreen,
    marginEnd: 3,
    fontSize: 16,
  },
});
export default styles;
