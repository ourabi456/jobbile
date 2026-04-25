import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Colors } from '../theme/colors';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import CalendarScreen       from '../screens/admin/CalendarScreen';
import ClientsScreen        from '../screens/admin/ClientsScreen';
import InvoiceScreen        from '../screens/admin/InvoiceScreen';
import NewJobScreen         from '../screens/admin/NewJobScreen';

export type AdminTabParams = {
  Dashboard: undefined;
  Calendar: undefined;
  Clients: undefined;
  Invoices: undefined;
};

export type AdminStackParams = {
  Tabs: undefined;
  NewJob: undefined;
};

const Tab   = createBottomTabNavigator<AdminTabParams>();
const Stack = createNativeStackNavigator<AdminStackParams>();

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.brand,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: { height: 82, paddingTop: 8, borderTopColor: Colors.border },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = { Dashboard: '📊', Calendar: '📅', Clients: '👥', Invoices: '💰' };
          return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[route.name]}</Text>;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Calendar"  component={CalendarScreen} />
      <Tab.Screen name="Clients"   component={ClientsScreen} />
      <Tab.Screen name="Invoices"  component={InvoiceScreen} />
    </Tab.Navigator>
  );
}

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs"   component={AdminTabs} />
      <Stack.Screen name="NewJob" component={NewJobScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
