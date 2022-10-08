import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, View, TextInput, Modal, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import {fetchPredefinedSkills} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './EditSkills.styles';

export class EditSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      modalVisible: false,
      skillsData: [],
      headerTitle: this.props.t('skills.addSkills'),
      error: false,
      predefinedSkills: [],
    };
  }
  componentDidMount() {
    const {route} = this.props;
    if (route?.params?.data) {
      this.setState({
        skillsData: route?.params.data ? route?.params.data : [],

        headerTitle: route?.params.headerTitle
          ? route?.params.headerTitle
          : this.props.t('skills.addSkills'),
      });
      this.showPredefinedSkills();
    }
  }
  // onAdd = (item) => {
  //   if (item.length > 0) {
  //     this.setState({
  //       skillsData: [...this.state.skillsData, item],
  //       title: '',
  //       error: false,
  //       modalVisible: false,
  //     });
  //   } else {
  //     this.setState({error: true});
  //   }
  // };
  removeSkills = (index) => {
    let temp = this.state.skillsData;
    temp.splice(index, 1);
    this.setState({
      skillsData: temp,
    });
  };
  // onNext = () => {
  //   // const { title, discription } = this.props.route.params
  //   this.props.navigation.navigate('ViewProfile', {
  //     skills: this.state.skillsData,
  //   });
  // };

  showPredefinedSkills = async () => {
    try {
      const res = await fetchPredefinedSkills(this.props.token);
      console.log('skills', JSON.stringify(res.data, null, 2));
      this.setState({predefinedSkills: res.data?.data?.skills});
    } catch (err) {
      console.error('Couldnot fetch predefined skills', err);
    }
  };

  handleSubmit = () => {
    if (this.state.skillsData.length < 3) {
      alert(this.props.t('skills.minimum3'));
    } else if (this.state.skillsData.length > 10) {
      alert(this.props.t('skills.maximum10'));
    } else {
      let data = {
        skills: this.state.skillsData,
      };
      this.props.dispatch(LOADER(true));
      this.props.dispatch(UPDATE_PROFILE({data: data, modal: true}));
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps?.route?.params?.currentSkills?.length !=
      this.props?.route?.params?.currentSkills?.length
    ) {
      this.setState({skillsData: [...this.props?.route.params?.currentSkills]});
    }
    if (prevProps.loading === true && this.props.loading === false) {
      this.props.navigation.navigate('ViewProfile');
    }
  }

  handlePredefinedSkills = (skillName) => {
    let temp = [...this.state.skillsData];
    let hasSkillInSelectedSkillsIndex = temp.findIndex(
      (skill) => skill === skillName,
    );
    hasSkillInSelectedSkillsIndex > -1
      ? temp.splice(hasSkillInSelectedSkillsIndex, 1)
      : // : temp.length > 9
        // ? alert('Maximum 10 skills are allowed')
        temp.push(skillName);
    this.setState({skillsData: temp});
  };

  render() {
    const {t} = this.props;
    const {predefinedSkills} = this.state;

    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={this.props.t('skills.editSkills')}
          notificationButton={true}
        />
        <Container style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              flexWrap: 'wrap',
              marginVertical: 5,
            }}>
            {/* {predefinedSkills?.map((skill, i) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: !this.state.skillsData?.includes(skill?.name)
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
                  }}>
                  {skill.name}
                </Text>
                {!this.state.skillsData?.includes(skill.name) ? (
                  <Icon name="add" color={colors.defaultWhite} />
                ) : (
                  <Icon name="tick" color={colors.defaultWhite} />
                )}
              </TouchableOpacity>
            ))} */}
          </View>
          {/* <Text
            style={{
              fontSize: 16,
              marginStart: 10,
              marginVertical: 10,
              color: colors.appGreen,
            }}>
            Selected Skills
          </Text> */}
          <View style={styles.skillsInfoContainer}>
            {this.state.skillsData?.map((skill, index) => (
              <TouchableOpacity
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
            ))}
          </View>

          <View
            style={{
              position: 'absolute',
              width: '100%',
              right: 10,
              bottom: 80,
            }}>
            <CustomButton
              style={styles.addButton}
              handlePress={() =>
                this.props.navigation.navigate('AddSkills', {
                  navigationScreenName: 'EditSkills',
                  previousSkills: this.state.skillsData,
                  isEdit: true,
                })
              }>
              <Icon name="add" size={25} color={colors.defaultWhite} />
            </CustomButton>
          </View>

          <CustomButton
            isLoading={this.props.loading}
            mode={1}
            style={{
              marginVertical: 10,
              backgroundColor: colors.appGreen,
              height: 40,
              marginHorizontal: 10,
            }}
            handlePress={this.handleSubmit}>
            <Text style={styles.buttonText}>
              {this.props.t('skills.update')}
            </Text>
          </CustomButton>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
});

export default withTranslation()(connect(mapStateToProps)(EditSkills));
