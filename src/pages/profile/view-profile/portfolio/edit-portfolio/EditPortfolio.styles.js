import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    padding: 10,
    flex: 1,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  skillsInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  textArea: {
    padding: 5,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 200,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    minHeight: 40,
    fontSize: 16,
  },
  attachmentContainer: {
    // borderTopWidth: 0.5,
    // borderColor: colors.appGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  attachmentText: {
    color: colors.appBlack,
    fontFamily: fonts.primarySB,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
  },
  addAttachmentOptionalText: {
    color: colors.appGray,
    fontFamily: fonts.primarySB,
    fontSize: 14,
    textAlign: 'left',
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  attachmentImageContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderColor: colors.appGray,
    alignItems: 'center',
    paddingVertical: 5,
  },

  attachmentImage: {
    width: 70,
    height: 70,

    alignSelf: 'center',

    flex: 0.2,
    justifyContent: 'flex-start',
  },
  attachmentImageText: {
    fontSize: 14,
    fontFamily: fonts.primary,
    color: colors.appGray,
    marginHorizontal: 10,
    flex: 0.8,
    textAlign: 'left',
  },
  attachmentLimitText: {
    color: colors.appRed,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
});
export default styles;
