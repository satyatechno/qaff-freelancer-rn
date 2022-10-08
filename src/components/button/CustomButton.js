import React, {Component} from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import styles from './CustomButton.styles';
import colors from 'src/styles/texts/colors';

class CustomButton extends Component {
  constructor(props) {
    super(props);

    this.setupButtonStyles(this.props.mode);
  }

  setupButtonStyles = (mode) => {
    switch (mode) {
      case 1:
        {
          this.buttonStyle = styles.mode1;
        }
        break;
      case 2:
        {
          this.buttonStyle = styles.mode2;
        }
        break;
      case 3: {
        this.buttonStyle = styles.mode3;
      }
      default:
        break;
    }
  };

  render() {
    const {handlePress, isLoading, children, style, loadingColor} = this.props;
    const {buttonStyle} = this;

    return (
      <View>
        <TouchableOpacity
          delayPressIn={0}
          delayPressOut={0}
          activeOpacity={0.5}
          {...this.props}
          onPress={() => handlePress()}
          disabled={isLoading || this.props.disabled}
          style={[buttonStyle, style]}>
          {!isLoading && children}
          {isLoading === true && (
            <ActivityIndicator
              color={loadingColor ? loadingColor : colors.defaultWhite}
              size={30}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

CustomButton.propTypes = {
  isLoading: PropTypes.bool,
  handlePress: PropTypes.func.isRequired,
};
CustomButton.defaultProps = {
  isLoading: false,
};

export default CustomButton;
