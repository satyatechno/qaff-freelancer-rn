import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './MembersPermissions.styles';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class MembersPermissions extends Component {
  render() {
    return (
      <>
        <Header
          title="Members Permissions"
          backButton={true}
          navigation={this.props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.card1}>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordText}>Current Plan</Text>
              </View>

              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>Freelancer Plus</Text>
                <Text style={styles.passwordDetailText}>
                  Choose a strong, unique password that’s at least 8 characters
                  long
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>
                    View or Edit Membership Plan
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>Available Connects</Text>
                <Text style={[styles.passwordSetText, {fontSize: 12}]}>23</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View Connects History</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 1,
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>Membership Connects</Text>
                <Text style={[styles.passwordSetText, {fontSize: 12}]}>
                  70 per month
                </Text>
                <Text style={styles.passwordDetailText}>
                  Any unused Connects at the end of your billing cycle will roll
                  over to the next month (up to 140).
                </Text>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>Membership Fee</Text>
                <Text style={[styles.passwordSetText, {fontSize: 12}]}>
                  $14.99 per month + Tax
                </Text>
              </View>
              <View style={{flex: 1, padding: 15}}>
                <Text style={styles.passwordSetText}>
                  Current Billing Cycle
                </Text>
                <Text style={[styles.passwordSetText, {fontSize: 12}]}>
                  Oct 16, 2020 — Nov 15, 2020
                </Text>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default MembersPermissions;
