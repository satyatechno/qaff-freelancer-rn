import React, {Component} from 'react';
import {Text, View, Image, FlatList, ActivityIndicator} from 'react-native';
import styles from './PortfolioList.styles';
import {connect} from 'react-redux';
import {fetchPortfolioList} from 'src/services/http.service';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import CustomButton from 'src/components/button/CustomButton';
import {Icon} from 'src/Icon';
import {FETCH_PORTFOLIO, LOADER} from 'src/actions/action';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import fonts from 'src/styles/texts/fonts';

class PortfolioList extends Component {
  constructor(props) {
    super();
    this.state = {
      isRefreshing: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(FETCH_PORTFOLIO());
  }
  onRefresh = async () => {
    this.setState({isRefreshing: true});
    await this.props.dispatch(LOADER(true));
    await this.props.dispatch(FETCH_PORTFOLIO());
    this.setState({isRefreshing: false});
  };
  render() {
    const {t} = this.props;

    return (
      <>
        <Header
          title={t('portfolioList.portfolio')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
          searchButton={true}
        />
        <View style={styles.container}>
          {this.props.loading ? (
            <ActivityIndicator
              color={colors.skyBlue}
              size="large"
              style={{flex: 1}}
            />
          ) : this.props.portfolioData?.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FastImage
                style={{width: 150, height: 160, alignSelf: 'center'}}
                source={require('src/assets/images/no-jobs.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.appGray,
                  marginTop: 10,
                  fontFamily: fonts.primary,
                }}>
                {t('portfolioList.noData')}
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.props.portfolioData}
              initialNumToRender={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.portfolioContainer}>
                    <CustomButton
                      handlePress={() =>
                        this.props.navigation.navigate('PortfolioDetails', {
                          edit: this.props.route?.params?.edit,
                          portfolioId: item?.id,
                        })
                      }>
                      <View style={styles.portfolioInfoContainer}>
                        <Text style={styles.title}>{item.title} </Text>
                        <Text style={styles.date}>{item.date}</Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: colors.appGray1,
                          paddingBottom: 10,
                        }}>
                        {item?.related_project && (
                          <Text
                            style={{
                              marginHorizontal: 10,
                              color: colors.appGray,
                            }}>
                            {t('portfolioList.relatedProject')} :{' '}
                            {`${item?.related_project?.title}-${item?.related_project?.project_serial}`}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={{padding: 10}}>
                        <FastImage
                          style={styles.image}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          borderTopColor: colors.appGray1,
                          borderTopWidth: 1,
                        }}>
                        {item?.skills?.map((skill, i) => (
                          <Text
                            key={i}
                            style={{
                              backgroundColor: colors.appViolet,
                              padding: 5,
                              margin: 5,
                              borderRadius: 5,
                              color: colors.defaultWhite,
                            }}>
                            {skill}
                          </Text>
                        ))}
                      </View>
                    </CustomButton>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          )}
          <View
            style={{position: 'absolute', width: '100%', bottom: 20, end: 20}}>
            <CustomButton
              style={styles.addButton}
              handlePress={() => {
                this.props.navigation.navigate('AddPortfolio');
              }}>
              <Icon name="add" size={25} color={colors.defaultWhite} />
            </CustomButton>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  portfolioData: state.myReducer.portfolioData,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(PortfolioList));
