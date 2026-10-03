import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import { Encabezado } from '../../components/Encabezado';
import { FilaCancion } from '../../components/FilaCancion';
import { Tarjeta } from '../../components/Tarjeta';
import { CANCIONES } from '../../constants/canciones';

const GENEROS = [
  { id: '1', nombre: 'Pop', color: '#169C46' },
  { id: '2', nombre: 'Hip Hop', color: '#0E6B30' },
  { id: '3', nombre: 'Rock', color: '#1F3D2B' },
  { id: '4', nombre: 'Electrónica', color: '#2B2B2B' },
  { id: '5', nombre: 'Fiesta', color: '#117A37' },
  { id: '6', nombre: 'Indie', color: '#0B2A18' },
];

export default function Busqueda() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const texto = query.trim().toLowerCase();
  const resultados = texto
    ? CANCIONES.filter((c) =>
        `${c.titulo} ${c.artista} ${c.genero}`.toLowerCase().includes(texto)
      )
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <TextInput
          mode="outlined"
          placeholder="Buscar canción..."
          value={query}
          onChangeText={setQuery}
          outlineStyle={{ borderRadius: 28 }}
          right={
            query ? (
              <TextInput.Icon icon="close" onPress={() => setQuery('')} />
            ) : (
              <TextInput.Icon icon="magnify" />
            )
          }
          style={{ backgroundColor: 'transparent' }}
        />
      </Encabezado>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {texto ? (
          <>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Resultados ({resultados.length})
            </Text>
            {resultados.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant }}>
                Sin resultados para "{query}".
              </Text>
            ) : (
              resultados.map((c) => <FilaCancion key={c.id} cancion={c} lista={resultados} />)
            )}
          </>
        ) : (
          <>
            <Text variant="titleMedium" style={styles.sectionTitle}>Recomendados</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CANCIONES}
              keyExtractor={(c) => c.id}
              renderItem={({ item, index }) => (
                <Tarjeta cancion={item} lista={CANCIONES} alta numero={index + 1} />
              )}
              style={styles.horizontalScroll}
            />

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.sectionTitle}>Explorar</Text>
            <View style={styles.grid}>
              {GENEROS.map((g) => (
                <Pressable key={g.id} style={styles.cardWrap} onPress={() => setQuery(g.nombre)}>
                  <Card style={[styles.card, { backgroundColor: g.color }]}>
                    <Card.Content style={styles.cardContent}>
                      <Text variant="titleMedium" style={styles.cardText}>{g.nombre}</Text>
                    </Card.Content>
                  </Card>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  horizontalScroll: { marginBottom: 16 },
  divider: { marginVertical: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  cardWrap: { width: '48%' },
  card: { height: 90, marginBottom: 12, justifyContent: 'center' },
  cardContent: { padding: 12 },
  cardText: { color: '#ffffff', fontWeight: 'bold' },
});