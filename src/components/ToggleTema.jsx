import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTema } from '../context/Tema';

export function ToggleTema() {
  const theme = useTheme();
  const { oscuro, alternarTema } = useTema();

  const Opcion = ({ icono, activa }) => (
    <View style={[styles.opcion, activa && { backgroundColor: theme.colors.primary }]}>
      <MaterialCommunityIcons
        name={icono}
        size={18}
        color={activa ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
      />
    </View>
  );

  return (
    <Pressable
      onPress={alternarTema}
      style={[styles.pista, { backgroundColor: theme.colors.surfaceVariant }]}
    >
      <Opcion icono="white-balance-sunny" activa={!oscuro} />
      <Opcion icono="weather-night" activa={oscuro} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pista: { flexDirection: 'row', padding: 3, borderRadius: 20 },
  opcion: {
    width: 34,
    height: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});