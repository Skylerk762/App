import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from './Login'
import Cadastro from './Cadastro'
import Menu from "./Menu"
export default function AppNavigator(){
    const Stack = createStackNavigator()
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Cadastro" component={Cadastro}/>
                <Stack.Screen name="Menu" component={Menu}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}