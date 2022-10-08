import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  newsfeedText: {
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    marginStart: 10,
    marginVertical: 10,
    fontSize: 18,
    textAlign: 'left',
  },
  filterBedge: {
    position: 'absolute',
    backgroundColor: colors.appGreen,
    color: colors.defaultWhite,
    zIndex: 10,
    height: 23,
    width: 23,
    fontSize: 14,
    borderRadius: 23 / 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    top: -5,
    right: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
