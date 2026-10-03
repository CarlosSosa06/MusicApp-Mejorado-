import { ScrollView, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

const CATEGORIAS = ['Todas', 'Hip Hop', 'Fiesta', 'Pop', 'Rock'];

export function Filtro({ seleccionado, onChange }) {
  const theme = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {CATEGORIAS.map((cat) => {
        const activo = seleccionado === cat;
        return (
          <Chip
            key={cat}
            mode="outlined"
            showSelectedCheck={false}
            onPress={() => onChange(cat)}
            style={[
              styles.chip,
              {
                backgroundColor: activo ? theme.colors.primary : 'transparent',
                borderColor: activo ? theme.colors.primary : theme.colors.outline,
              },
            ]}
            textStyle={{
              color: activo ? theme.colors.onPrimary : theme.colors.onSurface,
              fontWeight: activo ? 'bold' : 'normal',
            }}
          >
            {cat}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 8 },
  chip: { marginRight: 8, borderRadius: 20 },
});