import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export function TextButton({title, style, onPress}) {

    return (
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15
    },
    text: { 
        color: '#6BD098',
        fontWeight: 'bold',
        fontSize: 14
    }
})
