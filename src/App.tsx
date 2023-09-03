import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import AddButton from './components/addButton/addButton';
import Note from './components/note/note';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppProps {
  content: string,
}

const App: React.FC<AppProps> = () => {
  const [notesData, setNotesData] = useState<any[]>([]);
  const [searchBar, setSearchBar] = useState<string>('')

  const getData = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(allKeys);

        const tempValuesData: any[] = [];
        values.forEach(([id, value]) => {
            tempValuesData.push({ id, value });
        });

        setNotesData(tempValuesData);
    } catch (e) {
        console.log('ocorreu um erro', e);
    }
  };

  const searchLowerCase = searchBar.toLowerCase();
  const searchFilter = notesData.filter((note: any) =>
    note.value.toLowerCase().includes(searchLowerCase)
  );


  const handleSearchBar = (text: string) => setSearchBar(text);

  useEffect(() => {
      getData();
  }, []);

  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.title}>
          QUICK NOTES
        </Text>
      </View>
      <View style={styles.searchAndCreate}>
        <Input 
          onChangeText={handleSearchBar} // Correção aqui
          value={searchBar}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input} 
          placeholder='BUSCAR NOTAS' />
        <AddButton getData={getData} />
      </View>
      <Note getData={getData} notesData={searchFilter} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#FF8DC7'
  },
  title: {
    color: 'white',
    textAlign: 'center', 
    marginTop: '12%',
    fontWeight: '900',
    fontSize: 18 
  },
  searchAndCreate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 5, 
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: '#f0f6fa',
    padding: 5,
    borderRadius: 8
  }
});

export default App;
