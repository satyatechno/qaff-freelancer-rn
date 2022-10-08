import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Modal from 'react-native-modal';
import Proptypes from 'prop-types';
import LottieView from 'lottie-react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {useDispatch} from 'react-redux';
import {MODAL_VISIBLE} from 'src/actions/action';

const ConfirmationDialog = ({modalVisible, message, onClose}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(MODAL_VISIBLE({visible: false}));
    }, 2000);
  }, []);
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
        animationOutTiming={300}
        hasBackdrop={true}
        backdropOpacity={0.2}
        onBackdropPress={() => onClose}
        swipeDirection={['down', 'up', 'left', 'right']}
        onSwipeComplete={() => onClose()}
        useNativeDriver={true}>
        <TouchableHighlight
          underlayColor="none"
          style={styles.centeredView}
          onPress={() => onClose()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>

              <LottieView
                style={styles.confirmationImage}
                source={require('./lottie-animation/confirmation-new.json')}
                autoPlay
                loop
              />
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: fonts.primarySB,
    fontSize: 18,
    color: colors.appViolet,
  },
  confirmationImage: {
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
});

ConfirmationDialog.propTypes = {
  modalVisible: Proptypes.bool.isRequired,
  message: Proptypes.string.isRequired,
  onClose: Proptypes.func.isRequired,
};

export default ConfirmationDialog;
