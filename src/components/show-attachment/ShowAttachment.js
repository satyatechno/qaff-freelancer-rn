import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from 'src/styles/texts/colors';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import ShowFileType from '../show-file-type/ShowFileType';

import * as Progress from 'react-native-progress';
import {storage} from 'src/firebase';
import {ADD_ATTACHMENT_URL} from 'src/actions/chatAction';
import {useDispatch} from 'react-redux';

const ShowAttachment = ({
  item,
  downloadFile,
  progressLoading,
  progress,
  progressId,
}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    imageUrlGenerator(item);
    // return () => setUrl(null);
  }, [item]);
  const imageUrlGenerator = async (file) => {
    if (file?.attachments?.path !== undefined) {
      file?.url === undefined &&
        getUrl(file?.attachments.path)
          .then((res) => {
            dispatch(
              ADD_ATTACHMENT_URL({
                url: res,
                id: file.id,
              }),
            );
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      return file?.url;
    }
  };

  const getUrl = (path) => {
    let storageReference = storage.ref(path);
    return new Promise(function (resolve, reject) {
      storageReference
        .getDownloadURL()
        .then((url) => {
          resolve(url);
          // Insert url into an <img> tag to "download"
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              reject('No URL');

              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
    // Get the download URL
  };

  return item?.attachments?.contentType?.includes('image') ? (
    item?.url !== undefined ? (
      <TouchableOpacity
        onPress={() => navigation.navigate('ImageViewer', {uri: item?.url})}>
        <FastImage
          onLoadStart={() => setLoading(true)}
          source={{uri: item?.url}}
          style={{height: 200, width: 200, marginBottom: 5}}
          resizeMode="cover"
          onLoad={() => setLoading(false)}>
          {loading && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: colors.appGray,
                flexDirection: 'row',
              }}>
              <LottieView
                style={{width: 500, height: 500, flex: 1}}
                source={require('src/assets/lottie-animation/image-loading.json')}
                autoPlay
                loop={true}
              />
            </View>
          )}
        </FastImage>
      </TouchableOpacity>
    ) : (
      <LottieView
        style={{height: 200, width: 200, marginBottom: 5}}
        // style={{width: 500, height: 500}}
        source={require('src/assets/lottie-animation/image-loading.json')}
        autoPlay
        loop={true}
      />
    )
  ) : (
    <>
      <TouchableOpacity
        onPress={() => downloadFile(item, item.url)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ShowFileType file={item} />
        <View>
          {item?.attachments?.name && (
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
                width: 120,
                paddingBottom: 5,
              }}>
              {item?.attachments?.name}
            </Text>
          )}
          <Text style={{paddingStart: 5, color: colors.appGray}}>
            {parseFloat(item?.attachments?.size / (1024 * 1024)).toFixed(2)} MB
          </Text>
        </View>
        {progressId === item?.id && progressLoading ? (
          <Progress.Circle
            indeterminate={progressLoading}
            size={30}
            color={colors.appViolet}
          />
        ) : (
          progressId === item?.id && (
            <Progress.Circle
              showsText={true}
              progress={progress}
              size={30}
              color={colors.appViolet}
              textStyle={{fontSize: 12, color: colors.appBlack}}
              // unfilledColor={colors.appViolet}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
              }}
              thickness={2}
            />
          )
        )}
      </TouchableOpacity>
      <View></View>
    </>
  );
};

export default ShowAttachment;
