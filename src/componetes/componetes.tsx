import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

export const Input = styled.TextInput`
    width: 80%;
    background-color: #3a4141;
    color: white;
    height: 50px;
    border-radius: 10px;
    margin-left: 8%;
    margin-top: 15%;
`;

export const ContainerBusca = styled.View`
    min-height: 65%;
    background-color: aqua;
`;
export const Div = styled.View`
    flex-direction: row;
    margin-top: 10%;
    margin-left: 5%;
`;
export const Lado01 = styled.View`
    height: 70%;
    width: 60%;
`
export const Lado02 = styled.View`
    height: 70%;
    width: 40%;
`

// Resultados
export const ContainerResultado = styled.View`
    flex:1;
    background-color: #3a4141;
`;

export const TextoResul = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`

export const Buttoon = styled.Text`
        background-color: black;
        width:80%;
        margin-left: 8%;
        min-height: 50px;
        color: white;
        border-radius: 15px;
        display: flex;
`

export const DivUsuario = styled.View`
    flex-direction: row;
    background-color: white;
    width: 80%;
    border-radius: 20px;
`
