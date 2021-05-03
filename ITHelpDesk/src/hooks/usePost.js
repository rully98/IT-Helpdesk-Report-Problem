import React from 'react';
import axios from 'axios';

import {BASE_URL} from '../config';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';

export function usePost() {

    const [state, dispatch] = React.useReducer((state, action) => {
        switch(action.type){
            case 'SET_LOADING_ADD':
                return {
                    ...state,
                    loadingAdd: action.payload,
                }
            case 'SET_STATUS_SUCCESS':
                return {
                    ...state,
                    statusSuccess: action.payload,
                }
            default: 
                return state
        }
        
    },{
        loadingAdd: false,
        statusSuccess: false
    });

    const postData = React.useMemo(
        () => ({
            addMasalah: async (nip, nama_masalah, des_masalah) => {

                dispatch(createAction('SET_LOADING_ADD', true));

                await sleep(2000);

                const datamasalah = {
                    nip_user: nip,
                    nama_helpdesk: nama_masalah,
                    des_helpdesk: des_masalah,
                    id_status_pengerjaan: 1
                }
                const {data} = await axios.post(`${BASE_URL}api/add-masalah`, datamasalah);
                // console.log(data)
                if(data.status_code == 200){
                    dispatch(createAction('SET_LOADING_ADD', false));

                    dispatch(createAction('SET_STATUS_SUCCESS', true));
                    setTimeout(() => {
                        dispatch(createAction('SET_STATUS_SUCCESS', false));
                    }, 5000)
                }
                return data;
            }
        })
    )

  return {postData, state};
}