import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from 'src/components/header/Header';
import SkillsCard from 'src/components/skills-card/Skills';
import styles from './Skills.styles';
import {useSelector} from 'react-redux';
import {Icon} from 'src/Icon';
import colors from 'src/styles/texts/colors';
import i18n from 'src/locale/i18n';

const Skills = ({navigation}) => {
  const skillsData = useSelector(
    (state) => state.myReducer.userProfile?.skills,
  );
  const onSubmit = () => {
    if (!skillsData.length) {
      alert(i18n.t('asSkills.pleaseAddSkillsFirst'));
    } else navigation.navigate('Title');
  };
  const onAdd = () => {
    navigation.navigate('AddSkills', {
      navigationScreenName: 'Skills',
    });
  };
  return (
    <>
      <Header title="Skills" backButton navigation={navigation} />

      <View style={{flex: 1}}>
        <Text style={styles.addSchoolText}>
          {i18n.t('asSkills.skillsText')}
        </Text>
        {skillsData?.length ? (
          <SkillsCard data={skillsData} navigation={navigation} />
        ) : (
          <TouchableOpacity
            onPress={onAdd}
            style={styles.addButton}
            activeOpacity={0.4}>
            <Icon name="add" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.submitButton,
          // !skillsData?.length && {backgroundColor: colors.skyBlue},
        ]}
        onPress={onSubmit}>
        <Text style={styles.submitText}>
          {/* {skillsData?.length ? `Next` : 'Skip this step?'} */}
          {i18n.t('asSkills.next')}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Skills;
