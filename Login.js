
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
export default function Login() {
    const navigation = useNavigation() 
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
     }} source={require("./imagens/img-escola.png")} />

   <TextInput  style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:8,
    width:"100%",
    padding:10,
    shadowOpacity:-0.25,
    marginBottom:20,
    borderColor:"gray",
    shadowColor:"black",
    backgroundColor:"white",
    elevation:5
   }}
    placeholder="informe o email"  />
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
   }} placeholder="informe a senha"/>

   <TouchableOpacity style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:"100%",
    padding:10,
    margin: 5,
    backgroundColor:'lightblue'
   }} onPress={()=> navigation.navigate("Menu")}>
     <Text style ={{
      alignSelf:'center'
     }}>
   Entrar
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
   }} onPress={()=>navigation.navigate("Cadastro")}>
    <Text style ={{
      alignSelf:'center'
    }}>
      Cadastro
    </Text>
   </TouchableOpacity>
   </View>
   


    
  );

}