import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Overlay, Text } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RemoveButtonProps {
    id: string,
    getData: () => void
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ id, getData }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const removeData = () => {
        try {
            AsyncStorage.removeItem(id)
            getData()
        } catch (e) {
            console.log('ocorreu um erro ao excluir', e)
        }
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return ( 
        <View>
            <Button buttonStyle={styles.removeButton} onPress={toggleOverlay} title='🗑️' />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ marginBottom: 100 }}>
                <View style={{ width: 300, height: 100 }}>
                    <Text style={styles.modalTitle}>
                        DESEJA EXCLUIR A NOTA?
                    </Text>
                    <View style={styles.agroupButton}>
                        <Button 
                            buttonStyle={styles.confirmButton} 
                            title='EXCLUIR'
                            onPress={removeData} />
                    </View>
                </View>
            </Overlay>
        </View>
    );
}


const styles = StyleSheet.create({
    removeButton: {
        backgroundColor: 'white',
    },
    modalTitle: {
        textAlign:'center', 
        fontSize: 18,
        fontWeight: '700'
    },
    agroupButton: {
        display: 'flex', 
        flexDirection:'row', 
        justifyContent: 'center',
        marginTop: 15
    },
    confirmButton: {
        width: 150, 
        backgroundColor: '#ff6961', 
        borderRadius: 8
    }
});

export default RemoveButton;