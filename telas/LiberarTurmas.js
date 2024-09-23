import { useNavigation } from "@react-navigation/native";
import { collection, doc, Firestore, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../src/firebaseConfig";

export default function LiberarTurmas(){
    const navigation = useNavigation() 
    const [apertadoBtn1Turno, setApertadoBtn1Turno] = useState(false);
    const [apertadoBtn2Turno, setApertadoBtn2Turno] = useState(false);
    const [apertadoBtn3Turno, setApertadoBtn3Turno] = useState(false);


    const [turmas, setTurmas] = useState([]);
    

    function apertouBtn1Turno(){
        setApertadoBtn1Turno(!apertadoBtn1Turno);
        setApertadoBtn2Turno(false);
        setApertadoBtn3Turno(false);
    }

    function apertouBtn2Turno(){
        setApertadoBtn2Turno(!apertadoBtn2Turno);
        setApertadoBtn1Turno(false);
        setApertadoBtn3Turno(false);
    }

    function apertouBtn3Turno(){
        setApertadoBtn3Turno(!apertadoBtn3Turno);
        setApertadoBtn2Turno(false);
        setApertadoBtn1Turno(false);
    }


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


    const handleLiberarTurma = async (id) => {
        setTurmas(prevTurmas =>
            prevTurmas.map(turma => 
                turma.id === id 
                ? { 
                    ...turma, 
                    turmaLiberada: !turma.turmaLiberada 
                  } 
                : turma
            )
        );
    
        try {
            const turmaRef = doc(db, 'turmas', id);
            await updateDoc(turmaRef, {
                turmaLiberada: !turmas.find(turma => turma.id === id).turmaLiberada
            });
        } catch (error) {
            console.error("Erro ao atualizar turma no Firestore:", error);
        }
    };

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
     >Liberação de Turmas</Text>

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
        }}>Consultar turmas gerais</Text>

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

        {apertadoBtn1Turno && (
            <View>
                <View>
                    <Text>1° Ano:</Text>

                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Manhã' && turma.numeroTurma.startsWith('1'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>

                </View>
                
                <Divider style={{marginTop:'1%'}}/>

                <View>
                <Text>2° Ano:</Text>

                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Manhã' && turma.numeroTurma.startsWith('2'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
                </View>

                <Divider style={{marginTop:'1%'}}/>

                <View>
                <Text>3° Ano:</Text>

                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Manhã' && turma.numeroTurma.startsWith('3'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
                </View>

                <Divider style={{marginTop:'1%'}}/>
            </View>
        )}

        {apertadoBtn2Turno && (
            <View>
            <View>
                <Text>1° Ano:</Text>

                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Tarde' && turma.numeroTurma.startsWith('1'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>
            
            <Divider style={{marginTop:'1%'}}/>

            <View>
            <Text>2° Ano:</Text>

            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Tarde' && turma.numeroTurma.startsWith('2'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>

            <Divider style={{marginTop:'1%'}}/>

            <View>
            <Text>3° Ano:</Text>

            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Tarde' && turma.numeroTurma.startsWith('3'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>

            <Divider style={{marginTop:'1%'}}/>
        </View>
        )}

        {apertadoBtn3Turno && (
            <View>
            <View>
                <Text>1° Ano:</Text>

                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Noite' && turma.numeroTurma.startsWith('1'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>
            
            <Divider style={{marginTop:'1%'}}/>

            <View>
            <Text>2° Ano:</Text>

            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Noite' && turma.numeroTurma.startsWith('2'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}>
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}
                            onPress={() => handleLiberarTurma(turma.id)}
                            >
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>

            <Divider style={{marginTop:'1%'}}/>

            <View>
            <Text>3° Ano:</Text>

            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
                    {turmas.filter(turma => turma.turnoEscolhido === 'Noite' && turma.numeroTurma.startsWith('3'))
                    .sort((a,b) => parseInt(a.numeroTurma,10) - parseInt(b.numeroTurma,10))
                    .map( turma => (
                        <TouchableOpacity 
                        style={{
                            backgroundColor: turma.turmaLiberada ? 'green' : 'red',
                            marginLeft:'2%',
                            borderRadius:7,
                            marginTop:'1%'
                        }}
                        key={turma.id}
                        onPress={() => handleLiberarTurma(turma.id)}
                        >
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                padding:4,
                            }}>
                                {turma.numeroTurma}
                            </Text>
                        </TouchableOpacity>
                    ))
                    }
                    </View>
            </View>

            <Divider style={{marginTop:'1%'}}/>
        </View>
        )}

     </View>

     <TouchableOpacity style={{
        backgroundColor:'gray',
        borderRadius:9,
        marginTop:'15%',
        width:'40%',
        alignSelf:"center",
        height:'4%'
     }}
     onPress={()=>navigation.goBack()}
     >
            <Text style={{color:'white', alignSelf:'center', padding:4, fontWeight:'bold', fontSize:14}}>Voltar</Text>
        </TouchableOpacity>

        </View>
    )
}