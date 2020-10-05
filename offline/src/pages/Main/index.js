import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {FAB, TextInput, Title} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import context from '../../services/database/Context';
import styles from './style';

const Main = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [connected, setConnected] = useState(true);
  const [buffer, setBuffer] = useState(0);

  const addUser = async (user) => {
    const realm = await context();
    realm.write(() => {
      realm.create('User', user, 'modified');
    });
  };

  const getUsers = async () => {
    const realm = await context();
    const users = realm.objects('User');
    return users;
  };

  const deleteUsers = async () => {
    const realm = await context();
    realm.write(() => {
      realm.delete(realm.objects('User'));
    });
  };

  const sendData = () => {
    if (connected) {
      //post api
      alert('post');
    } else {
      addUser({name: name, age: age});
      setBuffer(buffer + 1);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === 'none' && !state.isConnected) {
        setConnected(false);
      } else {
        setConnected(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (connected && buffer > 0) {
      const users = getUsers();
      alert(JSON.stringify(users));
    }
  }, [buffer, connected]);

  return (
    <>
      <View style={styles.container}>
        <Title>Dados pessoais</Title>
        <TextInput
          label={'Nome'}
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label={'Idade'}
          mode="outlined"
          value={age}
          onChangeText={(value) => setAge(value)}
        />
        <FAB
          style={styles.fab}
          icon="content-save"
          onPress={() => {
            sendData();
          }}
        />
      </View>
    </>
  );
};

export default Main;
