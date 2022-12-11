import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";


function Detalhes(props:any){

let nomeUsuario = props.route.params.name
const [usario, setUsuario] = useState([]);

const carregar = async () => {
    const req = await fetch(`https://api.github.com/users/${nomeUsuario}`);
    const json = await req.json();
    
    if (json) {
        setUsuario(json)
    }
}
carregar()

    return(
        <View>
            <Text style={{ marginLeft: 10 }}>{usario.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Detalhes;