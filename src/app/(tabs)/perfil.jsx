import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Divider, List, Switch, Text, useTheme } from 'react-native-paper';
import { Encabezado } from '../../components/Encabezado';
import { useBiblioteca } from '../../context/Biblioteca';
import { useTema } from '../../context/Tema';

function Dato({ valor, etiqueta }) {
  const theme = useTheme();
  return (
    <View style={styles.dato}>
      <Text variant="titleLarge" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
        {valor}
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{etiqueta}</Text>
    </View>
  );
}

export default function Perfil() {
  const theme = useTheme();
  const router = useRouter();
  const { oscuro, alternarTema } = useTema();
  const { favoritos, playlists } = useBiblioteca();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Encabezado>
        <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>Perfil</Text>
      </Encabezado>

      <ScrollView>
        <View style={styles.header}>
          <Avatar.Text
            size={90}
            label="J"
            style={{ backgroundColor: theme.colors.primary }}
            color={theme.colors.onPrimary}
          />
          <Text variant="headlineSmall" style={styles.nombre}>John</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Cuenta gratuita
          </Text>
        </View>

        <View style={styles.datos}>
          <Dato valor={favoritos.length} etiqueta="Favoritos" />
          <Dato valor={playlists.length} etiqueta="Playlists" />
        </View>

        <Divider />

        <List.Item
          title="Modo oscuro"
          left={(p) => <List.Icon {...p} icon="theme-light-dark" />}
          right={() => <Switch value={oscuro} onValueChange={alternarTema} />}
        />
        <List.Item
          title="Canciones favoritas"
          left={(p) => <List.Icon {...p} icon="heart" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={() => router.push('/biblioteca')}
        />
        <List.Item
          title="Mis playlists"
          left={(p) => <List.Icon {...p} icon="playlist-music" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={() => router.push('/biblioteca')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 24, gap: 6 },
  nombre: { fontWeight: 'bold', marginTop: 8 },
  datos: { flexDirection: 'row', justifyContent: 'center', gap: 48, paddingBottom: 20 },
  dato: { alignItems: 'center' },
});