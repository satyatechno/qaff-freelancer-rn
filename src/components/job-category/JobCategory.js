import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './JobCategory.styles';

const JobCategory = ({imgUrl, txt, onPress, id, edit, categoryData}) => {
  return (
    <View style={styles.container}>
      <View style={styles.jobInfoContainer}>
        <TouchableOpacity
          onPress={() =>
            onPress.navigate('SelectSubCategory', {
              data: categoryData,
            })
          }>
          <FastImage style={styles.jobInfoImage} source={{uri: imgUrl}} />
          <Text style={styles.jobInfoText}>{txt}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCategory;
