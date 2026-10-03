import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Encabezado } from '../../components/Encabezado';
import { Filtro } from '../../components/Filtro';
import { Tarjeta } from '../../components/Tarjeta';
import { ToggleTema } from '../../components/ToggleTema';
import { CANCIONES } from '../../constants/canciones';

const saludo = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

export default function Home() {
  const theme = useTheme();
  const [genero, setGenero] = useState('Todas');

  const canciones = CANCIONES.filter((c) => genero === 'Todas' || c.genero === genero);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <View style={styles.header}>
          <View>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {saludo()}
            </Text>
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Hola, John
            </Text>
          </View>
          <ToggleTema />
        </View>
      </Encabezado>

      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Selecciona</Text>
        <Filtro seleccionado={genero} onChange={setGenero} />

        <View style={styles.rowHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Canciones Populares</Text>
          <Button
            mode="outlined"
            compact
            icon="chevron-right"
            contentStyle={{ flexDirection: 'row-reverse' }}
            onPress={() => setGenero('Todas')}
          >
            Todas
          </Button>
        </View>

        {canciones.length === 0 ? (
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            No hay canciones en este género.
          </Text>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={canciones}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => <Tarjeta cancion={item} lista={canciones} />}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { marginTop: 12, marginBottom: 8, fontWeight: 'bold' },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});