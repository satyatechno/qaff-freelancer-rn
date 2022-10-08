import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import JobCategory from 'src/components/job-category/JobCategory';
import {fetchCategoriesWithJobCount} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './SelectCategory.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from 'src/components/header/Header';
import fonts from 'src/styles/texts/fonts';
import {useTranslation} from 'react-i18next';

const SelectCategory = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const {t} = useTranslation();
  useEffect(() => {
    fetchCategoriesWithJobCount()
      .then((res) => {
        // console.log('categories', JSON.stringify(res.data, null, 2));
        setCategories(res.data.data.categories);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, []);

  const ListEmptyComponent = () => {
    return (
      <ActivityIndicator
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        size="large"
        color={colors.skyBlue}
      />
    );
  };

  return (
    <>
      <Header
        title={t('selectCategory.selectCategory')}
        backButton
        navigation={navigation}
        notificationButton={true}
      />
      {/* <SafeAreaView> */}
      <FlatList
        style={{marginBottom: 50}}
        contentContainerStyle={{paddingBottom: 50, paddingTop: 5}}
        numColumns={2}
        columnWrapperStyle={{
          flexWrap: 'wrap',
          marginHorizontal: 10,
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{minHeight: '100%'}}
        data={categories}
        renderItem={({item}) => (
          <JobCategory
            key={item.id}
            id={item.id}
            imgUrl={item.image}
            txt={item.name}
            onPress={navigation}
            categoryData={item}
          />
        )}
        ListHeaderComponent={
          <Text style={{fontFamily: fonts.primarySB, fontSize: 16}}>
            {t('selectCategory.selectCategory')}
          </Text>
        }
        ListHeaderComponentStyle={{
          fontSize: 16,
          marginStart: 10,
          paddingTop: 20,
          paddingBottom: 5,
        }}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* </SafeAreaView> */}
    </>
  );
};

export default SelectCategory;
