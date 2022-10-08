import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import {CREATE_PROPOSAL} from 'src/actions/jobs';
import {SAVE_TO_DRAFT} from 'src/actions/proposals';
import CustomButton from 'src/components/button/CustomButton';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {Icon} from 'src/Icon';
import {createProposal, tokenDetails} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './MySuggestion.styles';
import NoPortfolioModal from './no-portfolio-modal/NoPortfolioModal';
import ProfileErrorModal from './profileErrorModal/ProfileErrorModal';

export class MySuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milestoneName: [],
      dueDate: [],
      modalIndex: 0,
      showDatePicker: false,
      inputValue: '',
      deliverable: [],
      brief: '',
      attachment: [],
      period: '',
      price: '',
      amount: [],
      formData: [
        {
          dueDate: new Date(),
        },
      ],
      periodError: false,
      priceError: false,
      briefError: false,
      milestoneError: [],
      saveLoading: false,
      toggleIsProfileCompletedAnimation: 0,
      milestoneAmountValues: [],
      currentTokenBalance: 0,
      modalPortfolio: false,
    };
  }

  milestoneCount = [];

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
    } else if (index === 2) {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        // console.log('rr', results);
        // this.setState({files: [...this.state.files, results]});
        for (const res of results) {
          this.setState({
            attachment: [
              ...this.state.attachment,
              {
                name: res.name,
                uri: res.uri,
                type: res.type,
              },
            ],
          });
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker,');
        } else {
          throw err;
        }
      }
    }
  };

  removeAttachment = (index) => {
    let temp = [...this.state.attachment];
    temp.splice(index, 1);
    this.setState({attachment: temp});
  };

  submitOffer = () => {
    this.props.dispatch(LOADER(true));
    let milestone = [];
    for (
      let i = 0;
      i < this.props.route.params?.projectDetails?.milestone?.count;
      i++
    ) {
      milestone.push({
        name: this.state.milestoneName[i],
        amount: parseFloat(this.state.milestoneAmountValues[i]).toFixed(2),

        due_date: moment(new Date()).format('X'),
        note: this.state.deliverable[i],
      });
    }

    const fd = new FormData();
    fd.append('period', parseInt(this.state.period));
    fd.append(
      'price_currency',
      this.props.route.params?.projectDetails?.currency,
    );
    fd.append('price_value', parseInt(this.state.price.replace(',', ''))),
      fd.append('milestones', JSON.stringify(milestone));
    fd.append('description', this.state.brief);

    this.state.attachment &&
      this.state.attachment.map((file, i) => {
        fd.append('files[]', {
          name: file.name,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      });
    // fd.append('files[]', this.state.attachment);
    fd.append('publish_now', 1);
    console.log('fd', fd);
    this.props.navigation.pop(1);
    this.props.dispatch(
      CREATE_PROPOSAL({
        proposal: fd,
        projectId: this.props.route.params?.projectDetails?.id,
        navigation: this.props.navigation,
        client_name: this.props.route.params?.projectDetails?.posted_by?.name,
      }),
    );
  };
  onSaveDraft = () => {
    this.setState({saveLoading: true});
    let milestone = [];
    for (
      let i = 0;
      i < this.props.route.params?.projectDetails?.milestone?.count;
      i++
    ) {
      milestone.push({
        name: this.state.milestoneName[i],
        amount: JSON.stringify(this.state.milestoneAmountValues[i]),
        due_date: moment(new Date()).format('X'),
        note: this.state.deliverable[i],
      });
    }

    console.log('mstone', typeof milestone.amount);

    const fd = new FormData();
    fd.append('period', parseInt(this.state.period));
    fd.append(
      'price_currency',
      this.props.route.params?.projectDetails?.currency,
    );
    fd.append('price_value', parseInt(this.state.price.replace(',', ''))),
      fd.append('milestones', JSON.stringify(milestone));
    fd.append('description', this.state.brief);

    this.state.attachment &&
      this.state.attachment.map((file, i) => {
        fd.append('files[]', {
          name: file.name,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      });
    // fd.append('files[]', this.state.attachment);
    fd.append('publish_now', 0);
    console.log('fd', fd);
    createProposal({
      token: this.props.token,

      proposal: fd,
      projectId: this.props.route.params?.projectDetails?.id,
    })
      .then((res) => {
        this.setState({saveLoading: false});
        console.log('object', res.data.data.proposal);
        this.props.dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: this.props.t('mySuggestion.savedToDraft'),
          }),
        );
        this.props.dispatch(SAVE_TO_DRAFT(res.data.data.proposal));
      })
      .catch((err) => {
        this.setState({saveLoading: false});
        console.log('error in save draft', err.response.data);
        if (err.response?.status === 406) {
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 2,
              message: err.response?.data?.message,
            }),
          );
        }
      });
  };

  tokenHistory = () => {
    tokenDetails({
      token: this.props?.token,
    })
      .then((res) => {
        this.setState({
          currentTokenBalance: res?.data?.data?.current_token_balance,
        });
      })
      .catch((err) => {
        console.error('Couldnot fetch token history', err);
      });
  };
  checkValidation = (type, skipPortfolio) => {
    if (this.props.isProfileCompleted === true) {
      if (this.props?.portfolio?.length > 0 || skipPortfolio !== undefined) {
        if (this.state.currentTokenBalance > 0) {
          const {
            periodError,
            priceError,
            briefError,
            milestoneError,
            price,
            period,
            brief,
          } = this.state;
          const {projectDetails} = this.props.route.params;
          var temp = [];
          var condition = false;
          for (
            let index = 0;
            index < projectDetails?.milestone?.count;
            index++
          ) {
            temp.push({
              index: index,
              nameError: !this.state.milestoneName[index] ? true : false,
              dateError: !this.state.dueDate[index] ? true : false,
            });
            condition =
              condition || !this.state.milestoneName[index]
                ? true
                : false || !this.state.dueDate[index]
                ? true
                : false;
          }
          console.log('ffff', condition);
          this.setState({milestoneError: temp});
          if (price === '' || period === '' || brief === '' || condition) {
            if (period === '') {
              this.setState({periodError: true});
            }
            if (price === '') {
              this.setState({priceError: true});
            }
            if (brief === '') {
              this.setState({briefError: true});
            }
          } else {
            if (type === 1) {
              this.submitOffer();
            }
            if (type === 0) {
              this.onSaveDraft();
            }
            this.setState({
              briefError: false,
              periodError: false,
              priceError: false,
            });
          }
        } else {
          Snackbar.show({
            text: t('mySuggestion.insufficientTokenBalance'),
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.appRed,
          });
        }
      } else {
        this.setState({modalPortfolio: true});
      }
    } else {
      this.setState({
        toggleIsProfileCompletedAnimation: Math.random(),
      });

      // setTimeout(() => {
      //   this.setState({toggleIsProfileCompletedAnimation: 0});
      // }, 400);
    }
  };
  componentDidMount() {
    this.props.dispatch(LOADER(false));
    this.tokenHistory();
    const {projectDetails} = this.props.route.params;
    // projectDetails.currency === 'sar'
    //   ?
    this.setState({price: projectDetails?.budget?.sar?.to});
    // : this.setState({price: projectDetails?.budget?.usd?.to});
    let temp = [];
    let name = [];
    for (
      let index = 0;
      index < this.props.route.params?.projectDetails?.milestone?.count;
      index++
    ) {
      temp.push('');
      name.push('Milestone' + (index + 1));
    }
    this.setState({dueDate: temp, milestoneName: name});
  }

  openDatePicker = async (i) => {
    await this.setState({
      showDatePicker: !this.state.showDatePicker,
      modalIndex: i,
    });
    if (this.state.showDatePicker && this.state.modalIndex === i) {
      this.RBSheet.open();
    }
  };

  closeDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  };

  distributeInteger = (total, divider) => {
    let groups = [];
    if (divider === 0) {
      return groups.push(0);
    } else {
      let rest = total % divider;
      let result = total / divider;
      for (let i = 0; i < divider; i++) {
        if (rest-- > 0) {
          groups.push(Math.ceil(result));
        } else {
          groups.push(Math.floor(result));
        }
      }
      return groups;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.price !== this.state.price) {
      let groups;
      if (this.state.price !== NaN) {
        console.log('didUp', parseInt(this.state.price));
        groups = this.distributeInteger(
          this.state.price?.replace(',', ''),
          parseInt(this.props.route.params?.projectDetails?.milestone?.count),
        );
      }
      this.setState({milestoneAmountValues: [...groups]});
    }
  }

  render() {
    const {t} = this.props;

    let demo = [];
    let ff = [];

    const {projectDetails} = this.props.route.params;

    for (let index = 0; index < projectDetails?.milestone?.count; index++) {
      demo.push(index);
      ff.push({
        dueDate: new Date(),
      });
    }

    // console.log('Price', this.props.isProfileCompleted);

    return (
      <>
        <Header
          cancelButton
          notificationButton
          title={t('mySuggestion.submitProposal')}
          navigation={this.props.navigation}
        />
        {!this.props.isProfileCompleted && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AfterSignUp', {
                screen: 'GettingStarted',
                params: {showBackButton: true},
              })
            }
            style={{
              backgroundColor: colors.appRed,
              paddingVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            {this.state.toggleIsProfileCompletedAnimation > 0 ? (
              <Animatable.Text
                duration={500}
                animation="fadeInDown"
                style={{color: colors.defaultWhite}}>
                {t('mySuggestion.profileComplete')}
              </Animatable.Text>
            ) : (
              <Text style={{color: colors.defaultWhite}}>
                {t('mySuggestion.profileComplete')}
              </Text>
            )}
          </TouchableOpacity>
        )}
        {/* <Container style={styles.container}> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={{
            flex: 1,
          }}>
          <ScrollView>
            <View style={styles.containerRow}>
              <View style={styles.rowTop}>
                <Text style={styles.periodText}>
                  {t('mySuggestion.period')}
                </Text>
                <Text style={styles.expectedText}>
                  ({t('mySuggestion.expectedText')})
                </Text>
              </View>
              <View style={styles.rowBottom}>
                <Text style={styles.dayText}>{t('mySuggestion.day')}</Text>
                <View style={styles.divider} />
                <CustomInput
                  style={{
                    borderWidth: 0,
                    height: 20,
                    padding: 0,
                    flex: 1,
                    fontSize: 18,
                  }}
                  isNumber
                  value={this.state.period}
                  handleChange={(period) => this.setState({period})}
                  isClass
                />
              </View>
              {this.state.periodError && <ErrorText text={'Required'} />}
            </View>

            <View style={styles.containerRow}>
              <View style={styles.rowTop}>
                <Text style={styles.periodText}>{t('mySuggestion.price')}</Text>
                <Text style={styles.expectedText}>
                  ({t('mySuggestion.toBePaidText')})
                </Text>
              </View>
              <View style={styles.rowBottom}>
                <Text style={styles.dayText}>
                  SR
                  {/* {projectDetails.currency === 'sar' ? 'SAR' : 'USD'} */}
                </Text>
                <View style={styles.divider} />

                <CustomInput
                  style={{
                    borderWidth: 0,
                    height: 20,
                    flex: 1,
                    padding: 0,
                  }}
                  isNumber
                  value={this.state.price}
                  handleChange={(price) => this.setState({price})}
                  isClass
                />
              </View>
              {this.state.priceError && <ErrorText text={'Required'} />}
            </View>

            <Text style={styles.milestoneText}>
              {t('mySuggestion.milestonePayments')}
            </Text>
            {demo.map((x, i) => (
              <View key={i} style={styles.paymentContainer}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                  <Text style={styles.paymentNo}>
                    {t('mySuggestion.payment')} N
                  </Text>
                  <Text style={styles.superScript}>0</Text>
                  <Text style={styles.paymentNo1}>{i + 1}</Text>
                </View>
                <View style={styles.horizontalDivider} />
                <Text style={styles.subHeading}>
                  {t('mySuggestion.nameOfMilestone')}{' '}
                </Text>
                <CustomInput
                  handleChange={(milestoneName) => {
                    // let data = this.state.milestoneName;
                    // data[i] = milestoneName;
                    // this.setState({
                    //   milestoneName: data,
                    // });
                  }}
                  style={{borderWidth: 0}}
                  isClass
                  value={this.state.milestoneName[i]}
                  editable={false}
                />
                {this.state.milestoneError[i]?.nameError && (
                  <ErrorText style={{marginStart: 10}} text={'Required'} />
                )}
                <View style={styles.horizontalDivider} />
                <Text style={styles.subHeading}>
                  {t('mySuggestion.amount')}
                </Text>
                <View style={styles.content}>
                  <Text style={styles.budgetType}>
                    SR
                    {/* {projectDetails.currency === 'sar' ? 'SAR' : 'USD'} */}
                  </Text>

                  <CustomInput
                    handleChange={(amount) => {
                      let data = this.state.amount;
                      data[i] = amount;

                      this.setState({amount: data});
                    }}
                    // value={numberWithCommas(
                    //   this.state.price?.replace(',', '') /
                    //     projectDetails?.milestone?.count,
                    // )}
                    value={JSON.stringify(this.state.milestoneAmountValues[i])}
                    style={{borderWidth: 0, flex: 1}}
                    isClass
                    isNumber
                    // disabled={true}
                    editable={false}
                  />
                </View>

                <View style={styles.horizontalDivider} />
                <Text style={styles.subHeading}>
                  {t('mySuggestion.dueDate')}
                </Text>

                <TouchableOpacity
                  disabled={i !== 0 && !this.state.dueDate[i - 1]}
                  style={[styles.content, {paddingBottom: 10}]}
                  onPress={() => this.openDatePicker(i)}>
                  <Icon
                    name="calendar"
                    size={18}
                    color={colors.skyBlue}
                    style={{marginStart: 10, marginEnd: 10}}
                  />
                  <Text>
                    {!this.state.dueDate[i]
                      ? ''
                      : moment(this.state.dueDate[i]).format('DD/MM/YYYY')}
                  </Text>
                  {this.state.showDatePicker && i === this.state.modalIndex && (
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
                          <Text>{t('mySuggestion.selectDate')}</Text>
                          <CustomButton handlePress={this.closeDatePicker}>
                            <Text style={{fontSize: 16}}>
                              {t('mySuggestion.done')}
                            </Text>
                          </CustomButton>
                        </View>
                        <DatePicker
                          androidVariant="iosClone"
                          date={
                            !this.state.dueDate[i]
                              ? new Date()
                              : this.state.dueDate[i]
                          }
                          minimumDate={
                            i === 0
                              ? new Date()
                              : moment(this.state.dueDate[i - 1])
                                  .add(1, 'days')
                                  .toDate()
                          }
                          onDateChange={async (date) => {
                            console.log('gdg', date);
                            let temp = this.state.dueDate;

                            temp[i] = date;

                            await this.setState({dueDate: temp});

                            console.log('f', temp[i]);
                          }}
                          mode={'date'}
                          style={{
                            alignSelf: 'center',
                          }}
                        />
                      </RBSheet>
                    </View>
                  )}
                </TouchableOpacity>
                {this.state.milestoneError[i]?.dateError && (
                  <ErrorText
                    style={{marginStart: 10}}
                    text={t('mySuggestion.required')}
                  />
                )}
                <View style={styles.horizontalDivider} />
                <Text style={styles.subHeading}>
                  {t('mySuggestion.deliverable')}
                </Text>
                <CustomInput
                  handleChange={(deliverable) => {
                    let data = this.state.deliverable;
                    data[i] = deliverable;

                    this.setState({deliverable: data});
                  }}
                  style={{borderWidth: 0}}
                  isClass
                />
              </View>
            ))}

            <Text style={styles.milestoneText}>{t('mySuggestion.brief')}</Text>
            {this.state.briefError && (
              <ErrorText
                style={{marginStart: 10}}
                text={t('mySuggestion.required')}
              />
            )}
            <CustomInput
              style={{
                borderRadius: 0,
                borderWidth: 2,
                borderColor: colors.appViolet,
                marginHorizontal: 10,
                height: 110,
                marginVertical: 10,
                textAlignVertical: 'top',
              }}
              value={this.state.brief}
              handleChange={(brief) => this.setState({brief})}
              isClass
              multiline={true}
            />

            <View style={styles.attachmentContainer}>
              <Text style={styles.attachmentText}>
                {t('mySuggestion.addAttachment')}{' '}
                <Text style={styles.addAttachmentOptionalText}>
                  {t('mySuggestion.optional')}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  this.showActionSheet();
                }}>
                <Ionicons
                  name="add-outline"
                  size={25}
                  color={colors.defaultWhite}
                />
              </TouchableOpacity>
            </View>

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
                    <TouchableOpacity onPress={() => this.removeAttachment(i)}>
                      <Ionicons
                        name="remove-circle-outline"
                        size={30}
                        color={colors.appGray}
                        style={{alignSelf: 'center'}}
                      />
                    </TouchableOpacity>
                  </View>
                )
              );
            })}

            <View style={styles.footerButtonContainer}>
              <CustomButton
                activeOpacity={0.8}
                handlePress={() => this.checkValidation(0, 'skipPortfolio')}
                isLoading={this.state.saveLoading}
                mode={2}
                loadingColor={colors.appBlue}
                style={styles.saveButton}>
                <Text style={styles.saveText}>
                  {t('mySuggestion.saveDraft')}
                </Text>
                {/* <Icon name="save" color={colors.appBlue} size={15} /> */}
              </CustomButton>
              <CustomButton
                handlePress={() => this.checkValidation(1)}
                isLoading={this.props.loading}
                mode={1}
                style={styles.applyButton}>
                <Text style={styles.applytext}>
                  {t('mySuggestion.submitOffer')}
                </Text>
                <Icon name="tick" color={colors.defaultWhite} size={15} />
              </CustomButton>
            </View>
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={t('mySuggestion.addAttachment')}
              options={[
                t('mySuggestion.takePhoto'),
                t('mySuggestion.fromGallery'),
                t('mySuggestion.otherFile'),
                t('mySuggestion.cancel'),
              ]}
              cancelButtonIndex={3}
              onPress={(index) => {
                this.onActionSheetItemPress(index);
              }}
            />
            <ProfileErrorModal
              modalVisible={this.state.toggleIsProfileCompletedAnimation > 0}
              title={t('mySuggestion.cannotSubmit')}
              onClose={() =>
                this.setState({toggleIsProfileCompletedAnimation: 0})
              }
              buttonText={t('mySuggestion.completeProfile')}
              onButtonPress={() => {
                this.setState({toggleIsProfileCompletedAnimation: 0});
                this.props.navigation.navigate('AfterSignUp', {
                  screen: 'GettingStarted',
                  params: {showBackButton: true},
                });
              }}
            />
            <NoPortfolioModal
              modalVisible={this.state.modalPortfolio}
              title={t('mySuggestion.noPortfolioModalTitle')}
              onClose={() => {
                this.setState({modalPortfolio: false});
              }}
              button1Text={t('mySuggestion.addMyPortfolio')}
              button2Text={t('mySuggestion.submitProposal')}
              onButton1Press={() => {
                this.setState({modalPortfolio: false});
                this.props.navigation.navigate('AddPortfolio');
              }}
              onButton2Press={() => {
                this.setState({modalPortfolio: false});
                this.checkValidation(1, 'skipPortfolio');
              }}
            />
            <View style={{height: 70}} />
          </ScrollView>
        </KeyboardAvoidingView>
        {/* </Container> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user.token,
  isProfileCompleted: state.myReducer?.userProfile?.is_profile_completed,
  remainingToken: state.myReducer.user?.freelancer_profile?.token_balance,
  portfolio: state.myReducer?.userProfile?.portfolio,
});

export default connect(mapStateToProps)(withTranslation()(MySuggestion));
