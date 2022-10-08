import {StyleSheet} from 'react-native';

import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  portfolioContainer: {
    margin: 10,
    elevation: 5,
    backgroundColor: colors.defaultWhite,
    // padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  portfolioInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,

    padding: 10,
  },
  title: {
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appBlack,
    flex:1
  },
  date: {
    fontSize: 16,
    fontFamily: fonts.primary,
    color: colors.appViolet,
  },
  description: {
    padding: 10,
    fontSize: 14,
    color: colors.appGray,
    fontFamily: fonts.secondary,
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    elevation: 5,
    // marginTop: 20,
  },
});

export default styles;
