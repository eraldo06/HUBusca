import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ContainerBusca, Div, Lado01, Lado02, Input, ContainerResultado, TextoResul, Buttoon, DivUsuario, } from '../componetes/componetes'
import axios from "axios";

let linha = false;

const Home = (props: any) => {

    const [usario, setUsuario] = useState([]);
    const [name, setName] = useState('')
    const [mostrar, setMostrar] = useState(false)

    function mudarTexto(texto: any) {
        setName(texto)
        if (name.length > 1) {
            setMostrar(true)
        } else {

        }
    }
    const paginaDetalhes = () => {
      //  props.navigation.navigate('Detalhes',{ name: name });
    }


    let lista:any = []

    const [items, setItems] = useState(lista)

    const carregar = async () => {
        
        if (name.trim() != '') {
            axios
            .get(`https://api.github.com/users/${name}`)
            .then((res) => {
                items.push({
                    login: res.data.login,
                    nome: res.data.name,
                    id: res.data.id,
                    location: res.data.location,
                    avatar_url: res.data.avatar_url
                })
                if (res.data) {
                    setUsuario(res.data)
                }
              })
          

           
            linha = true;
            
          
            let item = items;
            setItems(item)
        } 
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
                            style={{ width: 100, height: 150}}
                        />
                    </Lado02>
                </Div>
                <Div>
                    <Input
                        placeholder="Digite o nome do usuário"
                        onChangeText={mudarTexto}
                        onSubmitEditing={carregar}
                    />
                    <Buttoon onPress={carregar}></Buttoon>
                </Div>
            </ContainerBusca>


            <ContainerResultado>
                <TextoResul>
                    {mostrar === false &&
                        <Text style={{ fontSize: 20, marginTop: 100 }}>Nenhum histórico...</Text>
                    }
                </TextoResul>

                {linha &&
                    <>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', margin: 20 }}>Usuário encontrado</Text>
                        <TextoResul>
                            <DivUsuario onTouchStart={paginaDetalhes}>
                                <Image source={{ uri: `${usario.avatar_url}` }}
                                    style={{ width: 80, borderRadius: 20 }}
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
                                    <DivUsuario>
                                        <Image source={{ uri: `${item.avatar_url}` }}
                                            style={{ width: 80, borderRadius: 20 }}
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