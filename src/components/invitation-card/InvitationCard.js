import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './InvitationCard.styles';
import moment from 'moment';
import colors from 'src/styles/texts/colors';
import i18n from 'src/locale/i18n';
const InvitationCard = ({item, navigation, invitationExpiryDays}) => {
  console.log(';Invitation', JSON.stringify(item, null, 2));
  const expiryDays = moment
    .unix(item?.created_at)
    .add(invitationExpiryDays, 'days')
    .diff(moment(), 'days');
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('InvitationDetails', {
          id: item?.id,
        })
      }>
      <View style={styles.card}>
        <Text style={styles.title}>{item?.project?.title}</Text>
        <Text style={styles.date}>
          {moment.unix(item?.created_at).format('DD/MM/YYYY')}
        </Text>
        {expiryDays > 1 && (
          <Text
            style={{
              color: colors.appGray,
              fontSize: 12,
              paddingTop: 2,
            }}>{`${expiryDays} ${i18n.t('invitationCard.daysLeft')}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default InvitationCard;
