import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useReproductor } from '../context/Reproductor';

export function Tarjeta({ cancion, lista, alta = false, numero }) {
  const theme = useTheme();
  const { cancionActual, hayCancion, reproducir } = useReproductor();
  const router = useRouter();

  const activa = hayCancion && cancionActual.id === cancion.id;

  const handlePress = () => {
    reproducir(cancion, lista);
    router.push('/reproductor');
  };

  return (
    <Card
      style={[
        styles.card,
        alta && styles.cardAlta,
        {
          backgroundColor: theme.colors.surface,
          borderWidth: 2,
          borderColor: activa ? theme.colors.primary : 'transparent',
        },
      ]}
      onPress={handlePress}
    >
      <Card.Cover source={{ uri: cancion.portada }} style={[styles.cover, alta && styles.coverAlta]} />
      <Card.Content style={styles.content}>
        <Text
          variant="titleSmall"
          numberOfLines={1}
          style={activa ? { color: theme.colors.primary } : undefined}
        >
          {numero ? `#${numero} ` : ''}{cancion.titulo}
        </Text>
        <Text variant="bodySmall" numberOfLines={1} style={{ color: theme.colors.onSurfaceVariant }}>
          {cancion.artista}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: 150, marginRight: 12, marginVertical: 8 },
  cardAlta: { width: 140 },
  cover: { height: 130 },
  coverAlta: { height: 190 },
  content: { padding: 8 },
});