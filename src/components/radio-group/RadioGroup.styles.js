import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  defaultText: {
    fontFamily: fonts.secondary,
    color: colors.appGray,
    fontSize: 14,
    flex: 0.9,
    textAlign: 'left',
  },
  selectedText: {
    fontFamily: fonts.secondarySB,
    color: colors.appViolet,
    fontSize: 16,
    flex: 0.9,
    textAlign: 'left',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appGray,
  },
});

export default styles;
