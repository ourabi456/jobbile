import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Colors } from '../theme/colors';
import DashboardScreen   from '../screens/tech/DashboardScreen';
import JobsScreen        from '../screens/tech/JobsScreen';
import MapScreen         from '../screens/tech/MapScreen';
import ProfileScreen     from '../screens/tech/ProfileScreen';
import JobDetailScreen   from '../screens/tech/JobDetailScreen';

export type TechStackParams = {
  Tabs: undefined;
  JobDetail: { jobId: string };
};

export type TechTabParams = {
  Home: undefined;
  Jobs: undefined;
  Map: undefined;
  Profile: undefined;
};

const Tab   = createBottomTabNavigator<TechTabParams>();
const Stack = createNativeStackNavigator<TechStackParams>();

function TechTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.brand,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: { height: 82, paddingTop: 8, borderTopColor: Colors.border },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = { Home: '🏠', Jobs: '📋', Map: '🗺️', Profile: '👤' };
          return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[route.name]}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home"    component={DashboardScreen} />
      <Tab.Screen name="Jobs"    component={JobsScreen} />
      <Tab.Screen name="Map"     component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function TechNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs"      component={TechTabs} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}
