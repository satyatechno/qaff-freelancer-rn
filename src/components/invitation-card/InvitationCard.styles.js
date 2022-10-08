import colors from 'src/styles/texts/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  card: {
    backgroundColor: colors.defaultWhite,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  title: {
    fontSize: 16,
    color: colors.appGreen,
    paddingBottom: 5,
  },
  date: {
    color: colors.appBlack,
  },
});
