import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RemoveButton from '../removeButton/removeButton';
import { Fragment, useEffect, useState } from 'react';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

interface NoteProps {
    notesData: any[],
    getData: () => void
}

const Note: React.FC<NoteProps> = ({ notesData, getData }) => {
    return (
        <Fragment>
            {notesData.length !== 0 ?
                notesData.map((item: any, i: number) => (
                    <View key={i} style={styles.note}>
                        <Text style={{ width: '50%', fontWeight: '500' }}>{item.value}</Text>
                        <RemoveButton getData={getData} id={item.id} />
                    </View>
                ))
            : <Text style={styles.voidNotes}>NOTAS VÁZIAS</Text>}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    note: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f',
        height: 80,
        margin: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    voidNotes: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500'
    }
});

export default Note;