import {StyleSheet, Dimensions} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    marginHorizontal: 5,
    // justifyContent: 'space-around',
  },

  inputContainer: {
    // marginTop: height * 0.1,
    flex: 1,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
    paddingTop: 10,
  },
  textArea: {
    // minHeight: 30,
    maxHeight: 150,
    padding: 10,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 40,
    flexWrap: 'wrap',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});
export default styles;
