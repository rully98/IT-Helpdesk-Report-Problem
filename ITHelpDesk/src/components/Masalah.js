import React from 'react'

import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

import moment from "moment";

export function Masalah({masalah, navigation}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DetailMasalah', {
                        id: masalah.id_helpdesk
                    });
                }}
            >
                <Text style={styles.name}>{masalah.nama_helpdesk}</Text>
                <View style={styles.bottom}>
                    <Text style={
                            [
                            {color: masalah.id_status_pengerjaan == "3" ? 'red': 
                            masalah.id_status_pengerjaan == "4" ? 'green': 'orange' },
                            ]
                        }>{masalah.status_pengerjaan}</Text>
                    <Text style={styles.tanggal}>
                        {moment(masalah.tanggal_laporan).format("DD-MM-YYYY h:mm")}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    tanggal: {
        fontStyle: 'italic'
     },
    bottom: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})
