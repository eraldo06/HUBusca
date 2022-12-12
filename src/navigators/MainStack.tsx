import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../paginas/Home";
import Detalhes from "../paginas/Detalhes";

const MainStack = createStackNavigator();

export default ()=>{
    return(
    <MainStack.Navigator>
        
        <MainStack.Screen name="Home" component={Home} options={{
            title:'',
            headerStyle:{
                height:30,
            }
            }} />
        <MainStack.Screen name="Detalhes" component={Detalhes} options={{title:''}}/>
    </MainStack.Navigator>
    )
}