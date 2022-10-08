import React, {Component} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import WebView from 'react-native-webview';
import colors from 'src/styles/texts/colors';
import {socialAuthApi, socialLogin} from 'src/services/http.service';
import {StackActions} from '@react-navigation/routers';

class LinkedinWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.webViewRef = React.createRef();
  }

  componentDidMount() {
    let clientId = '867z0ugoe2doe2';
    let redirectUrl = `https://qaff.com/linkedin`;
    let oauthUrl =
      'https://linkedin.com/oauth/v2/authorization?response_type=code';
    let scope = 'r_liteprofile%20r_emailaddress';
    let state = '123456';
    this.setState({
      url: `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`,
    });
  }

  handleWebViewNavigationStateChange = async (newNavState) => {
    const {url} = newNavState;
    console.log('USRL', url);
    const parameters = this.getCodeFromWindowURL(url);
    console.log('parameters', JSON.stringify(parameters, null, 2));
    if (parameters?.code) {
      let {code, type, oauth_token, oauth_verifier} = parameters;
      // if (Platform.OS === 'android') {
      //   this.webViewRef.clearCache();

      //   this.webViewRef.clearHistory();
      // }
      this.webViewRef.stopLoading();
      // this.props.navigation.dispatch(
      //   StackActions.replace('Authentication', {
      //     screen: 'Login',
      //     params: {
      //       code: code,
      //       type: 'linkedin',
      //     },
      //   }),
      // );
      this.props.navigation?.navigate(
        this.props?.route?.params?.navigationScreen,
        {
          code: code,
          type: 'linkedin',
        },
      );
      //  this.getUserCredentials(code, "linkedin")
      // alert('Already logged in ')
    }
    // if (url.includes(`login-success`)) {
    //   let {code, type, oauth_token, oauth_verifier} = code
    //   console.log('success', url);

    //  this.getUserUserCredentials(code, type, oauth_token, oauth_verifier)

    //   switch (code.reference_type) {
    //     case 'contract_payment':
    //       setTimeout(() => {
    //         // this.webview.stopLoading();
    //         this.props.dispatch(FETCH_PROJECTS({type: 'progress', page: 1}));
    //         this.props.navigation.replace('ContractDetails', {
    //           contractId: code?.reference_id,
    //         });
    //       }, 1000);
    //       break;
    //     default:
    //       console.log('abccc');
    //   }
    // }
  };

  getCodeFromWindowURL = (url) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    console.log('dsfsfffsdada', params);
    // return obj;
    return params;
  };

  // getUserCredentials = (code, type) => {
  //   // setFullLoader(true);

  //   const {navigation} = this.props;
  //   socialAuthApi({
  //     authType: type,
  //     code: code,
  //   })
  //     .then((res) => {
  //       console.log('authResponse', res?.data);
  //       const {
  //         id,
  //         email,
  //         avatar_original,
  //         first_name,
  //         last_name,
  //       } = res?.data?.data?.user;
  //       socialLogin({
  //         data: {
  //           provider_user_id: id,
  //           email,
  //           avatar_original,
  //           first_name,
  //           last_name,
  //           account_type: 'freelancer',
  //         },
  //         name: 'linkedin',
  //       })
  //         .then((response) => {
  //           console.log('Linkedin login successfull', response);

  //           if (response.data.data?.account_security.length > 0) {
  //             if (
  //               response.data.data?.account_security.find(
  //                 (x) => x.name === 'two_step_otp_text',
  //               )
  //             ) {
  //               navigation.replace('TwoStepWithOtp', {
  //                 token: response.data.data.token,
  //                 isFinalStep:
  //                   response.data.data?.account_security.length === 1,
  //                 account_security: response.data.data?.account_security,
  //               });
  //             } else if (
  //               response.data.data?.account_security.find(
  //                 (x) => x.name === 'two_step_security_question',
  //               )
  //             ) {
  //               navigation.replace('SecurityQuestion', {
  //                 token: response.data.data.token,
  //                 isFinalStep:
  //                   response.data.data?.account_security.length === 1,
  //                 question:
  //                   response.data.data?.account_security[
  //                     response.data.data?.account_security.findIndex(
  //                       (x) => x.name === 'two_step_security_question',
  //                     )
  //                   ].question,
  //               });
  //             }
  //           } else {
  //             dispatch(USER_ACTION(response.data.data));
  //             dispatch(FETCH_PROFILE());
  //             dispatch(FETCH_NOTIFICATIONS());
  //             // dispatch(UNREAD_NOTIFICATION(response.data.data.unread_notificaiton_count))
  //             navigation.dispatch(StackActions.replace('Tabs'));
  //           }
  //         })
  //         .catch((err) => {
  //           if (
  //             err?.response?.data?.data
  //               ?.account_found_nd_profile_not_created === true
  //           ) {
  //             navigation.replace('CreateProfile', {
  //               client_email:
  //                 err?.response?.data?.data?.employer_profile?.email,
  //               client_first_name:
  //                 err?.response?.data?.data?.employer_profile?.first_name,
  //               client_last_name:
  //                 err?.response?.data?.data?.employer_profile?.last_name,
  //               token: err?.response?.data?.data?.token,
  //             });
  //           } else if (
  //             err?.response?.data?.data?.registration_required === true
  //           ) {
  //             navigation.replace('SocialSignup', {
  //               user_first_name: first_name,
  //               user_last_name: last_name,
  //               userEmail: email,
  //               provider_user_id: id,
  //               site_name: 'linkedin',
  //             });
  //           } else {
  //             console.error('api login linkedin error', err?.response?.data);
  //           }
  //         });
  //     })
  //     .catch((err) => {
  //       // setFullLoader(false);
  //       console.log('linkedin auth err', err);
  //     });
  // };

  render() {
    const {url} = this.state;
    return (
      <WebView
        incognito={true}
        ref={(e) => (this.webViewRef = e)}
        source={{uri: url}}
        //   javaScriptEnabled={true}
        //   domStorageEnabled={true}
        startInLoadingState={true}
        // onShouldStartLoadWithRequest={this.handleWebViewNavigationStateChange}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        renderLoading={() => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={30} color={colors.skyBlue} />
          </View>
        )}
      />
    );
  }
}

export default LinkedinWebView;
