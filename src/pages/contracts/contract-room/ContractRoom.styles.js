import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  header: {
    //  height:130,
    // padding: 10
  },
  card: {
    backgroundColor: colors.defaultWhite,
    margin: 10,
    borderRadius: 2,
  },

  title: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
  },

  experience: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // flexWrap: 'wrap',
  },
  experience1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopColor: colors.appGray1,
    borderTopWidth: 1,
  },

  locationView: {
    flexDirection: 'row',
    marginVertical: 3,
  },

  locationText: {
    color: colors.appBlack,
    fontFamily: fonts.primary,
    textAlign: 'left',
    fontSize: 12,
  },
  headingText: {
    color: colors.appViolet,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    fontSize: 18,

    flex: 1,
  },
  experienceText: {
    color: colors.appGray,
    fontFamily: fonts.primary,
    textAlign: 'left',
    fontSize: 12,
    paddingHorizontal: 10,
  },
  nameText: {
    color: colors.appBlue,
    fontFamily: fonts.primary,
    textAlign: 'left',
    fontSize: 16,
    marginTop: 5,
  },

  timeText: {
    color: colors.appBlue,
    fontFamily: fonts.primary,
    textAlign: 'left',
    fontSize: 12,
    textAlignVertical: 'center',
    marginStart: 5,
  },
  messageIcon: {
    backgroundColor: colors.appBlue,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  milestoneItem: {
    fontFamily: fonts.secondary,
    color: colors.appGray3,
  },
  requestButton: {
    backgroundColor: colors.appGreen,
    margin: 10,
  },
  requestButtonText: {
    color: colors.defaultWhite,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.primarySB,
  },
  startDate: {
    fontFamily: fonts.primary,
    color: colors.skyBlue,
    textAlign: 'left',
    fontSize: 16,
  },
  startDateValue: {
    fontFamily: fonts.secondary,
    color: colors.appGray,
    textAlign: 'left',
    fontSize: 14,
  },
  startDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.appGray1,
    padding: 10,
  },
  viewHistoryText: {
    fontFamily: fonts.secondary,
    color: colors.appGray,
    textDecorationLine: 'underline',
    padding: 10,
  },
  description: {
    fontFamily: fonts.secondary,
    color: colors.appBlack,
    textAlign: 'left',
    fontSize: 14,
  },
});
export default styles;
