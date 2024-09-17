import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {
const navigation= useNavigation ()
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
    placeholder="informe a senha"  />
   <TextInput style ={{
    alignSelf:'center',
    borderWidth:1,
    borderRadius:5,
    width:400,
    padding:10,
    margin: 5
   }} placeholder="confirme a senha"/>

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
      Criar conta
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