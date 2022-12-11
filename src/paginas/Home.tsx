import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ContainerBusca, Div, Lado01, Lado02, Input, ContainerResultado, TextoResul, Buttoon, DivUsuario, } from '../componetes/componetes'




let linha = false
const Home = (props:any) =>  {

    const [usario, setUsuario] = useState([]);
    const [name, setName] = useState('')
    const [mostrar, setMostrar] = useState(false)

    const carregar = async () => {
        const req = await fetch(`https://api.github.com/users/${name}`);
        const json = await req.json();

        if (json) {
            setUsuario(json)
        }
        linha = true

    }


    function mudarTexto(texto: any) {
        setName(texto)
        if (name.length > 1) {
            setMostrar(true)
        } else {

        }
    }
    const paginaDetalhes = () =>{
        props.navigation.navigate('Detalhes',{name:name});
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

                <Input onChangeText={mudarTexto} />
                <Buttoon onPress={carregar}>
                    <Text style={{ fontSize: 20 }}>Carregar</Text>
                </Buttoon>


            </ContainerBusca>
            

            <ContainerResultado>
                <TextoResul>
                    {mostrar === false &&
                       
                            <Text style={{ fontSize: 20 }}>Nenhum historico...</Text>
                    }
                            {linha &&
                          
                                <DivUsuario>
                                    <Buttoon onPress={paginaDetalhes}>
                                    <Image source={{ uri: `${usario.avatar_url}` }}
                                        style={{ width: 80, height: 80, borderRadius: 20 }}

                                    />
                                  </Buttoon>
                                    
                                    <View>
                                        <Text style={{ marginLeft: 10 }}>{usario.login}</Text>
                                        <Text style={{ marginLeft: 10 }}>{usario.name}</Text>
                                        <Text style={{ marginLeft: 10 }}>{usario.id}</Text>
                                        <Text style={{ marginLeft: 10 }}>{usario.location}</Text>
                                    </View>
                                </DivUsuario>
                         
                    }
                </TextoResul>
            </ContainerResultado>
        </>
    )
}

export default Home;