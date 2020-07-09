import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function Index() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Diogo Martins'
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) => ( //Item recebe cada um das propriedades
          <Text style={{color: 'white'}}>{project.title}</Text>
        )}
      />

      <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Adicionar Projeto</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7159c1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})