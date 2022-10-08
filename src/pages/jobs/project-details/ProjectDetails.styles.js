import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  titleAndBudgetContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  titleText: {
    flex: 0.9,
    color: colors.skyBlue,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  budgetText: {
    color: colors.appViolet,
    fontSize: 18,
    fontFamily: fonts.secondarySB,
  },
  experienceAndTimeContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  experienceText: {
    color: colors.appGray,
    fontSize: 14,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },
  timeText: {
    color: colors.appGray,
    fontSize: 12,
    fontFamily: fonts.primary,
    textAlign: 'left',
  },
  postedBy: {
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    fontSize: 16,
    paddingBottom: 5,
    textAlign: 'left',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  locationText: {
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appBlack,
    textAlign: 'left',
  },
  description: {
    paddingVertical: 10,
    borderBottomColor: colors.appGray,
    borderBottomWidth: 0.5,
    fontSize: 14,
    color: colors.appBlack,
    borderTopWidth: 0.5,
    borderTopColor: colors.appGray,
    textAlign: 'left',
  },
  timelineText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appGray,
    textAlign: 'left',
  },
  timelineInfo: {
    fontFamily: fonts.secondarySB,
    fontSize: 18,
    color: colors.appBlack,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
    textAlign: 'left',
  },
  milestoneText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appGray,
    textAlign: 'left',
  },
  milestoneInfo: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
    textAlign: 'left',
  },
  skillsText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appGray,
  },
  skillsInfo: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
    flexDirection: 'row',
    flexWrap: 'wrap'
   
  },
  projectIdText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appGray,
    textAlign: 'left',
  },
  projectIdInfo: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
    textAlign: 'left',
  },
  attachmentText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.appGray,
    textAlign: 'left',
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
    // flex: 0.3,
  },
  attachmentImage: {
    width: 80,
    height: 50,
  },
  attachmentOuterContainer: {
    paddingBottom: 10,
  },
  attachmentName: {
    marginStart: 20,
    textAlign: 'left',
    flex: 0.7,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: colors.appViolet,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: colors.appGreen,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    color: colors.defaultWhite,
    marginEnd: 5,

    fontSize: 16,
  },
  applytext: {
    color: colors.defaultWhite,
    marginEnd: 5,
    fontSize: 16,
  },
});

export default styles;
