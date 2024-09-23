import { Button, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {
const navigation= useNavigation ()
  return (
   <View style={{ flex:1, justifyContent:'center'}}>
     <Image style={{
      width:150,
      height:150,
      resizeMode:"contain",
      alignSelf:"center",
     }} source={require("../imagens/img-escola.png")} />

     <Text
     style={{
      color:'gray',
      fontSize:20,
      alignSelf:"center",
      marginTop:'5%',
      fontWeight:'bold'
     }}
     >Tela de Menu</Text>

<View style={{flexDirection:'row', justifyContent:"center", marginTop:"10%"}}>
<TouchableOpacity style={{
      marginLeft:'5%',
      backgroundColor:'blue',
      maxWidth:'45%',
      borderRadius:7,
      padding:5,
      height:90,
      justifyContent:'center',
     }}
     onPress={()=>navigation.navigate('VisualizarTurmas')}
     >
      <Text style={{
        color:"white",
        textAlign:'center',
        fontSize:16
      }}>Visualizar Turmas</Text>
     </TouchableOpacity>

     <TouchableOpacity style={{
      marginLeft:'5%',
      backgroundColor:'blue',
      maxWidth:'45%',
      borderRadius:7,
      padding:5,
      height:90,
      justifyContent:'center'
     }}
     onPress={()=>navigation.navigate('GerenciarTurmas')}
     >
      <Text style={{
        color:"white",
        textAlign:'center',
        fontSize:16
      }}>Gerenciamento de Turmas</Text>
     </TouchableOpacity>

    
</View>
     
   </View>
    
  );
}