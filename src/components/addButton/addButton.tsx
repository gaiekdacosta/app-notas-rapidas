import { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Overlay, Text } from 'react-native-elements';

interface AddButtonProps {
    getData: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ getData }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9) + Date.now()
    };

    const storeData = async () => {
        try {
            const id: string = generateUniqueId()
            await AsyncStorage.setItem(id, text);
            getData()
            setVisible(false)
            setText('')
        } catch (e) {
            console.log('ocorreu um erro', e)
        }
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return ( 
        <>
            <Button buttonStyle={styles.addButton} onPress={toggleOverlay} title='+' />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}  overlayStyle={{ marginBottom: 100 }}>
                <View style={{ width: 300, height: 245 }}>
                    <Text style={styles.modalTitle}>
                        CRIAR NOTA
                    </Text>
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        numberOfLines={10}
                        maxLength={100}
                        value={text}
                        onChangeText={setText}
                        placeholder="Digite aqui..."
                    />
                    <Text style={styles.countLength}>
                        {text.length}/100
                    </Text>
                    <Button 
                        buttonStyle={styles.saveButton} 
                        title={'SALVAR'}
                        onPress={storeData} />
                </View>
            </Overlay>
        </>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#FF8DC7',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 35, 
        width: 50
    },
    modalTitle: {
        textAlign:'center', 
        fontSize: 20,
        fontWeight: '700'
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'whitesmoke',
        padding: 8,
        textAlignVertical: 'top',
        height: 150, 
        borderRadius: 8
    },
    saveButton: {
        backgroundColor: '#FF8DC7',
        marginTop: 5,
        borderRadius: 8
    },
    countLength: {
        textAlign:'center', 
        marginTop: 5
    }
});

export default AddButton;