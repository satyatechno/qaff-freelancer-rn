import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomButton from 'src/components/button/CustomButton';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import styles from './PersonalInfo.styles';
import Rating from 'react-native-star-rating';
import fonts from 'src/styles/texts/fonts';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PersonalInfo = ({
  profileImage,
  coverImage,
  title,
  location,
  name,
  rating,
  gender,
  navigation,
  handleEdit,
  showMenuFunction, 
  showMenu
}) => {
  const [editMenu, setEditMenu] = useState(false);
  const {t} = useTranslation();
  console.log('showm', showMenu);
  return (
    <View>
      <View style={styles.editContainer}>
        <CustomButton
          style={{alignSelf: 'flex-end'}}
          handlePress={() => {
            setEditMenu(!editMenu)
          }}>
          <Icon
            name="edit"
            color={colors.defaultWhite}
            size={20}
            style={[
              styles.editIcon,
              gender === 'female' && {backgroundColor: colors.appYellow},
            ]}
          />
        </CustomButton>
        {editMenu && (
          <View style={styles.editMenuContainer}>
            <CustomButton
              handlePress={() => {

               setEditMenu(!editMenu); handleEdit();
              }}>
              <Text style={styles.editMenuText}>
                {t('viewProfile.editProfile')}
              </Text>
            </CustomButton>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.appGray1,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setEditMenu(!editMenu)
                navigation.navigate('EditPersonalInfo');
              }}
              style={{zIndex: 99}}>
              <Text style={styles.editMenuText}>
                {t('viewProfile.editPersonalInfo')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    <TouchableWithoutFeedback onPress={() => setEditMenu(false)}>
    <ImageBackground
      style={styles.profileBackground}
      source={
        coverImage ? {uri: coverImage} : require('./images/coverimage.png')
      }
      defaultSource={require('src/assets/images/imagePlaceHolder.png')}>
      

      <View style={styles.profileContainer}>
        {profileImage ? (
          <FastImage
            source={{uri: profileImage}}
            style={styles.profileImage}
            defaultSource={require('src/assets/images/imagePlaceHolder.png')}
          />
        ) : (
          <FastImage
            source={
              gender === 'female'
                ? require('./images/woman.png')
                : require('./images/man.png')
            }
            style={styles.profileImage}
          />
        )}
        <Text
          style={[
            styles.freelancerName,
            coverImage && {color: colors.defaultWhite, textShadowRadius: 2},
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.freelancerInfo,
            coverImage && {color: colors.defaultWhite, textShadowRadius: 2},
          ]}>
          {title}
        </Text>
        {location ? (
          <View style={styles.locationContainer}>
            <Icon
              name="location"
              color={coverImage ? colors.defaultWhite : colors.appGray}
              size={14}
              style={{textShadowRadius: 2}}
            />
            <Text
              style={[
                styles.locationName,
                coverImage && {color: colors.defaultWhite, textShadowRadius: 2},
              ]}>
              {location}
            </Text>
          </View>
        ) : null}
        <View style={styles.ratingContainer}>
          <Rating
            rating={rating ? parseFloat(rating) : 0}
            selectedStar={(rating) => {
              // this.onStarRatingPress(rating);
            }}
            starSize={14}
            fullStarColor={colors.appYellow}
            emptyStarColor={colors.appYellow}
            disabled={true}
          />
          <Text
            style={[
              styles.profileRatingText,
              coverImage && {color: colors.defaultWhite, textShadowRadius: 2},
            ]}>
            {rating}
          </Text>
        </View>
      </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
    </View>
  );
};

export default PersonalInfo;
