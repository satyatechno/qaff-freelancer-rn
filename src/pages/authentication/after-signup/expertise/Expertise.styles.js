const {StyleSheet} = require('react-native');
import colors from 'src/styles/texts/colors';

export default StyleSheet.create({
  tellUsText: {
    fontSize: 18,
    paddingStart: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  serviceText: {
    fontSize: 16,
    paddingStart: 10,
    textAlign: 'left',
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
    textAlign: 'left',
  },
  selectedSkillsText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
    textAlign: 'left',
  },
  skillsText: {
    fontSize: 16,
    color: colors.defaultWhite,
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
});
