import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Messages from 'src/pages/messages/Messages';

const MessageStack = createStackNavigator();
const horizontalAnimation = {
  // gestureDirection: 'horizontal',
  // gestureEnabled: true,
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const MessageComponent = () => (
  <MessageStack.Navigator
    screenOptions={{...horizontalAnimation, headerShown: false}}>
    <MessageStack.Screen name="Messages" component={Messages} />
  </MessageStack.Navigator>
);

export default MessageComponent;
