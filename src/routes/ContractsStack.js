import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contracts from 'src/pages/contracts/Contracts';
import ContractRoom from 'src/pages/contracts/contract-room/ContractRoom';
import RequestPayment from 'src/pages/contracts/request-payment/RequestPayment';

const Stack = createStackNavigator();
const horizontalAnimation = {
  // gestureDirection: 'horizontal',
  // gestureEnabled: true,
  cardStyleInterpolator: ({ current, layouts }) => {
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
const Contract = () => (
  <Stack.Navigator screenOptions={{ ...horizontalAnimation, headerShown: false }}>
    <Stack.Screen name="Contracts" component={Contracts} />
    <Stack.Screen name="ContractRoom" component={ContractRoom} />
    <Stack.Screen name="RequestPayment" component={RequestPayment} />
  </Stack.Navigator>
);

export default Contract;
