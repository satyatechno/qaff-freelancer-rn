import {I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 0.95,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
  },
  icon: {
    color: colors.appGray,
  },
});

export default styles;
