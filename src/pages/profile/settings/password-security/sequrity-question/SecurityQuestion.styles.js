import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginTop: 10,
    marginStart: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  questionContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    // borderRadius: 10,
    backgroundColor: colors.defaultWhite,
    elevation: 2,
    // borderBottomColor: colors.skyBlue,
    // borderBottomWidth: 1,
    // marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
