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
});

export default styles;
