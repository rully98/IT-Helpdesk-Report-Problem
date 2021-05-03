import React from 'react'
// import SecureStorage from 'react-native-secure-storage'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import { BASE_URL } from '../config'
import { sleep } from '../utils/sleep'
import {createAction} from '../utils/createAction'

export function useAuth() {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch(action.type){
      case 'SET_USER': 
        return {
          ...state,
          user: {
            ...action.payload
          }
        }
      case 'REMOVE_USER': 
        return {
          ...state,
          user: undefined
        }
      case 'SET_LOADING_SPLASH_SCREEN':
        return {
          ...state,
          loading: action.payload
        }
      default: 
        return state
    }
  },{
    user: undefined,
    loading: true
  });

  const auth = React.useMemo(
    () => ({
        login: async (nip, password) => {
          // await sleep(2000);
          const my_login = {
            nip: nip,
            password: password
          }
          const {data} = await axios.post(`${BASE_URL}api/login`, my_login);
          console.log(data)
          if(data.result != null){
            dispatch(createAction('SET_USER', data.result));
            // await SecureStorage.setItem('user', JSON.stringify(data.result));
            await AsyncStorage.setItem('user', JSON.stringify(data.result))
          }
          return data;
        },
        logout: async (nip) => {
          // console.log('logout');
          const my_logout = {
            nip: nip
          }
          const data = await axios.post(`${BASE_URL}api/logout`, my_logout);

          dispatch(createAction('REMOVE_USER'));
          await AsyncStorage.removeItem('user');
        },
        register: async (nip, password) => {
          await sleep(2000);
          const result = await axios.post(`${BASE_URL}api/register`, {
            nip: nip,
            password: password
          });
          return result;
        }
      }), 
    [],
  );

  React.useEffect(() => {
    sleep(2000).then(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING_SPLASH_SCREEN', false));
      })
    });
  }, [])

  const masalah = React.useMemo(
    () => ({
      getDetailMasalah: async (id) => {
        await sleep(2000)
      }
    }),
    []
  )

  return {auth, state};
}