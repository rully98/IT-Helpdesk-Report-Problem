import React, { Component } from 'react'
import { Text, StyleSheet, View, Keyboard } from 'react-native'
import { Heading } from '../components/Heading'
import { Input } from '../components/Input'
import { FilledButton } from '../components/FilledButton'
import { TextButton } from '../components/TextButton'
import { Error } from '../components/Error'
import { IconButton } from '../components/IconButton'
import { AuthContainer } from '../components/AuthContainer'
import { AuthContext } from '../contexts/AuthContext'
import { Loading } from '../components/Loading'
import { Message } from '../components/Message'

export default function RegistrationScreen({navigation}) {
    const {register} = React.useContext(AuthContext);
    const [nip, setNip] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <AuthContainer>
            <IconButton style={styles.closeIcon} name={'close-circle-outline'} 
                onPress={() => {
                    navigation.pop()
                }} 
            />
                <Heading style={styles.title}>REGISTRASI</Heading>
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
                    title={'Submit'} 
                    style={styles.loginButton} 
                    onPress={async () => {
                        try{
                            Keyboard.dismiss();
                            setLoading(true);
                            const {data} = await register(nip, password);
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
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        right: 20
    }
  
})
