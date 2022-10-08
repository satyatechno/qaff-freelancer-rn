import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 10,
    // position: 'relative',
    // paddingBottom: 20,
    backgroundColor: colors.defaultWhite,
  },
  logo: {
    width: 130,
    height: 130,
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    // borderRadius: 70,
    // marginTop: '20%',
    zIndex: 100,
    marginBottom: 30,
  },
  child: {
    // flex: 1,
    // height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    fontSize: 18,
    color: colors.appGray,
    textAlign: 'right',
    paddingHorizontal: 20,
    fontFamily: fonts.secondary,
    paddingTop: 20,
  },
  header: {
    // color: '#383E56',
    color: colors.appBlack,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 120,
    fontFamily: fonts.primarySB,
    position: 'absolute',

    bottom: 150,
    width: '80%',
    alignSelf: 'center',
  },

  description: {
    color: colors.appBlack,
    fontSize: 16,
    height: '20%',
    width: 300,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.secondary,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
  },
  arrowForward: {
    alignSelf: 'flex-end',

    paddingHorizontal: 20,
    marginBottom: 1,
  },
  arrowBackward: {
    paddingHorizontal: 20,
    marginBottom: 1,
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
