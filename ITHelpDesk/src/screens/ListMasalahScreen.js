import React, {Component} from 'react'
import axios from 'axios'
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { HeaderIconButton } from '../components/HeaderIconButton'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import { Masalah } from '../components/Masalah'
import { BASE_URL } from '../config'

export default function ListMasalahScreen({navigation}) {

    const { logout } = React.useContext(AuthContext);
    const state = React.useContext(UserContext);

    const [masalah, setDataMasalah] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);

    function useAbortableEffect(effect, dependencies) {
        const status = {}; // mutable status object
        React.useEffect(() => {
        status.aborted = false;
        // pass the mutable object to the effect callback
        // store the returned value for cleanup
        const cleanUpFn = effect(status);
        return () => {
            // mutate the object to signal the consumer
            // this effect is cleaning up
            status.aborted = true;
            if (typeof cleanUpFn === "function") {
            // run the cleanup function
            cleanUpFn();
            }
        };
        }, [...dependencies]);
    }

    useAbortableEffect((status) => {
        if(!status.aborted){
            navigation.setOptions({
                headerRight: () => (
                    <View style={{ flex: 1, justifyContent: 'space-between', 
                        flexDirection: 'row', width: 90, alignItems: 'center' }}>
                        <HeaderIconButton name={'refresh'} 
                        onPress={() => {
                            getMasalah();
                        }} />
                        <HeaderIconButton name={'log-out'} 
                        onPress={() => {
                            logout(state.user.nip);
                        }} />
                    </View>
                )
            }),
                getMasalah()
        }
    }, [navigation, logout])

    
    function renderMasalah({item: masalah}) {
        return <Masalah masalah={masalah} navigation={navigation} />;
    }

    function getMasalah() {
        setLoadingData(true)
        axios.get(`${BASE_URL}api/list-masalah?nip=${state.user.nip}`)
            .then(({data}) => {
                setLoadingData(false)
                setDataMasalah(data.result);
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.container_add}
                onPress={() => {
                    navigation.navigate('TambahMasalah');
                }}
            >
                <Text style={styles.text_add}>
                    Tambah Laporkan Masalah
                </Text>
            </TouchableOpacity>
            {
                loadingData ?
                    <Text style={styles.loadingdata}>
                        Loading...
                    </Text>
                : 
                <FlatList
                    data={masalah}
                    style={styles.wraplist}
                    renderItem={renderMasalah}
                    keyExtractor={masalah => `${masalah.id_helpdesk}`}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerlist: {
        marginLeft: 15,
        marginBottom: 5
    },
    loadingdata: {
        textAlign: 'center',
        fontSize: 20
    },
    container_add: {
        justifyContent: "center",
        alignItems: 'center',
        margin: 15,
        backgroundColor: '#6BD098',
        padding: 8,
        borderRadius: 8,
    },
    text_add: {
        color: '#fff',
        fontWeight: 'bold',
        textAlignVertical: 'top',
        fontSize: 22,
        marginLeft: 15
    },
    wraplist: {
        maxHeight: 500
    }
})
