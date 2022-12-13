import { View, Text, StyleSheet, Image, FlatList, VirtualizedList,Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Div1, Div2, Container, ContainerRepositorios, Repositorios, Caminho, ContainerPage } from "../componetes/componetesDetalhes";
import axios from "axios";

type ResultadosDoUsuario ={
    login:string;
    name: string;
    avatar: string;
    id:number;
    location:number;
    sqtSeguirdor:number;
}

function Detalhes(props: any) {

    let nomeUsuario = props.route.params.name
    let lista:any = []
    const [repo, setRepo] = useState([lista]);

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [id, setId] = useState()
    const [location, setLocation] = useState('')
    const [sqtSeguirdor, setSqtSeguirdor] = useState()




    const carregar = async () => {
        axios
        .get(`https://api.github.com/users/${nomeUsuario}`)
        .then((res)=>{
            setLogin(res.data.login)
            setAvatar(res.data.avatar_url);
            setLocation(res.data.location);
            setId(res.data.id);
            setName(res.data.name);
        })
        .catch((res)=>{
            console.log(res);
            
        })
    }
    const quantidadeDeSeguidor = async () => {
        axios
        .get(`https://api.github.com/users/${nomeUsuario}/followers`)
        .then((res)=>{
            setSqtSeguirdor(res.data.length)
        })
        .catch((res)=>{
            console.log(res);
            
        })
    }

    const carregarR = async () => {
        axios
        .get(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then((res)=>{
            setRepo(res.data)
        })
        .catch((res)=>{
            console.log(res);
            
        })
    }

    carregar()
    quantidadeDeSeguidor()
    carregarR()

    function teste(props:any) {
        Linking.openURL('https://www.youtube.com/')
    }
    let data:any
    return (
        <>
            <ContainerPage>
                <Container>
                    <Div1>
                        <Image
                            source={{ uri: `${avatar}` }}
                            style={{ width: 180, height: 200, borderRadius: 20 }}
                        />
                    </Div1>
                    <Div2>
                        <View style={{ margin: 10 }} >
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{login}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{name}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>ID: {id}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>Seguidores:{sqtSeguirdor}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{location}</Text>
                        </View>
                    </Div2>

                </Container>
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 20, fontWeight: 'bold', marginLeft: 15 }}>Repositorios:</Text>
            </ContainerPage>
            <ContainerRepositorios>
                <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <FlatList
                    
                        data={repo}
                        renderItem={({item}) => (
                            <Caminho onPress={teste}>
                            <Repositorios>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text>{item.language}</Text>
                                <Text>{item.description}</Text>
                                <Text>Criado:{item.created_at}</Text>
                                <Text>Ultimo Push: {item.updated_at}</Text>
                            </Repositorios>
                            </Caminho>
                            
                        )}
                        keyExtractor={item => item.name}
                    ></FlatList>
                </View>
            </ContainerRepositorios> 

        </>
    )
}



export default Detalhes;