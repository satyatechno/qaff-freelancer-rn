import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 500,
    width: 500,
  },
});

export default styles;
