import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: colors.defaultWhite,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.appGray1,

    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  sectionText: {
    color: colors.appViolet,
    fontFamily: fonts.secondarySB,
    fontSize: 16,
    flex: 1,
  },
  content: {
    marginHorizontal: 10,
  },
  footerButton: {
    backgroundColor: colors.defaultWhite,
    flexDirection: 'row',
    // marginHorizontal: 10,
    // bottom: 10,
    // position: 'absolute',
    // alignSelf: 'center',
    // paddingTop: 10,
    justifyContent: 'space-between',
    padding: 10,
  },
});
export default styles;
