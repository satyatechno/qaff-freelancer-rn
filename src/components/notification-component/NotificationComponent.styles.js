import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
export const { width, height } = Dimensions.get('window');
const statusbarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  header: {
    height: 60 + statusbarHeight,
    width: width * 0.8,
    backgroundColor: colors.skyBlue,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: statusbarHeight,

  },

  titleContainer: {
    // flex: 1,
  },
  title: {
    color: colors.defaultWhite,
    fontFamily: fonts.primarySB,
    textAlign: "left",
    fontSize: 22,
    paddingTop: -20

  },
  body: {
    height: height,

    backgroundColor: colors.defaultWhite
  },
  imageContainer: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60

  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 10
  },
  imageContainerText: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray
  },
  sectionItem: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  saperator: {
    height: 1,
    backgroundColor: colors.appGray1,
    marginStart: 15
  },
  sectionHeader: {
    backgroundColor: colors.appGray1,
    padding: 10,
    fontFamily: fonts.primary,
    color: colors.appBlack,
    textAlign: "left",
    fontSize: 16
  },
  sectionItemTitleView: {
    paddingTop: 10,
    flex: 1

  },
  sectionItemTitle: {
    color: colors.appBlack,
    textAlign: "left",
    fontSize: 16,
    fontFamily: fonts.primary,

  },
  sectionItemTime: {
    color: colors.appGray,
    textAlign: "left",
    fontSize: 12,
    marginBottom: 15
    // fontFamily:fonts.primary,
  },
  backIconStyle: {
    width: width * 0.2,
    // flex:0.2,
    backgroundColor: colors.appGray,
    opacity: 0.9
  },
})
export default styles