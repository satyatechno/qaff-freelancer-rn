import React, {Component} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './PasswordInput.styles';
import PropTypes from 'prop-types';
export class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
    };
  }
  render() {
    const {isPasswordVisible} = this.state;
    const {
      style,
      value,
      handleChange,
      setKey,
      isClass,
      onFocus,
      onEndEditing,
      inputStyle,
    } = this.props;
    return (
      <View style={[styles.inputContainer, style]}>
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={
            isClass ? handleChange : (text) => handleChange(setKey, text)
          }
          autoCapitalize="none"
          onFocus={onFocus}
          onEndEditing={onEndEditing}
        />
        <TouchableOpacity
          onPress={() =>
            this.setState({isPasswordVisible: !isPasswordVisible})
          }>
          <Ionicons
            name={!isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setKey: PropTypes.func,
};

export default PasswordInput;
