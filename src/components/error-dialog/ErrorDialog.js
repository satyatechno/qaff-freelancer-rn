import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import LottieView from 'lottie-react-native';

class ErrorDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
        // backdropTransitionOutTiming={0}
        isVisible={this.props.modalVisible}
        animationIn="slideInUp"
        animationInTiming={300}
        // animationOut="slideOutDown"
        // animationOutTiming={300}
        // hasBackdrop={true}
        swipeDirection="down"
        backdropOpacity={0.5}
        onBackdropPress={() => this.props.onClose()}
        onSwipeComplete={() => this.props.onClose()}>
        <View style={styles.errorModalView}>
          <TouchableOpacity onPress={() => this.props.onClose()}>
            <Ionicons
              name="close-outline"
              size={30}
              color={colors.appGray}
              style={{alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
          <Text style={styles.errorModalText}>{this.props.title}</Text>

          <LottieView
            style={styles.errorModalImage}
            source={require('./lottie-animation/error.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  errorModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  errorModalText: {
    color: colors.appRed,
    fontSize: 18,
    fontFamily: fonts.primarySB,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  errorModalImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

ErrorDialog.propTypes = {
  title: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
