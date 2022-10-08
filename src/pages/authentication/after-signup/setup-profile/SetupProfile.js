import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import styles from './SetupProfile.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import ErrorText from 'src/components/error-text/ErrorText';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PERSONAL_INFO} from 'src/actions/action';
import FastImage from 'react-native-fast-image';
import i18n from 'src/locale/i18n';

class SetupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      languages: [],
      selectedExperience: '',
      profileImage: null,
      firstNameError: false,
      lastNameError: false,
      languageError: false,
    };
    this.languageInput = React.createRef();
  }

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [languages, setLanguages] = useState([]);
  // const [selectedExperience, setSelectedExperience] = useState({});
  experienceArray = [
    {
      id: 0,
      name: `${i18n.t('asSetupProfile.begineer')}`,
      info: `${i18n.t('asSetupProfile.begineerInfo')}`,
      tag: 'beginer',
    },

    {
      id: 1,
      name: `${i18n.t('asSetupProfile.intermediate')}`,
      info: `${i18n.t('asSetupProfile.intermediateInfo')}`,
      tag: 'intermediate',
    },
    {
      id: 2,
      name: `${i18n.t('asSetupProfile.advanced')}`,
      info: `${i18n.t('asSetupProfile.advancedInfo')}`,
      tag: 'advanced',
    },
  ];

  // function getRandomColor() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  handleLanguageChange = async (event) => {
    let temp = [...this.state.languages];
    temp.push(event.nativeEvent.text);

    await this.setState({languages: [...temp]});
    this.languageInput.current.clear();
  };

  removeLanguage = (index) => {
    let temp = [...this.state.languages];
    temp.splice(index, 1);
    this.setState({languages: temp});

    // setLanguages(temp);
  };

  setExperienceLevel = (item) => {
    this.setState({selectedExperience: item});
  };

  onActionSheetItemPress = (index) => {
    if (index == 0) {
      ImagePicker.openCamera({
        width: 720,
        height: 720,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.9,
      }).then((image) => {
        // console.log('cpi', image);
        this.setState({
          profileImage: {
            name: Math.random().toString(),
            uri: image.path,
            type: image.mime,
          },
        });
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        width: 720,
        height: 720,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({
          profileImage: {
            name: Math.random().toString(),
            uri: image.path,
            type: image.mime,
          },
        });
      });
    }
  };

  onSubmit = async () => {
    const validate = this.validation();
    if (validate) {
      await this.props.dispatch(LOADER(true));
      const fd = new FormData();

      fd.append('first_name', this.state.firstName);

      fd.append('last_name', this.state.lastName);

      fd.append('language', 'en');

      this.state.profileImage &&
        fd.append('profile_image', {
          name: this.state.profileImage.name,
          type: this.state.profileImage.type,
          uri:
            Platform.OS === 'android'
              ? this.state.profileImage.uri
              : this.state.profileImage.uri.replace('file://', ''),
        });
      fd.append(
        'experience_level',
        !this.state.selectedExperience
          ? 'beginer'
          : this.state.selectedExperience?.tag,
      );
      fd.append(
        'known_languages',
        this.state.languages.length
          ? JSON.stringify(this.state.languages)
          : JSON.stringify([]),
      );

      await this.props.dispatch(
        UPDATE_PERSONAL_INFO({
          data: fd,
          modal: false,
          // navigation: this.props.navigation.navigate('Location'),
          navigation: this.props.navigation.navigate('PhoneNo'),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        }),
      );
    }
  };

  validation = () => {
    let validate = true;
    if (!this.state.firstName) {
      this.setState({firstNameError: true});
      validate = false;
    }
    if (!this.state.lastName) {
      this.setState({lastNameError: true});

      validate = false;
    }
    if (!this.state.languages?.length) {
      this.setState({languageError: true});
      validate = false;
    }
    if (
      !this.state.profileImage?.uri &&
      !this.props.profileData?.profile_image
    ) {
      alert(i18n.t('asSetupProfile.pleaseSelectPic'));
      validate = false;
    }

    return validate;
  };
  componentDidMount() {
    const {profileData} = this.props;
    this.setState({
      firstName: profileData?.first_name,
      lastName: profileData?.last_name,
      languages: profileData?.known_languages,
      selectedExperience: this.experienceArray.find(
        (x) => x.tag === profileData?.experience_level,
      ),
    });
  }
  // componentDidUpdate(prevProps) {
  //   const {navigation} = this.props;
  //   if (prevProps.loading === true && this.props.loading === false) {
  //     console.log('INide');
  //     navigation.navigate('Location');
  //     this.setState({firstNameError: false, lastNameError: false});
  //   }
  // }
  render() {
    const {
      firstName,
      lastName,
      selectedExperience,
      languages,
      profileImage,
    } = this.state;
    const {
      setExperienceLevel,
      removeLanguage,
      handleLanguageChange,
      experienceArray,
      languageInput,
    } = this;
    const {navigation, profileData} = this.props;
    // console.log('ll', JSON.stringify(profileData, null, 2));
    return (
      <>
        <Header
          title={i18n.t('asSetupProfile.setupProfile')}
          backButton
          navigation={this.props.navigation}
        />
        <ScrollView>
          <Text style={styles.infoText}>
            {i18n.t('asSetupProfile.thisPhoto')}
          </Text>
          {profileImage?.uri || profileData?.profile_image ? (
            <FastImage
              source={{uri: profileImage?.uri || profileData?.profile_image}}
              height="auto"
              width="auto"
              // resizeMode="contain"
              resizeMethod="scale"
              style={{
                height: 90,
                width: 90,
                alignSelf: 'center',
                borderRadius: 45,
                marginVertical: 10,
              }}
            />
          ) : (
            <FastImage
              source={require('./images/man.png')}
              height="auto"
              width="auto"
              // resizeMode="contain"
              resizeMethod="scale"
              style={{
                height: 90,
                width: 90,
                alignSelf: 'center',
                borderRadius: 45,
                marginVertical: 10,
              }}
            />
          )}

          <TouchableOpacity
            style={styles.uploadPhotoButton}
            onPress={() => this.ActionSheet.show()}>
            <Text style={styles.uploadPhotoButtonText}>
              {i18n.t('asSetupProfile.uploadPhoto')}
            </Text>
          </TouchableOpacity>

          <View style={styles.nameContainer}>
            <View style={{width: '45%', marginEnd: 20}}>
              <Text style={styles.fnameText}>
                {i18n.t('asSetupProfile.firstName')}
              </Text>
              <CustomInput
                style={styles.input}
                value={firstName}
                handleChange={(firstName) => this.setState({firstName})}
                isClass={true}
              />
              {this.state.firstNameError && <ErrorText text={'Required.'} />}
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.fnameText}>
                {i18n.t('asSetupProfile.lastName')}
              </Text>
              <CustomInput
                style={styles.input}
                value={lastName}
                handleChange={(lastName) => this.setState({lastName})}
                isClass={true}
              />
              {this.state.lastNameError && <ErrorText text={'Required.'} />}
            </View>
          </View>
          <Text style={styles.languagesText}>
            {i18n.t('asSetupProfile.languages')}
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              color: colors.appBlack,
              marginVertical: 10,
              textAlign: 'left',
            }}>
            {i18n.t('asSetupProfile.tellUsLanguages')}
          </Text>
          <TextInput
            style={styles.languageInput}
            ref={languageInput}
            // value={languages}
            // handleChange={(languages) => setLanguages(languages)}
            onSubmitEditing={handleLanguageChange}
          />
          {this.state.languageError && (
            <ErrorText
              text={i18n.t('asSetupProfile.required')}
              style={{paddingStart: 10}}
            />
          )}
          <View style={styles.languageCard}>
            {languages?.map((language, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => removeLanguage(index)}>
                <Text
                  style={[styles.selectedLanguageText, {alignItems: 'center'}]}>
                  {language}
                  <Ionicons
                    name="close-outline"
                    size={15}
                    color={colors.defaultWhite}
                    style={{paddingTop: 10}}
                  />
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.experienceText}>
            {i18n.t('asSetupProfile.experience')}
          </Text>
          <Text style={styles.experienceRateText}>
            {i18n.t('asSetupProfile.rateExperience')}
          </Text>

          <FlatList
            data={experienceArray}
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: 10, marginBottom: 20}}
            contentContainerStyle={{marginEnd: 30}}
            horizontal={true}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setExperienceLevel(item)}
                style={[
                  styles.experienceCard,
                  index === 2 && {marginEnd: 0},
                  selectedExperience.id === index && {
                    borderWidth: 2,
                    borderColor: colors.skyBlue,
                  },
                ]}>
                <Text style={styles.heading}>{item.name}</Text>
                <Text style={styles.body}>{item.info}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <View>
            {/* <TouchableOpacity
              style={styles.footerButton}
              onPress={() => navigation.navigate('Location')}>
              <Text style={styles.footerText}>Skip this step?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.footerButton, {backgroundColor: colors.skyBlue}]}
              onPress={this.onSubmit}>
              {!this.props.loading ? (
                <Text style={styles.footerText}>
                  {i18n.t('asSetupProfile.submitAndNext')}
                </Text>
              ) : (
                <ActivityIndicator size={30} color={colors.defaultWhite} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={i18n.t('asSetupProfile.chooseOption')}
          options={[
            i18n.t('asSetupProfile.takePhoto'),
            i18n.t('asSetupProfile.fromGallery'),
            i18n.t('asSetupProfile.cancel'),
          ]}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.myReducer.user.freelancer_profile,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(SetupProfile);
