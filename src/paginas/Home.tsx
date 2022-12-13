import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, FlatList, DatePickerAndroidOpenReturn} from 'react-native';
import { ContainerBusca, Div, Lado01, Lado02, Input, ContainerResultado, TextoResul, Buttoon, DivUsuario, Div2 } from '../componetes/componetes'
import axios from "axios";

let linha = false;

type BuscaUsuario = {
    login: string;
    name: string;
    avatar: string;
    id: number;
    location: number;
}

const Home = (props:any) => {

    const [usario, setUsuario] = useState([]);
    const [nome, setNome] = useState('')
    const [mostrar, setMostrar] = useState(false)

    // variaveis para mostrar no resultado da pesquisa
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [id, setId] = useState('')
    const [location, setLocation] = useState('')


    function mudarTexto(texto: any) {
        setNome(texto)
        if (nome.length > 1) {
            setMostrar(true)
        }
    }
    const paginaDetalhes = () => {
        props.navigation.navigate('Detalhes', { name: nome });
    }


    let lista: any = []
    function limpar() {
        setItems([])}

    const [items, setItems] = useState(lista)
    const carregar = async () => {
        if (nome.trim() != '') {
            axios
                .get(`https://api.github.com/users/${nome}`)
                .then((res) => {
                    setLogin(res.data.login)
                    setAvatar(res.data.avatar_url);
                    setLocation(res.data.location);
                    setId(res.data.id);
                    setName(res.data.name);

                    items.push({
                        login: res.data.login,
                        nome: res.data.name,
                        id: res.data.id,
                        location: res.data.location,
                        avatar_url: res.data.avatar_url
                    })
                    if (res.data) {
                        setUsuario(res.data)}})
                .catch((res) => {
                    console.log(res);})
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
                            style={{ width: 100, height: 150 }}
                        />
                    </Lado02>
                </Div>
                <Div>
                    <Input
                        placeholder="Digite o nome do usuário"
                        onChangeText={mudarTexto}
                        onSubmitEditing={carregar}/>
                    <Buttoon onPress={carregar}></Buttoon>
                </Div>
            </ContainerBusca>

            <ContainerResultado >
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
                                <Image source={{ uri: `${avatar}` }}
                                    style={{ width: 90, borderRadius: 20 }}
                                />
                                <View>
                                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>{login}</Text>
                                    <Text style={{ marginLeft: 10 }}>{name}</Text>
                                    <Text style={{ marginLeft: 10 }}>{id}</Text>
                                    <Text style={{ marginLeft: 10, marginBottom: 5 }}>{location}</Text>
                                </View>
                            </DivUsuario>
                        </TextoResul>
                    </>
                }
                {linha &&
                    <>
                        <Div2>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Recentes</Text>
                            <Text onPress={limpar} style={{ fontSize: 17, fontWeight: 'bold', }}>Limpar</Text>
                        </Div2>
                        <FlatList
                            data={items}
                            renderItem={({ item }) => (
                                <TextoResul onTouchEnd={() => { props.navigation.navigate('Detalhes', { name: item.login }); }}>
                                    <DivUsuario >
                                        <Image
                                            source={{ uri: `${item.avatar_url}` }}
                                            style={{ width: 90, borderRadius: 20 }}
                                        />
                                        <View >
                                            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>{item.login}</Text>
                                            <Text style={{ marginLeft: 10 }}>{item.nome}</Text>
                                            <Text style={{ marginLeft: 10 }}>{item.id}</Text>
                                            <Text style={{ marginLeft: 10, marginBottom: 5 }}>{item.location}</Text>
                                        </View>
                                    </DivUsuario>
                                </TextoResul>
                            )}
                            keyExtractor={item => item.login}>
                        </FlatList>
                    </>}
            </ContainerResultado>
        </>
    )
}

export default Home;