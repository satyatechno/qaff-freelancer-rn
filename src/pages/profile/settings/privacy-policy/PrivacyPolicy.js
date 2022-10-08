import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './PrivacyPolicy.style';

export class PrivacyPolicy extends Component {
  render() {
    return (
      <>
        <Header
          title="Privacy Policy"
          backButton={true}
          navigation={this.props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.container}>
            <View style={{}}>
              <Text style={styles.passwordText}>
                1. Information Collection{' '}
              </Text>
              <Text style={styles.passwordDetailText}>
                - Information You Provide to Us{'\n'}
                {'   '}- Personal Information{'\n'}
                {'   '}- Payment Information{'\n'}
                {'   '}- Identity Verification{'\n'}
                {'   '}- General Audience Service{'\n'}
                {'   '}- Non-Identifying Information{'\n'}
                {'   '} - Combination of Personal and Non-Identifying
                Information{'\n'}- Information Received from Third Parties{'\n'}
                - Information Collected Automatically{'\n'}
                {'   '}- Cookies{'\n'}
                {'   '}- Web Beacons{'\n'}
                {'   '}- Embedded Scripts
              </Text>
              <Text style={styles.passwordText}>2. Use of Information </Text>
              <Text style={styles.passwordText}>3. Data Retention </Text>
              <Text style={styles.passwordText}>
                4. Information Sharing and Disclosure{' '}
              </Text>
              <Text style={styles.passwordDetailText}>
                - Information about Freelancers Shared with Clients and Agencies
                or Teams{'\n'}- Service Providers{'\n'}- What Happens if You
                Agree to Receive Information from Third Parties or Request that
                We Share Your Information{'\n'}- Legal and Investigative
                Purposes{'\n'}- Internal and Business Transfers{'\n'}-
                Sweepstakes, Contests, and Promotions
              </Text>
              <Text style={styles.passwordText}>
                5. Third Party Analytics Providers, Ad Servers and Similar Third
                Parties
              </Text>
            </View>
          </View>
          <View style={styles.card1}></View>
        </ScrollView>
      </>
    );
  }
}

export default PrivacyPolicy;
