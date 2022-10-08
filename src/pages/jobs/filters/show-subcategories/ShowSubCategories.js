import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import i18n from 'src/locale/i18n';
import {fetchSubCategories, fetchUserSettings} from 'src/services/http.service';
import styles from './ShowSubCategories.styles';

class ShowSubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: [],
    };
  }
  componentDidMount() {
    this.getSubCategories(this.props.route?.params?.id);
  }
  getSubCategories = (id) => {
    fetchSubCategories(id)
      .then((res) => {
        this.setState({subCategories: res.data.data?.sub_categories?.data});
      })
      .catch((err) => {
        console.error('Couldnot fetch sub categories', err);
      });
  };
  handleRadioSelect = (item) => {
    console.log('item', item);
    this.props.navigation.navigate('Filter', {
      subCategory: item,
    });
  };
  render() {
    const {subCategories} = this.state;
    return (
      <>
        <Header
          title="Filter"
          backButton={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <Text style={styles.label}>
            {i18n.t('showSubCategories.selectSub')}
          </Text>
          <RadioGroup
            data={{id: 5, data: [...subCategories]}}
            onSelect={this.handleRadioSelect}
          />
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(ShowSubCategories);
