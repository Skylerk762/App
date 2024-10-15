
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Cadastro from './Cadastro'
import Login from './Login'
import Menu from './Menu'
import VisualizarTurmas from './VisualizarTurmas'
import GerenciarTurmas from "./GerenciarTurmas"
import AddTurma from "./AddTurma"
import RemoverTurma from "./RemoverTurma"
import LiberarTurmas from "./LiberarTurmas"
import RecuperarSenha from "./RecuperarSenha"
import TelaLoading from "./TelaLoading"

export default function AppNavigator(){
    const Stack = createStackNavigator()
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="TelaLoading" component={TelaLoading}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="VisualizarTurmas" component={VisualizarTurmas}/>
            <Stack.Screen name="RecuperarSenha" component={RecuperarSenha}/>
            <Stack.Screen name="LiberarTurmas" component={LiberarTurmas}/>
            <Stack.Screen name="RemoverTurma" component={RemoverTurma}/>
            <Stack.Screen name="AddTurma" component={AddTurma}/>
            <Stack.Screen name="GerenciarTurmas" component={GerenciarTurmas}/>
            <Stack.Screen name="Cadastro" component={Cadastro}/>
            <Stack.Screen name="Menu" component={Menu}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )

}