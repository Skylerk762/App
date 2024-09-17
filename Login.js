import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
    const navigation = useNavigation() 
  return (
   <View style ={{
    flex:1,
    justifyContent:'center',
    
   }
    
   }>
   <TextInput  style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:400,
    padding:10,
    margin: 5
   }}
    placeholder="informe o email"  />
   <TextInput style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:400,
    padding:10,
    margin: 5
   }} placeholder="informe a senha"/>

   <TouchableOpacity style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:400,
    padding:10,
    margin: 5,
    backgroundColor:'lightblue'
   }}>
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
    width:400,
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