import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    margin: 10,
    elevation: 1,
  },
  skillsHeading: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appYellow,
    textAlign: 'left',
    marginStart: 16,
    marginTop: 10,
  },
  skillsText: {
    paddingVertical: 10,
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
    marginStart: 16,
    textAlign: 'left',
  },
  button: {
    backgroundColor: colors.appYellow,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  skillsInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  skill: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  skillName: {
    color: colors.defaultWhite,
    padding: 10,
    fontFamily: fonts.primarySB,
    fontSize: 12,
  },
});
export default styles;
