import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import styles from './RadioGroup.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';

const RadioGroup = ({data, onSelect, selectedFromRedux}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.data.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setSelectedIndex(item.id);
              onSelect({
                dataId: data.id,
                selection: data.data[i],
              });
            }}>
            <View key={item.id} style={styles.radioButtonContainer}>
              <Text
                style={
                  selectedIndex === item.id
                    ? styles.selectedText
                    : styles.defaultText
                }>
                {item.name}
              </Text>

              {selectedIndex === item.id ? (
                <Ionicons
                  style={styles.icon}
                  name="ellipse"
                  size={20}
                  color={colors.appViolet}
                />
              ) : (
                <Ionicons
                  style={styles.icon}
                  name="ellipse-outline"
                  size={20}
                  color={colors.appGray}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

RadioGroup.propTypes = {
  //   item: PropTypes.string.isRequired,
};

export default RadioGroup;
