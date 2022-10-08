import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    margin: 10,
    elevation: 5,
  },
  ExamsHeading: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appGreen,
    textAlign: 'left',
    marginStart: 16,
    marginTop: 10,
  },
  ExamsText: {
    paddingVertical: 10,
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
    marginStart: 16,
  },
  button: {
    backgroundColor: colors.appGreen,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  ExamInfoContainer: {
    margin: 10,
  },
  Exam: {
    // backgroundColor: colors.appGray1,
    marginBottom: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ExamName: {
    color: colors.appGray,
    fontFamily: fonts.secondarySB,
    fontSize: 16,
    textAlign: 'left',
  },
});
export default styles;
