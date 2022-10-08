import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    margin: 10,
    elevation: 1,
  },
  summaryHeading: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appGray,
    textAlign: 'left',
    marginHorizontal: 16,
    marginTop: 10,
    flex: 0.95,
  },
  summaryText: {
    // paddingVertical: 10,
    fontFamily: fonts.secondary,
    fontSize: 13,
    color: colors.appGray,
    marginHorizontal: 16,
    textAlign: 'left',
  },
  button: {
    // marginBottom: -20
    backgroundColor: colors.appGray,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  readMoreText: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    // textDecorationLine: 'underline',
    color: colors.skyBlue,
    margin: 16,
    textAlign: 'left',
  },
});
export default styles;
