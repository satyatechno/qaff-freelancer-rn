import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  I18nManager,
  ImageBackground,
  Platform,
  SectionList,
  Text,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PERSONAL_INFO} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './EditPersonalInfo.styles';

class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionListColor: 0,
      listColor: [colors.appYellow, colors.appViolet, colors.appBlue],

      profileImage: '',
      coverImage: '',
      buttonType: 'Edit',
      disable: false,
      gender: '',
      imageType: 0, // 0 == profileImage,1== coverImage
      isSaveButtonVisible: false,
    };
  }
  PROFILE_ITEMS = [
    {
      title: this.props.t('personalInfo.general'),
      sectionId: 1,
      color: colors.appViolet,
      data: [
        {
          iconName: 'project',
          listName: this.props.t('personalInfo.firstName'),
          listId: 1,
        },
        {
          iconName: 'project',
          listName: this.props.t('personalInfo.lastName'),
          listId: 2,
        },
      ],
    },
    {
      title: this.props.t('personalInfo.contacts'),
      sectionId: 2,
      data: [
        {
          iconName: 'message',
          listName: this.props.t('personalInfo.email'),
          listId: 3,
        },
        {
          iconName: 'phone',
          listName: 'Mobile number',
          listId: 4,
        },
      ],
    },
    {
      title: this.props.t('personalInfo.other'),
      sectionId: 3,
      data: [
        {
          iconName: 'gender',
          listName: this.props.t('personalInfo.gender'),
          listId: 5,
        },
        {
          iconName: 'location',
          listName: this.props.t('personalInfo.location'),
          listId: 6,
        },
        {
          iconName: 'gift',
          listName: this.props.t('personalInfo.birthday'),
          listId: 7,
        },
      ],
    },
  ];

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading === true) {
      if (!this.props.loading) {
        this.setState({
          buttonType: 'Edit',
          disable: false,
          profileImage: '',
          coverImage: '',
          isSaveButtonVisible: false,
        });
      }
    }
    if (
      prevProps?.route?.params !== this.props?.route?.params ||
      prevState.gender !== this.state.gender ||
      prevState.profileImage !== this.state.profileImage ||
      prevState.coverImage !== this.state.coverImage
    ) {
      this.setState({isSaveButtonVisible: true});
    }
  }

  componentDidMount() {
    this.props.dispatch(LOADER(false));
  }

  onSave = () => {
    this.props.dispatch(LOADER(true));
    const fd = new FormData();
    let firstName = this.props?.route.params?.first_name
      ? this.props?.route.params?.first_name
      : this.props.profileData?.first_name;
    let lastName = this.props?.route.params?.last_name
      ? this.props?.route.params?.last_name
      : this.props.profileData?.last_name;
    fd.append('first_name', firstName);

    fd.append('last_name', lastName);
    this.state.gender &&
      fd.append(
        'gender',
        this.state.gender
          ? this.state.gender.toLowerCase()
          : this.props.profileData?.gender.toLowerCase(),
      );
    this.props?.route.params?.birthday &&
      fd.append(
        'dob',
        this.props?.route.params?.birthday
          ? this.props?.route.params?.birthday
          : this.props.profileData?.dob,
      );

    // fd.append('country', this.props?.route.params?.location ?
    //     this.props?.route.params?.location :
    //     this.props.profileData?.country);

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
    this.state.coverImage &&
      fd.append('cover_image', {
        name: this.state.coverImage.name,
        type: this.state.coverImage.type,
        uri:
          Platform.OS === 'android'
            ? this.state.coverImage.uri
            : this.state.coverImage.uri.replace('file://', ''),
      });

    this.props.dispatch(
      UPDATE_PERSONAL_INFO({data: fd, modal: true, firstName, lastName}),
    );
  };

  Item = ({title, section}) => {
    const listColor =
      section.sectionId === 2
        ? colors.appViolet
        : section.sectionId === 3
        ? colors.appBlue
        : colors.appYellow;

    return (
      <CustomButton
        style={{marginEnd: 15}}
        disabled={this.state.disable}
        handlePress={() => {
          this.state.disable
            ? alert('Press Edit Button First!')
            : this.handleProfileNavigation(title);
        }}>
        <View style={styles.listContainer}>
          <Icon name={title.iconName} size={18} color={listColor} />

          <Text style={styles.listItem}>{title.listName}</Text>
          {/* <Text>{JSON.stringify(section)}</Text> */}
          <Text
            style={[
              styles.value,
              {color: listColor},
              (title.listId === 7 || title.listId === 4) && {
                fontFamily: fonts.secondary,
              },
            ]}>
            {title.listId === 1 &&
              (this.props?.route.params?.first_name
                ? this.props?.route.params?.first_name
                : this.props.profileData?.first_name)}
            {title.listId === 2 &&
              (this.props?.route.params?.last_name
                ? this.props?.route.params?.last_name
                : this.props.profileData?.last_name)}
            {title.listId === 3 && this.props.profileData?.email}
            {title.listId === 6 &&
              (!this.props.profileData?.country
                ? 'Not Set'
                : `${this.props.profileData?.city},${this.props.profileData?.country}`)}
            {title.listId === 5 &&
              (this.state.gender
                ? this.state.gender
                : this.props.profileData?.gender === 'male'
                ? 'Male' // t("male")
                : this.props.profileData?.gender === 'female'
                ? 'Female' // t("female")
                : 'Not set')}
            {title.listId === 7 &&
              (this.props?.route.params?.birthday
                ? this.props?.route.params?.birthday
                : this.props.profileData?.dob
                ? this.props.profileData?.dob
                : 'Not set'
              ).replace(/-|-/gi, '.')}
            {title.listId === 4 &&
              (this.props.profileData?.phone
                ? '+' +
                  this.props.profileData?.country_code +
                  ' ' +
                  this.props.profileData?.phone
                : 'Not set')}
          </Text>

          <Icon
            name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
            size={18}
            color={listColor}
            style={{marginTop: 3}}
          />
        </View>
      </CustomButton>
    );
  };

  handleProfileNavigation = (title) => {
    if (title.listId === 1) {
      this.props.navigation.navigate('Edit', {
        first_name: this.props?.route.params?.first_name
          ? this.props?.route.params?.first_name
          : this.props.profileData?.first_name,
      });
    } else if (title.listId === 2) {
      this.props.navigation.navigate('Edit', {
        last_name: this.props?.route.params?.last_name
          ? this.props?.route.params?.last_name
          : this.props.profileData?.last_name,
      });
    } else if (title.listId === 5) {
      this.ActionSheetGender.show();
    } else if (title.listId === 6) {
      this.props.navigation.navigate('Location', {
        firstName: this.props.profileData?.first_name,
        lastName: this.props.profileData?.last_name,
      });
    } else if (title.listId === 7) {
      this.props.navigation.navigate('Edit', {
        birthday: this.props?.route.params?.birthday
          ? this.props?.route.params?.birthday
          : this.props.profileData?.dob
          ? this.props.profileData?.dob
          : '  ',
      });
    } else if (title.listId === 3) {
      this.props.navigation.navigate('ChangeEmail', {type: 'email'});
    } else if (title.listId === 4) {
      this.props.navigation.navigate('ChangeEmail', {type: 'mobile'});
    }
  };
  showActionSheet = (value) => {
    this.setState({imageType: value});
    this.ActionSheet.show();
  };

  onActionSheetGenderItemPress = (index) => {
    if (index == 0) {
      this.setState({
        gender: 'Male',
      });
    } else if (index == 1) {
      this.setState({
        gender: 'Female',
      });
    }
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
        console.log('cpi', image);
        this.setState(
          this.state.imageType === 0
            ? {
                profileImage: {
                  name: Math.random().toString(),
                  uri: image.path,
                  type: image.mime,
                },
              }
            : {
                coverImage: {
                  name: Math.random().toString(),
                  uri: image.path,
                  type: image.mime,
                },
              },
        );
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        width: 720,
        height: 720,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState(
          this.state.imageType === 0
            ? {
                profileImage: {
                  name: Math.random().toString(),
                  uri: image.path,
                  type: image.mime,
                },
              }
            : {
                coverImage: {
                  name: Math.random().toString(),
                  uri: image.path,
                  type: image.mime,
                },
              },
        );
      });
    }
  };
  listHeader = () => {
    return (
      <ImageBackground
        style={styles.profileBackground}
        source={
          this.state.coverImage?.uri
            ? {uri: this.state.coverImage?.uri}
            : this.props.profileData?.cover_image
            ? {uri: this.props.profileData?.cover_image}
            : require('./images/coverimage.png')
        }>
        <CustomButton
          style={styles.editContainer}
          disabled={this.state.disable}
          handlePress={() => {
            this.state.disable
              ? alert('Press Edit Button First!')
              : this.showActionSheet(1);
          }}>
          <FastImage
            style={styles.editimage}
            source={require('./images/edit.png')}
          />
        </CustomButton>
        <View style={{}}>
          {this.props.profileData?.profile_image ||
          this.state.profileImage?.uri ? (
            <FastImage
              source={
                this.state.profileImage?.uri
                  ? {uri: this.state.profileImage?.uri}
                  : {uri: this.props.profileData?.profile_image}
              }
              style={[styles.profileImage, {borderRadius: 50}]}
            />
          ) : (
            <FastImage
              source={
                this.props.profileData?.gender === 'female'
                  ? require('./images/woman.png')
                  : require('./images/man.png')
              }
              style={[styles.profileImage, {borderRadius: 50}]}
            />
          )}
          <View style={styles.editContainer1}>
            <CustomButton
              disabled={this.state.disable}
              handlePress={() => {
                this.state.disable
                  ? alert('Press Edit Button First!')
                  : this.showActionSheet(0);
              }}>
              <FastImage
                style={styles.editimage1}
                source={require('./images/edit.png')}
              />
            </CustomButton>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={[
              styles.profileOwnerName,
              this.props.profileData?.cover_image && {
                color: colors.defaultWhite,
              },
            ]}>
            {this.props?.route.params?.first_name
              ? this.props?.route.params?.first_name
              : this.props.profileData?.first_name}{' '}
            {this.props?.route.params?.last_name
              ? this.props?.route.params?.last_name
              : this.props.profileData?.last_name}
          </Text>
        </View>
        {this.props.profileData?.country !== '' && (
          <View style={styles.locationContainer}>
            <Icon name="location" color={colors.appGray} size={15} />
            <Text
              style={
                styles.locationName
              }>{`${this.props.profileData?.city},${this.props.profileData?.country}`}</Text>
          </View>
        )}
      </ImageBackground>
    );
  };

  render() {
    const {t} = this.props;
    return (
      <>
        <Header
          backButton
          notificationButton
          title={t('personalInfo.viewProfile')}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <SectionList
            style={{flex: 1, marginBottom: 20}}
            sections={this.PROFILE_ITEMS}
            stickySectionHeadersEnabled={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<this.listHeader />}
            keyExtractor={(item, index) => index}
            renderItem={({item, section}) => {
              return <this.Item title={item} section={section} />;
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.appGray1,
                  marginHorizontal: 15,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: colors.appGray1}} />
            )}
            renderSectionHeader={({section: {title, sectionId}}) => (
              <View style={styles.listItemHeader}>
                <Text
                  style={
                    sectionId === 2
                      ? [styles.listItemHeaderText, {color: colors.appViolet}]
                      : sectionId === 3
                      ? [styles.listItemHeaderText, {color: colors.appBlue}]
                      : styles.listItemHeaderText
                  }>
                  {title}
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{justifyContent: 'center'}}>
                {this.state.isSaveButtonVisible && (
                  <CustomButton
                    isLoading={this.props.loading}
                    mode={1}
                    style={[
                      styles.Button,
                      // this.state.buttonType === 'Save' && {
                      //   backgroundColor: colors.skyBlue,
                      // },
                    ]}
                    handlePress={() => {
                      // this.state.buttonType === 'Edit'
                      //   ? this.setState({buttonType: 'Save', disable: false}):

                      this.onSave();
                    }}>
                    <Text style={styles.buttonText}>
                      {/* {this.state.buttonType === 'Save'
                      ? t('personalInfo.save')
                      : t('personalInfo.edit')} */}
                      {t('personalInfo.save')}
                      <Icon name="tick" size={18} style={{paddingLeft: 5}} />
                    </Text>
                  </CustomButton>
                )}
              </View>
            )}
          />
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={t('personalInfo.chooseOption')}
          options={[
            t('personalInfo.takePhoto'),
            t('personalInfo.fromGallery'),
            t('personalInfo.cancel'),
          ]}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
        <ActionSheet
          ref={(o) => (this.ActionSheetGender = o)}
          title={'Gender'}
          options={['Male', 'Female', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetGenderItemPress(index);
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

export default connect(mapStateToProps)(withTranslation()(EditPersonalInfo));
