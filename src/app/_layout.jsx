import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BibliotecaProvider } from '../context/Biblioteca';
import { ReproductorProvider } from '../context/Reproductor';
import { TemaProvider, useTema } from '../context/Tema';

function Contenido() {
  const { tema, oscuro } = useTema();
  return (
    <PaperProvider theme={tema}>
      <StatusBar style={oscuro ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: tema.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="reproductor" options={{ presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TemaProvider>
        <BibliotecaProvider>
          <ReproductorProvider>
            <Contenido />
          </ReproductorProvider>
        </BibliotecaProvider>
      </TemaProvider>
    </SafeAreaProvider>
  );
}