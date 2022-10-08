import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './NotificationSettings.styles';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {Icon} from 'src/Icon';

export class NotificationSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      selectedData: [],
    };
  }
  SECTIONS = [
    {
      id: 0,
      title: 'show notification for',
      data: [
        {
          id: 0,
          name: 'All Activity',
          tag: 'newest',
        },
        {
          id: 1,
          name: 'Important Activity only',
          tag: 'oldest',
        },
      ],
    },
  ];
  _renderHeader = (section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>{section.title}</Text>
        {this.state.selectedData.map((x, i) => {
          return (
            x.id === section.data.id && (
              <Text
                style={{
                  marginEnd: 10,
                  textAlignVertical: 'center',
                  color: colors.appGray,
                }}
                key={i}>
                {x.name}
              </Text>
            )
          );
        })}
        {this.state.activeSections[0] === section.id ? (
          <Ionicons
            name="chevron-down-outline"
            size={16}
            color={colors.appViolet}
          />
        ) : (
          <Ionicons name="chevron-forward" size={16} color={colors.appViolet} />
        )}
      </View>
    );
  };

  _renderContent = (section) => {
    // console.log('con', data);
    return (
      //  <View style={{}}>
      //    <Text>{section.da}</Text>
      //  </View>
      <View style={styles.content}>
        <RadioGroup data={section} onSelect={this.handleRadioSelect} />
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
  };

  handleRadioSelect = (item, id) => {
    this.setState({selectedData: [...this.state.selectedData, item]});
    console.log('dummy', item);
    if (this.state.selectedData.find((x) => x.id === item.id)) {
      let dummy = this.state.selectedData.filter((y) => y.id !== item.id);
      dummy.push(item);
      this.setState({selectedData: dummy});
    }
  };

  render() {
    return (
      <>
        <Header
          title="Notification Settings"
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
                <Text style={[styles.passwordText, {color: colors.skyBlue}]}>
                  {' '}
                  Messages
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                }}>
                <Text style={styles.passwordText}>Desktop </Text>
              </View>
              <View style={{padding: 15, paddingTop: 0}}>
                <View style={{flex: 1}}>
                  <Text style={styles.passwordSetText}>
                    Show notifications for:
                  </Text>
                  <Accordion
                    sections={this.SECTIONS}
                    activeSections={this.state.activeSections}
                    // renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                  />
                </View>
              </View>
            </View>
            <View style={styles.card1}>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.passwordText}>
                    Two-step verification{' '}
                  </Text>
                  <Icon name="settings" color={colors.appGray} size={20} />
                </View>
                <Text style={styles.passwordDetailText}>
                  Help project your account by enablingextra layers of securyty.
                </Text>
              </View>

              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>
                  Authenticator verification
                </Text>
                <Text style={styles.passwordDetailText}>
                  Enter a code provided by your authenticatio app along with
                  your password.
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Enable</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.appGray1,
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.passwordSetText}>
                  Text message verification
                </Text>
                <Text style={styles.passwordDetailText}>
                  Receive a six digit code by text message to enter along with
                  your password.
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Enable</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginTop: 15,
                }}>
                <Text style={styles.passwordSetText}>Sequrity question</Text>
                <Icon name="project" color={colors.appGray} size={18} />
              </View>
              <View style={{flexDirection: 'row', padding: 15}}>
                <Ionicons
                  name="checkmark"
                  size={23}
                  color={colors.defaultWhite}
                  style={styles.checkIcon}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.passwordSetText}>Enabled</Text>
                  <Text style={styles.passwordDetailText}>
                    Confirm your adentity with a question only you know answer
                    to.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default NotificationSettings;
