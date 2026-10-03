import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MiniReproductor } from './MiniReproductor';

const ORDEN = ['index', 'busqueda', 'crear', 'biblioteca', 'perfil'];

const TABS = {
  index: { on: 'home', off: 'home-outline', titulo: 'Inicio' },
  busqueda: { on: 'magnify', off: 'magnify', titulo: 'Buscar' },
  crear: { on: 'plus-circle', off: 'plus-circle-outline', titulo: 'Crear' },
  biblioteca: { on: 'cube', off: 'cube-outline', titulo: 'Biblioteca' },
  perfil: { on: 'account', off: 'account-outline', titulo: 'Perfil' },
};

function Boton({ nombre, activo, onPress }) {
  const theme = useTheme();
  const t = TABS[nombre];
  const color = activo ? theme.colors.onPrimary : theme.colors.onSurfaceVariant;

  return (
    <Pressable onPress={onPress} style={[styles.item, activo && styles.itemActivo]}>
      <MaterialCommunityIcons name={activo ? t.on : t.off} size={22} color={color} />
      {activo && (
        <Text variant="labelLarge" style={{ color, fontWeight: 'bold' }}>
          {t.titulo}
        </Text>
      )}
    </Pressable>
  );
}

export function BarraNavegacion({ state, navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const rutas = ORDEN.map((n) => state.routes.find((r) => r.name === n)).filter(Boolean);
  const activaKey = state.routes[state.index].key;

  // Inicio siempre solo, la pestaña activa sola, y las demás agrupadas en pastillas
  const grupos = [];
  rutas.forEach((ruta) => {
    const activo = ruta.key === activaKey;
    if (activo || ruta.name === 'index') {
      grupos.push({ tipo: activo ? 'activo' : 'circulo', rutas: [ruta] });
    } else {
      const ultimo = grupos[grupos.length - 1];
      if (ultimo && ultimo.tipo === 'pastilla') ultimo.rutas.push(ruta);
      else grupos.push({ tipo: 'pastilla', rutas: [ruta] });
    }
  });

  const ir = (ruta, activo) => () => {
    const evento = navigation.emit({
      type: 'tabPress',
      target: ruta.key,
      canPreventDefault: true,
    });
    if (!activo && !evento.defaultPrevented) navigation.navigate(ruta.name);
  };

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <MiniReproductor />
      <View style={[styles.barraWrap, { paddingBottom: insets.bottom + 8 }]}>
        <View
          style={[
            styles.contorno,
            {
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          {grupos.map((g) => (
            <View
              key={g.rutas[0].key}
              style={[
                styles.grupo,
                g.tipo === 'activo' && { backgroundColor: theme.colors.primary },
                g.tipo !== 'activo' && {
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                },
              ]}
            >
              {g.rutas.map((ruta) => (
                <Boton
                  key={ruta.key}
                  nombre={ruta.name}
                  activo={g.tipo === 'activo'}
                  onPress={ir(ruta, g.tipo === 'activo')}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barraWrap: { paddingHorizontal: 12, paddingTop: 8 },
  contorno: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 40,
  },
  grupo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: 32,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 28,
  },
  itemActivo: { paddingHorizontal: 14 },
});