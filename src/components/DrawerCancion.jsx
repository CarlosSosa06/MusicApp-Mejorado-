import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet } from 'react-native';
import { Divider, Drawer, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBiblioteca } from '../context/Biblioteca';

const ANCHO = 230;
const FUERA = ANCHO + 32;
const nativo = Platform.OS !== 'web';

export function DrawerCancion({ visible, onClose, cancion, onAccion }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { esFavorito, alternarFavorito, playlists, agregarAPlaylist } = useBiblioteca();
  const x = useRef(new Animated.Value(FUERA)).current;
  const [montado, setMontado] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMontado(true);
      Animated.timing(x, { toValue: 0, duration: 220, useNativeDriver: nativo }).start();
    } else {
      Animated.timing(x, { toValue: FUERA, duration: 180, useNativeDriver: nativo }).start(() =>
        setMontado(false)
      );
    }
  }, [visible]);

  if (!montado) return null;

  const favorita = esFavorito(cancion.id);

  const hacer = (fn, mensaje) => () => {
    fn?.();
    onClose();
    onAccion?.(mensaje);
  };

  const aPlaylist = () => {
    if (playlists.length === 0) {
      onClose();
      onAccion?.('Primero crea una playlist en la pestaña Crear');
      return;
    }
    const ultima = playlists[playlists.length - 1];
    agregarAPlaylist(ultima.id, cancion.id);
    onClose();
    onAccion?.(`Añadida a "${ultima.nombre}"`);
  };

  return (
    <>
      <Pressable style={styles.fondo} onPress={onClose} />
      <Animated.View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outlineVariant,
            top: insets.top + 64,
            transform: [{ translateX: x }],
          },
        ]}
      >
        <Text variant="titleSmall" numberOfLines={1} style={styles.titulo}>
          {cancion.titulo}
        </Text>
        <Text variant="bodySmall" style={[styles.artista, { color: theme.colors.onSurfaceVariant }]}>
          {cancion.artista}
        </Text>
        <Divider />
        <Drawer.Section showDivider={false}>
          <Drawer.Item
            icon={favorita ? 'heart-off' : 'heart'}
            label={favorita ? 'Quitar favorito' : 'Favorito'}
            onPress={hacer(
              () => alternarFavorito(cancion.id),
              favorita ? 'Quitada de favoritos' : 'Añadida a favoritos'
            )}
          />
          <Drawer.Item icon="playlist-plus" label="A playlist" onPress={aPlaylist} />
          <Drawer.Item icon="share-variant" label="Compartir" onPress={hacer(null, 'Próximamente')} />
          <Drawer.Item icon="account-music" label="Ver artista" onPress={hacer(null, 'Próximamente')} />
        </Drawer.Section>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  fondo: { ...StyleSheet.absoluteFillObject, backgroundColor: 'transparent' },
  panel: {
    position: 'absolute',
    right: 16,
    width: ANCHO,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    elevation: 8,
  },
  titulo: { fontWeight: 'bold', paddingHorizontal: 16 },
  artista: { paddingHorizontal: 16, marginBottom: 8 },
});