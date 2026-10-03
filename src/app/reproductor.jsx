import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { IconButton, Modal, Portal, Snackbar, Surface, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerCancion } from '../components/DrawerCancion';
import { Encabezado } from '../components/Encabezado';
import { useBiblioteca } from '../context/Biblioteca';
import { useReproductor } from '../context/Reproductor';

const formato = (s = 0) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Reproductor() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const r = useReproductor();
  const { esFavorito, alternarFavorito } = useBiblioteca();
  const [letra, setLetra] = useState(false);
  const [menu, setMenu] = useState(false);
  const [aviso, setAviso] = useState('');

  const favorito = esFavorito(r.cancionActual.id);
  const tamPortada = Math.min(width - 32, height * 0.34, 340);
  const cerrar = () => (router.canGoBack() ? router.back() : router.replace('/'));

  const tocarCorazon = () => {
    alternarFavorito(r.cancionActual.id);
    setAviso(favorito ? 'Quitada de favoritos' : 'Añadida a favoritos');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <View style={styles.header}>
          <IconButton icon="chevron-down" mode="outlined" size={24} onPress={cerrar} />
          <View style={{ alignItems: 'center' }}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
              REPRODUCIENDO DESDE
            </Text>
            <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>
              {r.cancionActual.album}
            </Text>
          </View>
          <IconButton icon="dots-vertical" mode="outlined" size={24} onPress={() => setMenu(true)} />
        </View>
      </Encabezado>

      <ScrollView contentContainerStyle={[styles.main, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.portadaWrap}>
          <Image
            source={{ uri: r.cancionActual.portada }}
            style={{ width: tamPortada, height: tamPortada, borderRadius: 16 }}
          />
        </View>

        <View style={styles.info}>
          <View style={{ flex: 1 }}>
            <Text variant="headlineSmall" style={{ fontWeight: 'bold' }} numberOfLines={1}>
              {r.cancionActual.titulo}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {r.cancionActual.artista}
            </Text>
          </View>
          <IconButton
            icon={favorito ? 'heart' : 'heart-outline'}
            iconColor={favorito ? theme.colors.primary : theme.colors.onSurface}
            onPress={tocarCorazon}
          />
        </View>

        <View>
          <Slider
            value={r.posicion}
            minimumValue={0}
            maximumValue={r.duracion || 1}
            onSlidingComplete={r.buscar}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.outlineVariant}
            thumbTintColor={theme.colors.primary}
          />
          <View style={styles.tiempos}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {formato(r.posicion)}
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {formato(r.duracion)}
            </Text>
          </View>
        </View>

        <View style={styles.controles}>
          <IconButton
            icon="shuffle"
            iconColor={r.aleatorio ? theme.colors.primary : theme.colors.onSurfaceVariant}
            onPress={r.alternarAleatorio}
          />
          <IconButton icon="skip-previous" size={36} onPress={r.anterior} />
          <IconButton
            mode="contained"
            size={44}
            icon={r.estaSonando ? 'pause' : 'play'}
            containerColor={theme.colors.primary}
            iconColor={theme.colors.onPrimary}
            onPress={r.alternarReproduccion}
          />
          <IconButton icon="skip-next" size={36} onPress={r.siguiente} />
          <IconButton
            icon={r.repetir === 'one' ? 'repeat-once' : 'repeat'}
            iconColor={r.repetir !== 'off' ? theme.colors.primary : theme.colors.onSurfaceVariant}
            onPress={r.ciclarRepetir}
          />
        </View>

        <Pressable onPress={() => setLetra(true)} style={{ alignItems: 'center' }}>
          <Text
            variant="labelLarge"
            style={{ fontWeight: 'bold', letterSpacing: 1.5, color: theme.colors.primary }}
          >
            LYRICS
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color={theme.colors.primary} />
        </Pressable>

        <Portal>
          <Modal visible={letra} onDismiss={() => setLetra(false)} contentContainerStyle={styles.modal}>
            <Surface style={{ padding: 24, borderRadius: 16 }}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>Letra</Text>
              <Text>Aquí irá la letra de {r.cancionActual.titulo}.</Text>
            </Surface>
          </Modal>
        </Portal>
      </ScrollView>

      <DrawerCancion
        visible={menu}
        onClose={() => setMenu(false)}
        cancion={r.cancionActual}
        onAccion={setAviso}
      />

      <Snackbar visible={!!aviso} onDismiss={() => setAviso('')} duration={2200}>
        {aviso}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  portadaWrap: { alignItems: 'center', marginVertical: 8 },
  info: { flexDirection: 'row', alignItems: 'center' },
  tiempos: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  controles: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  modal: { margin: 24 },
});