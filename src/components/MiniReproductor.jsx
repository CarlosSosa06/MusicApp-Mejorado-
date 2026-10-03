import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { IconButton, ProgressBar, Text, useTheme } from 'react-native-paper';
import { useReproductor } from '../context/Reproductor';

export function MiniReproductor() {
  const theme = useTheme();
  const router = useRouter();
  const { cancionActual, estaSonando, alternarReproduccion, posicion, duracion, hayCancion } =
    useReproductor();

  if (!hayCancion) return null;

  return (
    <Pressable
      onPress={() => router.push('/reproductor')}
      style={[styles.container, { backgroundColor: theme.colors.elevation.level3 }]}
    >
      <Image source={{ uri: cancionActual.portada }} style={styles.cover} />
      <View style={{ flex: 1 }}>
        <Text variant="titleSmall" numberOfLines={1}>{cancionActual.titulo}</Text>
        <Text variant="bodySmall" numberOfLines={1} style={{ color: theme.colors.onSurfaceVariant }}>
          {cancionActual.artista}
        </Text>
      </View>
      <IconButton
        icon={estaSonando ? 'pause' : 'play'}
        mode="contained"
        size={20}
        containerColor={theme.colors.primary}
        iconColor={theme.colors.onPrimary}
        onPress={alternarReproduccion}
      />
      <ProgressBar
        progress={duracion ? posicion / duracion : 0}
        color={theme.colors.primary}
        style={styles.bar}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cover: { width: 44, height: 44, borderRadius: 6 },
  bar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: 'transparent' },
});