import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  I18nManager,
  Pressable,
} from 'react-native';

import styles from './Header.styles';
import colors from 'src/styles/texts/colors';
import {Icon} from 'src/Icon';
import PropTypes from 'prop-types';
// import NotificationComponent from '../notification-component/NotificationComponent';
import {connect} from 'react-redux';
import NetInfoStatus from '../net-info-status/NetInfoStatus';
import * as Animatable from 'react-native-animatable';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
    };
  }
  toggleNotification = () => {
    this.props.navigation.navigate('NotificationComponent');
  };
  render() {
    const {
      logo,
      backButton,

      cancelButton,
      title,

      searchButton,
      notificationButton,
      handleTextChange,
      navigation,
      headerRightImage,
      onSearch,
      t,
      style,
      isOnline,
    } = this.props;
    const {isSearchVisible} = this.state;

    return (
      <>
        <StatusBar backgroundColor={colors.skyBlue} />
        <SafeAreaView style={[styles.container, style && {...style}]}>
          <View style={styles.headerLeft}>
            {logo && (
              <FastImage
                style={styles.logo}
                source={require('./images/logo1.png')}
              />
            )}
            {backButton && (
              <Pressable hitSlop={30} onPress={() => navigation?.goBack()}>
                <Icon
                  name={I18nManager.isRTL ? 'arrow-next' : 'arrow-back'}
                  color={colors.defaultWhite}
                  size={15}
                  style={{alignSelf: 'flex-start'}}
                />
              </Pressable>
            )}
            {cancelButton && (
              <Pressable hitSlop={30} onPress={() => navigation?.goBack()}>
                <Icon name="close" color={colors.defaultWhite} size={20} />
              </Pressable>
            )}
          </View>
          <View style={styles.headerCenter}>
            {title && !isSearchVisible && (
              <Animatable.Text
                style={styles.headerTitle}
                useNativeDriver={true}
                animation="slideInLeft"
                duration={200}>
                {title}
              </Animatable.Text>
            )}
            {searchButton && isSearchVisible && (
              <Animatable.View
                animation="slideInRight"
                easing="ease-out"
                useNativeDriver={true}
                duration={200}>
                <TextInput
                  style={styles.input}
                  autoFocus={isSearchVisible}
                  placeholder={t('header.search')}
                  placeholderTextColor={colors.defaultWhite}
                  autoCapitalize="none"
                  onChangeText={(text) => onSearch && onSearch(text)}
                  // onEndEditing={(event) =>
                  //   onSearch && onSearch(event.nativeEvent.text)
                  // }
                />
              </Animatable.View>
            )}
          </View>
          <View style={styles.headerRight}>
            {searchButton && (
              <TouchableOpacity
                onPress={() =>
                  this.setState({isSearchVisible: !this.state.isSearchVisible})
                }>
                <Icon name="search" color={colors.defaultWhite} size={20} />
              </TouchableOpacity>
            )}
            {notificationButton && (
              <TouchableOpacity onPress={() => this.toggleNotification()}>
                <Icon
                  name="notifications"
                  color={colors.defaultWhite}
                  size={22}
                  style={{marginStart: 20}}
                />
                {this.props.unReadNotification > 0 && (
                  <View
                    style={{
                      backgroundColor: colors.defaultWhite,
                      borderRadius: 10,
                      height: 17,
                      width: 17,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      end: 8,
                      top: -4,
                    }}>
                    <Text
                      style={{
                        color: colors.skyBlue,
                        fontSize:
                          this.props.unReadNotification < 10
                            ? 12
                            : this.props.unReadNotification > 9 &&
                              this.props.unReadNotification < 100
                            ? 10
                            : 8,
                        textAlign: 'center',
                      }}>
                      {this.props.unReadNotification}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}

            {headerRightImage !== undefined && (
              <>
                <FastImage
                  source={
                    headerRightImage === undefined ||
                    headerRightImage === null ||
                    headerRightImage === ''
                      ? require('src/assets/images/avator.png')
                      : {uri: headerRightImage}
                  }
                  style={styles.headerRightImage}
                />
                <Ionicons
                  name="ellipse"
                  size={12}
                  color={isOnline ? colors.appGreen : colors.appRed}
                  style={{position: 'absolute', bottom: -2, end: 0, zIndex: 10}}
                />
              </>
            )}
          </View>
        </SafeAreaView>
        <NetInfoStatus />
      </>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.bool,
  backButton: PropTypes.bool,

  cancelButton: PropTypes.bool,
  title: PropTypes.string,

  searchButton: PropTypes.bool,
  notificationButton: PropTypes.bool,
  handleTextChange: PropTypes.func,
  headerRightImage: PropTypes.string || PropTypes.object,
};

Header.defaultProps = {
  title: 'Title',
};
const mapStateToProps = (state) => ({
  unReadNotification: state.notificationReducer.unReadNotification,
});

export default connect(mapStateToProps)(withTranslation()(Header));
