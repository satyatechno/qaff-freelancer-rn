import React from 'react';
import FastImage from 'react-native-fast-image';

const ShowFileType = ({file}) => {
  let str = file?.type?.split('/');
  return str[1]?.includes('doc') ? (
    <FastImage
      source={require('src/assets/images/document.png')}
      style={{height: 40, width: 40}}
      resizeMode="contain"
    />
  ) : str[1]?.includes('pdf') ? (
    <FastImage
      source={require('src/assets/images/pdf.png')}
      style={{height: 40, width: 40}}
      resizeMode="contain"
    />
  ) : file?.type?.includes('text/plain') ? (
    <FastImage
      source={require('src/assets/images/txt.png')}
      style={{height: 40, width: 40}}
      resizeMode="contain"
    />
  ) : (
    <FastImage
      source={require('src/assets/images/info.png')}
      style={{height: 40, width: 40}}
      resizeMode="contain"
    />
  );
};

export default ShowFileType;
