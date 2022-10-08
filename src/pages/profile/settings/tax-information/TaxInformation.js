import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './TaxInformation.styles';
import colors from 'src/styles/texts/colors';
import {Icon} from 'src/Icon';

export class TaxInformation extends Component {
  render() {
    return (
      <>
        <Header
          title="Tax Infornation"
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordText}>Tax Residence </Text>
                <Icon name="project" color={colors.appGray} size={18} />
              </View>
              <View style={{padding: 15}}>
                <Text style={styles.passwordDetailText}>
                  This address will be displayed on the invoice sent to clients.
                </Text>
                <Text style={styles.passwordSetText}>Address</Text>
              </View>
            </View>
            <View style={styles.card1}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordText}>W-8BEN </Text>
                <Icon name="project" color={colors.appGray} size={18} />
              </View>
              <View style={{padding: 15}}>
                <Text style={styles.passwordDetailText}>
                  Before withdrawing funds, all non-U.S. persons must provide
                  their W-8BEN tax information.
                </Text>
                <Text style={styles.passwordSetText}>
                  Legal Name of Business
                </Text>
                <Text style={styles.passwordSetText}>Carolina Bennet</Text>
                <Text style={styles.passwordSetText}>
                  Federal Tax Classification
                </Text>
                <Text style={styles.passwordSetText}>N/A - Non-US</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default TaxInformation;
