import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import styles from './ProposalCard.styles';
import moment from 'moment';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {withTranslation} from 'react-i18next';

export class ProposalCard extends Component {
  render() {
    const {item, navigation, isLoading} = this.props;
    // console.log('ff', JSON.stringify(item, null, 2));
    return (
      <CustomButton
        handlePress={() => {
          navigation.navigate('ProposalDetails', {id: item?.id});
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.headingText}>{item?.project?.title}</Text>
            </View>

            <View style={styles.experience}>
              <Text style={styles.experienceText}>
                {this.props.t('proposals.received')}{' '}
                {moment.unix(item?.project?.published_at).format('ll')}
              </Text>

              <Text style={styles.timeText}>
                {item.published_at && moment.unix(item?.published_at).fromNow()}
              </Text>
            </View>
          </View>

          <View style={{height: 1, backgroundColor: colors.appGray1}} />
          <View style={styles.body}>
            <Text style={styles.description} numberOfLines={3}>
              {item?.project?.description}
              {/* {item?.project.description.length > 150 &&
                                <CustomButton
                                    handlePress={() => { alert("Coming Soon...") }}
                                >
                                    <Text style={styles.moreText}> more...</Text>
                                </CustomButton>} */}
            </Text>
          </View>
        </View>
      </CustomButton>
    );
  }
}

export default withTranslation()(ProposalCard);
