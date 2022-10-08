import { StyleSheet, Dimensions } from 'react-native';
// const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  noJobsImage: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginTop: '30%',
  },
  noJobsText: {
    fontFamily: fonts.primarySB,
    color: colors.appGray,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default styles;
