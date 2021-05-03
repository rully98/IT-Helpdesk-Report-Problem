import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export function AuthContainer({children}) {

    return (
        <View
            style={styles.container}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: "center"
    },
})
