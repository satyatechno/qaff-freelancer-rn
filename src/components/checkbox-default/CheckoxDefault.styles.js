import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
  selectedText: {
    // fontFamily: fonts.primarySB,
    fontWeight: 'bold',
    color: colors.appViolet,
    fontSize: 16,
    flex: 0.9,
    textAlign: 'left',
  },
  defaultText: {
    // fontFamily: fonts.primary,
    color: colors.appGray,
    fontSize: 15,
    flex: 0.9,
    textAlign: 'left',
  },
});

export default styles;
