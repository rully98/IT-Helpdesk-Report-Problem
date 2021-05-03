import React, { Component } from 'react'
import Icon from 'react-native-ionicons'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export function IconButton({name, style, onPress}) {

    return (
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={onPress}
        >
            <Icon name={name} color={'#6BD098'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})
