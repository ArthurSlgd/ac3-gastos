import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import CardGasto from '../components/CardGasto';
import CardTotal from '../components/CardTotal';

export default function ListaGastos() {
  const router = useRouter();

  const [gastos, setGastos] = useState([]);

  const total = gastos.reduce((acc, item) => acc + item.valor, 0);

  function adicionarGasto(gasto) {
    setGastos((estadoAnterior) => [...estadoAnterior, gasto]);
  }

  function excluirGasto(id) {
    const novaLista = gastos.filter((item) => item.id !== id);
    setGastos(novaLista);
  }

  global.adicionarGasto = adicionarGasto;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Meus Gastos
      </Text>

      <CardTotal total={total} />

      <TouchableOpacity
        onPress={() => router.push('/modal')}
        style={{
          backgroundColor: '#00ff88',
          padding: 15,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Novo gasto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              color: '#aaa',
              textAlign: 'center',
              marginTop: 50,
              fontSize: 16,
            }}
          >
            Nenhum gasto cadastrado
          </Text>
        }
        renderItem={({ item }) => (
          <CardGasto gasto={item} excluirGasto={excluirGasto} />
        )}
      />
    </View>
  );
}