import React from 'react';
import {Platfrom, View,Text} from 'react-native';
import {createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import Messages from 'src/pages/messages/Messages';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import {Icon} from 'src/Icon';
import ProfileStack from './ProfileStack';
import Job from './JobsStack';
import Proposal from './ProposalsStack';
import Contract from './ContractsStack';
import MessageComponent from './MessageStack';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const unreadMessage = useSelector(state=> state.chatReducer.unreadMessageCount)
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      tabBarOptions={{
        activeTintColor: colors.skyBlue,
        inactiveTintColor: colors.appGray4,

        keyboardHidesTabBar: true,

        labelStyle: {
          fontSize: 13,
          textAlign: 'center',
          paddingBottom: 5,
          fontWeight: '600',

          // color: colors.appGray,
        },
        tabStyle: {
          height: Platform.OS === 'android' ? 55 : 70,
          borderTopWidth: 0.5,
          borderTopColor: colors.appGray2,
          paddingVertical: 5,
        },
        // style: {
        //   height: Platform.OS === 'android' ? 55 : 90,
        //   borderTopWidth: 0.5,
        //   borderTopColor: colors.appGray2,
        //   paddingVertical: 5,
        // },
      }}>
      <Tab.Screen
        name="Jobs"
        component={Job}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Proposals"
        component={Proposal}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="proposals" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Contracts"
        component={Contract}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="contract" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageComponent}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{width: 23, height: 23}}>
              {
                unreadMessage > 0 &&
              
              <View
              style={{ backgroundColor: colors.appRed,
                borderRadius: 10,
                justifyContent:'center',
                height: 20,
                width: 20,
                alignItems:'center',
                position: 'absolute',
                left: 10,
                zIndex:1,
                top: -5,
              
              }}
              >
                <Text
                style={{
                  color: colors.defaultWhite, fontSize:12, textAlign: 'center'
                }}
                >{unreadMessage}</Text>
              </View>
        }
            <Icon name="message" color={color} size={23} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="profile" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
