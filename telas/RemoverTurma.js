import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../src/firebaseConfig";

export default function RemoverTurma(){

    const [numeroTurma, setNumeroTurma] = useState('');

    const removerTurma = async () => {

        if(!numeroTurma.trim()){
            Alert.alert('','Não deixe o campo vazio!')
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, 'turmas'));
            
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
          const turmaExistente = data.find(item => item.numeroTurma === numeroTurma);

          if (turmaExistente){
            try {
                await deleteDoc(doc(db, 'turmas', turmaExistente.id))
                Alert.alert('','Turma removida com sucesso!')
            } 
             catch (error) {
                console.log(error)
            }

        } else {
            Alert.alert('','Turma não encontrada!')
        }
    } catch(error){
        console.log(error)
    }
}
    

    const navigation = useNavigation() 
    return(
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
     >Remover de Turmas</Text>

        <View style={{
            marginTop:'8%',
            backgroundColor:'#f2f2f2',
            elevation:5,
            padding:10,
            borderRadius:7,
            shadowOpacity:3,
        }}> 
        <Text style={{
                color:'blue',
                fontWeight:'bold',
                alignSelf:'center',
                fontSize:18
            }}>Remover turmas individuais</Text>
            <Text style={{
                color:'black',
                fontWeight:'bold',
                marginTop:'2%'
            }}>Informe o numero da turma que deseja remover:</Text>


            <View style={{flexDirection:'row', justifyContent:'center', padding:2}}>
            <TextInput style={{
                borderWidth:1,
                padding:4,
                borderRadius:7,
                borderColor:'#ccc',
                elevation:4,
                backgroundColor:'white',
                marginTop:'2%',
                width:'60%'
            }}
            placeholder="Ex. 3000"
            value={numeroTurma}
            onChangeText={setNumeroTurma}
            />

            <TouchableOpacity style={{
                backgroundColor:'blue',
                padding:8,
                justifyContent:'center',
                marginTop:'2%',
                alignSelf:'center',
                borderRadius:7,
                marginLeft:'4%'
            }}
            onPress={removerTurma}
            >
                <Text style={{
                    color:'white',
                    fontWeight:'bold'
                }}>
                    Remover Turma
                </Text>
            </TouchableOpacity>
            </View>
            
        </View>
        <Text style={{
            color:'gray',
            fontWeight:'bold',
            marginTop:'8%',
            alignSelf:'center',
            fontSize:18
        }}>OU</Text>

<View style={{
            marginTop:'6%',
            backgroundColor:'#f2f2f2',
            elevation:5,
            padding:10,
            borderRadius:7,
            shadowOpacity:3,
        }}> 
        <Text style={{
                color:'blue',
                fontWeight:'bold',
                alignSelf:'center',
                fontSize:16
            }}>Remover TODAS as turmas de uma vez</Text>

            <TouchableOpacity style={{
                backgroundColor:'red',
                padding:5,
                marginTop:'3%',
                borderRadius:9

            }}>
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    alignSelf:'center'
                }}>
                    Remover TODAS as turmas
                </Text>
            </TouchableOpacity>

            </View>
            <TouchableOpacity style={{
        backgroundColor:'gray',
        borderRadius:9,
        marginTop:'15%',
        width:'40%',
        alignSelf:"center",
        height:'4%'
     }}
     onPress={()=>navigation.navigate('GerenciarTurmas')}
     >
            <Text style={{color:'white', alignSelf:'center', padding:4, fontWeight:'bold', fontSize:14}}>Voltar</Text>
        </TouchableOpacity>
     </View>
    )
}