import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#fff',
        contentStyle: {
          backgroundColor: '#121212',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Gastos',
        }}
      />

      <Stack.Screen
        name="modal"
        options={{
          title: 'Novo gasto',
        }}
      />
    </Stack>
  );
}