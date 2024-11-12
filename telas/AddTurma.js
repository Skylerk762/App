import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../src/firebaseConfig";

export default function AddTurma(){
    const navigation = useNavigation() 
    const [apertadoBtn1Turno, setApertadoBtn1Turno] = useState(false);
    const [apertadoBtn2Turno, setApertadoBtn2Turno] = useState(false);
    const [apertadoBtn3Turno, setApertadoBtn3Turno] = useState(false);

    const [turnoEscolhido, setTurnoEscolhido] = useState('');
    const [numeroTurma, setNumeroTurma] = useState('');
    const [turmaLiberada] = useState(false);

    function apertouBtn1Turno(){
        setApertadoBtn1Turno(!apertadoBtn1Turno);
        setApertadoBtn2Turno(false);
        setApertadoBtn3Turno(false);
        setTurnoEscolhido(!apertadoBtn1Turno ? 'Manhã' : '');
        console.log(turnoEscolhido)
    }

    function apertouBtn2Turno(){
        setApertadoBtn2Turno(!apertadoBtn2Turno);
        setApertadoBtn1Turno(false);
        setApertadoBtn3Turno(false);
        setTurnoEscolhido(!apertadoBtn2Turno ? 'Tarde' : '');
        console.log(turnoEscolhido)
    }

    function apertouBtn3Turno(){
        setApertadoBtn3Turno(!apertadoBtn3Turno);
        setApertadoBtn2Turno(false);
        setApertadoBtn1Turno(false);
        setTurnoEscolhido(!apertadoBtn3Turno ? 'Noite' : '');
        console.log(turnoEscolhido)
    }

    const adicionarTurma = async () => {

        if(!turnoEscolhido.trim() || !numeroTurma.trim()){
            Alert.alert('', 'Não deixe campos vazios!')
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, 'turmas'));
            
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
          const turmaExistente = data.find(item => item.numeroTurma === numeroTurma);

          if (turmaExistente){
            Alert.alert('','Turma já cadastrada!')
            return;
        }

        } catch (error) {
            console.log(error)
        }

        try {
            await addDoc(collection(db, 'turmas'),{
                turnoEscolhido,
                numeroTurma,
                turmaLiberada
            });
        
            Alert.alert('','Turma adicionada com sucesso!')
            setNumeroTurma('');
            setTurnoEscolhido('')
            setApertadoBtn1Turno(false);
            setApertadoBtn2Turno(false);
            setApertadoBtn3Turno(false);
        } catch (error) {
            console.log(error)
        }

    }


    return(
        <View style={{
            flex:1, justifyContent:"center",
            padding:20,
        }}>
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
     >Adicionar Turmas</Text>

     <View style={{
        marginTop:'5%',
        backgroundColor:'#f2f2f2',
        elevation:5,
        padding:5,
        borderRadius:7,
        shadowOpacity:3,
     }}>
        <Text style={{
            color:'blue',
            fontWeight:'bold',
            alignSelf:"center"
        }}>Escolha o turno da turma:</Text>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            marginBottom:5
        }}>
            <TouchableOpacity style={{
                marginTop:'2%',
                backgroundColor: apertadoBtn1Turno ? 'green' : 'blue',
                borderRadius:7,
                width:'23%',
                padding:4
            }}
            onPress={()=>apertouBtn1Turno()}
            >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    alignSelf:'center'
                }}>
                1° Turno
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                marginTop:'2%',
                backgroundColor: apertadoBtn2Turno ? 'green' : 'blue',
                borderRadius:7,
                padding:4,
                width:'23%',
                marginLeft:'3%'
            }}
            onPress={()=>apertouBtn2Turno()}
            >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    alignSelf:'center'
                }}>
                    2° Turno
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{
                marginTop:'2%',
                backgroundColor: apertadoBtn3Turno ? 'green' : 'blue',
                borderRadius:7,
                padding:4,
                width:'23%',
                marginLeft:'3%',
            }}
            onPress={()=>apertouBtn3Turno()}
            >
                <Text style={{
                    color:'white',
                    fontWeight:'bold',
                    alignSelf:"center",
                }}
                >
                    3° Turno
                </Text>
            </TouchableOpacity>
        </View>
        </View>


        <Text style={{
            marginTop:'10%',
            color:'blue',
            fontWeight:'bold'
        }}>Informe o numero da turma:</Text>

        <TextInput style={{
            borderWidth:1,
            borderColor:'#ccc',
            backgroundColor:'white',
            paddingLeft:5,
            paddingVertical:2,
            borderRadius:7,
            elevation:2,
            shadowOpacity:3,
            shadowColor:'gray',
            marginTop:'2%',
            
        }} 
        value={numeroTurma}
        onChangeText={setNumeroTurma}
        placeholder="Ex. 3000"/>

        <TouchableOpacity style={{
            marginTop:'10%',
            backgroundColor:'blue',
            borderRadius:7,
            padding:6
        }}
        onPress={adicionarTurma}
        >
            <Text style={{
                color:'white',
                fontWeight:'bold',
                alignSelf:"center",

            }}>
                Adicionar turma
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            marginTop:'3%',
            backgroundColor:'gray',
            borderRadius:7,
            padding:6
        }}
        onPress={()=>navigation.navigate('GerenciarTurmas')}
        >
            <Text style={{
                color:'white',
                fontWeight:'bold',
                alignSelf:"center",

            }}
            >
                Voltar
            </Text>
        </TouchableOpacity>
        </View>
    )
}