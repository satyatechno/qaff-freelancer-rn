import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './MessageCard.styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';

const MessageCard = ({
  userName,
  userImage,
  userProfile,
  handlePress,
  time,
  message,
  quickblox,
  isOnline,
  item,
  unreadCount
}) => {
  // console.log('sdfsfs', userImage);
  return (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => handlePress(userName, userImage, quickblox, item)}>
      <View>
        {userImage == undefined || null || userImage === '' ? (
          <FastImage
            source={require('src/assets/images/avator.png')}
            style={styles.userImage}
          />
        ) : (
          <FastImage
            source={{uri: userImage}}
            style={styles.userImage}
            defaultSource={require('src/assets/images/imagePlaceHolder.png')}></FastImage>
        )}
        {isOnline !== undefined && (
          <Ionicons
            name="ellipse"
            size={14}
            color={isOnline ? colors.appGreen : colors.appRed}
            style={{position: 'absolute', bottom: -2, end: 10, zIndex: 10}}
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={styles.userName}>{userName}</Text>
          {time ? (
            <Text style={styles.time}>{moment.unix(time).format('LT')}</Text>
          ) : null}
        </View>
        <View>
          {userProfile ? (
            <Text style={styles.userProfile}>{userProfile}</Text>
          ) : null}
          {message ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text numberOfLines={1} style={styles.message}>
              {message}
            </Text>
          {unreadCount ? <View style={{
            marginEnd: 10, marginTop: 5,
          backgroundColor: colors.appRed,
          borderRadius: 12.5,
          justifyContent:'center',
          height: 25,
          width: 25,
          alignItems:'center'
          }}><Text style={{ color: colors.defaultWhite, fontSize:16, textAlign: 'center'}}>{unreadCount} </Text></View> : null}

            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
