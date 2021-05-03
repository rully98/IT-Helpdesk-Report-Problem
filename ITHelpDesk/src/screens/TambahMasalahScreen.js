import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HeaderIconButton } from '../components/HeaderIconButton'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import { FormMasalah } from '../components/FormMasalah'

export default function TambahMasalahScreen({navigation}) {
    const { logout } = React.useContext(AuthContext);
    const state = React.useContext(UserContext);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderIconButton name={'log-out'} 
                onPress={() => {
                    logout(state.user.nip);
                }} />
        })
    }, [navigation, logout])

    return (
        <View style={styles.container}>
            <FormMasalah navigation={navigation} />
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
    }
})
