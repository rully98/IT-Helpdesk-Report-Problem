import React from 'react'
import { Text, StyleSheet, View, TextInput,  TouchableOpacity, Keyboard } from 'react-native'

import { UserContext } from '../contexts/UserContext'
import { usePost } from '../hooks/usePost';

export function FormMasalah({navigation}) {

    const {postData, state} = usePost();

    const mystate = React.useContext(UserContext);

    const [nama_masalah, setNamaMasalah] = React.useState('');
    const [des_masalah, setDesMasalah] = React.useState('');
    const [errorNama, setErrorNama] = React.useState(false);
    const [errorDes, setErrorDes] = React.useState(false);
    
    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 5}}>Tambah Laporan Masalah:</Text>
            {
                state.statusSuccess ?
                    <Text style={{marginBottom: 5, color: 'green', fontSize: 16}}>Berhasil!</Text>
                : null
            }
            <TextInput 
                value={nama_masalah}
                onChangeText={setNamaMasalah}
                style={[styles.input, styles.masalah]} 
                placeholder="Masalah Anda.." />
                {
                    errorNama ?
                        <Text style={{marginBottom: 5, color: 'red'}}>Nama harus Diisi!</Text>
                    : null
                }
            <TextInput 
                value={des_masalah}
                onChangeText={setDesMasalah}
                numberOfLines={5}
                multiline={true}
                style={[styles.input, styles.desmasalah]} 
                placeholder="Deskripsi Masalah Anda.." />
                {
                    errorDes ?
                        <Text style={{marginBottom: 5, color: 'red'}}>Deskripsi harus Diisi!</Text>
                    : null
                }
            <TouchableOpacity 
                style={styles.btn}
                onPress={() => {
                    if(nama_masalah == ''){
                        setErrorNama(true);
                        setTimeout(() => {
                            setErrorNama(false);
                        }, 4000)
                    }
                    if(des_masalah == ''){
                        setErrorDes(true);
                        setTimeout(() => {
                            setErrorDes(false);
                        }, 4000)
                    } 
                    if(nama_masalah != '' && des_masalah != '') {
                        Keyboard.dismiss();
                        postData.addMasalah(mystate.user.nip, nama_masalah, des_masalah)
                            .then(result => {
                                if(result.status_code == 200) {
                                    setNamaMasalah('');
                                    setDesMasalah('');
                                    setTimeout(() => {
                                        navigation.pop();
                                    }, 3000)
                                }
                            })
                    }
                }}
            >
                <Text style={styles.btnText}>
                    {
                        state.loadingAdd ?
                            "Proses Laporan.."
                        : 
                            "Kirim"
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginBottom: 30
    },
    input: {
        padding: 7,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5
    },
    masalah: {
        // marginBottom: 15,
    }, 
    desmasalah: {
        textAlignVertical: 'top',
        // marginBottom: 15
    },
    btn: {
        backgroundColor: '#6BD098',
        padding: 7,
        borderRadius: 8,
        marginTop: 20
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    }
})
