import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, List, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { Encabezado } from '../../components/Encabezado';
import { CANCIONES } from '../../constants/canciones';
import { useBiblioteca } from '../../context/Biblioteca';

export default function Crear() {
  const theme = useTheme();
  const router = useRouter();
  const { crearPlaylist } = useBiblioteca();
  const [nombre, setNombre] = useState('');
  const [seleccion, setSeleccion] = useState([]);
  const [aviso, setAviso] = useState(false);

  const alternar = (id) =>
    setSeleccion((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const puedeCrear = nombre.trim().length > 0 && seleccion.length > 0;

  const crear = () => {
    if (!puedeCrear) return;
    crearPlaylist(nombre.trim(), seleccion);
    setNombre('');
    setSeleccion([]);
    setAviso(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>Crear playlist</Text>
      </Encabezado>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TextInput
          mode="outlined"
          label="Nombre de la playlist"
          value={nombre}
          onChangeText={setNombre}
          outlineStyle={{ borderRadius: 16 }}
          style={{ backgroundColor: 'transparent' }}
        />

        <Text variant="titleMedium" style={styles.subtitulo}>
          Elige canciones ({seleccion.length})
        </Text>

        {CANCIONES.map((c) => (
          <List.Item
            key={c.id}
            title={c.titulo}
            description={c.artista}
            left={() => <Image source={{ uri: c.portada }} style={styles.portada} />}
            right={() => (
              <Checkbox
                status={seleccion.includes(c.id) ? 'checked' : 'unchecked'}
                onPress={() => alternar(c.id)}
              />
            )}
            onPress={() => alternar(c.id)}
          />
        ))}

        <Button mode="contained" icon="plus" onPress={crear} disabled={!puedeCrear} style={styles.boton}>
          Crear playlist
        </Button>
      </ScrollView>

      <Snackbar
        visible={aviso}
        onDismiss={() => setAviso(false)}
        duration={3000}
        action={{ label: 'Ver', onPress: () => router.push('/biblioteca') }}
      >
        Playlist creada
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  subtitulo: { fontWeight: 'bold', marginTop: 20, marginBottom: 4 },
  portada: { width: 48, height: 48, borderRadius: 6, marginLeft: 8 },
  boton: { marginTop: 20, borderRadius: 24 },
});