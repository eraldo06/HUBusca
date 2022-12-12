import { View, Text, StyleSheet, Image, FlatList, VirtualizedList,Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Div1, Div2, Container, ContainerRepositorios, Repositorios, Caminho, ContainerPage } from "../componetes/componetesDetalhes";


function Detalhes(props: any) {

    let nomeUsuario = props.route.params.name
    const [usuario, setUsuario] = useState([]);
    const [repo, setRepo] = useState([]);
    const [seguidor, setSeguidor] = useState([]);


    const carregar = async () => {
        const req = await fetch(`https://api.github.com/users/${nomeUsuario}`);
        const json = await req.json();

        if (json) {
            setUsuario(json)
        }

    }
    const quantidadeDeSeguidor = async () => {
        const req = await fetch(`https://api.github.com/users/${nomeUsuario}/followers`);
        const json = await req.json();

        if (json) {
            setSeguidor(json)
        }
    }

    const carregarR = async () => {
        const req = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`);
        const json = await req.json();

        if (json) {
            setRepo(json)
        }
    }

    carregar()
    quantidadeDeSeguidor()
    carregarR()

    // Variaveis da ContainerPage
    const Uavatar = usuario.avatar_url;
    const Ulogin = usuario.login;
    const Uname = usuario.name;
    const Ulocation = usuario.location;
    const Uid = usuario.id;
    const Useguidor = seguidor.length;


    // Variaveis da ContainerRepositorios
    function teste() {
        Linking.openURL('https://www.youtube.com/')
    }
    return (
        <>
            <ContainerPage>
                <Container>
                    <Div1>
                        <Image
                            source={{ uri: `${Uavatar}` }}
                            style={{ width: 180, height: 200, borderRadius: 20 }}
                        />
                    </Div1>
                    <Div2>
                        <View style={{ margin: 10 }} >
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{Ulogin}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{Uname}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>ID: {Uid}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>Seguidores:{Useguidor}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5 }}>{Ulocation}</Text>
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
                            <Caminho onPress={teste} >
                            <Repositorios>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text>{item.language}</Text>
                                <Text>{item.description}</Text>
                                <Text>Criado: {item.created_at}</Text>
                                <Text>Ultimo Push: {item.updated_at}{}</Text>
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