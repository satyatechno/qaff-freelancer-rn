import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './OfferCard.styles';
import moment from 'moment';
import colors from 'src/styles/texts/colors';
import i18n from 'src/locale/i18n';

const OfferCard = ({item, navigation, statistics}) => {
  console.log(';offer', JSON.stringify(item, null, 2));
  const expiryDays = moment
    .unix(item?.created_at)
    .add(statistics?.offer_expiry_time, 'days')
    .diff(moment(), 'days');
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('OfferDetails', {
          data: item,
          statistics,
        });
      }}>
      <View style={styles.card}>
        <Text style={styles.title}>{item?.project?.title}</Text>
        <Text style={styles.description}>{item?.project?.description}</Text>

        <Text style={styles.date}>
          {moment.unix(item?.created_at).format('DD/MM/YYYY')}
        </Text>
        {expiryDays > 1 && (
          <Text
            style={{
              color: colors.appGray,
              fontSize: 12,
              paddingTop: 2,
            }}>{`${expiryDays} ${i18n.t('offerCard.daysLeft')}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OfferCard;
