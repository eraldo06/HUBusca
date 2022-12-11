import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Div1, Div2, Container, ContainerRepositorios, Repositorios, Caminho, ContainerPage } from "../componetes/componetesDetalhes";


function Detalhes(props: any) {

    let nomeUsuario = props.route.params.name
    const [usuario, setUsuario] = useState([]);
    const [repo, setRepo] = useState('');

    const carregar = async () => {
        const req = await fetch(`https://api.github.com/users/${nomeUsuario}`);
        const json = await req.json();

        if (json) {
            setUsuario(json)
        }
    }

    const carregarR = async () => {
        const req = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`);
        const json = await req.json();

        if (json) {
            setRepo(json)
        }
    }

    return (
        <>
            <ContainerPage>
                <Container>
                    <Div1>
                        <Image
                            source={require('../../assets/eraldo.png')}
                            style={{ width: 180, height: 200, borderRadius: 20 }}
                        />

                    </Div1>
                    <Div2>
                        <View style={{ margin: 10 }}>
                            <Text>{usuario.login}login</Text>
                            <Text>{usuario.name}name</Text>
                            <Text>{usuario.name}Localização</Text>
                            <Text>{usuario.name}ID</Text>
                            <Text>seguidores:{usuario.name}</Text>
                        </View>

                    </Div2>

                </Container>
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 20, fontWeight: 'bold',marginLeft: 15 }}>Repositorios:</Text>
            </ContainerPage>
            <ContainerRepositorios>
                <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <Repositorios>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Projeto-calculadora</Text>
                        <Text>HTML</Text>
                        <Text>Descrição</Text>
                        <Text>Criado: 06/02/2022</Text>
                        <Text>Ultimo Push: 06/02/2022</Text>
                    </Repositorios>
                </View>

            </ContainerRepositorios>

        </>
    )
}



export default Detalhes;