import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import styles from './AddExpertise.styles';

const AddExpertise = ({navigation, route, route: {params}}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.myReducer.userProfile);
  const loading = useSelector((state) => state.myReducer.loading);
  const [isNavigate, setIsNavigate] = useState(false);
  const {t} = useTranslation();
  useEffect(() => {
    if (loading === false && isNavigate) {
      setIsNavigate(false);
      navigation.navigate('ViewProfile');
    }
  }, [loading]);
  const onSubmit = () => {
    if (!params) {
      alert(t('addExpertise.selectCatAndSubCat'));
    } else {
      setIsNavigate(true);
      let data = {
        category_ids: [params?.categoryId, ...params?.subCategoryIds],
      };
      dispatch(LOADER(true));
      dispatch(UPDATE_PROFILE({data: data, modal: true}));
    }
  };
  //   console.log('loading', loading);
  // console.log('userProfile', JSON.stringify(userProfile, null, 2));

  return (
    <>
      <Header
        title={t('addExpertise.expertise')}
        backButton
        navigation={navigation}
        notificationButton={true}
      />
      <View style={{flex: 1}}>
        <Text style={styles.tellUsText}>{t('addExpertise.tellUs')}</Text>
        <Text style={styles.serviceText}>{t('addExpertise.mainService')}</Text>
        <TouchableOpacity
          style={styles.selectCategoryButton}
          onPress={() => navigation.navigate('SelectCategory')}>
          <Text style={styles.selectCategoryText}>
            {params?.categoryName
              ? params?.categoryName
              : t('addExpertise.selectCategory')}
          </Text>
          <Icon name="arrow-next" size={14} style={{marginTop: 3}} />
        </TouchableOpacity>

        <FlatList
          // style={{flex: 1}}
          data={params?.subCategoryNames || []}
          ListHeaderComponent={
            params?.jobCount && (
              <Text style={styles.selectedSkillsText}>
                {`${params?.jobCount} ${t('addExpertise.jobMatching')}`}
              </Text>
            )
          }
          renderItem={({item, index}) => (
            <View
              style={{
                paddingHorizontal: 10,
                color: colors.defaultWhite,
                backgroundColor: colors.appViolet,
                paddingVertical: 8,
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text style={styles.skillsText} key={index}>
                {item}
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <TouchableOpacity
          style={styles.submitButton}
          disabled={loading}
          onPress={onSubmit}>
          {!loading ? (
            <Text style={styles.submitText}>{t('addExpertise.submit')}</Text>
          ) : (
            <ActivityIndicator size={30} color={colors.defaultWhite} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddExpertise;
