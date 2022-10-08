import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Button,
} from 'react-native';
import {Icon} from 'src/Icon';
import Container from 'src/components/container/Container';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import styles from './ChangeTerms.styles';
import colors from 'src/styles/texts/colors';
import DatePicker from 'react-native-date-picker';
import CustomButton from 'src/components/button/CustomButton';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import {connect} from 'react-redux';
import {LOADER, MODAL_VISIBLE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import {updateProposal} from 'src/services/http.service';
import {
  UPDATE_ACTIVE_PROPOSALS,
  UPDATE_DRAFT_PROPOSALS,
} from 'src/actions/proposals';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {numberWithCommas} from 'src/helpers/numberWithCommas';
import FastImage from 'react-native-fast-image';
export class ChangeTerms extends Component {
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
      deleteFiles: [],
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
      i < this.props?.proposalDetails?.project?.milestone?.count;
      i++
    ) {
      milestone.push({
        name: this.state.milestoneName[i],
        amount: parseFloat(
          this.state.price?.replace(',', '') /
            this.props?.proposalDetails?.project?.milestone?.count,
        ).toFixed(2),
        due_date: moment(this.state.dueDate[i]).format('X'),
        note: this.state.deliverable[i],
      });
    }

    console.log('mstone', typeof milestone.amount);

    const fd = new FormData();
    fd.append('period', parseInt(this.state.period));
    fd.append('price_currency', this.props?.proposalDetails?.project?.currency);
    fd.append('price_value', parseInt(this.state.price?.replace(',', ''))),
      fd.append('milestones', JSON.stringify(milestone));
    fd.append('description', this.state.brief);

    this.state.attachment.length &&
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
    this.state.deleteFiles.length &&
      fd.append('file_ids_to_delete', JSON.stringify(this.state.deleteFiles));
    fd.append('publish_now', 1);
    console.log('fd', fd);

    updateProposal({
      proposal: fd,
      proposalId: this.props?.proposalDetails?.id,
      token: this.props.token,
    })
      .then((res) => {
        this.props.dispatch(LOADER(false));
        // console.log('resss', res.data);
        this.props.dispatch(UPDATE_ACTIVE_PROPOSALS(res.data.data.proposal));
        this.props.dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: res.data.message,
          }),
        );
        this.props.navigation.goBack();
      })
      .catch((err) => {
        this.props.dispatch(LOADER(false));
        if (err.response.data) {
          this.props.dispatch(
            MODAL_VISIBLE({
              visible: true,
              type: 2,
              message: err?.response?.data?.message,
            }),
          );
          console.log('error update proposal', err.response.data);
        }
      });
  };
  onSaveDraft = () => {
    this.setState({saveLoading: true});
    let milestone = [];
    for (
      let i = 0;
      i < this.props?.proposalDetails?.project?.milestone?.count;
      i++
    ) {
      milestone.push({
        name: this.state.milestoneName[i],
        amount: parseFloat(
          this.state.price?.replace(',', '') /
            this.props?.proposalDetails?.project?.milestone?.count,
        ).toFixed(2),
        due_date: moment(this.state.dueDate[i]).format('X'),
        note: this.state.deliverable[i],
      });
    }

    console.log('mstone', typeof milestone.amount);

    const fd = new FormData();
    fd.append('period', parseInt(this.state.period));
    fd.append('price_currency', this.props?.proposalDetails?.project?.currency);
    fd.append('price_value', parseInt(this.state.price?.replace(',', ''))),
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
    // fd.append('files[]', this.state.attachment);\
    fd.append('file_ids_to_delete', JSON.stringify(this.state.deleteFiles));
    fd.append('publish_now', 0);
    console.log('fd', fd);

    updateProposal({
      proposal: fd,
      proposalId: this.props?.proposalDetails?.id,
      token: this.props.token,
    })
      .then((res) => {
        this.props.dispatch(LOADER(false));
        // console.log('resss', res.data);
        this.props.dispatch(UPDATE_ACTIVE_PROPOSALS(res.data.data.proposal));
        this.props.dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: res.data.message,
          }),
        );
        this.props.navigation.goBack();
      })
      .catch((err) => {
        this.props.dispatch(LOADER(false));
        console.log('error update proposal', err);
        if (err.response?.data.message !== '') {
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
  checkValidation = (type) => {
    const {
      periodError,
      priceError,
      briefError,
      milestoneError,
      price,
      period,
      brief,
    } = this.state;
    const {proposalDetails} = this.props;
    const projectDetails = proposalDetails?.project;
    var temp = [];
    var condition = false;
    for (let index = 0; index < projectDetails?.milestone?.count; index++) {
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
      this.setState({briefError: false, periodError: false, priceError: false});
    }
  };
  componentDidMount() {
    const {proposalDetails} = this.props;
    const projectDetails = proposalDetails?.project;
    console.log('proposal details', JSON.stringify(proposalDetails, null, 2));
    this.setState({
      period: proposalDetails?.period,
      brief: proposalDetails?.descripiton,
    });
    let images = [];
    let deleteImage = [];
    proposalDetails?.files.map((item) => {
      images.push({
        name: item.name,
        uri: item.path,
        type: item.mime_type,
        id: item.id,
      });
      deleteImage.push(item.id);
    });
    this.setState({
      attachment: images,
      deleteFiles: deleteImage,
    });
    // projectDetails.currency === 'sar'
    //   ?
    this.setState({price: proposalDetails?.price});
    // : this.setState({price: projectDetails?.budget?.usd?.to});
    let temp = [];
    let name = [];
    let temp2 = [];
    for (
      let index = 0;
      index < this.props.proposalDetails?.milestones?.length;
      index++
    ) {
      temp.push(
        moment
          .unix(JSON.parse(proposalDetails?.milestones[index].due_date))
          .toDate(),
      );
      name.push('Milestone ' + (index + 1));
      temp2.push(proposalDetails?.milestones[index]?.note ?? '');
    }
    this.setState({dueDate: temp, milestoneName: name, deliverable: temp2});
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

  render() {
    const {t} = this.props;

    let demo = [];
    let ff = [];

    const {proposalDetails} = this.props;
    const projectDetails = proposalDetails?.project;
    for (let index = 0; index < projectDetails?.milestone?.count; index++) {
      demo.push(index);
      ff.push({
        dueDate: new Date(),
      });
    }

    return (
      <>
        <Header
          cancelButton
          notificationButton
          title={t('changeTerms.changeTerms')}
          navigation={this.props.navigation}
        />
        <Container style={styles.container}>
          <View style={styles.containerRow}>
            <View style={styles.rowTop}>
              <Text style={styles.periodText}>{t('changeTerms.period')}</Text>
              <Text style={styles.expectedText}>
                ({t('changeTerms.expectedText')})
              </Text>
            </View>
            <View style={styles.rowBottom}>
              <Text style={styles.dayText}>{t('changeTerms.day')}</Text>
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
              <Text style={styles.periodText}>{t('changeTerms.price')}</Text>
              <Text style={styles.expectedText}>
                ({t('changeTerms.toBePaidText')})
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
            {t('changeTerms.milestonePayments')}
          </Text>
          {demo.map((x, i) => (
            <View key={i} style={styles.paymentContainer}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={styles.paymentNo}>
                  {t('changeTerms.payment')} N
                </Text>
                <Text style={styles.superScript}>0</Text>
                <Text style={styles.paymentNo1}>{i + 1}</Text>
              </View>
              <View style={styles.horizontalDivider} />
              <Text style={styles.subHeading}>
                {t('changeTerms.nameOfMilestone')}{' '}
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
                <ErrorText
                  style={{marginStart: 10}}
                  text={t('changeTerms.required')}
                />
              )}
              <View style={styles.horizontalDivider} />
              <Text style={styles.subHeading}>{t('changeTerms.amount')}</Text>
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
                  value={numberWithCommas(
                    this.state.price.replace(',', '') /
                      projectDetails?.milestone?.count,
                  )}
                  style={{borderWidth: 0, flex: 1}}
                  isClass
                  isNumber
                  // disabled={true}
                  editable={false}
                />
              </View>

              <View style={styles.horizontalDivider} />
              <Text style={styles.subHeading}>{t('changeTerms.dueDate')}</Text>

              <TouchableOpacity
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
                        <Text>Select Date</Text>
                        <CustomButton handlePress={this.closeDatePicker}>
                          <Text style={{fontSize: 16}}>
                            {t('changeTerms.done')}
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
                  text={t('changeTerms.required')}
                />
              )}
              <View style={styles.horizontalDivider} />
              <Text style={styles.subHeading}>
                {t('changeTerms.deliverable')}
              </Text>
              <CustomInput
                handleChange={(deliverable) => {
                  let data = this.state.deliverable;
                  data[i] = deliverable;

                  this.setState({deliverable: data});
                }}
                style={{borderWidth: 0}}
                value={this.state.deliverable[i] ?? ''}
                isClass
              />
            </View>
          ))}

          <Text style={styles.milestoneText}>{t('changeTerms.brief')}</Text>
          {this.state.briefError && (
            <ErrorText
              style={{marginStart: 10}}
              text={t('changeTerms.required')}
            />
          )}
          <CustomInput
            style={{
              borderRadius: 0,
              borderWidth: 2,
              borderColor: colors.appViolet,
              marginHorizontal: 10,
              height: 150,
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
              {t('changeTerms.addAttachment')}{' '}
              <Text style={styles.addAttachmentOptionalText}>
                {t('changeTerms.optional')}
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
              handlePress={() => this.checkValidation(0)}
              isLoading={this.state.saveLoading}
              mode={2}
              style={styles.saveButton}>
              <Text style={styles.saveText}>{t('changeTerms.saveDraft')}</Text>
              {/* <Icon name="save" color={colors.appBlue} size={15} /> */}
            </CustomButton>
            <CustomButton
              handlePress={() => this.checkValidation(1)}
              isLoading={this.props.loading}
              mode={1}
              style={styles.applyButton}>
              <Text style={styles.applytext}>
                {t('changeTerms.submitOffer')}
              </Text>
              <Icon name="tick" color={colors.defaultWhite} size={15} />
            </CustomButton>
          </View>
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={t('changeTerms.addAttachment')}
            options={[
              t('changeTerms.takePhoto'),
              t('changeTerms.fromGallery'),
              t('changeTerms.otherFile'),
              t('changeTerms.cancel'),
            ]}
            cancelButtonIndex={3}
            onPress={(index) => {
              this.onActionSheetItemPress(index);
            }}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user.token,
  proposalDetails: state.proposalsReducer?.proposalDetails,
});

export default connect(mapStateToProps)(withTranslation()(ChangeTerms));
