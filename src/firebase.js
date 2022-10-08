import firebase from '@react-native-firebase/app';
import {store} from 'src/store';
import moment from 'moment';
import _ from 'lodash';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';
import {
  CHAT_LOADING,
  CHAT_SERVER_STATUS,
  GET_CHANNELS,
  GET_CHAT_HISTORY,
  GET_DIALOGS,
  SET_ACTIVE_OPPONENT,
  SET_UNREAD_MESSAGE_COUNT,
} from 'src/actions/chatAction';

import {LOGOUT} from 'src/actions/action';
import {
  sendChatMessageNotification,
  updateFirebaseId,
} from './services/http.service';
import {Platform} from 'react-native';
export const getUserData = () => {
  let storeData = store.getState();
  let qb_user =
    storeData.myReducer.user.account_type === 'employer'
      ? storeData.myReducer.user?.employer_profile
      : storeData.myReducer.user?.freelancer_profile;
  return qb_user;
};

export const getChatReducer = () => {
  let storeData = store.getState();
  return storeData?.chatReducer;
};

const firebaseConfig = {
  apiKey: 'AIzaSyDCivNqo5GLz-7y-vJ_Q1cRDdc0O3DbSUs',
  authDomain: 'qaff-7a007.firebaseapp.com',
  projectId: 'qaff-7a007',
  storageBucket: 'qaff-7a007.appspot.com',
  messagingSenderId: '624462542238',
  appId: '1:624462542238:web:a78bd8c0c7d4e24a55128f',
  measurementId: 'G-KY8RRNEE2J',
  databaseURL:
    'https://qaff-7a007-default-rtdb.europe-west1.firebasedatabase.app',
};
const iosCredentials = {
  clientId:
    'com.googleusercontent.apps.624462542238-sok413aa1he9iupbgui3b1mdrtkhnpr2',
  appId: '1:624462542238:ios:c236e1d1f5a2104855128f',
  apiKey: 'AIzaSyBv8YaIuoW9uzeQSJDF55NzH5UY0Hym3Pc',
  databaseURL:
    'https://qaff-7a007-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'qaff-7a007.appspot.com',
  messagingSenderId: '624462542238',
  projectId: 'qaff-7a007',
};
const credentials = Platform.select({
  android: firebaseConfig,
  ios: iosCredentials,
});
try {
  if (!firebase.apps.length) firebase.initializeApp(credentials);
} catch (err) {
  console.log('SS');
}

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();

export const logoutFireBase = async () => {
  var userId = firebase.auth().currentUser.uid;
  db.ref('/Users/' + userId).off('value');
  db.ref('Users').off('value');
  db.ref('Channels').off('value');
  await setOnlineStatus(false);
  await auth.signOut();
  await store.dispatch(LOGOUT());
};

export const loginFirebase = async () => {
  // auth.signOut();

  firebase.auth().onAuthStateChanged((user) => {
    let userData = getUserData();
    let chatData = getChatReducer();
    let email = '';
    let password = '';
    if (user) {
      // User is signed in.
      console.log('Already login');

      if (firebase.auth().currentUser.uid !== userData?.firebase_user_id) {
        // createFirebaseUser(email, password);
      }

      store.dispatch(CHAT_SERVER_STATUS(true));
      setOnlineStatus(true);
      db.ref(`Users/${chatData?.dialogs?.uid}/online`)
        .onDisconnect()
        .set(false);
      currentUser();
    } else {
      console.log('Logout');
      store.dispatch(CHAT_SERVER_STATUS(false));
      // createFirebaseUser(email, password);
    }
  });
};

export const createFirebaseUser = (email, password) => {
  if (email !== undefined) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        createUser(user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`Email address ${email} already in use.`);
            loginFirebase2(email, password);
            break;
          case 'auth/invalid-email':
            store.dispatch(
              CHAT_SERVER_CONNECTION_FAILED({
                success: false,
                failed: true,
              }),
            );
            console.log(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            store.dispatch(
              CHAT_SERVER_CONNECTION_FAILED({
                success: false,
                failed: true,
              }),
            );
            console.log(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            store.dispatch(
              CHAT_SERVER_CONNECTION_FAILED({
                success: false,
                failed: true,
              }),
            );
            console.log(
              'Password is not strong enough. Add additional characters including special characters and numbers.',
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  }
};

export const setOnlineStatus = (value) => {
  if (firebase.auth().currentUser.uid !== undefined)
    return firebase
      .database()
      .ref('Users/' + firebase.auth().currentUser.uid)
      .update({
        online: value,
      });
};

export const setTypingStatus = (value) => {
  if (firebase.auth().currentUser.uid !== undefined)
    return firebase
      .database()
      .ref('Users/' + firebase.auth().currentUser.uid)
      .update({
        isTyping: value,
      });
};

export const loginFirebase2 = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // console.log('Loogin User', user);
      store.dispatch(CHAT_SERVER_STATUS(true));
    })
    .catch((err) => {
      console.log('Error Message', err);
      store.dispatch(
        CHAT_SERVER_CONNECTION_FAILED({
          success: false,
          failed: true,
        }),
      );
      //   this.errorMessage = err.message
    });
};

export const createUser = (userId) => {
  let storeData = store.getState();
  let userData = getUserData();
  firebase
    .database()
    .ref('Users/' + userId)
    .set({
      channels: [],
      id: userData.user_id,
      name: `${userData.first_name} ${userData.last_name}`,
      online: true,
      profilePic: userData.profile_image,
      uid: userId,
      email: userData?.email ?? '',
    });

  if (
    userData?.firebase_user_id === null ||
    userData?.firebase_user_id === undefined
  ) {
    updateFirebaseId({
      data: {
        firebase_user_id: userId,
      },
      token: storeData?.myReducer?.user?.token,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
};

export const currentUser = async () => {
  try {
    var userId = firebase.auth().currentUser.uid;
    db.ref('/Users/' + userId).on('value', (snapshot) => {
      let users = ' ';

      users = snapshot.val();
      if (users.uid === undefined) {
        createUser(userId);
      }
      if (users.online === false) {
        setOnlineStatus(true);
      }
      // getAllChatHistory();
      store.dispatch(GET_DIALOGS(users));
      console.log('usersChannels', users?.channels);
      users?.channels !== undefined && getChannelsDetails(users.channels);
    });
  } catch (error) {
    console.log('USERS Error', error);
  }
};

export const getChannelsDetails = async (channels) => {
  try {
    db.ref('Channels').on('value', (snapshot) => {
      let channelDetails = [];
      snapshot.forEach((snap) => {
        channels.includes(snap.val().id) && channelDetails.unshift(snap.val());
      });
      getUserDetails(channelDetails);
      channelDetails.map((item) => {
        insertDeliveryID(item);
        getSetUnreadCount(item);
      });

      console.log('channelDetails', channelDetails);

      store.dispatch(GET_CHANNELS([...channelDetails]));
    });
  } catch (error) {
    console.log('USERS Error', error);
  }
};

export const insertDeliveryID = (item) => {
  if (item?.lastMessage !== undefined) {
    if (item.lastMessage.sender !== getChatReducer().dialogs?.uid) {
      console.log(
        'item.lastMessage.length -- >',
        item.lastMessage.delivery.length,
      );
      if (item.lastMessage.delivery.length < 2) {
        console.log(
          'item.lastMessage.length',
          item.lastMessage.delivery.length,
        );
        firebase
          .database()
          .ref('Messages/' + item.id + `/${item.lastMessage.id}`)
          .update({
            delivery: [
              ...item.lastMessage.delivery,
              getChatReducer().dialogs?.uid,
            ],
          });
      }
    }
  }
};

export const getOpponentId = (members) => {
  let opponentId = members.filter(
    (op) => op !== firebase.auth()?.currentUser?.uid,
  );
  return opponentId[0];
};
export const getSetUnreadCount = (item) => {
  let myRef = db.ref('/Messages/' + item.id);
  let myCount = 0;
  let opponentCount = 0;
  let opponentId = item.members.filter(
    (op) => op !== firebase.auth().currentUser.uid,
  );
  myRef
    .once('value')
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        for (const [key, value] of Object.entries(snapshot.val())) {
          if (value.sender !== getChatReducer().dialogs?.uid) {
            !value.seen && (myCount += 1);
          } else {
            !value.seen && (opponentCount += 1);
          }
        }
        firebase
          .database()
          .ref('Channels/' + item.id)
          .update({
            unreadCount: {
              [getChatReducer().dialogs?.uid]: myCount,
              [opponentId[0]]: opponentCount,
            },
          });
        let unreadCount = unReadMessageCount();
        store.dispatch(SET_UNREAD_MESSAGE_COUNT(unreadCount));
        console.log('count my', unreadCount);
        // console.log("opponentCount" , opponentCount)
      } else {
        console.log('No Chat');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const unReadMessageCount = () => {
  let count = 0;
  if (getChatReducer().channels?.length === 0) {
    return count;
  }
  getChatReducer().channels?.map((item) => {
    count += item?.unreadCount?.[getChatReducer()?.dialogs?.uid];
  });
  return count;
};

export const getUserDetails = (channelList) => {
  try {
    db.ref('Users').on('value', (snapshot) => {
      let chatData = getChatReducer();

      let channelDetails = channelList ?? chatData.channels;
      snapshot.forEach((snap) => {
        channelDetails.map((item) => {
          let opponentId = item.members.filter(
            (op) => op !== firebase.auth()?.currentUser?.uid,
          );
          snap.val().uid === opponentId[0] && (item.info = snap.val());
        });

        if (chatData?.activeDialog?.info?.uid !== undefined) {
          chatData?.activeDialog?.info?.uid === snap.val().uid &&
            snap.val().isTyping !== chatData?.activeDialog?.info?.isTyping &&
            store.dispatch(
              SET_ACTIVE_OPPONENT({
                ...chatData?.activeDialog,
                info: snap.val(),
              }),
            );
        }
      });

      store.dispatch(GET_CHANNELS([...channelDetails]));
    });
  } catch (error) {
    console.log('USERS Error', error);
  }
};

export const createChannel = async (id, type) => {
  const chatData = getChatReducer();
  if (chatData.dialogs.id === id)
    return alert('Freelancer and Client same profile cannot be chat');
  let userId = chatData?.dialogs?.uid; // My Uid
  let channels = chatData?.dialogs?.channels ?? []; // Channels My list
  let newPostKey = firebase.database().ref().child('Channels').push().key;
  let opponentId = await getUserByProfileId(id);

  console.log('new Post Key', newPostKey);
  await checkChannelExistOrNot(userId, opponentId.uid)
    .then(async (res) => {
      console.log('channel status ', res.status);
      if (!res.status) {
        console.log('object', newPostKey, userId, opponentId);
        let channel_data = {
          icon: '',
          id: newPostKey,
          lastUpdated: moment(new Date()).format('X'),
          members: [userId, opponentId.uid],
          name: '',
          type: type ?? 'single',
          unreadCount: {
            userId: 0,
            [opponentId.uid]: 0,
          },
        };

        if (opponentId.uid === undefined) {
          return errorToast('Something went wrong!! , Please try again later');
        } else {
          await firebase
            .database()
            .ref('Channels/' + newPostKey)
            .set(channel_data);

          channels.unshift(newPostKey);
          await firebase
            .database()
            .ref('Users/' + userId)
            .update({
              channels: channels,
            });

          let opponentUserChannels = opponentId?.channels ?? [];

          opponentUserChannels.unshift(newPostKey);
          await firebase
            .database()
            .ref('Users/' + opponentId.uid)
            .update({
              channels: opponentUserChannels,
            });

          if (extraData !== undefined) {
            createMessage(
              extraData?.message,
              extraData?.attachment,
              extraData?.extraData,
              channelPayload,
            );
          }

          setActiveDialog(channel_data);
          console.log('new  Channel', channel_data);
        }
      } else {
        let newData = chatData.channels.filter(
          (item) => item.id === res.channelId,
        );
        console.log('active Channel', newData);
        setActiveDialog(newData[0]);
      }
    })
    .catch((err) => console.log(err));
};

export const checkChannelExistOrNot = (userId, opponentUid) => {
  console.log('userId, opponentUid', userId, opponentUid);
  const dbRef = firebase.database().ref();
  return new Promise(function (resolve, reject) {
    // firebase.database().ref("Users").child(userId).
    dbRef
      .child('Users')
      .child(userId)
      .once('value')
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          let channelStatus = false;
          let chanelLength = snapshot.val().channels?.length;
          if (chanelLength === 0 || chanelLength === undefined) {
            resolve({
              status: false,
            });
          } else {
            await snapshot.val().channels.map((channelId, index) => {
              dbRef
                .child('Channels')
                .child(channelId)
                .once('value')
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    channelStatus = snapshot
                      .val()
                      .members.includes(opponentUid);
                    if (channelStatus === true) {
                      return resolve({
                        status: true,
                        channelId: snapshot.val().id,
                      });
                    }
                    chanelLength - 1 === index &&
                      resolve({
                        status: channelStatus,
                      });
                  } else {
                    resolve({
                      status: channelStatus,
                    });
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          }
          // await resolve(channelStatus)
        } else {
          console.log('No data available');
          // resolve(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  //   const dbRef = firebase.database().ref();
  // dbRef.child("Channels").get().then((snapshot) => {

  //   snapshot.forEach((snap) => {
  //     console.log("channels",snap.val().members , members,snap.val().members === members)
  //     members.map((item , index) => {

  //      index > 1 && snap.val().members.includes(item)
  //     })

  //   });
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });
};

// export const createMessage = (message, attachment) => {
//   const storeData = store.getState();
//   const chatData = getChatReducer();

//   var newPostKey = firebase
//     .database()
//     .ref('Messages/')
//     .child(chatData?.activeDialog?.id)
//     .push().key;

//   let messagePayload = {
//     content: message ?? '',
//     id: newPostKey,
//     seen: false,
//     sender: chatData?.dialogs?.uid,
//     timeStamp: parseInt(moment(new Date()).format('X')),
//     type: 'text',
//     delivery: [chatData?.dialogs?.uid],
//     attachments: attachment ?? [],
//   };

//   let messageKey = firebase
//     .database()
//     .ref('Messages/')
//     .child(chatData?.activeDialog?.id)
//     .push(messagePayload).key;
//   // console.log(messageKey);

//   firebase
//     .database()
//     .ref('Messages/' + chatData?.activeDialog?.id + '/' + messageKey)
//     .update({
//       id: messageKey,
//     });

//   // .set({
//   //   [newPostKey] : messagePayload
//   // });

//   firebase
//     .database()
//     .ref('Channels/' + chatData?.activeDialog?.id)
//     .update({
//       lastUpdated: moment(new Date()).format('X'),
//       lastMessage: {
//         ...messagePayload,
//         id: messageKey,
//       },
//     });
//   if (!chatData.activeDialog?.info?.online) {
//     sendChatMessageNotification({
//       data: {
//         profile_id: chatData.activeDialog?.info?.id,
//         profile_type: 'employer',
//         message: message,
//       },

//       token: storeData?.myReducer?.user?.token,
//     })
//       .then((res) => console.log(' message notification sent'))
//       .catch((err) => console.log('error while sending message notification'));
//   }
// };

export const getUserByProfileId = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.ref('Users/' + id)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Exist sss', snapshot.val());

            resolve(snapshot.val());
          } else {
            console.log('No Exist');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      return null;
    }
  });
};
export const createMessage = async (
  message,
  attachment,
  extraData,
  channelObject,
) => {
  const chatData = getChatReducer();

  let channelId = channelObject?.id ?? chatData?.activeDialog?.id;
  var newPostKey = firebase.database().ref(`Messages/${channelId}`).push().key;

  let messagePayload = {
    content: message ?? '',
    id: newPostKey,
    seen: false,
    sender: chatData?.dialogs?.uid,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
    // timeStamp: parseInt(moment(new Date()).format('X')),
    type: 'text',
    delivery: [chatData?.dialogs?.uid],
    attachments: attachment ?? [],
    extraData: extraData ?? [],
  };
  console.log('timestamp1', firebase.database.ServerValue.TIMESTAMP);

  var updates = {};
  updates['/Messages/' + channelId + '/' + newPostKey] = messagePayload;

  firebase.database().ref().update(updates);

  await firebase
    .database()
    .ref('Channels/' + channelId)
    .update({
      lastUpdated: moment(new Date()).format('X'),
      lastMessage: messagePayload,
    });
  let storeData = store.getState();
  if (channelObject === undefined && !chatData.activeDialog?.info?.online) {
    sendChatMessageNotification({
      data: {
        profile_id: chatData.activeDialog?.info?.id,
        profile_type:
          storeData?.myReducer?.user?.account_type === 'freelancer'
            ? 'employer'
            : 'freelancer',
        message: message,
      },
      account_type: storeData?.myReducer?.user?.account_type,
      token: storeData?.myReducer?.user?.token,
    })
      .then((res) => console.log(' message notification sent'))
      .catch((err) => console.log('error while sending message notification'));
  }
};

// export const getUserByProfileId = async (id) => {
//   try {
//     return new Promise(function (resolve, reject) {
//       db.ref('Users').once('value', (snapshot) => {
//         let user = '';
//         snapshot.forEach((snap) => {
//           if (parseInt(snap.val().id) === parseInt(id)) {
//             user = snap.val();
//           }
//         });
//         console.log('user', user);
//         if (user === '') {
//           reject('User not found on chat');
//         } else {
//           resolve(user);
//         }
//       });
//     });
//   } catch (error) {
//     console.log('USERS Error', error);
//   }
// };

export const removeActiveDialog = async () => {
  try {
    store.dispatch(CHAT_LOADING(false));
    db.ref('/Messages/' + getChatReducer().activeDialog?.id ?? '').off(
      'child_changed',
    );
    await store.dispatch(SET_ACTIVE_OPPONENT(''));
    await store.dispatch(GET_CHAT_HISTORY([]));
  } catch (err) {
    console.log('error remove', err);
  }
};
export const setActiveDialog = async (item) => {
  console.log('ac', JSON.stringify(item, null, 2));
  await store.dispatch(CHAT_LOADING(true));
  await store.dispatch(GET_CHAT_HISTORY([]));

  if (getChatReducer().activeDialog.id !== '') {
    db.ref('/Messages/' + getChatReducer().activeDialog?.id).off('child_added');
  }
  await store.dispatch(SET_ACTIVE_OPPONENT(item));
  await getChatHistoryPromise(item?.id, item);
};

export const loadMoreChat = () => {
  const chatData = getChatReducer();
  let chatHistory = chatData.chatHistory;
  let messageId = chatData.chatHistory[0];

  //   db.ref("/Messages/" + chatData.activeDialog?.id).orderByValue("id").endAt(messageId.timeStamp).limitToLast(5).get()
  //   .then((snapshot) => {
  //     console.log("SSSSSS" , snapshot.val())
  //     snapshot.forEach((snap) => {
  //           chatHistory.unshift(snap.val());
  //           console.log("SSS" ,snap.val())
  //         });
  //         store.dispatch(GET_CHAT_HISTORY(chatHistory))
  // });
  db.ref('/Messages/' + chatData.activeDialog?.id)
    .orderByKey(messageId.id)
    .limitToLast(1)
    .once('value')
    .then((snapshot) => {
      // let messages = [];
      console.log('SSSSSS', snapshot.val());
      snapshot.forEach((snap) => {
        // messages.push(snap.val());
        console.log('SSS', snap.val());
      });
      // store.dispatch(GET_CHAT_HISTORY(messages))
      // console.log("resolve", messages);
      // resolve(messages);
    });
};

// export const getChatHistoryPromise = async (channelId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let myRef = db.ref('/Messages/' + channelId);

//       await myRef
//         .once('value')
//         .then(async (snapshot) => {
//           if (snapshot.exists()) {
//             // console.log("Object.keys(myObj).length" , Object.keys(snapshot.val()).length)
//             let messages = [];

//             for (const [key, value] of Object.entries(snapshot.val())) {
//               if (
//                 value.sender !== getChatReducer().dialogs?.uid &&
//                 !value.seen
//               ) {
//                 await firebase
//                   .database()
//                   .ref('Messages/' + channelId + `/${value.id}`)
//                   .update({
//                     seen: true,
//                   });
//               }
//               messages.push(value);
//             }
//             await store.dispatch(GET_CHAT_HISTORY([...messages]));
//             store.dispatch(CHAT_LOADING(false));
//             // console.log('message', messages);
//             // let newVariable = [];
//             // for (let i = 0; i < messages.length; i++) {
//             //   if (messages[i].attachments !== undefined) {
//             //     await getUrl(messages[i].attachments.path)
//             //       .then(async (res) => {
//             //         let newValue = {
//             //           ...messages[i],
//             //           url: res,
//             //         };
//             //         console.log('attachments 2 ');
//             //         await newVariable.push(newValue);
//             //       })
//             //       .catch((err) => {
//             //         console.log(err);
//             //       });
//             //   } else {
//             //     console.log('message 2 ');
//             //     await newVariable.push(messages[i]);
//             //   }
//             // }
//             // console.log('message', newVariable);

//             // await store.dispatch(GET_CHAT_HISTORY([...newVariable]));

//             await getSingleChat(channelId);
//           } else {
//             await getSingleChat(channelId);
//             await store.dispatch(CHAT_LOADING(false));
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

export const getChatHistoryPromise = async (channelId, item) => {
  return new Promise(async (resolve, reject) => {
    try {
      let myRef = db.ref('/Messages/' + channelId);

      getAllChatAtOnce(channelId)
        .then((res) => {
          myRef
            .orderByChild('timeStamp')
            .once('value')
            .then(async (snapshot) => {
              if (snapshot.exists()) {
                let messages = [];

                for (const [key, value] of Object.entries(snapshot.val())) {
                  if (
                    value.sender !== getChatReducer().dialogs?.uid &&
                    !value.seen
                  ) {
                    firebase
                      .database()
                      .ref('Messages/' + channelId + `/${value.id}`)
                      .update({
                        seen: true,
                      });
                  }
                  messages.push(value);
                }

                messages.sort(function (x, y) {
                  return y.timeStamp - x.timeStamp;
                });
                await store.dispatch(GET_CHAT_HISTORY([...messages]));
                await store.dispatch(CHAT_LOADING(false));

                resolve('success');
              } else {
                resolve('success');
                store.dispatch(CHAT_LOADING(false));
              }
              firebase
                .database()
                .ref('Channels/' + item.id)
                .update({
                  unreadCount: {
                    [getChatReducer().dialogs?.uid]: 0,
                    [getOpponentId(item?.members)]: item?.unreadCount?.[
                      getOpponentId(item?.members)
                    ],
                  },
                });
            })

            .catch((error) => {
              console.error(error);
              reject('failed');
            });
        })
        .catch((err) => console.log('failed', err))
        .finally(() => {
          console.log('Finally');
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const sendExtraMessage = async (message, [], extraData, opponentId) => {
  let chatData = getChatReducer();
  let opponentChannel = chatData.channels.filter(
    (item) => opponentId === getOpponentId(item.members),
  );

  if (opponentChannel.length === 0) {
    //  Create Channel
    await createChannel(opponentId, 'single', {
      message,
      attachment: [],
      extraData,
    });
  } else {
    //  send message
    createMessage(message, [], extraData, opponentChannel[0]);
  }
};

export const getAllChatAtOnce = async (channelId) => {
  return new Promise(async (resolve, reject) => {
    let myRef = db.ref('/Messages/' + channelId);

    console.log('channelId', channelId);
    myRef.limitToLast(1).on('child_added', async (data) => {
      let chatData = await getChatReducer();
      console.log('childe');
      if (!chatData?.chatLoading) {
        let newValue = data.val();
        console.log('child_added', newValue);

        let chatHistory = [...getChatReducer().chatHistory];

        if (data.val().sender !== chatData?.dialogs?.uid) {
          // chatHistory.push(newValue);
          await firebase
            .database()
            .ref('Messages/' + channelId + `/${data.val().id}`)
            .update({
              seen: true,
            });
          newValue.seen = true;
        } else {
          // chatHistory.push(newValue);
        }
        console.log(
          ' chatHistory[chatHistory.length]?.id',
          chatHistory[0]?.id,
          chatHistory,
          chatHistory[0]?.id !== newValue?.id,
        );
        if (chatHistory[0]?.id !== newValue?.id) {
          console.log('true', chatHistory[0]?.id !== newValue?.id);
          chatHistory.unshift(newValue);
        }

        await store.dispatch(GET_CHAT_HISTORY([...chatHistory]));
      } else {
        resolve('success');
      }

      // store.dispatch(CHAT_LOADING(false));
    });

    myRef.on('child_changed', async (data) => {
      let chatData = getChatReducer();
      if (!chatData?.chatLoading) {
        let newArr = [...chatData.chatHistory];
        let chatArray = [];
        newArr.map((item) => {
          if (item.id === data.val().id) {
            chatArray.push((item = data.val()));
          } else {
            chatArray.push(item);
          }
        });
        resolve('success');
        store.dispatch(GET_CHAT_HISTORY([...chatArray]));
      }
      //
    });
    myRef.once('value').then(async (snapshot) => {
      if (snapshot.exists()) {
      } else {
        store.dispatch(CHAT_LOADING(false));
      }
    });
  });
};

export const firebase_update_user = (user) => {
  if (firebase.auth().currentUser.uid !== undefined)
    return firebase
      .database()
      .ref('Users/' + firebase.auth().currentUser.uid)
      .update({
        name: `${user?.first_name} ${user?.last_name}`,
        profilePic: user?.profile_image,
      });
};

// export const getSingleChat = (channelId) => {
//   let myRef = firebase.database().ref('/Messages/' + channelId);
//   myRef.limitToLast(1).on('child_changed', async (data) => {
//     let chatHistory = [...getChatReducer().chatHistory];

//     if (false) {
//     } else {
//       if (data.val().sender !== getChatReducer().dialogs?.uid) {
//         await firebase
//           .database()
//           .ref('Messages/' + channelId + `/${data.val().id}`)
//           .update({
//             seen: true,
//           });
//       }

//       let newValue = data.val();
//       // if (newValue.attachments !== undefined) {
//       //   await getUrl(newValue.attachments.path)
//       //     .then(async (res) => {
//       //       newValue = {
//       //         ...newValue,
//       //         url: res,
//       //       };
//       //     })
//       //     .catch((err) => {
//       //       console.log(err);
//       //     });
//       // }

//       let con = chatHistory.filter((a) => a.id === newValue.id);
//       let newObj = [];
//       if (con.length !== 0) {
//         console.log('true');
//         chatHistory.map((item, index) => {
//           if (item.id === data.val().id) {
//             item = newValue;

//             newObj.push(item);
//           } else {
//             chatHistory[chatHistory.length - 1].seen === true &&
//               (item.seen = true);
//             newObj.push(item);
//           }
//         });
//       } else {
//         chatHistory.unshift(newValue);
//       }
//       // console.log('sdsd', data.val(), chatHistory, newObj);

//       await store.dispatch(
//         GET_CHAT_HISTORY(con.length === 0 ? [...chatHistory] : [...newObj]),
//       );
//     }
//   });
// };
// export const getUrl = async (path) => {
//   let storageReference = storage.ref(path);
//   return new Promise(async function (resolve, reject) {
//     await storageReference
//       .getDownloadURL()
//       .then((url) => {
//         resolve(url);
//         // Insert url into an <img> tag to "download"
//       })
//       .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//           case 'storage/object-not-found':
//             reject('No URL');
//             // File doesn't exist
//             break;
//           case 'storage/unauthorized':
//             // User doesn't have permission to access the object
//             break;
//           case 'storage/canceled':
//             // User canceled the upload
//             break;

//           // ...

//           case 'storage/unknown':
//             // Unknown error occurred, inspect the server response
//             break;
//         }
//       });
//   });
//   // Get the download URL
// };
// export const getAllChatHistory = async () => {
//   // return new Promise(function (resolve, reject) {
//   try {
//     db.ref('Messages').on('value', (snapshot) => {
//       let messages = [];
//       snapshot.forEach((snap) => {
//         return snap.val();
//       });
//       console.log(' get all message', messages);
//     });
//   } catch (err) {
//     // console.log(object)
//   }
//   // });
// };
