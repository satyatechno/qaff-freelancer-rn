import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Checkbox from 'src/components/checkbox-group/CheckboxGroup';
import Header from 'src/components/header/Header';
import styles from './SelectSubCategory.styles';
import translation from  'src/locale/i18n'

class SelectSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.selectedCheckboxes = new Set();
    this.selectedCheckBoxIds = new Set();
    this.state = {
      answerNames: [],
      answerIds: [],
      jobCount: 0,
    };
  }

  // console.log('subcategory', JSON.stringify(route.params?.data, null, 2));

  toggleCheckbox = async (data, id) => {
    // console.log('dd', data.job_count);
    let temp = this.state.jobCount;
    if (this.selectedCheckboxes.has(data.name)) {
      this.selectedCheckboxes.delete(data.name);

      temp -= data.job_count;
      await this.setState({jobCount: temp});
    } else {
      temp += data.job_count;
      await this.setState({jobCount: temp});
      this.selectedCheckboxes.add(data.name);
    }
    if (this.selectedCheckBoxIds.has(data.id)) {
      this.selectedCheckBoxIds.delete(data.id);
    } else {
      this.selectedCheckBoxIds.add(data.id);
    }
    console.log('jobCount', this.state.jobCount);
    // for (const checkbox of this.selectedCheckboxes) {
    //   console.log('checkbox', checkbox);
    // }
    await this.setState({
      answerNames: [...this.selectedCheckboxes],
      answerIds: [...this.selectedCheckBoxIds],
    });
    // console.log('answers', this.state.answerNames, 'id', this.state.answerIds);
    // console.log('pollId', this.state.pollId);
  };

  listHeader = () => {
    return (
      <Text
        style={
          styles.listHeaderText
        }>{`${translation.t('asSelectSubCategory.whatType')} ${this.props?.route.params?.data.name} ${translation.t('asSelectSubCategory.doYouDo')}?`}</Text>
    );
  };

  onNext = () => {
    if (this.state.answerNames.length === 0) {
      alert(translation.t('asSelectSubCategory.pleaseSelectOneSub'));
    } else {
      this.props.navigation.navigate('Expertise', {
        categoryName: this.props?.route.params?.data.name,
        subCategoryIds: this.state.answerIds,
        subCategoryNames: this.state.answerNames,
        jobCount: this.state.jobCount,
        categoryId: this.props?.route.params?.data.id,
      });
    }
  };

  render() {
    return (
      <>
        <Header
          title={translation.t('asSelectSubCategory.selectSubCat')}
          backButton
          navigation={this.props.navigation}
        />
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            // flex: 0.5,
            // overflow: 'scroll',
          }}
          data={this.props.route.params?.data?.sub_categories}
          ListHeaderComponent={this.listHeader}
          // ListFooterComponent={this.listFooter}
          renderItem={({item, index}) => (
            <View style={{flex: 0.5}}>
              <Checkbox
                handleCheckboxChange={this.toggleCheckbox}
                data={item}
                id={item.id}
                key={item.id}
              />
            </View>
            // <Text>{`${item?.name} (${item?.job_count} Jobs)`}</Text>
          )}
          keyExtractor={(item) => item?.id.toString()}
        />
        <TouchableOpacity style={styles.nextButton} onPress={this.onNext}>
          <Text style={styles.nextButtonText}>{translation.t('asSelectSubCategory.next')}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

export default SelectSubCategory;
