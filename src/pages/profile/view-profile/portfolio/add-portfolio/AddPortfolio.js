import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import {Icon} from 'src/Icon';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import styles from './AddPortfolio.styles';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {connect} from 'react-redux';
import {ADD_PORTFOLIO, LOADER} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
const ATTACHMENT_LIMIT = 20;
export class AddPortfolio extends Component {
  constructor(props) {
    super();
    this.state = {
      title: '',
      description: '',
      attachment: [],
      errorTitle: false,
      errorDescription: false,
      errorImages: false,
      skills: [],
      errorSkills: false,
      showDatePicker: false,
      date: '',
      errorDate: false,
      loading: false,
    };
    this.selectedCheckboxes = new Set();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.route?.params?.currentSkills !==
      this.props.route?.params?.currentSkills
    ) {
      this.setState({skills: this.props.route?.params?.currentSkills});
    }
    // if (prevProps.loading === true) {
    //   if (!this.props.loading) {
    //     this.setState({
    //       errorTitle: false,
    //       errorImages: false,
    //       errorDescription: false,
    //       errorSkills: false,
    //       errorDate: false,
    //     });

    //     this.props.navigation.navigate('PortfolioList');
    //   }
    // }
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onActionSheetItemPress = async (index) => {
    if (index == 0) {
      ImagePicker.openCamera({
        // width: Dimensions.get('window').width * 0.3,
        // height: Dimensions.get('window').width * 0.3,
        cropping: false,
        includeBase64: false,
      }).then((image) => {
        this.setState({
          attachment: [
            ...this.state.attachment,
            {
              name: Math.random().toString(),
              uri: image.path,
              type: image.mime,
            },
          ],
        });
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        // width: Dimensions.get('window').width * 0.3,
        // height: Dimensions.get('window').width * 0.3,
        // cropping: true,
        includeBase64: false,
        multiple: true,
      }).then((image) => {
        console.log('cpi', image);

        for (const res of image) {
          this.setState({
            attachment: [
              ...this.state.attachment,
              {
                name: Math.random().toString(),
                uri: res.path,
                type: res.mime,
              },
            ],
          });
        }
      });
    }
    //  else if (index === 2) {
    //   try {
    //     const results = await DocumentPicker.pickMultiple({
    //       type: [DocumentPicker.types.allFiles],
    //     });
    //     // console.log('rr', results);
    //     // this.setState({files: [...this.state.files, results]});
    //     for (const res of results) {
    //       this.setState({
    //         attachment: [
    //           ...this.state.attachment,
    //           {
    //             name: res.name,
    //             uri: res.uri,
    //             type: res.type,
    //           },
    //         ],
    //       });
    //     }
    //   } catch (err) {
    //     if (DocumentPicker.isCancel(err)) {
    //       console.log('User cancelled the picker,');
    //     } else {
    //       throw err;
    //     }
    //   }
    // }
  };

  removeAttachment = (index) => {
    let temp = [...this.state.attachment];
    temp.splice(index, 1);
    this.setState({attachment: temp});
  };
  onAddPortfolio() {
    const {title, attachment, description, skills, date} = this.state;
    if (
      attachment.length === 0 ||
      title.length === 0 ||
      description.length === 0 ||
      skills.length < 3 ||
      date.length === 0 ||
      skills.length > 10
    ) {
      this.setState({
        errorTitle: title.length === 0 ? true : false,
        errorImages: attachment.length === 0 ? true : false,
        errorDescription: description.length === 0 ? true : false,
        errorSkills: skills.length < 3 || skills.length > 10 ? true : false,
        errorDate: date.length === 0 ? true : false,
      });
    } else {
      // this.props.dispatch(LOADER(true));
      this.setState({loading: true});

      let fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('skills', JSON.stringify(skills));
      this.props.route?.params?.project &&
        fd.append('related_project_id', this.props.route?.params?.project?.id);
      fd.append('date', moment(this.state.date).format('DD MMM YYYY'));
      attachment.map((file, i) => {
        fd.append('images[]', {
          name: file.name,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      });
      this.props.dispatch(
        ADD_PORTFOLIO({
          data: fd,
          callback: (response) => this.handleResponse(response),
        }),
      );
    }
  }

  handleResponse = (res) => {
    this.setState({
      errorTitle: false,
      errorImages: false,
      errorDescription: false,
      errorSkills: false,
      errorDate: false,
      loading: false,
    });

    this.props.navigation.navigate('PortfolioList');
  };
  removeSkills = (index) => {
    let temp = this.state.skills;
    temp.splice(index, 1);
    this.setState({
      skills: temp,
    });
  };
  openDatePicker = async () => {
    await this.setState({
      showDatePicker: !this.state.showDatePicker,
    });
    if (this.state.showDatePicker) {
      this.RBSheet.open();
    }
  };
  closeDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  };
  render() {
    const {t} = this.props;
    const {loading} = this.state;
    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={t('portfolio.addPortfolio')}
          notificationButton={true}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.label}>{t('portfolio.title')}</Text>
          <CustomInput
            value={this.state.title}
            handleChange={(text) => {
              this.setState({title: text});
            }}
            isClass={true}
          />
          {this.state.errorTitle && (
            <ErrorText text={t('portfolio.required')} />
          )}
          <Text style={styles.label}>{t('portfolio.skills')}</Text>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: colors.defaultWhite,
              elevation: 2,
            }}
            onPress={() => {
              this.props.navigation.navigate('AddSkills', {
                navigationScreenName: 'AddPortfolio',
                previousSkills: this.state.skills,
                isEdit: true,
              });
            }}>
            <Text style={{flex: 1, color: colors.appBlack}}>
              {t('portfolio.selectSkills')}
            </Text>
            <Icon name="arrow-next" color={colors.skyBlue} size={18} />
          </TouchableOpacity>
          {this.state.errorSkills && (
            <ErrorText text={t('portfolio.skillsRequired')} />
          )}
          {this.state.skills.length ? (
            <Text
              style={{
                fontSize: 16,
                marginVertical: 5,
                color: colors.appGreen,
              }}>
              Selected Skills
            </Text>
          ) : null}
          <View style={styles.skillsInfoContainer}>
            {this.state.skills?.map((skill, index) => (
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
          <Text style={styles.label}>{t('portfolio.relatedProject')}</Text>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: colors.defaultWhite,
              elevation: 2,
            }}
            onPress={() => {
              this.props.navigation.navigate('RelatedProject', {
                screen: 'AddPortfolio',
              });
            }}>
            <Text style={{flex: 1, color: colors.appBlack}}>
              {this.props.route?.params?.project
                ? this.props.route?.params?.project?.project_serial +
                  ' - ' +
                  this.props.route?.params?.project?.title
                : t('portfolio.selectProject')}
            </Text>
            <Icon name="arrow-next" color={colors.skyBlue} size={18} />
          </TouchableOpacity>

          <Text style={styles.label}>{t('portfolio.projectDate')}</Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={this.openDatePicker}>
            <Icon
              name="calendar"
              size={18}
              color={colors.skyBlue}
              style={{marginEnd: 10}}
            />
            <Text>
              {!this.state.date
                ? t('portfolio.selectDate')
                : moment(this.state.date).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          {this.state.errorDate && <ErrorText text={t('portfolio.required')} />}
          <Text style={[styles.label, {marginTop: 30}]}>
            {t('portfolio.description')}
          </Text>
          <TextInput
            multiline={true}
            style={styles.textArea}
            value={this.state.description}
            onChangeText={(text) => this.setState({description: text})}
          />
          {this.state.errorDescription && (
            <ErrorText text={t('portfolio.required')} />
          )}
          <View style={styles.attachmentContainer}>
            <Text style={styles.attachmentText}>
              {t('portfolio.addAttachment')}
            </Text>
            <CustomButton
              style={styles.addButton}
              disabled={this.state.attachment?.length > ATTACHMENT_LIMIT}
              handlePress={() => {
                this.showActionSheet();
              }}>
              <Icon name="add" size={25} color={colors.defaultWhite} />
            </CustomButton>
          </View>
          {this.state.errorImages && (
            <ErrorText text={t('portfolio.required')} />
          )}
          {this.state.attachment.length > ATTACHMENT_LIMIT && (
            <Text style={styles.attachmentLimitText}>
              {`* ${t('portfolio.only')} ${ATTACHMENT_LIMIT} ${t(
                'portfolio.filesAllowed',
              )}`}
            </Text>
          )}
          <ScrollView
            showsVerticalScrollIndicator={true}
            // style={{marginBottom: 50}}
          >
            {this.state.attachment.map((item, i) => {
              return (
                this.state.attachment?.length > 0 && (
                  <View style={styles.attachmentImageContainer} key={i}>
                    {item.type.includes('image') ? (
                      <FastImage
                        style={styles.attachmentImage}
                        source={{uri: item.uri}}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',

                          flex: 0.2,
                        }}>
                        <ShowFileType file={item} />
                      </View>
                    )}
                    <Text style={styles.attachmentImageText}></Text>
                    <CustomButton
                      handlePress={() => {
                        this.removeAttachment(i);
                      }}>
                      <Icon
                        name="close"
                        size={20}
                        color={colors.defaultWhite}
                        style={{
                          alignSelf: 'center',
                          backgroundColor: colors.appRed,
                          borderRadius: 15,
                          padding: 5,
                        }}
                      />
                    </CustomButton>
                  </View>
                )
              );
            })}
          </ScrollView>

          {this.state.showDatePicker && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RBSheet
                closeOnDragDown
                closeOnPressBack
                closeOnPressMask
                onClose={this.closeDatePicker}
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                height={250}
                openDuration={250}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 30,
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <Text>{t('portfolio.selectDate')}</Text>
                  <CustomButton handlePress={this.closeDatePicker}>
                    <Text style={{fontSize: 16}}>{t('portfolio.done')}</Text>
                  </CustomButton>
                </View>
                <DatePicker
                  androidVariant="iosClone"
                  // maximumDate={this.state.dateIndex === 0 ? new Date() : ''}
                  date={this.state.date ? this.state.date : new Date()}
                  onDateChange={async (date) => {
                    this.setState({date: date});
                  }}
                  mode={'date'}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </RBSheet>
            </View>
          )}
        </ScrollView>
        <View style={{backgroundColor: colors.appBackground}}>
          <CustomButton
            isLoading={loading}
            mode={1}
            style={{margin: 10}}
            handlePress={() => {
              this.onAddPortfolio();
            }}>
            <Text style={styles.buttonText}>{t('portfolio.add')}</Text>
          </CustomButton>
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={t('portfolio.addAttachment')}
          options={[
            t('portfolio.takePhoto'),
            t('portfolio.fromGallery'),

            t('portfolio.cancel'),
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
  userProfile: state.myReducer.userProfile,
});
export default connect(mapStateToProps)(withTranslation()(AddPortfolio));
// t('portfolio.otherFile'),
