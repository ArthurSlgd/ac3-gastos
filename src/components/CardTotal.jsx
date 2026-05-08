import { View, Text } from 'react-native';

export default function CardTotal({ total }) {
  return (
    <View
      style={{
        backgroundColor: '#00ff88',
        padding: 20,
        borderRadius: 14,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000',
        }}
      >
        Total gasto
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 8,
          color: '#000',
        }}
      >
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}