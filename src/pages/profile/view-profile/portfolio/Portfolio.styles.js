import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    margin: 10,
    elevation: 1,
  },
  portfolioHeading: {
    fontSize: 20,
    fontFamily: fonts.primarySB,
    color: colors.appViolet,
    textAlign: 'left',
    marginStart: 16,
    marginTop: 10,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fonts.secondary,
    color: colors.appViolet,
    marginEnd: 16,
    marginTop: 0,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
  portfolioText: {
    paddingVertical: 10,
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
    marginStart: 16,
    textAlign: 'left',
  },
  button: {
    backgroundColor: colors.appViolet,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  portfolioImageContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  portfolioImage: {
    height: 120,
    width: 150,
    borderRadius: 10,
    marginVertical: 15,
  },
  portfolioTitle: {
    fontFamily: fonts.secondary,
    fontSize: 14,
    color: colors.appBlack,
    marginBottom: 10,
    textAlign: 'left',
  },
});
export default styles;
