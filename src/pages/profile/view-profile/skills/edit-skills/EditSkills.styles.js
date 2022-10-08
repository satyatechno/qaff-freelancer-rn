import {StyleSheet, Dimensions} from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  modalStyle: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
  },
  inputContainer: {
    backgroundColor: colors.defaultWhite,
    paddingHorizontal: 20,
    elevation: 5,
    borderColor: colors.appGray1,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    paddingVertical: 20,
  },
  label: {
    color: colors.appGray,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.primarySB,
    textAlign: 'left',
  },
  textArea: {
    // minHeight: 30,
    padding: 5,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.secondarySB,
    color: colors.defaultWhite,
    textAlign: 'center',
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  skillsInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginTop: 10,
    flex: 1,
  },
  skill: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    margin: 10,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  skillName: {
    color: colors.defaultWhite,
    padding: 10,
    fontFamily: fonts.primarySB,
    fontSize: 12,
  },
  cancelIcon: {
    height: 25,
    width: 25,
    backgroundColor: colors.appRed,
    borderRadius: 13,
    padding: 2,
  },
  cancelIconButton: {
    position: 'absolute',
    end: -20,
    top: -10,
  },
});
export default styles;
