const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  containerRow: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowBottom: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  periodText: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    marginEnd: 5,
  },
  expectedText: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    flex: 1,
  },
  dayText: {
    color: colors.appGray,
    textAlign: 'left',
    fontSize: 16,
    marginEnd: 20,
  },
  noOfDays: {
    marginStart: 10,
    color: colors.appBlack,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.secondary,
  },
  divider: {
    borderRightColor: colors.appGray,
    borderRightWidth: 1,
  },
  milestoneText: {
    marginStart: 10,
    textAlign: 'left',
    fontSize: 18,
    fontFamily: fonts.primarySB,
    paddingTop: 10,
  },
  paymentContainer: {
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.appViolet,
    paddingVertical: 10,
    marginVertical: 10,
  },
  paymentNo: {
    textAlign: 'left',
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    lineHeight: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginStart: 10,
  },
  paymentNo1: {
    textAlign: 'left',
    fontSize: 16,
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    lineHeight: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  superScript: {
    lineHeight: 18,
    textAlign: 'left',
    fontSize: 12,
    fontFamily: fonts.primarySB,
  },
  horizontalDivider: {
    borderBottomColor: colors.appGray1,
    borderBottomWidth: 1,
  },
  subHeading: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    marginStart: 10,
    paddingTop: 10,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 10,

    alignItems: 'center',
  },
  budgetType: {
    color: colors.skyBlue,
    fontFamily: fonts.secondary,
    textAlign: 'left',
    fontSize: 16,
    marginStart: 10,
    marginEnd: 10,
  },
  amount: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.appBlack,
  },
  attachmentContainer: {
    // borderTopWidth: 0.5,
    borderColor: colors.appGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  attachmentText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
  },
  addAttachmentOptionalText: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    fontSize: 14,
  },
  attachmentImageContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  attachmentImage: {
    width: 70,
    height: 70,

    alignSelf: 'center',

    flex: 0.2,
    justifyContent: 'flex-start',
  },
  attachmentImageText: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray,
    marginHorizontal: 10,
    flex: 0.8,
    textAlign: 'left',
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  saveButton: {
    borderColor: colors.appBlue,
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
    color: colors.appBlue,
    marginEnd: 5,

    textAlign: 'left',
    fontSize: 16,
  },
  applytext: {
    color: colors.defaultWhite,
    marginEnd: 5,
    textAlign: 'left',
    fontSize: 16,
  },
});

export default styles;
