import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet, I18nManager} = require('react-native');

export default StyleSheet.create({
  infoText: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    color: colors.appBlack,
    textAlign: 'left',
  },
  uploadPhotoButton: {
    backgroundColor: colors.appViolet,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  uploadPhotoButtonText: {
    fontSize: 16,
    color: colors.defaultWhite,
  },
  nameContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  fnameText: {
    fontSize: 14,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  input: {
    fontSize: 16,

    fontFamily: fonts.secondary,
    padding: 2,
    color: colors.appBlack,
  },

  languageInput: {
    fontSize: 16,

    // fontFamily: fonts.secondary,
    padding: 5,
    paddingStart: 10,
    color: colors.appBlack,
    borderWidth: 1.5,
    borderColor: colors.skyBlue,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 40,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  languagesText: {
    fontSize: 14,
    marginStart: 10,
    marginTop: 10,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  languageCard: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  },
  selectedLanguageText: {
    padding: 7,
    marginEnd: 5,
    backgroundColor: colors.appViolet,
    marginVertical: 5,
    fontSize: 15,
    color: colors.defaultWhite,
    borderRadius: 10,
  },
  experienceText: {
    fontSize: 16,
    marginStart: 10,
    marginTop: 10,
    color: colors.appBlack,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  experienceRateText: {
    fontSize: 14,
    marginStart: 10,
    // marginTop: 5,
    color: colors.appGray,
    marginBottom: 5,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  experienceCard: {
    backgroundColor: colors.defaultWhite,
    // elevation: 2,
    zIndex: 10,
    width: 160,
    height: 160,
    marginEnd: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  heading: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 10,
  },
  footerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: colors.skyBlue,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    minWidth: '45%',
  },
  footerText: {
    color: colors.defaultWhite,
  },
});