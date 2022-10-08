import colors from 'src/styles/texts/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  nextButton: {
    backgroundColor: colors.appViolet,
    height: 40,
    padding: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  nextButtonText: {
    color: colors.defaultWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listHeaderText: {
    fontSize: 16,
    color: colors.appBlack,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
