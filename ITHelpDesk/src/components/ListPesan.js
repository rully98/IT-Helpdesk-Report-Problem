import React from 'react'
import Icon from 'react-native-ionicons'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

import moment from "moment";

export function ListPesan({pesan}) {

    return (
        <View style={styles.container}>
            <Text style={styles.txtpesan}>"{pesan.message}"</Text>
            <Text style={styles.txtpesan}>
                <Icon name="time" style={{ fontSize: 16 }} /> {moment(pesan.message_created_at).format("DD-MM-YYYY h:mm")}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingLeft: 0,
        borderRadius: 10
    },
    txtpesan: {
        fontSize: 16,
        fontStyle: 'italic'
    }
})
