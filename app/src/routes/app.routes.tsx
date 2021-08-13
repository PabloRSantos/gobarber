import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppointmentCreated from '../page/AppointmentCreated';
import CreateAppointment from '../page/CreateAppointment';
import Dashboard from '../page/Dashboard';
import Profile from '../page/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
  </App.Navigator>
);

export { AppRoutes };
