import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  onlineContainer: {
    backgroundColor: colors.appGreen,
    overflow: 'hidden',
  },
  onlineText: {
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  offlineContainer: {
    backgroundColor: colors.appRed,
    overflow: 'hidden',
  },
  offlineText: {
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
