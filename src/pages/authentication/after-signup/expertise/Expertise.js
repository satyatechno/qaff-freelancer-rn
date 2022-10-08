import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import Header from 'src/components/header/Header';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import styles from './Expertise.styles';
import translation from 'src/locale/i18n';
class Expertise extends React.Component {
  state = {
    loading: false,
  };
  onSubmit = () => {
    const {
      route: {params},
      navigation,
      userProfile,
    } = this.props;
    if (!params && !userProfile?.main_category) {
      alert(translation.t('asExpertise.pleaseSelectCategory'));
    } else if (
      userProfile?.main_category?.name?.length > 0 &&
      params === undefined
    ) {
      navigation.navigate('Education');
    } else {
      let data = {
        category_ids: [params?.categoryId, ...params?.subCategoryIds],
      };
      this.props.dispatch(LOADER(true));
      this.props.dispatch(
        UPDATE_PROFILE({
          data: data,
          modal: false,
          navigation: navigation.navigate('Education'),
        }),
      );
    }
  };
  render() {
    const {
      route: {params},
      navigation,
      userProfile,
      loading,
    } = this.props;
    const {onSubmit} = this;
    let reduxSubCategories = userProfile?.categories?.map(
      (subcategory) => subcategory.name,
    );
    console.log(
      'expertise Loading',
      userProfile?.main_category?.name?.length,
      params,
    );
    return (
      <>
        <Header
          title={translation.t('asExpertise.expertise')}
          backButton
          navigation={navigation}
        />
        <View style={{flex: 1}}>
          <Text style={styles.tellUsText}>
            {translation.t('asExpertise.aboutWork')}
          </Text>
          <Text style={styles.serviceText}>
            {translation.t('asExpertise.servicesOffer')}
          </Text>
          <TouchableOpacity
            style={styles.selectCategoryButton}
            onPress={() => navigation.navigate('SelectCategory')}>
            <Text style={styles.selectCategoryText}>
              {params?.categoryName
                ? params?.categoryName
                : userProfile?.main_category?.name
                ? userProfile?.main_category?.name
                : `${translation.t('asExpertise.selectCategory')}`}
            </Text>
            <Icon
              name={I18nManager.isRTL ? 'arrow-back' : 'arrow-next'}
              size={14}
              style={{marginTop: 3}}
            />
          </TouchableOpacity>

          <FlatList
            // style={{flex: 1}}
            data={params?.subCategoryNames || reduxSubCategories || []}
            ListHeaderComponent={
              params?.jobCount && (
                <Text style={styles.selectedSkillsText}>
                  {`${params?.jobCount} ${translation.t(
                    'asExpertise.jobMatching',
                  )}`}
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
            // style={
            //   !params && !userProfile?.main_category
            //     ? [styles.submitButton, {backgroundColor: colors.skyBlue}]
            //     : styles.submitButton
            // }
            style={styles.submitButton}
            disabled={loading}
            onPress={onSubmit}>
            {!loading ? (
              <Text style={styles.submitText}>
                {!params && userProfile?.main_category
                  ? `${translation.t('asExpertise.next')}`
                  : `${translation.t('asExpertise.submitAndNext')}`}
              </Text>
            ) : (
              <ActivityIndicator size={30} color={colors.defaultWhite} />
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userProfile: state.myReducer.userProfile,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(Expertise);
