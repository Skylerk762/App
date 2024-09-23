
import {Button, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { Image } from "react-native";

export default function App() {
const navigation= useNavigation ()
const [admApertado, setadmApertado] =useState(false)
const [porteiroApertado, setporteiroApertado] =useState(false)
 function AdmPressionado () {
  setadmApertado (!admApertado)
  setporteiroApertado(false)

}
 function porteiroPressionado () {
  setadmApertado (false)
  setporteiroApertado(!porteiroApertado)

}
  return (
   <View style ={{
    flex:1,
    justifyContent:'center',
    padding:20
   }
   
  }>
     <Image style={{
      width:150,
      height:150,
      resizeMode:"contain",
      alignSelf:"center",
      marginBottom:60
     }} source={require("../imagens/img-escola.png")} />
    <Text style={{
      width:"22%",
      fontWeight:"bold",
      color:"darkgray"
    }}>Usuário</Text>
    <TextInput style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:8,
    width:"100%",
    padding:10,
    shadowOpacity:0.25,
    marginBottom:20,
    borderColor:"gray",
    shadowColor:"black",
    backgroundColor:"white",
    elevation:5
    
    
   }}
    placeholder="Digite o seu usuário"
    >
    
    </TextInput>
    <Text style={{
      width:"100%",
      fontWeight:"bold",
      color:"darkgray"
    }}
    >Senha</Text>
   <TextInput  style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:8,
    width:"100%",
    padding:10,
    shadowOpacity:0.25,
    marginBottom:20,
    borderColor:"gray",
    shadowColor:"black",
    backgroundColor:"white",
    elevation:5
   }}
    placeholder="informe a senha"  />
    <Text style={{
      width:"100%",
      fontWeight:"bold",
      color:"darkgray"
    }}>Confirmar senha</Text>
   <TextInput style ={{
   alignSelf:'center',
   borderWidth:1,
   borderRadius:8,
   width:"100%",
   padding:10,
   shadowOpacity:0.25,
   marginBottom:20,
   borderColor:"gray",
   shadowColor:"black",
   backgroundColor:"white",
   elevation:5
   }} placeholder="confirme a senha"/>
   <Text style={{
    alignSelf:"center",
    margin:7,
    fontWeight:"bold",
    color:"darkgray"
   }}>Tipo de conta:</Text>
   <View style={{
    alignSelf:'center',
    alignContent:"space-between",
    flexDirection:"row"
   }}>

    <CheckBox title=""
    checkedIcon="check"
    uncheckedIcon="square-o"
    checkedColor="blue"
    checked={admApertado}
    onPress={()=> AdmPressionado()}
    >
      
    </CheckBox>
    <Text style={{
      marginTop:16,
      marginLeft:-20,
      color:"darkgray",
      fontWeight:"bold"
    }}>Administração</Text>

    <CheckBox title=""
    checkedIcon="check"
    uncheckedIcon="square-o"
    checkedColor="blue"
    checked={porteiroApertado}
    onPress={()=>porteiroPressionado ()}
    >
      
    </CheckBox>
    <Text style={{
      marginTop:16,
      marginLeft:-20,
      color:"darkgray",
      fontWeight:"bold"
    }}>
    Porteiro</Text>
      </View>

   <TouchableOpacity style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:8,
    width:"100%",
    padding:10,
    margin: 5,
    backgroundColor:'lightblue'
   }}>
     <Text style ={{
      alignSelf:'center'
     }}>
      Criar conta
   </Text>
   </TouchableOpacity>
   <TouchableOpacity style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:"100%",
    padding:10,
    margin: 5,
    backgroundColor:'lightblue'
   }} 
   onPress={()=> navigation.goBack()}>
    <Text style ={{
      alignSelf:'center'
    }}>
      voltar
    </Text>
   </TouchableOpacity>

   

   </View>




);
}


