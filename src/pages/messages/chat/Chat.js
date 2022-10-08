import React, {Component, memo, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Dimensions,
  SectionList,
} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './Chat.styles';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import {connect} from 'react-redux';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import CustomButton from 'src/components/button/CustomButton';
import Moment from 'moment';
import QB from 'quickblox-react-native-sdk';
import {
  FETCH_MESSAGE,
  FILE_UPLOAD_SUCCESS,
  SEND_MESSAGE,
  UPDATE_CHAT_DIALOG,
  CONNECT_TO_CHAT,
} from 'src/actions/messages';
import * as Animatable from 'react-native-animatable';
import ShowAttachment from 'src/components/show-attachment/ShowAttachment';
import ActionSheet from 'react-native-actionsheet';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SEND_NEW_MESSAGE, SETUP_QUICKBLOX} from 'src/actions/quickblox';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import ShowFileType from 'src/components/show-file-type/ShowFileType';
import {directories, download} from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import FileViewer from 'react-native-file-viewer';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      dialogId: '',
      userId: '',
      messages: [],
      isLoading: true,
      hasMoreMessages: false,
      limit: 30,
      skip: 0,
      onEndReachedCalledDuringMomentum: true,
      pageLoading: false,
      attachment: [],
      messageLoading: false,
      prevMessageDate: 0,
      indeterminateLoading: false,
      downloadProgress: undefined,
      progressId: undefined,
      dialogFound: false,
    };
    this.typingTimeout = undefined;
    this.TYPING_DEBOUNCE = 1000;
    // this.emitter = new NativeEventEmitter(QB.chat);
  }

  componentDidMount() {
    const {quickbloxId, userName} = this.props.route.params;
    console.log('opponent qb id', quickbloxId);

    const {chatDialogs} = this.props;
    if (chatDialogs?.length) {
      for (let i = 0; i < chatDialogs.length; i++) {
        if (chatDialogs[i].occupantsIds.find((id) => id === quickbloxId)) {
          this.setState({dialogFound: true});
          this.setState({dialogId: chatDialogs[i].id});

          QB.chat
            .getDialogMessages({
              dialogId: chatDialogs[i].id,
              limit: this.state.limit,
              sort: {
                ascending: false,
                field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
              },
              markAsRead: true,
              skip: 0,
            })
            .then((result) => {
              // console.log(
              //   'dialog messages1',
              //   JSON.stringify(result.messages[0], null, 2),
              // );
              this.setState({
                hasMoreMessages: result.messages.length === 30 ? true : false,
              });

              this.setState({isLoading: false});
              this.props.dispatch(FETCH_MESSAGE(result.messages));
            })

            .catch((err) => {
              this.setState({isLoading: false});
              console.error('Couldnot reterieve messages ', err);
            });
          return;
        } else {
          this.setState({dialogFound: false});
        }
      }
    }
    //  if (!this.state.dialogId.length)
    if (chatDialogs.length === 0 || this.state.dialogFound === false) {
      QB.chat
        .createDialog({
          type: QB.chat.DIALOG_TYPE.CHAT,
          occupantsIds: [quickbloxId],
          name: userName,
        })
        .then((dialog) => {
          // this.emitter.addListener(QB.chat.EVENT_TYPE.MESSAGE_DELIVERED, this.messageStatusHandler)

          // EventRegister.emit(QB.chat)
          console.log('dialog created successfully', dialog);
          this.setState({dialogId: dialog.id, userId: dialog.userId});
          this.props.dispatch(UPDATE_CHAT_DIALOG(dialog));
          QB.chat
            .getDialogMessages({
              dialogId: dialog.id,
              limit: this.state.limit,
              sort: {
                ascending: false,
                field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
              },
              markAsRead: true,
              skip: 0,
            })
            .then((result) => {
              console.log('dialog messages', result);
              // console.log("read  id check kr raha hu", result.messages[result.messages.length - 1])
              this.setState({
                hasMoreMessages: result.messages.length === 30 ? true : false,
              });
              this.setState({isLoading: false});
              this.props.dispatch(FETCH_MESSAGE(result.messages));

              // this.flatlistRef.scrollToEnd()
            })

            .catch((err) => {
              this.setState({isLoading: false});
              console.error('Couldnot reterieve messages ', err);
            });
        })
        .catch((e) => {
          this.setState({isLoading: false});

          // handle error
          console.error('Error while creating diALOG', e);
        });
    }
  }

  onLoadMoreMessages = () => {
    const {hasMoreMessages, skip, dialogId} = this.state;
    const {messages} = this.props;
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (hasMoreMessages === true) {
        this.setState({pageLoading: true});
        QB.chat
          .getDialogMessages({
            dialogId: dialogId,
            limit: this.state.limit,
            sort: {
              ascending: false,
              field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
            },
            markAsRead: true,
            skip: skip + this.state.limit,
          })
          .then((result) => {
            this.setState({skip: skip + messages.length, pageLoading: false});
            this.setState({
              hasMoreMessages: result.messages.length === 30 ? true : false,
            });
            this.props.dispatch(
              FETCH_MESSAGE([...messages, ...result.messages]),
            );
            // }
            // this.flatlistRef.scrollToEnd()
          })

          .catch((err) => {
            this.setState({pageLoading: true});
            console.error('Couldnot reterieve messages ', err);
          });
      }
    }
  };
  sendMessage = async () => {
    this.setState({messageLoading: true});
    let inputMessage = this.state.input.trim();
    let message = {
      dialogId: this.state.dialogId,
      body: inputMessage.length ? inputMessage : null,
      saveToHistory: true,
      markable: false,
      attachments: [],
    };

    if (this.state.attachment.length > 0) {
      for (let i = 0; i < this.state.attachment.length; i++) {
        let url = this.state.attachment[i]?.uri;
        // console.log(this.state.attachment);
        this.props.dispatch(FILE_UPLOAD_SUCCESS({url}));
        await QB.content
          .upload({url, public: false})
          .then(function (file) {
            console.log(file);
            message.attachments = [
              ...message.attachments,
              {
                id: file.uid,
                type: file.contentType.includes('image')
                  ? 'image'
                  : file.contentType,
                name: file.name,
                size: file.size,
                properties: {
                  blobId: file.id
                },
              },
            ];
          })
          .catch(function (e) {
            console.error('File upload error', e);
            Snackbar.show({
              text: e + '',
              backgroundColor: colors.appRed,
              duration: 2000,
            });
            console.log('File upload error', e?.response);
            return;
          });
      }
    }
    let session = await QB.auth.getSession();
    let isChatConnected = await QB.chat.isConnected();
    console.log(session, isChatConnected);
    if (session?.token.length && isChatConnected) {
      if (message?.attachments?.length || message?.body !== null) {
        QB.chat
          .sendMessage(message)
          .then((res) => {
            console.log(
              `Message sent successfully`,
              JSON.stringify(message, null, 2),
            );
            this.setState({input: '', attachment: [], messageLoading: false});
          })
          .catch((err) => {
            console.error('Couldnot send message', err);
            this.setState({messageLoading: false});
          });
      } else {
        this.setState({messageLoading: false, attachment: []});
      }
    } else {
      if (!session?.token?.length) {
        this.props.dispatch(SETUP_QUICKBLOX());
      } else if (!isChatConnected) {
        this.props.dispatch(CONNECT_TO_CHAT());
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.messages.length) {
      if (this.props.messages.length != prevProps.messages.length) {
        const {qb_id, password} = this.props.quickblox;
        if (this.props?.messages[0]?.senderId != qb_id) {
          console.log('checking', this.props?.messages[0]);
          QB.chat
            .markMessageRead({
              message: {
                id: this.props?.messages[0]?.id,
                dialogId: this.props?.messages[0]?.dialogId,
                senderId: this.props.messages[0]?.senderId,
              },
            })
            .then((res) => console.log('messages read successfully'))
            .catch((e) => console.error('e', e));
        }
      }
    }
  }
  onChangeText = (text) => {
    const {isTyping} = this.props;
    const {dialogId} = this.state;
    if (!isTyping) {
      QB.chat.sendIsTyping({dialogId});
    }
    this.setState({input: text});
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typingTimeout = setTimeout(() => {
      QB.chat.sendStoppedTyping({dialogId});
    }, this.TYPING_DEBOUNCE);
  };

  handleMessageClick = (message) => {
    if (
      message?.properties?.sendType === 'Invitation' ||
      message?.properties?.sendType === 'DeclineInvitation'
    ) {
      if (message?.properties?.sendId?.length > 0) {
        this.props.navigation.pop(1);
        this.props.navigation.navigate('Proposals', {
          screen: 'InvitationDetails',
          params: {id: parseInt(message?.properties?.sendId)},
        });
      }
    }
  };
  onActionSheetItemPress = async (index) => {
    if (index == 0) {
      ImagePicker.openCamera({
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
        this.sendMessage();
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        includeBase64: false,
        multiple: true,
      })
        .then((image) => {
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
          this.sendMessage();
        })
        .catch((err) => console.error('Image picker open picker error'));
    } else if (index === 2) {
      try {
        const {
          docx,
          doc,
          pdf,
          xls,
          zip,
          xlsx,
          csv,
          plainText,
          ppt,
          pptx,
        } = DocumentPicker.types;
        const results = await DocumentPicker.pickMultiple({
          type: [docx, doc, pdf, xls, zip, xlsx, csv, plainText, ppt, pptx],
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
        this.sendMessage();
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

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.messages !== this.props.messages) {
  //     return false;
  //   } else return true;
  // }
  showDate = (date, prevDate, messages, idx) => {
    let temp = `${new Date(date).getDate()}${new Date(
      date,
    ).getMonth()}${new Date(date).getFullYear()}`;
    let temp1 = `${new Date(prevDate).getDate()}${new Date(
      prevDate,
    ).getMonth()}${new Date(prevDate).getFullYear()}`;
    if (temp !== temp1) {
      let indexxx = messages.reverse()?.findIndex((x) => x?.dateSent !== date);
      console.log('sda', indexxx);

      if (messages[idx]?.dateSent === prevDate) {
        return (
          <Text style={{textAlign: 'center'}}>
            {moment(date).format('dddd MMM,YYYY')}
          </Text>
        );
      }
    }
  };

  downloadFile = async (item, url) => {
    console.log('url', url);
    const destination = url.replace(
      'https://api.quickblox.com/blobs/',
      `${directories.documents}/${item.type}`,
    );

    const downloaded = await RNFetchBlob.fs.exists(destination);
    console.log('file downloaded', downloaded, item?.type?.split('/')[1]);
    if (downloaded) {
      Platform.OS === 'android'
        ? RNFetchBlob.android.actionViewIntent(`${destination}`, item?.type)
        : FileViewer.open(destination)
            .then(() => {
              console.log('file opened');
            })
            .catch((error) => {
              // error
              console.log('file open err', error);
            });
    }
    if (!downloaded) {
      this.setState({
        indeterminateLoading: true,
        progressId: item?.id,
      });
      if (url !== null) {
        download({
          id: item.id,
          url: url,
          destination: destination,
        })
          .begin((expectedBytes) => {
            this.setState({
              indeterminateLoading: true,
            });

            console.log(`Going to download ${expectedBytes} bytes!`);
          })
          .progress((percent) => {
            this.setState({
              indeterminateLoading: false,
              downloadProgress: percent,
            });
            console.log(`Downloaded: ${percent * 100}%, ${typeof percent}`);
          })
          .done((e) => {
            this.setState({
              indeterminateLoading: false,
              downloadProgress: 1,
              progressId: undefined,
            });
            console.log('Download is done!', e);
            Platform.OS === 'android'
              ? RNFetchBlob.android.actionViewIntent(
                  `${destination}`,
                  item?.type,
                )
              : RNFetchBlob.ios.previewDocument(destination);
          })
          .error((error) => {
            console.log('Download canceled due to error: ', error);
          });
      } else {
        alert('No yrl');
      }
    }
  };
  renderMessage = (item, qb_id, quickbloxId, index) => (
    <>
      {/* {this.showDate(
        this.props.messages[index]?.dateSent,
        this.props.messages[index + 1]?.dateSent,
        this.props.messages,
        index,
      )} */}

      <TouchableOpacity
        onPress={() => this.handleMessageClick(item)}
        disabled={!item?.properties?.sendId}
        style={
          item.senderId === qb_id
            ? [
                styles.sentChatContainer,
                item?.attachments?.type?.includes('image') && {
                  padding: 0,
                  borderWidth: 0,
                },
              ]
            : styles.receivedChatContainer
        }>
        {item?.attachments?.length > 0 && (
          <View
            style={
              item.senderId === qb_id
                ? [
                    styles.sentChatMessage,
                    item?.attachments?.length > 0 && {
                      borderColor: 'red',
                    },
                  ]
                : styles.receivedChatMessage
            }>
            {item?.attachments?.map((x, i) => {
              return (
                <ShowAttachment
                  key={x?.id + i.toString()}
                  item={x}
                  progressLoading={this.state.indeterminateLoading}
                  progress={this.state.downloadProgress}
                  downloadFile={this.downloadFile}
                  progressId={this.state.progressId}
                />
              );
            })}
          </View>
        )}

        {item?.body !== 'null' && (
          <Text
            style={
              item.senderId === qb_id
                ? styles.sentChatMessage
                : styles.receivedChatMessage
            }>
            {item.body}
          </Text>
        )}
        <View style={styles.chatFooter}>
          <Text
            style={
              item.senderId === qb_id
                ? styles.sentChatTime
                : styles.receivedChatTime
            }>
            {Moment(item.dateSent).format('LT')}
          </Text>

          {item.senderId === qb_id &&
            (item.readIds?.find((x) => x === item.recipientId) ? (
              <Icon name={'chek-double'} size={15} color={colors.skyBlue} />
            ) : item.deliveredIds.find((x) => x === item?.recipientId) ? (
              <Icon name={'chek-double'} size={15} color={colors.appGray} />
            ) : (
              <Icon name={'tick'} size={15} color={colors.appGray} />
            ))}
        </View>
      </TouchableOpacity>
      {this.state.pageLoading && index === this.props.messages?.length - 1 && (
        <ActivityIndicator
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
          color={colors.skyBlue}
          size={25}
        />
      )}
    </>
  );

  listEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No messages found</Text>
      </View>
    );
  };
  componentWillUnmount() {
    this.setState({isLoading: false, dialogId: ''});
    clearTimeout();
  }

  render() {
    const {userName, userPhoto, quickbloxId} = this.props.route.params;
    const {input, pageLoading, isLoading, dialogId} = this.state;
    const {
      messages,
      isTyping,
      isConnected,
      isSessionActive,
      isSessionLoading,
      chatConnectionLoading,
    } = this.props;
    const {qb_id} = this.props.quickblox;
    if (isLoading) {
      return (
        <>
          <Header
            title={userName}
            headerRightImage={userPhoto}
            backButton
            navigation={this.props.navigation}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              style={{width: 150, height: 150}}
              source={require('src/assets/lottie-animation/chat-loading.json')}
              autoPlay
              loop={true}
              speed={0.9}
            />
          </View>
        </>
      );
    }

    return (
      <>
        <Header
          title={userName}
          headerRightImage={userPhoto}
          backButton
          navigation={this.props.navigation}
        />

        {!isSessionActive && (
          <View
            style={{
              backgroundColor: colors.appRed,
              justifyContent: 'space-between',
              height: 30,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, color: colors.defaultWhite}}>
              Chat session is not active
            </Text>
            <TouchableOpacity
              onPress={() => this.props.dispatch(SETUP_QUICKBLOX())}>
              {!isSessionLoading ? (
                <Text style={{fontSize: 14, color: colors.defaultWhite}}>
                  Retry
                </Text>
              ) : (
                <ActivityIndicator size="small" color={colors.defaultWhite} />
              )}
            </TouchableOpacity>
          </View>
        )}
        {isSessionActive && !isConnected && (
          <View
            style={{
              backgroundColor: colors.appRed,
              justifyContent: 'space-between',
              height: 30,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 14, color: colors.defaultWhite}}>
              Chat server not connected
            </Text>
            <TouchableOpacity
              onPress={() => this.props.dispatch(CONNECT_TO_CHAT())}>
              {!chatConnectionLoading ? (
                <Text style={{fontSize: 14, color: colors.defaultWhite}}>
                  Retry
                </Text>
              ) : (
                <ActivityIndicator size="small" color={colors.defaultWhite} />
              )}
            </TouchableOpacity>
          </View>
        )}

        <View style={{flex: 1}}>
          <SectionList
            ListEmptyComponent={this.listEmpty}
            inverted={true}
            sections={[{data: [...messages]}]}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({item, index}) =>
              this.renderMessage(item, qb_id, quickbloxId, index)
            }
            removeClippedSubviews={true}
            renderToHardwareTextureAndroid={
              Platform.OS === 'android' ? true : false
            }
            onEndReachedThreshold={0.4}
            onEndReached={() => this.onLoadMoreMessages()}
            onMomentumScrollBegin={() =>
              this.setState({onEndReachedCalledDuringMomentum: false})
            }
          />
        </View>

        {isTyping && (
          <View style={styles.isTypingContainer}>
            <Animatable.Text
              easing="ease-in-out-sine"
              style={styles.isTypingText}
              duration={300}
              animation="fadeInUp">
              {userName} is typing...
            </Animatable.Text>
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          {this.state.attachment.length > 0 && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{
                paddingHorizontal: 10,
              }}
              contentContainerStyle={{
                paddingVertical: 5,
                // justifyContent: 'space-evenly',
              }}
              // horizontal={true}
              keyExtractor={(_, index) => index.toString()}
              data={this.state.attachment}
              renderItem={({item, index}) => (
                <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                  {item?.type?.includes('image') ? (
                    <FastImage
                      style={styles.attachmentImage}
                      source={{uri: item.uri}}
                    />
                  ) : (
                    <ShowFileType file={item} />
                  )}
                  {this.state.messageLoading && (
                    <ActivityIndicator size="small" color={colors.skyBlue} />
                  )}
                </View>
              )}
            />
          )}
          <View style={styles.footer}>
            <CustomButton
              handlePress={() => this.ActionSheet.show()}
              mode={1}
              style={styles.attachmentButton}>
              <Icon
                name="clip-tilt"
                size={20}
                style={{color: colors.skyBlue}}
              />
            </CustomButton>
            <CustomInput
              value={input}
              isClass
              handleChange={(text) => this.onChangeText(text)}
              style={{flex: 1, borderColor: colors.appGray1}}
            />
            <CustomButton
              disabled={
                !input.length ||
                (this.state.attachment?.length > 0 && this.state.messageLoading)
              }
              isLoading={
                !this.state.attachment.length && this.state.messageLoading
                  ? true
                  : false
              }
              mode={1}
              handlePress={this.sendMessage}
              style={[
                styles.sendButton,
                (!input.length || this.state.attachment?.length > 0) && {
                  backgroundColor: colors.appGray,
                },
              ]}>
              <Icon
                name="send"
                size={20}
                style={{color: colors.defaultWhite}}
              />
            </CustomButton>
          </View>
        </KeyboardAvoidingView>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Add Attachment'}
          options={['Take Photo', 'From Gallery', 'Other File', 'Cancel']}
          cancelButtonIndex={3}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  messages: state.messagesReducer.messages,
  quickblox: state.myReducer.user?.freelancer_profile?.quickblox,
  isTyping: state.messagesReducer.isTyping,
  chatDialogs: state.messagesReducer.chatDialogs,
  isSessionActive: state.messagesReducer.isSessionActive,
  isConnected: state.messagesReducer.isConnected,
  isSessionLoading: state.messagesReducer.isSessionLoading,
  chatConnectionLoading: state.messagesReducer.chatConnectionLoading,
});

export default connect(mapStateToProps)(Chat);
