const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.appBackground,
    marginBottom: 10,
  },
  jobDetailsText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
    fontWeight: 'bold',
  },
  projectTitle: {
    color: colors.appBlack,
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  projectDescription: {
    color: colors.appBlack,
    fontSize: 14,
    paddingBottom: 10,
  },
  jobPostingText: {
    color: colors.appGreen,
  },
  jobPostingButton: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  aboutClientText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  paymentMethodText: {
    color: colors.appBlack,
    fontSize: 14,
    paddingBottom: 10,
  },
  locationText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  countryText: {
    color: colors.appBlack,
    fontSize: 14,
    paddingBottom: 5,
  },
  historyText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  historySubText: {
    color: colors.appBlack,
    fontSize: 14,
    paddingBottom: 5,
  },
  createdAt: {
    fontSize: 12,
    color: colors.appGray,
    paddingVertical: 10,
  },
  activityContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.appBackground,
    marginBottom: 10,
  },
  activityText: {
    color: colors.appBlack,
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  proposalCount: {
    color: colors.appBlack,
    fontSize: 14,
    paddingVertical: 10,
  },
  interviewingText: {
    color: colors.appBlack,
    fontSize: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  declineText: {
    color: colors.appViolet,
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: colors.appGreen,
    width: '45%',
    height: 40,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  acceptText: {
    color: colors.defaultWhite,
    fontSize: 16,
  },
  declineButton: {
    borderWidth: 1,
    borderColor: colors.appViolet,
    width: '45%',
    height: 40,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
