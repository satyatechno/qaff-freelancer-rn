import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './ContractCard.styles';
import moment from 'moment';
import {Icon} from 'src/Icon';
import {withTranslation} from 'react-i18next';

export class ContractCard extends Component {
  render() {
    const {id, title, budget, description, user, navigation, t} = this.props;
    return (
      <CustomButton
        handlePress={() => {
          navigation.navigate('ContractRoom', {contractId: id});
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.headingText}>{title}</Text>
              {/* <Icon name="options" size={20} color={colors.appViolet} /> */}
            </View>
            <View style={styles.experience}>
              <Text style={styles.experienceText}>SR {budget}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Icon name="profile" size={16} color={colors.appGray} />
                <Text style={styles.timeText}>
                  {t('contracts.hiredBy')} {user}
                </Text>
              </View>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.appGray1}} />
          <View style={styles.body}>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          </View>
        </View>
      </CustomButton>
    );
  }
}

export default withTranslation()(ContractCard);
