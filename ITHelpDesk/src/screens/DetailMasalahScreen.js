import React, {Component} from 'react'
import axios from 'axios'
import moment from "moment";
import Icon from 'react-native-ionicons'
import { FlatList, StyleSheet, View, Text, 
    TouchableOpacity, TouchableHighlight,
    Modal } from 'react-native'
import { HeaderIconButton } from '../components/HeaderIconButton'
import { ListPesan } from '../components/ListPesan'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import { BASE_URL } from '../config'
import { sleep } from '../utils/sleep'

export default function DetailMasalahScreen({route, navigation}) {

    const { id } = route.params;
    
    const { logout } = React.useContext(AuthContext);
    const state = React.useContext(UserContext);

    const [loadingData, setLoadingData] = React.useState(false);
    const [dataMasalah, setDataMasalah] = React.useState({});
    const [pesan, setDataPesan] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flex: 1, justifyContent: 'space-between', 
                    flexDirection: 'row', width: 90, alignItems: 'center' }}>
                    <HeaderIconButton name={'refresh'} 
                    onPress={() => {
                        setLoadingData(true);
                        getDetailMasalah();
                    }} />
                    <HeaderIconButton name={'log-out'} 
                    onPress={() => {
                        logout(state.user.nip);
                    }} />
                </View>
            )
        }),
        setLoadingData(true)
        getDetailMasalah()
    }, [navigation, logout])

    function getDetailMasalah() {
        axios.get(`${BASE_URL}api/detail-masalah?id=${id}`)
            .then(({data}) => {
                // console.log(data.pesan)
                setLoadingData(false);
                setDataMasalah(data.result);
                setDataPesan(data.pesan);
            })
            .catch(e => {
                console.log(e)
            })
    }

    function doneMasalah(feedback) {
        const mydata = {
            id_helpdesk: id,
            feedback: feedback
        }
        axios.post(`${BASE_URL}api/done-masalah`, mydata)
            .then(({data}) => {
                // console.log(data.status_code);
                setModalVisible(false);
                if(data.status_code == 200){
                    getDetailMasalah();
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    function renderPesan({item: pesan}){
        return <ListPesan pesan={pesan}></ListPesan>;
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Apakah Anda Puas?</Text>
                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "green" }}
                        onPress={() => {
                            // setModalVisible(!modalVisible);
                            doneMasalah(1);
                        }}
                        >
                        <Text style={styles.textStyle}>
                            <Icon name="thumbs-up"></Icon>
                        </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "red" }}
                        onPress={() => {
                            // setModalVisible(!modalVisible);
                            doneMasalah(2);
                        }}
                        >
                        <Text style={styles.textStyle}>
                            <Icon name="thumbs-down"></Icon>
                        </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                </View>
            </Modal>

            {
                loadingData ? 
                    <Text style={styles.loadingtxt}>Loading..</Text>
                : 
                <View>
                    {
                        dataMasalah.status_pengerjaan == "Done" ?
                            <Text style={[styles.donebtn, {color: 'green'}]}>
                                Sudah Terselesaikan <Icon style={{ fontSize: 17 }} name="checkmark-circle" color={"green"} />
                            </Text>
                        : 
                            <TouchableOpacity
                                onPress={() => {
                                    // doneMasalah()
                                    setModalVisible(true);
                                }}
                                style={styles.donebtn}
                            >   
                                <Text>
                                    <Icon name="checkmark-circle" color={"black"} />
                                </Text>
                            </TouchableOpacity> 
                    }
                    <Text>
                        Nama Masalah:
                    </Text>
                    <Text style={styles.txt}>
                        {dataMasalah.nama_helpdesk}
                    </Text>
                    <Text>
                        Deskripsi Masalah:
                    </Text>
                    <Text style={styles.txt}>
                        {dataMasalah.des_helpdesk}
                    </Text>
                    <Text>
                        Tanggal Laporan:
                    </Text>
                    <Text style={[styles.txt, {fontStyle: 'italic'}]}>
                        <Icon name="time" style={{ fontSize: 18 }} /> {moment(dataMasalah.tanggal_laporan).format("DD-MM-YYYY h:mm")}
                    </Text>
                    <Text style={{ textAlign: 'right' }}>
                        Status:
                    </Text>
                    <Text style={
                            [
                                styles.txt,
                                {color: dataMasalah.id_status_pengerjaan == "3" ? 'red': 
                                dataMasalah.id_status_pengerjaan == "4" ? 'green': 'orange',
                                textAlign: 'right' },
                            ]
                        }>
                        {dataMasalah.status_pengerjaan}
                    </Text>
                    {
                        dataMasalah.nip_executor != null ?
                            <View>
                                <Text style={{ textAlign: 'right' }}>
                                    Teknisi:
                                </Text>
                                <Text style={
                                        [
                                            styles.txt,
                                            {textAlign: 'right' },
                                        ]
                                    }>
                                    {dataMasalah.nama}
                                </Text>
                                {
                                    pesan != 0 ? 
                                        <View>
                                            <Text>
                                                Pesan:
                                            </Text>
                                            <FlatList
                                                data={pesan}
                                                style={styles.wraplist}
                                                renderItem={renderPesan}
                                                keyExtractor={pesan => `${pesan.id_message_helpdesk}`}
                                            />
                                        </View>
                                    : 
                                        <View>
                                            <Text>
                                                Pesan:
                                            </Text>
                                            <Text style={
                                                [
                                                    styles.txt,
                                                    {   
                                                        marginTop: 15, 
                                                        borderTopColor: '#eee',
                                                        borderTopWidth: 1,
                                                        paddingTop: 15
                                                    }
                                                ]
                                            }>
                                                Belum ada pesan!
                                            </Text>
                                        </View>
                                }
                            </View>
                        : null
                    }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        position: 'relative',
    },
    loadingtxt: {
        textAlign: 'center',
        fontSize: 20
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    wraplist: {
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        height: 200,
        overflow: 'scroll'
    }, 
    donebtn: {
        position: 'absolute',
        right: 15,
        zIndex: 9999
    }, 
    modalView: {
        height: 160,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5  
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: "center"
    }
})