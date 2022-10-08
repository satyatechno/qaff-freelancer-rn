import colors from 'src/styles/texts/colors';

const {StyleSheet, Dimensions} = require('react-native');

export default StyleSheet.create({
  addSchoolText: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.skyBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: colors.defaultWhite,
    width: 60,
    height: 60,
    borderRadius: 30,
    // alignSelf: 'flex-end',
    // position: 'absolute',

    // right: 20,
    // bottom: 0,

    // marginHorizontal: 15,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: 20,
    // marginBottom: -30,
  },
  educationText: {
    fontSize: 18,
    color: colors.defaultBlack,
    textAlign: 'center',
  },
  addEmploymentCard: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.defaultWhite,
    paddingBottom: 0,
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: -30,
  },
  linearGradient: {
    backgroundColor: colors.skyBlue,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 20,
    overflow: 'hidden',
    marginVertical: 25,
  },
  submitText: {
    color: colors.defaultWhite,
  },
});
