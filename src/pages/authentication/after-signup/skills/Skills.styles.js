import colors from 'src/styles/texts/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  addSchoolText: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.skyBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 70,
  },
  submitText: {
    color: colors.defaultWhite,
  },
  addButton: {
    backgroundColor: colors.skyBlue,
    width: 60,
    height: 60,
    borderRadius: 30,
    // alignSelf: 'flex-end',
    position: 'absolute',

    right: 20,
    bottom: 20,

    // marginHorizontal: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
