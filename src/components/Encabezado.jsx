import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Encabezado({ children }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.contenedor,
        {
          paddingTop: insets.top + 12,
          borderBottomColor: theme.colors.primary,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
  },
});