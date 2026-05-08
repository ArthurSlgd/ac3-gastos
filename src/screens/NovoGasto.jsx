import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function NovoGasto() {
  const router = useRouter();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');
  const [descricaoErro, setDescricaoErro] = useState('');
  const [valorErro, setValorErro] = useState('');

  function handleDescricaoChange(text) {
    const valorFiltrado = text.replace(/\d/g, '');
    setDescricao(valorFiltrado);
    setDescricaoErro('');
    setErro('');
  }

  function handleValorChange(text) {
    const filtrado = text.replace(/[^0-9.,]/g, '');
    const partes = filtrado.split(/[.,]/);
    const valorNormalizado = partes.length > 1 ? `${partes[0]}.${partes.slice(1).join('')}` : partes[0];
    setValor(valorNormalizado);
    setValorErro('');
    setErro('');
  }

  function salvarGasto() {
    let encontrouErro = false;

    if (descricao.trim() === '') {
      setDescricaoErro('Preencha a descrição');
      setErro('Preencha a descrição');
      encontrouErro = true;
    } else if (/\d/.test(descricao)) {
      setDescricaoErro('A descrição não pode conter números');
      setErro('A descrição não pode conter números');
      encontrouErro = true;
    }

    if (valor.trim() === '') {
      setValorErro('Preencha o valor');
      setErro('Preencha o valor');
      encontrouErro = true;
    } else if (Number.isNaN(Number(valor))) {
      setValorErro('Digite um valor válido');
      setErro('Digite um valor válido');
      encontrouErro = true;
    } else if (Number(valor) === 0) {
      setValorErro('O valor deve ser maior que zero');
      setErro('O valor deve ser maior que zero');
      encontrouErro = true;
    }

    if (encontrouErro) {
      return;
    }

    const novoGasto = {
      id: Date.now().toString(),
      descricao,
      valor: Number(valor),
    };

    global.adicionarGasto(novoGasto);

    setErro('');
    setDescricaoErro('');
    setValorErro('');

    router.back();
  }

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
          marginBottom: 25,
        }}
      >
        Adicionar gasto
      </Text>

      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#777"
        value={descricao}
        onChangeText={handleDescricaoChange}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: 15,
          borderRadius: 12,
          marginBottom: 4,
          borderWidth: descricaoErro ? 1 : 0,
          borderColor: descricaoErro ? '#ff453a' : 'transparent',
        }}
      />
      {descricaoErro !== '' && (
        <Text
          style={{
            color: '#ff453a',
            marginBottom: 12,
            fontSize: 13,
          }}
        >
          {descricaoErro}
        </Text>
      )}

      <TextInput
        placeholder="Valor"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={valor}
        onChangeText={handleValorChange}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: 15,
          borderRadius: 12,
          marginBottom: 4,
          borderWidth: valorErro ? 1 : 0,
          borderColor: valorErro ? '#ff453a' : 'transparent',
        }}
      />
      {valorErro !== '' && (
        <Text
          style={{
            color: '#ff453a',
            marginBottom: 12,
            fontSize: 13,
          }}
        >
          {valorErro}
        </Text>
      )}

      {erro !== '' && (
        <Text
          style={{
            color: '#ff453a',
            marginTop: 10,
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          {erro}
        </Text>
      )}

      <TouchableOpacity
        onPress={salvarGasto}
        style={{
          backgroundColor: '#00ff88',
          padding: 15,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}