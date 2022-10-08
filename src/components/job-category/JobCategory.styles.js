import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  jobInfoContainer: {
    width: width / 2 - 15,
    height: 180,
    backgroundColor: colors.defaultWhite,
    elevation: 5,
  },
  jobInfoImage: {
    width: '100%',
    height: 110,
  },
  jobInfoText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.secondary,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    color: colors.appBlack,
  },
});

export default styles;
