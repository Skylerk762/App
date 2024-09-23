import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function GerenciarTurmas(){
    const navigation = useNavigation() 
return (
    <View style={{flex:1, justifyContent:'center', padding:20}}>
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
     >Gerenciamento de Turmas</Text>

            <Text style={{color:'blue', fontWeight:'bold', marginTop:'5%'}}>
               Escolha a opção desejada:
            </Text>
    <View style={{
        marginTop:'2%',
        backgroundColor:'#f2f2f2',
        elevation:5,
        padding:10,
        borderRadius:7,
        shadowOpacity:3,
     }}>
        
            <Text style={{alignSelf:"center", color:'blue', fontWeight:'bold', fontSize:16}}>
                Opções mais usadas
            </Text>

            <TouchableOpacity style={{
                backgroundColor:'blue', 
                marginTop:'2%', 
                borderRadius:7, 
                padding:4}}
                onPress={()=>navigation.navigate('VisualizarTurmas')}
                >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    fontSize:16,
                    alignSelf:'center'
                }}>Visualizar Turmas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                backgroundColor:'blue', 
                marginTop:'2%', 
                borderRadius:7, 
                padding:4}}
                onPress={()=>navigation.navigate('LiberarTurmas')}
                >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    fontSize:16,
                    alignSelf:'center'
                }}>Liberar Turmas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'blue', marginTop:'2%', borderRadius:7, padding:4}}>
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    fontSize:16,
                    alignSelf:'center'
                }}>Limpar turmas liberadas</Text>
            </TouchableOpacity>
    </View>

    <View style={{
        marginTop:'8%',
        backgroundColor:'#f2f2f2',
        elevation:5,
        padding:10,
        borderRadius:7,
        shadowOpacity:3,
     }}>
        <Text style={{alignSelf:"center", color:'blue', fontWeight:'bold', fontSize:16}}>
                Opções de Gerenciamento
            </Text>
            <TouchableOpacity style={{
                backgroundColor:'blue', 
                marginTop:'2%', 
                borderRadius:7, 
                padding:4}}
                onPress={()=>navigation.navigate('AddTurma')}
                >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    fontSize:16,
                    alignSelf:'center'
                }}>Adicionar turmas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                backgroundColor:'blue', 
                marginTop:'2%', 
                borderRadius:7, 
                padding:4}}
                onPress={()=>navigation.navigate('RemoverTurma')}
                >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    fontSize:16,
                    alignSelf:'center'
                }}>Remover Turmas</Text>
            </TouchableOpacity>
     </View>

     <TouchableOpacity style={{
        backgroundColor:'gray',
        borderRadius:9,
        marginTop:'15%',
        width:'40%',
        alignSelf:"center",
     }}
     onPress={()=>navigation.navigate('Menu')}
     >
            <Text style={{color:'white', alignSelf:'center', padding:4, fontWeight:'bold', fontSize:14}}>Voltar</Text>
        </TouchableOpacity>
    
    </View>
)

}