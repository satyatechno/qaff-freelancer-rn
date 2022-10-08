import {Dimensions, StyleSheet} from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    // paddingHorizontal: 5,
    // paddingTop: 5,
  },
  title_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primarySB,
    color: colors.appBlack,
    textAlign: 'left',
  },
  date: {
    fontSize: 16,
    color: colors.appViolet,
    fontFamily: fonts.primary,
  },
  description: {
    color: colors.appGray,
    fontSize: 14,
    fontFamily: fonts.secondary,
    padding: 10,
    textAlign: 'left',
  },
  main_image: {
    width: Dimensions.get('screen').width - 20,
    height: 250,
    margin: 10,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});

export default styles;
