import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  countryText: {
    fontSize: 16,
    marginStart: 10,
    marginVertical: 10,
    color: colors.appGray,
    textAlign: 'left',
  },
  addSchoolText: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  cityText: {
    fontSize: 16,
    marginStart: 10,
    marginVertical: 10,
    color: colors.appGray,
    textAlign: 'left',
  },
  cityInput: {
    borderWidth: 2,
    borderColor: colors.skyBlue,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 40,
    fontSize: 16,
    paddingStart: 10,
  },

  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.skyBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    minWidth: '45%',
  },
  submitText: {
    color: colors.defaultWhite,
  },
});
