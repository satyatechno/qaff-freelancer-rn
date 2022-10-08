import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './CheckoxDefault.styles';
import PropTypes from 'prop-types';
import colors from 'src/styles/texts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checkbox = ({handleCheckboxChange, data, id}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckboxChange = () => {
    setIsChecked(!isChecked);

    handleCheckboxChange(data, id);
  };

  return (
    <View key={data.id} style={styles.container}>
      <TouchableOpacity onPress={() => toggleCheckboxChange()}>
        <View key={data.id} style={styles.checkboxContainer}>
          <Text
            style={
              isChecked === true ? styles.selectedText : styles.defaultText
            }>
            {`${data.name}`}
          </Text>

          {isChecked ? (
            <Ionicons
              name="checkbox-outline"
              size={25}
              color={colors.appViolet}
              key={data.id}
            />
          ) : (
            <Ionicons
              name="stop-outline"
              size={25}
              color={colors.appGray}
              key={data.id}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

Checkbox.propTypes = {
  // label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
