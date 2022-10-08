import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  countryText: {
    fontSize: 16,
    marginStart: 10,
    marginVertical: 10,
  },
  cityText: {
    fontSize: 16,
    marginStart: 10,
    marginVertical: 10,
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
  updateProfileButton: {
    backgroundColor: colors.skyBlue,
    borderRadius: 10,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 40,
  },
  updateProfileText: {
    fontSize: 16,
    color: colors.defaultWhite,
  },
});
