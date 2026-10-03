import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, List, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { Encabezado } from '../../components/Encabezado';
import { FilaCancion } from '../../components/FilaCancion';
import { CANCIONES } from '../../constants/canciones';
import { useBiblioteca } from '../../context/Biblioteca';

export default function Biblioteca() {
  const theme = useTheme();
  const { favoritos, playlists, eliminarPlaylist } = useBiblioteca();
  const [vista, setVista] = useState('favoritos');

  const favoritas = CANCIONES.filter((c) => favoritos.includes(c.id));
  const vacio = (texto) => (
    <Text style={[styles.vacio, { color: theme.colors.onSurfaceVariant }]}>{texto}</Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>Biblioteca</Text>
      </Encabezado>

      <ScrollView contentContainerStyle={styles.container}>
        <SegmentedButtons
          value={vista}
          onValueChange={setVista}
          buttons={[
            { value: 'favoritos', label: `Favoritos (${favoritas.length})`, icon: 'heart' },
            { value: 'playlists', label: `Playlists (${playlists.length})`, icon: 'playlist-music' },
          ]}
          style={styles.segmentos}
        />

        {vista === 'favoritos' ? (
          favoritas.length === 0 ? (
            vacio('Aún no tienes favoritos. Toca el corazón en cualquier canción.')
          ) : (
            favoritas.map((c) => <FilaCancion key={c.id} cancion={c} lista={favoritas} />)
          )
        ) : playlists.length === 0 ? (
          vacio('Aún no tienes playlists. Crea una en la pestaña Crear.')
        ) : (
          playlists.map((pl) => {
            const canciones = pl.canciones
              .map((id) => CANCIONES.find((c) => c.id === id))
              .filter(Boolean);
            return (
              <List.Accordion
                key={pl.id}
                title={pl.nombre}
                description={`${canciones.length} canciones`}
                left={(p) => <List.Icon {...p} icon="playlist-music" />}
                style={{ backgroundColor: 'transparent' }}
              >
                {canciones.map((c) => (
                  <FilaCancion key={c.id} cancion={c} lista={canciones} />
                ))}
                <View style={styles.eliminar}>
                  <IconButton icon="delete-outline" onPress={() => eliminarPlaylist(pl.id)} />
                </View>
              </List.Accordion>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  segmentos: { marginBottom: 16 },
  vacio: { textAlign: 'center', marginTop: 32 },
  eliminar: { alignItems: 'flex-end' },
});