import {StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  profileImage: {
    width: 140,
    height: 140,
    // borderRadius:50,
    alignSelf: 'center',
    marginTop: 10,
  },
  profileOwnerName: {
    fontFamily: fonts.primarySB,
    color: colors.appGray,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  locationName: {
    color: colors.appGray,
    marginStart: 5,
    textAlign: 'left',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: colors.defaultWhite,

    marginStart: 15,
    paddingVertical: 15,

    // borderBottomWidth: 0.2,
    // borderColor: colors.appGray,
  },
  listItem: {
    fontSize: 16,
    backgroundColor: colors.defaultWhite,
    flex: 1,
    marginStart: 10,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    textAlign: 'left',
  },
  listItemHeader: {
    marginTop: 30,
    paddingBottom: 10,
    // borderBottomWidth: 0.5,
    // borderColor: colors.appGray,
  },
  listItemHeaderText: {
    fontSize: 20,
    color: colors.appYellow,
    marginStart: 15,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  tokenContainer: {
    backgroundColor: colors.appViolet,

    padding: 5,
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  tokenText: {
    paddingStart: 5,
    color: colors.defaultWhite,
    borderRadius: 5,
    fontSize: 14,
  },
});

export default styles;
