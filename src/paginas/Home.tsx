import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ContainerBusca, Div, Lado01, Lado02, Input, ContainerResultado, TextoResul, Buttoon, DivUsuario, } from '../componetes/componetes'

let linha = false
const Home = (props: any) => {

    const [usario, setUsuario] = useState([]);
    const [name, setName] = useState('')
    const [mostrar, setMostrar] = useState(false)
    const [historico, setHistorico] = useState([]);




    function mudarTexto(texto: any) {
        setName(texto)
        if (name.length > 1) {
            setMostrar(true)
        } else {

        }
    }
    const paginaDetalhes = () => {
        // props.navigation.navigate('Detalhes',{ name: name });
    }



    let lista:any = []

    const [items, setItems] = useState(lista)

    const carregar = async () => {
        const req = await fetch(`https://api.github.com/users/${name}`);
        const json = await req.json();

        if (json) {
            setUsuario(json)
        }
        linha = true;


        let item = items;
        items.push({
            login: json.login,
            nome: json.name,
            id: json.id,
            location: json.location,
            avatar_url: json.avatar_url
        })
        setItems(item)


    }
    return (
        <>
            <ContainerBusca>
                <Div>
                    <Lado01>
                        <Text></Text>
                        <Text style={{ fontSize: 35 }}>HUBusca</Text>
                        <Text style={{ fontSize: 16 }}>Encrotre os melhores</Text>
                        <Text style={{ fontSize: 16 }}>repositórios no github</Text>
                    </Lado01>
                    <Lado02>
                        <Image
                            source={require('../../assets/logi.png')}
                            style={{ width: 100, height: 150 }}
                        />
                    </Lado02>
                </Div>
                <Div>
                    <Input
                        placeholder="Digite o nome do usuário"
                        onChangeText={mudarTexto}
                        onSubmitEditing={carregar}
                    />
                    <Buttoon onPress={carregar}>
                        <Text style={{ fontSize: 20 }}>Carregar</Text>
                    </Buttoon>
                </Div>



            </ContainerBusca>


            <ContainerResultado>
                <TextoResul>
                    {mostrar === false &&

                        <Text style={{ fontSize: 20 }}>Nenhum historico...</Text>
                    }
                </TextoResul>

                {linha &&
                    <>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', margin: 20 }}>Usuário encontrado</Text>
                        <TextoResul>
                            <DivUsuario onTouchStart={paginaDetalhes}>
                                <Image source={{ uri: `${usario.avatar_url}` }}
                                    style={{ width: 80, height: 80, borderRadius: 20 }}
                                />



                                <View>
                                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>{usario.login}</Text>
                                    <Text style={{ marginLeft: 10 }}>{usario.name}</Text>
                                    <Text style={{ marginLeft: 10 }}>{usario.id}</Text>
                                    <Text style={{ marginLeft: 10 }}>{usario.location}</Text>
                                </View>
                            </DivUsuario>
                        </TextoResul>
                    </>
                }
                {linha &&
                    <>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', margin: 20 }}>Recentes</Text>

                        <FlatList
                            data={items}
                            renderItem={({ item }) => (

                                <TextoResul>
                                    <DivUsuario onTouchStart={paginaDetalhes}>
                                        <Image source={{ uri: `${item.avatar_url}` }}
                                            style={{ width: 80, height: 80, borderRadius: 20 }}
                                        />
                                        <View>
                                            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>{item.login}</Text>
                                            <Text style={{ marginLeft: 10 }}>{item.nome}</Text>
                                            <Text style={{ marginLeft: 10 }}>{item.id}</Text>
                                            <Text style={{ marginLeft: 10 }}>{item.location}</Text>
                                        </View>
                                    </DivUsuario>
                                </TextoResul>
                            )}
                            keyExtractor={item => item.nome}
                        >
                        </FlatList>
                    </>}

            </ContainerResultado>
        </>
    )
}

export default Home;