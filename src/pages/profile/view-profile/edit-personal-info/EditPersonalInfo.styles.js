import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  profileImage: {
    width: 100,
    height: 100,
    // borderRadius:50,
    alignSelf: 'center',
    marginTop: 10,
    resizeMode: 'cover',
  },
  editContainer: {
    // position: 'absolute',
    alignSelf: 'flex-end',
  },
  editimage: {
    width: 70,
    height: 70,
  },
  editContainer1: {
    position: 'absolute',
    bottom: -10,
    end: '32%',
  },
  editimage1: {
    width: 60,
    height: 60,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: colors.defaultWhite,

    marginStart: 15,
    paddingVertical: 15,

    // borderBottomWidth: 0.2,
    // borderColor: colors.appGray,
  },
  Button: {
    backgroundColor: colors.skyBlue,
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlignVertical: 'center',
  },
  listItem: {
    fontSize: 16,
    backgroundColor: colors.defaultWhite,
    // flex: 1,
    marginStart: 10,
    // fontFamily: fonts.primary,
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
  value: {
    fontSize: 18,
    // fontFamily: fonts.primary,
    marginEnd: 10,
    textAlign: 'right',
    // marginEnd: 15,
    // flexWrap: 'wrap',
    marginStart: 5,
    flex: 1,
  },
  profileBackground: {
    width: '100%',
    minHeight: Dimensions.get('window').height * 0.4,
    paddingTop: 20,
  },
});

export default styles;
