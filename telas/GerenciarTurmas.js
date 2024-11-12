import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../src/firebaseConfig";

export default function GerenciarTurmas(){
    const navigation = useNavigation() 

    const [turmas, setTurmas] = useState([]);

    const exibirTurmas = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'turmas'));
            
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setTurmas(data)
    } catch(error){
        console.log(error)
    }
    }

    useEffect(()=>{
        exibirTurmas()
    },[])

    const limparTurmasLiberadas = async () => {
        try {
            Alert.alert('','Ok. Zerando as turmas liberadas...')
            for(let turma of turmas){
                const turmaRef = doc(db,'turmas',turma.id)
                await updateDoc(turmaRef, {
                turmaLiberada: false,
                horaLiberacao: null
                })
            }
          
        Alert.alert('','Turmas liberadas zeradas com sucesso!')
        } catch (error) {
            Alert.alert('','Algum erro ocorreu!')
            return;
        }
    }

    function confirmarOpcao(){
        Alert.alert('','Deseja realmente zerar todas as turmas liberadas?',[
                {
                    text:'Cancelar',
                    style:'cancel',
                },
                {
                    text:'Confirmar',
                    onPress: ()=> limparTurmasLiberadas(),
                }
            ],
            {cancelable:true}
        );
    }
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

            <TouchableOpacity style={{
                backgroundColor:'blue', 
                marginTop:'2%', 
                borderRadius:7, 
                padding:4}}
                onPress={()=>confirmarOpcao()}
                >
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