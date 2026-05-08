import { View, Text, TouchableOpacity } from 'react-native';

export default function CardGasto({ gasto, excluirGasto }) {
  return (
    <View
      style={{
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {gasto.descricao}
      </Text>

      <Text
        style={{
          color: '#00ff88',
          fontSize: 15,
          marginTop: 5,
        }}
      >
        R$ {gasto.valor.toFixed(2)}
      </Text>

      <TouchableOpacity
        onPress={() => excluirGasto(gasto.id)}
        style={{
          marginTop: 10,
          backgroundColor: '#ff3b30',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}