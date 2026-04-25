import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import LoginScreen    from '../screens/LoginScreen';
import TechNavigator  from './TechNavigator';
import AdminNavigator from './AdminNavigator';

export default function RootNavigator() {
  const user = useStore((s) => s.user);

  return (
    <NavigationContainer>
      {!user && <LoginScreen />}
      {user?.role === 'technician' && <TechNavigator />}
      {user?.role === 'admin' && <AdminNavigator />}
    </NavigationContainer>
  );
}
