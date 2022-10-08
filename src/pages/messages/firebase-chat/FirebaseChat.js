import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import LottieView from 'lottie-react-native';
import {
  createChannel,
  createMessage,
  getChatReducer,
  removeActiveDialog,
  setActiveDialog,
  setTypingStatus,
  storage,
} from 'src/firebase';
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './FirebaseChat.styles';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import colors from 'src/styles/texts/colors';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ShowAttachment from 'src/components/show-attachment/ShowAttachment';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import {directories, download} from 'react-native-background-downloader';

export class FirebaseChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      attachment: [],
      uploadAttachments: [],
      percentage: 0,
      indeterminateLoading: false,
      downloadProgress: undefined,
      progressId: undefined,
    };
    this.typingTimeout = undefined;
    this.TYPING_DEBOUNCE = 1000;
    // this.emitter = new NativeEventEmitter(QB.chat);
  }

  componentDidMount() {
    const {params} = this.props.route;
    if (params?.type === 'inbox') {
      setActiveDialog(params?.item);
    } else {
      createChannel(params?.uid);
    }
  }

  sendMessage = () => {
    let message = this.state.input?.trim();
    if (message) {
      createMessage(message);
      this.setState({input: ''});
    }
  };

  onChangeText = (text) => {
    const {dialogs} = this.props;
    const isTyping = dialogs?.isTyping;

    // if (!isTyping) {
    //   setTypingStatus(true);
    // }
    this.setState({input: text});
    // if (this.typingTimeout) {
    //   clearTimeout(this.typingTimeout);
    // }
    // this.typingTimeout = setTimeout(() => {
    //   setTypingStatus(false);
    // }, this.TYPING_DEBOUNCE);
  };
  sendAttachments = async () => {
    const {attachment, input} = this.state;
    this.handleFireBaseUpload(input, attachment);
    // this.setUploadVariable(message, attachments);

    await this.setState({
      attachment: [],
      input: '',
    });
  };

  handleFireBaseUpload = async (message, attachments) => {
    const chatData = getChatReducer();

    // async magic goes here...
    if (attachments?.length > 0 && attachments !== undefined) {
      let filesData = [];
      let count = 0;
      attachments.map(async (inputFile, index) => {
        var storageRef = '';
        if (inputFile) {
          if (inputFile.type.includes('image')) {
            storageRef = storage
              .ref(
                `/${chatData?.activeDialog?.id}/images/` +
                  `${Math.random()}_${inputFile.name}`,
              )
              .putFile(inputFile.uri);
          } else if (inputFile.type.includes('application')) {
            storageRef = storage
              .ref(
                `/${chatData?.activeDialog?.id}/applications/` +
                  `${Math.random()}_${inputFile.name}`,
              )
              .putFile(inputFile.uri);
          } else {
            storageRef = storage
              .ref(
                `/${chatData?.activeDialog?.id}/others/` +
                  `${Math.random()}_${inputFile.name}`,
              )
              .putFile(inputFile.uri);
          }
        }
        console.log(
          'storageRef?._delegate?._ref?.name',
          storageRef?._ref?.name,
          storageRef,
        );

        await this.setUploadVariable(
          message ?? '',
          inputFile,
          storageRef?._ref?.name,
        );
        var uploadTask = storageRef;

        await uploadTask.on(
          'state_changed',
          (snapShot) => {
            //takes a snap shot of the process as it is happening

            var progress =
              (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

            let per = this.state.uploadAttachments;

            per.map((item, ii) => {
              item.newName === snapShot?.ref?.name &&
                (item.percentage = progress);
            });

            this.setState((prevState) => {
              return {
                ...prevState,
                uploadAttachments: [...per],
              };
            });
            // this.setState({uploadAttachments: per});
          },
          (err) => {
            count += 1;
            //catches the errors
            console.log(err);
          },
          () => {
            // get the uploaded image url back

            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('dsfsff', downloadURL);
              count += 1;
              // filesData.push({
              //   name: inputFile.name,
              //   size: uploadTask.snapshot.metadata.size,
              //   contentType: uploadTask.snapshot.metadata.contentType,
              //   path: uploadTask.snapshot.metadata.fullPath,
              // });

              createMessage(message, {
                name: inputFile.name,
                size: uploadTask.snapshot.metadata.size,
                contentType: uploadTask.snapshot.metadata.contentType,
                path: uploadTask.snapshot.metadata.fullPath,
              });

              let newArray = this.state.uploadAttachments.filter(
                (ll) => ll.newName.includes(uploadTask.snapshot.metadata.name),
              );
              console.log('newAtt', JSON.stringify(newArray, null, 2) , uploadTask.snapshot.metadata.name,);
              this.setState((prevState) => {
                return {
                  ...prevState,
                  uploadAttachments: [...newArray],
                };
              });
            });
          },
        );
      });
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
        this.sendAttachments();
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
          this.sendAttachments();
        })
        .catch((err) => console.error('Image picker open picker error'));
    } else if (index === 2) {
      try {
        const {pdf, zip, csv, plainText} = DocumentPicker.types;
        const results = await DocumentPicker.pickMultiple({
          type: [pdf, zip, csv, plainText, '.mp4', 'video/*', '.doc', '.docx'],
        });
        // this.setState({files: [...this.state.files, results]});
        for (const res of results) {
          const stat = await RNFetchBlob.fs.stat(res.uri);
          // let a = new File(res.uri, res.name);
          let uri = Platform.OS === 'android' ? `file://${stat.path}` : res.uri;
          this.setState({
            attachment: [
              ...this.state.attachment,
              {
                name: res.name,
                uri: uri,
                type: res.type,
              },
            ],
          });
        }
        this.sendAttachments();
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker,');
        } else {
          throw err;
        }
      }
    }
  };

  setUploadVariable = async (message, attachments, newName) => {
    return new Promise((resolve, reject) => {
      // const { uploadAttachments } = this.state;

      this.setState((prevState) => {
        return {
          ...prevState,
          uploadAttachments: [
            ...prevState.uploadAttachments,
            {
              attachments: attachments,
              content: message,
              timeStamp: moment(new Date()).format('X'),
              percentage: 0,
              newName: newName,
            },
          ],
        };
      }, resolve);
    });
  };

  listEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{width: 300, height: 300}}
          source={require('src/assets/lottie-animation/emptyChat.json')}
          autoPlay
          loop={true}
          speed={0.9}
        />
      </View>
    );
  };

  renderMessage = (item, my_uid, opponent_uid, index) => (
    <>
      <TouchableOpacity
        // onPress={() => this.handleMessageClick(item)}
        // disabled={!item?.properties?.sendId}
        style={
          item.sender === my_uid
            ? [
                styles.sentChatContainer,
                item?.attachments?.contentType?.includes('image') && {
                  padding: 0,
                  borderWidth: 0,
                },
              ]
            : styles.receivedChatContainer
        }>
        {item?.attachments !== undefined && (
          <ShowAttachment
            key={item?.id}
            item={item}
            progressLoading={this.state.indeterminateLoading}
            progress={this.state.downloadProgress}
            downloadFile={this.downloadFile}
            progressId={this.state.progressId}
          />
        )}

        {item?.content !== '' && (
          <Text
            style={
              item.sender === my_uid
                ? styles.sentChatMessage
                : styles.receivedChatMessage
            }>
            {item?.content}
          </Text>
        )}
        <View style={styles.chatFooter}>
          <Text
            style={
              item.sender === my_uid
                ? styles.sentChatTime
                : styles.receivedChatTime
            }>
            {moment(item?.timeStamp).format('LT')}
          </Text>

          {item.sender === my_uid &&
            (item?.seen ? (
              <Ionicons
                name={'checkmark-done-outline'}
                size={20}
                color={colors.skyBlue}
              />
            ) : item.delivery.find((x) => x === opponent_uid) ? (
              <Ionicons
                name={'checkmark-done-outline'}
                size={20}
                color={colors.appGray}
              />
            ) : (
              <Ionicons
                name={'checkmark-outline'}
                size={20}
                color={colors.appGray}
              />
            ))}
        </View>
      </TouchableOpacity>
      {/* {this.state.pageLoading && index === this.props.messages?.length - 1 && (
          <ActivityIndicator
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            color={colors.skyBlue}
            size={25}
          />
        )} */}
    </>
  );

  componentWillUnmount() {
    removeActiveDialog();
  }

  downloadFile = async (item, url) => {
    console.log('url', url);
    const destination = url.replace(
      'https://firebasestorage.googleapis.com/v0/b/qaff-7a007.appspot.com/',
      `${directories.documents}/${item?.attachments?.type}`,
    );

    const downloaded = await RNFetchBlob.fs.exists(destination);
    console.log(
      'file downloaded',
      downloaded,
      item?.attachments?.contentType?.split('/')[1],
    );
    if (downloaded) {
      Platform.OS === 'android'
        ? RNFetchBlob.android.actionViewIntent(
            `${destination}`,
            item?.attachments?.contentType,
          )
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
                  item?.attachments?.contentType,
                )
              : RNFetchBlob.ios.previewDocument(destination);
          })
          .error((error) => {
            console.log('Download canceled due to error: ', error);
          });
      } else {
        alert('No url');
      }
    }
  };

  render() {
    const {input, uploadAttachments} = this.state;
    const {
      params: {userName, userPhoto},
    } = this.props.route;
    const {chatLoading, chatHistory, activeDialog} = this.props;

    const isTyping = activeDialog?.info?.isTyping;

    const opponent_uid = activeDialog?.info?.uid;
    const my_uid = activeDialog?.members?.find((id) => id !== opponent_uid);
    // console.log('ccc', chatHistory);

    if (chatLoading) {
      return (
        <>
          <Header
            title={userName}
            headerRightImage={userPhoto}
            backButton
            navigation={this.props.navigation}
            isOnline={activeDialog?.info?.online}
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
          isOnline={activeDialog?.info?.online}
        />
        <View style={{flex: 1}}>
          <SectionList
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={this.listEmpty}
            inverted={!chatHistory?.length ? false : true}
            sections={!chatHistory?.length ? [] : [{data: [...chatHistory]}]}
            keyExtractor={(item, index) => item?.timeStamp + index.toString()}
            renderItem={({item, index}) =>
              this.renderMessage(item, my_uid, opponent_uid, index)
            }
            removeClippedSubviews={true}
            renderToHardwareTextureAndroid={
              Platform.OS === 'android' ? true : false
            }
            ListHeaderComponent={
              <PreviewAttachment attachment={uploadAttachments} />
            }

            // onEndReachedThreshold={0.4}
            // onEndReached={() => this.onLoadMoreMessages()}
            // onMomentumScrollBegin={() =>
            //   this.setState({onEndReachedCalledDuringMomentum: false})
            // }
          />
        </View>
        {isTyping && (
          <View style={styles.isTypingContainer}>
            <FastImage
              source={{uri: userPhoto}}
              style={{height: 30, width: 30, borderRadius: 15}}
            />
            <LottieView
              style={{width: 50, height: 50}}
              source={require('src/assets/lottie-animation/threeDots.json')}
              autoPlay
              loop={true}
              speed={0.9}
            />
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.ActionSheet.show()}
              style={styles.attachmentButton}>
              <Ionicons
                name="attach-outline"
                size={25}
                color={colors.skyBlue}
              />
            </TouchableOpacity>
            <TextInput
              value={input}
              onChangeText={(text) => this.onChangeText(text)}
              style={styles.input}
            />

            <TouchableOpacity
              disabled={!input.length}
              onPress={this.sendMessage}
              style={[
                styles.sendButton,
                !input.length && {
                  backgroundColor: colors.appGray,
                },
              ]}>
              <Ionicons
                name="send-outline"
                size={25}
                color={colors.defaultWhite}
              />
              {/* {this.state.messageLoading && !this.state.attachment?.length ? (
                <ActivityIndicator color={colors.defaultWhite} size="small" />
              ) : (
                <Ionicons
                  name="send-outline"
                  size={25}
                  color={colors.defaultWhite}
                />
              )} */}
            </TouchableOpacity>
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

const PreviewAttachment = ({attachment}) => {
  return (
    attachment?.length > 0 &&
    attachment.map((upload, number) => (
      <View
        key={upload?.attachments?.uri + number}
        style={{
          flexDirection: 'row',

          alignSelf: 'flex-end',
          borderColor: colors.skyBlue,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          marginVertical: 10,
          width: '40%',

          padding: 10,
          borderWidth: 2,
          borderColor: colors.skyBlue,
          marginEnd: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          source={{uri: upload?.attachments?.uri}}
          style={{
            height: 50,
            width: 50,

            marginEnd: 10,
          }}
          resizeMode="cover"
        />
        <Progress.Circle
          showsText={true}
          progress={upload?.percentage / 10}
          size={40}
          color={colors.appViolet}
          textStyle={{fontSize: 12, color: colors.appBlack}}
          // unfilledColor={colors.appViolet}
          // style={{
          //   height: 50,
          //   width: 50,
          //   borderRadius: 25,
          // }}
          thickness={2}
        />
      </View>
    ))
  );
};

const mapStateToProps = (state) => ({
  chatLoading: state.chatReducer.chatLoading,
  chatHistory: state.chatReducer.chatHistory,
  activeDialog: state.chatReducer.activeDialog,
});

export default connect(mapStateToProps)(FirebaseChat);
