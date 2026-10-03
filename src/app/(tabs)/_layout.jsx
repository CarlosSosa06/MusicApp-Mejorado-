import { Tabs } from 'expo-router';
import { BarraNavegacion } from '../../components/BarraNavegacion';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BarraNavegacion {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="busqueda" />
      <Tabs.Screen name="crear" />
      <Tabs.Screen name="biblioteca" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}