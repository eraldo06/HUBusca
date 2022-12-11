import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const Input = styled.TextInput`
    width: 80%;
    background-color: black;
    height: 50px;
    border-radius: 10px;
    align-content: center;
    align-items: center;
`;

const ContainerBusca = styled.View`
    height: 35%;
    background-color: aqua;
    flex-direction: row;
`;
const Lado01 = styled.View`
    
    height: 70%;
    width: 60%;

`
const Lado02 = styled.View`
    
    height: 70%;
    width: 40%;
`

const ContainerResultado = styled.View`
    flex: 1;
    background-color: #3a4141;
`;


const Home = () => {
    return (
        <>
            <ContainerBusca>
                
                    <Lado01>
                        <Text></Text>
                        <Text></Text>
                        <Text style={{fontSize:35}}>HUBusca</Text>
                        <Text style={{fontSize:17}}>Encrotre os melhores</Text>
                        <Text style={{fontSize:17}}>repositórios no github</Text>
                    </Lado01>

                    <Lado02>
                        
                        <Image
                        source={require('../assets/logi.png')}
                        style={{ width: 100, height: 150 }}
                        />
                    </Lado02>
               
            </ContainerBusca>

            <ContainerResultado>

            </ContainerResultado>
        </>
    )
}




export default Home;