import {NavigationContainer} from '@react-navigation/native';
import QB from 'quickblox-react-native-sdk';
import React, {Component} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {Freshchat, FreshchatConfig} from 'react-native-freshchat-sdk';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {MODAL_VISIBLE} from 'src/actions/action';
import ConfirmationDialog from 'src/components/confirmation-dialog/ConfirmationDialog';
import ErrorDialog from 'src/components/error-dialog/ErrorDialog';
import quickblox from 'src/QBConfig';
import RootNavigator from 'src/routes/RootStack';
import {isReadyRef, navigationRef} from 'src/utils/Navigation';

// import {EventRegister} from 'react-native-event-listeners';
// import crashlytics from '@react-native-firebase/crashlytics';
const devAndroidAppId = '7465c924-c23f-4a57-a069-0f152b4dc64c';
const liveAppId = '7391a3f5-f386-47b9-9021-25cfa6a1d161';
// const liveIOSAppId = '7391a3f5-f386-47b9-9021-25cfa6a1d161';

class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.init(liveAppId, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.enableSound(true);

    Platform.OS === 'ios' &&
      OneSignal.requestPermissions(
        (permissions = {
          alert: true,
          badge: true,
          sound: true,
        }),
      );
    // OneSignal.addEventListener('ids', this.onIds.bind(this));
    this.freshchatConfig = new FreshchatConfig(
      '849cf1ca-0ae1-4de7-9ecd-54d0d82b6e97',
      '7f04d821-1467-4265-bfd7-5fbb8928c1b2',
    );

    Freshchat.init(this.freshchatConfig);
  }

  quickbloxAppSetting = {
    appId: quickblox.appId,
    authKey: quickblox.authKey,
    authSecret: quickblox.authSecret,
    accountKey: quickblox.accountKey,
  };

  componentDidMount() {
    isReadyRef.current = false;
    // QB.settings
    //   .init(this.quickbloxAppSetting)
    //   .then((res) => {
    //     console.log('QuickBlox initialization successfull');
    //     QB.settings
    //       .initStreamManagement({
    //         autoReconnect: false,
    //         messageTimeout: 10,
    //       })
    //       .then((res) => {
    //         console.log('Stream established', res);
    //         QB.settings
    //           .enableAutoReconnect({enable: true})
    //           .then((res) => console.log('Quickblox auto reconnect enabled'))
    //           .catch((err) => console.error('Failed to auto reconnect'));
    //       })
    //       .catch((err) =>
    //         console.error('error while establishing stream', err),
    //       );
    //   })
    //   .catch((err) => {
    //     console.error('Quickblox initialization err', err);
    //   });
  }

  // onIds(device) {
  //   console.log('Device info: ', device);

  // }

  render() {
    return (
      <NavigationContainer
        fallback={<ActivityIndicator size="large" color="red" />}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <RootNavigator />
        {this.props.modal?.type === 1 && (
          <ConfirmationDialog
            message={this.props.modal?.message ? this.props.modal?.message : ''}
            modalVisible={
              this.props.modal?.visible ? this.props.modal.visible : false
            }
            onClose={() => {
              this.props.dispatch(
                MODAL_VISIBLE({
                  visible: false,
                  type: 1,
                  message: '',
                }),
              );
            }}
          />
        )}
        {this.props.modal?.type === 2 && (
          <ErrorDialog
            title={this.props.modal?.message ? this.props.modal?.message : ''}
            modalVisible={
              this.props.modal?.visible ? this.props.modal.visible : false
            }
            onClose={() => {
              this.props.dispatch(
                MODAL_VISIBLE({
                  visible: false,
                  type: 2,
                  message: '',
                }),
              );
            }}
          />
        )}
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  modal: state.myReducer.modal,
});
export default connect(mapStateToProps)(App);
