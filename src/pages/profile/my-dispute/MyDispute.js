import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {FETCH_DISPUTE, FETCH_MORE_DISPUTE} from 'src/actions/dispute';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './MyDispute.styles';

const DisputeCard = ({item}) => {
  console.log('item====', JSON.stringify(item, null, 2));
  return (
    <TouchableOpacity onPress={() => {}} style={styles.card}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.titleText}>Dispute:</Text>
        <Text style={styles.serialText}>{item.dispute_serial}</Text>
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.titleText}>Contract:</Text>
        <Text style={styles.serialText}>{item.contract.contract_serial}</Text>
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.titleText}>Contract Title:</Text>
        <Text style={styles.serialText}>{item.contract.title}</Text>
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.titleText}>Freelancer:</Text>
        <Text style={styles.serialText}>
          {item.contract?.freelancer?.first_name +
            ' ' +
            item.contract?.freelancer?.last_name}
        </Text>
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.titleText}>Dispute amount:</Text>
        <Text style={styles.serialText}>{item.amount} SR</Text>
      </View>
    </TouchableOpacity>
  );
};

class MyDispute extends Component {
  state = {
    page: 1,
    onEndReachedCalledDuringMomentum: true,
  };
  componentDidMount() {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(FETCH_DISPUTE({page: 1}));
  }
  fetchMoredata(page1) {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_disputes_page === true) {
        this.props.dispatch(FETCH_MORE_DISPUTE({page: page1 + 1}));
        this.setState({page: page1 + 1});
      }
    }
  }
  render() {
    const {myDisputes, loading, has_more_disputes_page, t} = this.props;
    // console.log("Contracts ", this.props.myContracts)
    // console.log("Loading ", this.props.loading)
    return (
      <>
        <Header
          backButton={true}
          title={t('myDispute.myDispute')}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.skyBlue} />
          </View>
        ) : myDisputes.length === 0 ? (
          <View
           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
               style={{ width: 150,
                 height: 160,
                 alignSelf: 'center',}}
               source={require('src/assets/images/no-jobs.png')}
               resizeMode="contain"
             />
             <Text style={{fontSize: 16, color: colors.appGray, marginTop: 10, fontFamily: fonts.primary}}>{t('myDispute.noData')}</Text>
         </View>
        ) : (
          <FlatList
            data={myDisputes}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={index === myDisputes.length - 1 && {marginBottom: 30}}>
                <DisputeCard item={item} />
                {has_more_disputes_page && index === myDisputes?.length - 1 && (
                  <ActivityIndicator
                    color={colors.skyBlue}
                    size="large"
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() =>
              this.setState({onEndReachedCalledDuringMomentum: false})
            }
            onEndReached={() => {
              this.fetchMoredata(this.state.page);
            }}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  myDisputes: state.disputeReducer.myDisputes,
  has_more_disputes_page: state.disputeReducer.has_more_disputes_page,
});
export default connect(mapStateToProps)(withTranslation()(MyDispute));
