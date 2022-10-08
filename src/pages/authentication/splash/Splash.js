import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import styles from './Splash.styles';
// import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {isReadyRef, navigationRef} from 'src/utils/Navigation';
import colors from 'src/styles/texts/colors';
import { LOADER } from 'src/actions/action';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationLoading: false,
    };
  }

  async componentDidMount() {
    this.props.dispatch(LOADER(false))
    this.setupNavigation();
  }
  setupNavigation = async (e) => {
    setTimeout(async () => {
      if (this.props.token) {
        this.setState({navigationLoading: false});

        this.props.navigation.dispatch(StackActions.replace('Tabs'));
      } else {
        let first = await AsyncStorage.getItem('FirstTimeLogin');
        console.log('first Time login', first);
        if (first) {
          this.props.navigation.dispatch(
            StackActions.replace('Authentication', {screen: 'Login'}),
          );
        } else {
          this.props.navigation.dispatch(
            StackActions.replace('Authentication', {screen: 'Introduction'}),
          );
        }
      }
    }, 2650);
  };

  componentWillUnmount() {
    this.setState({navigationLoading: false});
    clearTimeout();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <LottieView
            onLayout={() => this.setState({visible: true})}
            duration={2650}
            style={styles.logo}
            source={require('./lottie-animation/splash.json')}
            autoPlay
            loop={false}
            onAnimationFinish={(e) => {
              this.setState({navigationLoading: true});
            }}
          />
        </View>
        {this.state.navigationLoading && (
          <ActivityIndicator
            style={{position: 'absolute', bottom: 20}}
            size="small"
            color={colors.defaultWhite}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
});

export default connect(mapStateToProps)(Splash);
