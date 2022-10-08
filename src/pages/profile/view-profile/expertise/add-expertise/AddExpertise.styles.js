const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';

export default StyleSheet.create({
  tellUsText: {
    fontSize: 18,
    paddingStart: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  serviceText: {
    fontSize: 16,
    paddingStart: 10,
  },
  selectCategoryButton: {
    backgroundColor: colors.appGray2,
    elevation: 5,
    height: 50,
    marginHorizontal: 10,
    // justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectCategoryText: {
    fontSize: 15,
    flex: 1,
    textAlignVertical: 'center',
  },
  selectedSkillsText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  skillsText: {
    fontSize: 16,
    color: colors.defaultWhite,
  },
  submitButton: {
    marginHorizontal: 10,
    backgroundColor: colors.skyBlue,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 30,
  },
  submitText: {
    color: colors.defaultWhite,
  },
});
