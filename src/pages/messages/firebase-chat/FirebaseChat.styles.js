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
    paddingBottom: '5%',
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
    padding: 10,
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
    padding: 10,
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    backgroundColor: colors.skyBlue,
    marginStart: 10,
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    flex: 1,
    borderColor: colors.appGray1,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingStart: 10,
  },
  isTypingContainer: {
    marginVertical: 5,
    marginStart: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isTypingText: {
    color: colors.appGray,
  },
  attachmentImage: {
    width: 70,
    height: 70,

    alignSelf: 'center',
    marginEnd: 5,
    justifyContent: 'flex-start',
  },
});
