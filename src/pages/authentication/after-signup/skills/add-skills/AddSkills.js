import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  I18nManager,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchPredefinedSkills, fetchSkills} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import Checkbox from 'src/components/checkbox-default/CheckboxDefault';

import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import Snackbar from 'react-native-snackbar';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import i18n from 'src/locale/i18n';

class AddSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      skills: [],
      subCategoryIds: [],
      skillsLoading: false,
      selectedSkills: [],
      predefinedSkills: [],
      hideSkills: false,
    };
    this.selectedCheckboxes = new Set();
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this),
    );
  }

  showSkills = () => {
    this.setState({skillsLoading: true});
    fetchSkills(this.state.search, JSON.stringify(this.state.subCategoryIds))
      .then((res) => {
        this.setState({skills: res.data?.data?.skills, skillsLoading: false});
        // console.log('skills', JSON.stringify(this.state.skills, null, 2));
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        this.setState({skillsLoading: false});
      });
  };
  showPredefinedSkills = async () => {
    try {
      const res = await fetchPredefinedSkills(this.props.token);
      console.log('skills', JSON.stringify(res.data, null, 2));
      this.setState({predefinedSkills: res.data?.data?.skills});
    } catch (err) {
      console.error('Couldnot fetch predefined skills', err);
    }
  };

  keyboardDidShow() {
    this.setState({hideSkills: true});
  }

  keyboardDidHide() {
    this.setState({hideSkills: false});
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    let temp = [];
    temp.push(this.props?.userProfile?.main_category?.id);
    this.props?.userProfile?.categories?.map((category) =>
      temp.push(category.id),
    );

    this.setState({subCategoryIds: temp});
    if (this.props.route?.params?.previousSkills) {
      this.setState({
        selectedSkills: [...this.props.route?.params?.previousSkills],
      });
    }
    this.showPredefinedSkills();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.showSkills();
    }
    if (prevProps.loading === true && this.props.loading === false) {
      const {navigationScreenName} = this.props.route?.params;
      this.props.navigation.navigate(navigationScreenName);
    }
  }

  addSkills = (item, index) => {
    let doesSkillExist = this.state.selectedSkills.some(
      (skill) => skill === item.name,
    );
    if (doesSkillExist) {
      Snackbar.show({
        text: i18n.t('asAddSkills.skillsAlreadyAdded'),
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.selectedSkills.length > 9) {
      alert(i18n.t('asAddSkills.maximum10'));
    } else {
      let tempSkills = [...this.state.skills];
      tempSkills.splice(index, 1);
      this.setState({skills: [...tempSkills]});

      this.setState({
        selectedSkills: [item.name, ...this.state.selectedSkills],
      });
    }
  };
  handlePredefinedSkills = (skillName) => {
    let temp = [...this.state.selectedSkills];
    let hasSkillInSelectedSkillsIndex = temp.findIndex(
      (skill) => skill === skillName,
    );
    hasSkillInSelectedSkillsIndex > -1
      ? temp.splice(hasSkillInSelectedSkillsIndex, 1)
      : temp.length > 9
      ? alert(i18n.t('asAddSkills.maximum10'))
      : temp.push(skillName);
    this.setState({selectedSkills: temp});
  };

  handleSubmit = () => {
    if (this.state.selectedSkills.length < 3) {
      alert(i18n.t('asAddSkills.minimum3'));
    } else if (this.state.selectedSkills.length > 10) {
      alert(i18n.t('asAddSkills.maximum10'));
    } else {
      let data = {
        skills: this.state.selectedSkills,
      };
      this.props.dispatch(LOADER(true));
      this.props.dispatch(UPDATE_PROFILE({data: data, modal: false}));
    }
  };

  removeSkills = (index) => {
    let currentSkills = [...this.state.selectedSkills];
    currentSkills.splice(index, 1);
    this.setState({selectedSkills: [...currentSkills]});
  };

  render() {
    const {
      route: {
        params: {isEdit, navigationScreenName},
      },
    } = this.props;
    const {predefinedSkills, selectedSkills} = this.state;
    let temp1 = predefinedSkills.map((y) => y.name);
    let temp = selectedSkills.filter((x) => !temp1.includes(x));
    // console.log('kl', JSON.stringify(this.props.userProfile, null, 2));
    // console.log('skills', isEdit);

    return (
      <>
        <Header
          title={i18n.t('asAddSkills.selectSkills')}
          backButton
          navigation={this.props.navigation}
        />

        {!this.state.hideSkills && (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              flexWrap: 'wrap',
              marginVertical: 5,
              marginTop: 15,
            }}>
            {predefinedSkills?.map((skill, i) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: !this.state.selectedSkills?.includes(
                    skill?.name,
                  )
                    ? colors.appGray4
                    : colors.appViolet,
                  marginEnd: 5,
                  marginBottom: 5,
                  padding: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                key={i}
                onPress={() => this.handlePredefinedSkills(skill.name)}>
                <Text
                  style={{
                    color: colors.defaultWhite,
                    paddingEnd: 3,
                    textAlignVertical: 'center',
                    marginTop: -1,
                    textAlign: 'left',
                  }}>
                  {skill.name}
                </Text>
                {!this.state.selectedSkills?.includes(skill.name) ? (
                  <Icon name="add" color={colors.defaultWhite} />
                ) : (
                  <Icon name="tick" color={colors.defaultWhite} />
                )}
              </TouchableOpacity>
            ))}
            {temp?.map((skill, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.removeSkills(index)}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.appViolet,
                    padding: 5,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginEnd: 5,
                    marginBottom: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.defaultWhite,
                      fontSize: 12,
                    }}>
                    {skill}
                  </Text>
                  <Icon
                    name="close"
                    style={{marginHorizontal: 5}}
                    color={colors.defaultWhite}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <TextInput
          style={{
            borderWidth: 1.5,
            borderColor: colors.skyBlue,
            height: 40,
            paddingHorizontal: 10,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            marginBottom: 5,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}
          placeholder={i18n.t('asAddSkills.searchSkills')}
          onChangeText={(text) => this.setState({search: text})}
          onFocus={() => this.setState({hideSkills: true})}
          onBlur={() => this.setState({hideSkills: false})}
        />

        <FlatList
          style={{height: '40%', marginBottom: 10}}
          keyboardShouldPersistTaps="handled"
          data={this.state.skills}
          contentContainerStyle={{
            marginHorizontal: 10,
            marginBottom: 10,
          }}
          ListEmptyComponent={
            this.state.skillsLoading ? (
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                size="small"
                color={colors.skyBlue}
              />
            ) : (
              !this.state.skillsLoading &&
              this.state.search && (
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginTop: 20,
                  }}>
                  {i18n.t('asAddSkills.noMatch')}
                </Text>
              )
            )
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.addSkills(item, index)}
                style={{
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appGray1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    textAlignVertical: 'center',
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  {item.name}
                </Text>
                <Icon name="add" color={colors.appGreen} size={16} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index + Math.random().toString()}
        />

        <ScrollView
          style={{marginBottom: 10}}
          contentContainerStyle={{
            flexDirection: 'row',
            marginHorizontal: 10,
            flexWrap: 'wrap',
          }}>
          {/* {this.state.selectedSkills?.map((skill, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.removeSkills(index)}
              style={{
                flexDirection: 'row',
                backgroundColor: colors.appViolet,
                padding: 5,
                alignItems: 'center',
                borderRadius: 10,
                marginEnd: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  color: colors.defaultWhite,
                }}>
                {skill}
              </Text>
              <Icon
                name="close"
                style={{marginHorizontal: 5}}
                color={colors.defaultWhite}
              />
            </TouchableOpacity>
          ))} */}
        </ScrollView>
        {!isEdit ? (
          <CustomButton
            handlePress={this.handleSubmit}
            isLoading={this.props.loading}
            style={{
              backgroundColor: colors.appGreen,
              marginHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: colors.defaultWhite, fontSize: 16}}>Save</Text>
          </CustomButton>
        ) : (
          <CustomButton
            handlePress={() =>
              this.props.navigation.navigate(navigationScreenName, {
                currentSkills: this.state.selectedSkills,
              })
            }
            style={{
              backgroundColor: colors.skyBlue,
              marginHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: colors.defaultWhite, fontSize: 16}}>
              {i18n.t('asAddSkills.next')}
            </Text>
          </CustomButton>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfile: state.myReducer.userProfile,
  loading: state.myReducer.loading,
});
export default connect(mapStateToProps)(AddSkills);
