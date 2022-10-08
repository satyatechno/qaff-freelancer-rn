import {I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    height: 40,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default styles;
