import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './routes/auth.routes';
import { AppProvider } from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <AuthRoutes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export { App };
