import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export function Error({error}) {

    return (
        <View
            style={[styles.container]}
        >
            <Text style={styles.text}>
                {error}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: { 
        color: 'red',
        fontWeight: 'bold',
        fontSize: 14
    }
})
