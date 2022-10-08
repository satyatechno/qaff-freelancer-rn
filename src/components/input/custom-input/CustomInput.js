import React, {Component} from 'react';
import {TextInput, KeyboardAvoidingView} from 'react-native';

import PropTypes from 'prop-types';
import styles from './CustomInput.styles';
import fonts from 'src/styles/texts/fonts';
import colors from 'src/styles/texts/colors';

class CustomInput extends Component {
  render() {
    const {
      style,
      value,
      handleChange,
      setKey,
      isClass,
      isEmail,
      isNumber,
    } = this.props;

    return (
      <TextInput
        {...this.props}
        style={[
          styles.input,
          style,
          {
            fontSize: 16,
            // fontFamily: fonts.secondary,
            color: colors.appBlack,
            paddingStart: 10,
          },
        ]}
        value={value}
        onChangeText={
          isClass ? handleChange : (text) => handleChange(setKey, text)
        }
        // autoCapitalize="none"
        keyboardType={
          isEmail ? 'email-address' : isNumber ? 'number-pad' : 'default'
        }
        returnKeyType="done"
      />
    );
  }
}

CustomInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  setKey: PropTypes.func,
};

export default CustomInput;
