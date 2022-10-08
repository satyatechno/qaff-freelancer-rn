import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from 'src/styles/texts/colors';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
const ErrorText = ({text, style}) => {
  return (
    <Animatable.Text animation="shake" style={[styles.errorText, style]}>
      {text}
    </Animatable.Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.appRed,
    marginVertical: 5,
    fontSize: 11,
    textAlign: 'left',
  },
});

ErrorText.propTypes = {
  // text: PropTypes.string.isRequired,
};

export default ErrorText;
