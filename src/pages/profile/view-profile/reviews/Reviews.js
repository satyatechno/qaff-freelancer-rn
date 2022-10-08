import moment from 'moment';
import React from 'react';
import {View, Text} from 'react-native';
import {Rating} from 'react-native-ratings';
import colors from 'src/styles/texts/colors';
import styles from './Reviews.styles';
const Reviews = ({data}) => {
  console.log('ggggg', data);
  return (
    <>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewContainer_Top}>
          <Text style={styles.reviewerName}>{data?.reviewed_by?.name}</Text>
          <Text style={styles.reviewTime}>
            {moment.unix(data?.created_at).fromNow()}
          </Text>
        </View>
        <View style={styles.reviewRatingContainer}>
          <Rating
            ratingCount={5}
            imageSize={12}
            startingValue={parseFloat(data?.overall_rating)}
            readonly
          />
          <Text style={styles.ratingText}>{data?.overall_rating}</Text>
        </View>
        <Text style={styles.reviewDescription}>{data?.review}</Text>
      </View>
    </>
  );
};

export default Reviews;
