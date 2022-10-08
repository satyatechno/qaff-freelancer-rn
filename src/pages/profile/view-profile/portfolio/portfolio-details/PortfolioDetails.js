import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './PortfolioDetails.styles';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/button/CustomButton';
import colors from 'src/styles/texts/colors';
import {
  DELETE_PORTFOLIO,
  FETCH_PORTFOLIO_DETAIL,
  LOADER,
} from 'src/actions/action';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

class PortfolioDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      PortfolioData: {
        images: [],
      },
      loading: true,
    };
  }
  componentDidMount() {
    // this.props.dispatch(LOADER(true));
    this.props.dispatch(
      FETCH_PORTFOLIO_DETAIL(this.props.route.params.portfolioId),
    );
  }
  onDelete = () => {
    Alert.alert(
      t('portfolioDetails.delete'),
      t('portfolioDetails.deleteConfirmation'),
      [
        {
          text: t('portfolioDetails.cancel'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: t('portfolioDetails.ok'),
          onPress: () => {
            this.props.dispatch(LOADER(true));
            this.props.dispatch(
              DELETE_PORTFOLIO({
                id: this.props.route.params.portfolioId,
              }),
            );
            this.props.navigation.navigate('PortfolioList');
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('portfolioDetails.portfolio')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <Container style={styles.container}>
          {this.props.loading ? (
            <ActivityIndicator
              color={colors.skyBlue}
              size="large"
              style={{flex: 1}}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.title_date_container}>
                <Text style={styles.title}>
                  {this.props.portfolioDetails?.title}
                </Text>
                <Text style={styles.date}>
                  {this.props.portfolioDetails?.date}
                </Text>
              </View>
              <Text style={styles.description}>
                {this.props.portfolioDetails?.description}
              </Text>
              {this.props.portfolioDetails?.skills?.length ? (
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    borderTopColor: colors.appGray1,
                    borderTopWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: colors.appGray,
                      textAlign: 'center',
                      margin: 5,
                      marginStart: 0,
                    }}>
                    Skills:
                  </Text>
                  {this.props.portfolioDetails?.skills?.map((item, i) => (
                    <Text
                      key={i}
                      style={{
                        backgroundColor: colors.appViolet,
                        padding: 5,
                        margin: 5,
                        borderRadius: 5,
                        color: colors.defaultWhite,
                      }}>
                      {item}
                    </Text>
                  ))}
                </View>
              ) : null}
              {this.props.portfolioDetails?.related_project && (
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: colors.appGray,
                  }}>
                  {t('portfolioDetails.relatedProject')}{' '}
                  {`${this.props.portfolioDetails?.related_project?.title}-${this.props.portfolioDetails?.related_project?.project_serial}`}
                </Text>
              )}
              {this.props.portfolioDetails?.images.map((item) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ImageViewer', {
                      uri: this.props.portfolioDetails?.images,
                      id: item?.id,
                    })
                  }
                  key={item.id.toString()}>
                  <FastImage
                    style={styles.main_image}
                    source={{uri: item.path}}
                  />
                </TouchableOpacity>
              ))}

              {this.props.route.params.edit && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <CustomButton
                    mode={1}
                    style={{
                      marginVertical: 10,
                      width: 100,
                      backgroundColor: colors.appRed,
                    }}
                    handlePress={() => {
                      this.onDelete();
                    }}>
                    <Text style={styles.buttonText}>
                      {t('portfolioDetails.delete')}
                    </Text>
                  </CustomButton>
                  <CustomButton
                    mode={1}
                    style={{
                      marginVertical: 10,
                      width: 100,
                      backgroundColor: colors.appGreen,
                    }}
                    handlePress={() => {
                      this.props.navigation.navigate('EditPortfolio', {
                        data: this.props?.portfolioDetails,
                      });
                    }}>
                    <Text style={styles.buttonText}>
                      {t('portfolioDetails.edit')}
                    </Text>
                  </CustomButton>
                </View>
              )}
            </ScrollView>
          )}
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  portfolioDetails: state.myReducer.portfolioDetails,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(PortfolioDetails));
