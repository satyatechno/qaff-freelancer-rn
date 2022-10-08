import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from 'src/components/button/CustomButton';
import {Icon} from 'src/Icon';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import styles from './Newsfeed.styles';

const Newsfeed = ({
  title,
  description,
  postedBy,
  time,
  location,
  budget,
  currency,
  handleApply,
  isSaved,
  handleSave,
  milestone,
  timeline,
  proposal,
  id,
  navigation,
}) => {
  const {t} = useTranslation();
  let newBudget = null;
  // currency === 'sar' ?
  newBudget = budget.sar;
  // : (newBudget = budget.usd);
  newBudget.from === 0
    ? (newBudget = `<${newBudget.to}`)
    : newBudget.to === null
    ? (newBudget = `>${newBudget.from}`)
    : (newBudget = `${newBudget.from}-${newBudget.to}`);
  return (
    <View style={styles.container}>
      <CustomButton
        handlePress={() =>
          navigation.navigate('ProjectDetails', {
            projectId: id,
          })
        }>
        <View style={styles.title_budgetContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.budget}>
            {
              // currency === 'sar' ?
              `SR ${newBudget}`
              // : `USD ${newBudget}`
            }
          </Text>
        </View>
        <View style={styles.experience_timeContainer}>
          <Text style={styles.time}>{moment.unix(time).fromNow()}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View>
            <Text style={styles.timeline}>{timeline?.title}</Text>
            <Text style={styles.budgetHeading}>
              {i18n.t('newsfeed.duration')}
            </Text>
          </View>
          {/* <Text
            style={{color: colors.appGray1, fontSize: 22, textAlign: 'center'}}>
            |
          </Text> */}
          <View>
            <Text style={styles.timeline}>{milestone.title}</Text>
            <Text style={styles.budgetHeading}>
              {i18n.t('newsfeed.milestones')}
            </Text>
          </View>
        </View>
        {/* <Text style={styles.postedBy}>{postedBy}</Text> */}
        {/* {location && (
          <View style={styles.locationContainer}>
            <Icon name="location" size={15} color={colors.appBlue} />
            <Text style={styles.loacationName}>{location}</Text>
          </View>
        )} */}

        <View style={styles.divider} />
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
        <CustomButton handlePress={handleApply}>
          <Text style={styles.more}>{description.length > 140 && 'more'}</Text>
        </CustomButton>
        <View style={styles.divider} />
      </CustomButton>
      <View style={styles.footer}>
        <CustomButton
          handlePress={handleSave}
          style={styles.footerInnerContainer}>
          {isSaved ? (
            <>
              <Text style={styles.saveText}>{t('jobs.saved')}</Text>
              <FontAwesome name="star" color={colors.skyBlue} size={15} />
            </>
          ) : (
            <>
              <Text style={styles.saveText}>{t('jobs.save')}</Text>
              <Icon name="star" color={colors.skyBlue} size={15} />
            </>
          )}
        </CustomButton>
        <Text style={styles.horizontalDivider} />
        <CustomButton
          disabled={proposal?.published_at?.length > 0}
          handlePress={handleApply}
          style={[styles.footerInnerContainer]}>
          <Text
            style={[
              styles.applyText,
              proposal?.published_at?.length > 0 && {color: colors.appGray},
            ]}>
            {proposal?.published_at?.length > 0
              ? t('jobs.applied')
              : t('jobs.apply')}
          </Text>
          <Icon
            name="tick"
            color={
              proposal?.published_at?.length > 0
                ? colors.appGray
                : colors.appGreen
            }
            size={15}
          />
        </CustomButton>
      </View>
    </View>
  );
};

export default Newsfeed;
