import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { IconButton, List, useTheme } from 'react-native-paper';
import { useBiblioteca } from '../context/Biblioteca';
import { useReproductor } from '../context/Reproductor';

export function FilaCancion({ cancion, lista }) {
  const theme = useTheme();
  const router = useRouter();
  const { cancionActual, estaSonando, hayCancion, reproducir } = useReproductor();
  const { esFavorito, alternarFavorito } = useBiblioteca();

  const activa = hayCancion && cancionActual.id === cancion.id;
  const favorita = esFavorito(cancion.id);

  return (
    <List.Item
      title={cancion.titulo}
      description={`${cancion.artista} · ${cancion.album}`}
      titleStyle={activa ? { color: theme.colors.primary, fontWeight: 'bold' } : undefined}
      left={() => <Image source={{ uri: cancion.portada }} style={styles.portada} />}
      right={() => (
        <View style={styles.derecha}>
          {activa && (
            <IconButton
              icon={estaSonando ? 'volume-high' : 'volume-medium'}
              iconColor={theme.colors.primary}
              size={20}
            />
          )}
          <IconButton
            icon={favorita ? 'heart' : 'heart-outline'}
            iconColor={favorita ? theme.colors.primary : theme.colors.onSurfaceVariant}
            size={22}
            onPress={() => alternarFavorito(cancion.id)}
          />
        </View>
      )}
      onPress={() => {
        reproducir(cancion, lista);
        router.push('/reproductor');
      }}
    />
  );
}

const styles = StyleSheet.create({
  portada: { width: 48, height: 48, borderRadius: 6, marginLeft: 8 },
  derecha: { flexDirection: 'row', alignItems: 'center' },
});