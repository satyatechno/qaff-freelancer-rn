import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
export default StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: colors.appGray1,
    borderTopWidth: 1,
    paddingBottom: 20,
  },
  attachmentImage: {
    width: 200,
    height: 200,

    alignSelf: 'center',
    marginEnd: 5,
    justifyContent: 'flex-start',
  },
  sentChatContainer: {
    alignSelf: 'flex-end',
    marginEnd: 10,
    borderWidth: 2,
    borderColor: colors.skyBlue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 10,
    maxWidth: '70%',
    padding: 5,
  },
  receivedChatContainer: {
    backgroundColor: colors.skyBlue,
    alignSelf: 'flex-start',
    marginStart: 10,
    borderWidth: 2,
    borderColor: colors.skyBlue,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 10,
    maxWidth: '70%',
    padding: 5,
  },
  receivedChatMessage: {
    color: colors.defaultWhite,
    fontFamily: fonts.secondary,
  },
  sentChatMessage: {
    color: colors.appBlack,
    fontFamily: fonts.secondary,
  },
  attachmentButton: {
    borderColor: colors.appGray1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    width: 40,
    height: 40,
    marginEnd: 10,
  },
  sendButton: {
    backgroundColor: colors.skyBlue,
    marginStart: 10,
    height: 40,
    width: 40,
  },
  chatFooter: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  sentChatTime: {
    color: colors.appGray,
    marginEnd: 2,
  },
  receivedChatTime: {
    color: colors.defaultWhite,
    marginEnd: 2,
  },
  isTypingContainer: {
    marginVertical: 5,
    marginStart: 10,
    overflow: 'hidden',
  },
  isTypingText: {
    color: colors.appGray,
  },
  sectionHeaderView: {
    alignItems: 'center',
    backgroundColor: colors.appGray,
    justifyContent: 'center',
  },
  sectionHeaderTextView: {
    alignItems: 'center',
    backgroundColor: colors.appGray,
    borderRadius: 11,
    height: 20,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    color: colors.defaultWhite,
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
  },
});
