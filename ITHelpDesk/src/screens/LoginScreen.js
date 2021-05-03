import React, { Component } from 'react'
import { Text, StyleSheet, View, Keyboard } from 'react-native'
import { Heading } from '../components/Heading'
import { Input } from '../components/Input'
import { FilledButton } from '../components/FilledButton'
import { TextButton } from '../components/TextButton'
import { Error } from '../components/Error'
import { AuthContainer } from '../components/AuthContainer'
import { AuthContext } from '../contexts/AuthContext'
import { Loading } from '../components/Loading'

export default function LoginScreen({navigation}) {
    const {login} = React.useContext(AuthContext);
    const [nip, setNip] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <AuthContainer>
            <Heading style={styles.title}>LOGIN</Heading>
            {
                error !== '' ?
                    <Error error={error} />
                : null
            }
            {
                message !== '' ?
                    <Message message={message} />
                : null
            }
            <Input 
                style={styles.input} 
                placeholder={'Nip'} 
                value={nip}
                onChangeText={setNip}
            />
            <Input 
                style={styles.input} 
                placeholder={'Password'} secureTextEntry
                value={password}
                onChangeText={setPassword}
                />
            <FilledButton 
                title={'Login'} 
                style={styles.loginButton} 
                onPress={async () => {
                    try{
                        Keyboard.dismiss();
                        setLoading(true);
                        const data = await login(nip, password);
                        console.log(data);
                        if(data.status_code == 200){
                            setLoading(false);
                            setMessage(data.message);
                            setTimeout(() => {
                                setMessage('');
                                navigation.pop();
                            }, 7000)
                        } else {
                            setLoading(false);
                            setError(data.message);
                            setTimeout(() => {
                                setError('');
                            }, 7000)
                        }
                    } catch(e) {
                        console.log(e);
                        setError(e.message);
                        setTimeout(() => {
                            setError('');
                        }, 7000)
                        setLoading(false);
                    }
                }}
            />
            <TextButton 
                title={'Registrasi'} 
                onPress={() => {
                    navigation.navigate('Registration')
                }}
            />
            <Loading loading={loading}/>
        </AuthContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 8
    },
    title: {
        marginBottom: 48
    },
    loginButton: {
        marginVertical: 32
    }
  
})
