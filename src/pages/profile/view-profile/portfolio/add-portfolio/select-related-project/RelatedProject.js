import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {fetchRelatedProjects} from 'src/services/http.service';
import i18n from 'src/locale/i18n';

class RelatedProjects extends Component {
  state = {
    page: 1,
    loading: false,
    projects: [],
  };
  componentDidMount() {
    this.setState({loading: true});
    fetchRelatedProjects({
      token: this.props.token,
    })
      .then((res) => {
        this.setState({loading: false});
        this.setState({projects: res.data.data.projects});
      })
      .catch((err) => {
        console.log('error Related project', err);
      });
  }

  render() {
    const {loading, projects} = this.state;

    return (
      <>
        <Header
          backButton={true}
          title={i18n.t('relatedProjects.relatedProjects')}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.skyBlue} />
          </View>
        ) : projects.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{i18n.t('relatedProjects.noData')}</Text>
          </View>
        ) : (
          <FlatList
            data={projects}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View style={index === projects.length - 1 && {marginBottom: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(
                      this.props.route?.params?.screen,
                      {project: item},
                    );
                  }}
                  style={{
                    backgroundColor: colors.defaultWhite,
                    padding: 10,
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.skyBlue,
                      fontFamily: fonts.primarySB,
                      textAlign: 'left',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.skyBlue,
                      fontFamily: fonts.primarySB,
                      textAlign: 'left',
                    }}>
                    {item.project_serial}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(RelatedProjects);
