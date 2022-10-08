import {StackActions, useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'src/styles/texts/colors';

const ProfileCompleted = () => {
  // const user = useSelector((state) => state.myReducer.user);
  const publicProfile = useSelector((state) => state.myReducer.userProfile);
  const navigation = useNavigation();
  console.log('Profile Completed', publicProfile?.is_profile_completed);
  const HandleProfileCompletion = () => {
    if (!publicProfile?.is_profile_completed) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AfterSignUp', {
              screen: 'GettingStarted',
              params: {showBackButton: true},
            })
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.appRed,
            paddingVertical: 5,
          }}>
          <Text style={{color: colors.defaultWhite}}>
            Complete Your Profile
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <React.Fragment />;
    }
  };

  useEffect(() => {
    HandleProfileCompletion();
  }, []);

  return <HandleProfileCompletion />;
};

export default memo(ProfileCompleted);
