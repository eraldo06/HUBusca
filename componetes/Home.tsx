import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { ContainerBusca, Div, Lado01, Lado02, Input, ContainerResultado, TextoResul, Buttoon, DivUsuario,} from './componetes'




let linha = false
const Home = () => {

    const [usario, setUsuario] = useState([]);

    const carregar = async () => {
        const req = await fetch(`https://api.github.com/users/${name}`);
        const json = await req.json();

        if (json) {
            setUsuario(json)
        }
        linha = true
      
    }

    const [name, setName] = useState('')
    const [mostrar, setMostrar] = useState(false)

    function mudarTexto(texto: any) {
        setName(texto)
        if(name.length > 1){
            setMostrar(true)
          }else{
       
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
                            source={require('../assets/logi.png')}
                            style={{ width: 100, height: 150 }}
                        />
                    </Lado02>
                </Div>

                <Input onChangeText={mudarTexto} />
                <Buttoon onPress={carregar}>
                    <Text style={{fontSize:20}}>Carregar</Text>
                    {mostrar === false &&
                        <Text style={{ fontSize: 20 }}>Nenhum historico...</Text>
                    }
                  
                    
                </Buttoon>
          

            </ContainerBusca>

            <ContainerResultado>
                <TextoResul>
                    {mostrar === false &&
                        <Text style={{ fontSize: 20 }}>Nenhum historico...</Text>
                    }
                    {linha &&
                        <DivUsuario>
                        
                        <Image source={{ uri: `${usario.avatar_url}` }}
                            style={{ width: 80, height: 80, borderRadius:20 }}
                           
                        />
                        <View>
                            <Text style={{marginLeft:10}}>{usario.login}</Text>
                            <Text style={{marginLeft:10}}>{usario.name}</Text>
                            <Text style={{marginLeft:10}}>{usario.id}</Text>
                            <Text style={{marginLeft:10}}>{usario.location}</Text>
                        </View>
                    </DivUsuario>
                    }
                    





                </TextoResul>
            </ContainerResultado>
        </>
    )
}

export default Home;