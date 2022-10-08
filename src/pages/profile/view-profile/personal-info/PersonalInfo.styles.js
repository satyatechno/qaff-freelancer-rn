import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
  },
  profileBackground: {
    width: '100%',
    minHeight: Dimensions.get('window').height * 0.4,
    paddingTop: 70,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 65,
  },
  freelancerName: {
    color: colors.appGray,
    fontSize: 20,
    // textShadowRadius: 2,
    paddingTop: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  freelancerInfo: {
    color: colors.appGray,
    fontSize: 14,
    paddingBottom: 5,
    // textShadowRadius: 2,
    fontFamily: fonts.secondary,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationName: {
    color: colors.appGray,
    marginStart: 5,
    // textShadowRadius: 2,
    fontSize: 12,
    fontFamily: fonts.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  profileRatingText: {
    marginStart: 10,
    color: colors.appGray,

    textAlignVertical: 'center',
  },
  editContainer: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 1,
  },
  editIcon: {
    backgroundColor: colors.appViolet,
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
  editMenuContainer: {
    zIndex: 10,
    margin: 5,
    padding: 5,
    height: 80,
    width: 165,
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  editMenuText: {
    fontSize: 16,
    paddingStart: 10,
    fontFamily: fonts.primary,
    alignSelf: 'center',
  },
});
export default styles;
