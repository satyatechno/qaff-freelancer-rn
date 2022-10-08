import colors from 'src/styles/texts/colors';

const {StyleSheet, Dimensions} = require('react-native');

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.appBackground,
    width: Dimensions.get('window').width,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: Dimensions.get('screen').height * 0.05,
    textAlign: 'left',
  },
  subHeading: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 20,
    textAlign: 'center',
    width: '85%',
  },
  body: {
    textAlign: 'left',
    width: '85%',
    fontSize: 15,
    fontWeight: '600',
    color: colors.appBlack,
  },
  skipButton: {
    paddingEnd: 20,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  skipButtonText: {
    fontSize: 16,
    color: colors.appGray,
  },
  skipStepButton: {
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.skyBlue,
    height: 40,
    padding: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  skipStepText: {
    fontSize: 16,
    color: colors.defaultWhite,
  },
});
