import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../src/firebaseConfig";

export default function VisualizarTurmas(){
    const navigation = useNavigation() 
    const [apertadoBtn1Turno, setApertadoBtn1Turno] = useState(false);
    const [apertadoBtn2Turno, setApertadoBtn2Turno] = useState(false);
    const [apertadoBtn3Turno, setApertadoBtn3Turno] = useState(false);

    const [txtNumeroTurma, setTxtNumeroTurma] = useState('');
    const [turmaDetalhada, setTurmaDetalhada] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    function AbrirModal(){
        setOpenModal(true)
    }
    function FecharModal(){
        setTurmaDetalhada(null);
        setOpenModal(false)
    }

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

    const exibirTurmaDetalhada = async (txtNumeroTurma) => {

        if(!txtNumeroTurma.trim()){
            Alert.alert('','Não deixe o campo vazio!')
        }
       const turmaExistente = turmas.find(turma => turma.numeroTurma === txtNumeroTurma);
       if(turmaExistente){
        setTurmaDetalhada(turmaExistente);
       } else{
        Alert.alert('', 'Turma não encontrada!')
       }
       setOpenModal(true)
    }

    return(
        <ScrollView contentContainerStyle={{
            flexGrow:1,
            justifyContent:'center',
            padding:20
        }}>
        <View style={{
            flex:1, justifyContent:"center",
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
     >Visualizar Turmas</Text>

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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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
                        key={turma.id}>
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

     <Text
     style={{
      color:'gray',
      fontSize:20,
      alignSelf:"center",
      marginTop:'7%',
      fontWeight:'bold'
     }}
     >Ou</Text>

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
        }}>Visualizar turmas especifica</Text>

        <View style={{flexDirection:'row', justifyContent:'center', marginTop:'3.5%', marginBottom:1}}>
        <TextInput style={{
            borderWidth:1,
            backgroundColor:'white',
            padding:4,
            borderColor:'#ccc',
            borderRadius:7,
            shadowOpacity:9,
            height:'80%',
            elevation:2
        }}
        value={txtNumeroTurma}
        onChangeText={setTxtNumeroTurma}
        placeholder="Digite a turma para pesquisar"
        />
        <TouchableOpacity style={{
            backgroundColor:'blue',
            borderRadius:7,
            marginLeft:'5%',
            width:'30%',
            height:'80%'
        }}
        onPress={()=>exibirTurmaDetalhada(txtNumeroTurma)}
        >
            <Text style={{
                color:'white',
                alignSelf:'center',
                padding:5,
                fontWeight:'bold',
            }}>Buscar</Text>
        </TouchableOpacity>
        </View>
        
        {turmaDetalhada &&(
           <Modal 
           transparent={true}
           animationType="fade"
           visible={openModal}
           onRequestClose={FecharModal}
       >
           <View style={{ 
           flex: 1, 
           justifyContent: 'center', 
           alignItems: 'center', 
           backgroundColor: 'rgba(0, 0, 0, 0.23)'  // Fundo escuro atrás do modal
           }}>
                <View style={{
                backgroundColor:'white',
                elevation:5,
                padding:10,
                borderRadius:8,
                borderColor:'#ccc',
                alignSelf:'center',
            }}>
                <View style={{
                    margin:5,
                }}>
                <Text style={{
                    fontSize:17,
                    textAlign:'center',
                }}>
                Numero da turma:
                </Text>
                <Text
                style={{
                    fontSize:17,
                    textAlign:'center',
                    fontWeight:'bold',
                    textDecorationLine:'underline'
                }}>
                {turmaDetalhada.numeroTurma}
                </Text>
                <Text
                style={{
                    fontSize:17,
                    textAlign:'center',
                    marginTop:10
                }}>
                A turma foi liberada?
                </Text>
                <Text style={{
                    fontSize:17,
                    textAlign:'center',
                    padding:5,
                    fontWeight:'bold',
                    textDecorationLine:'underline'
                }}>
                {turmaDetalhada.turmaLiberada ? 'Sim' : 'não'}
                </Text>
                {turmaDetalhada.horaLiberacao && (
                     <Text style={{
                        fontSize:17,
                        textAlign:'center',
                        fontWeight:'bold',
                        textDecorationLine:'underline',
                        marginTop:5,
                        marginBottom:10
                    }}>
                    {'Turma liberada as: '+turmaDetalhada.horaLiberacao}
                    </Text>
                )}
               
                </View>
                <TouchableOpacity style={{
                    backgroundColor:'gray',
                    borderRadius:7,
                }}
                onPress={()=>FecharModal()}
                >
                    <Text style={{
                        padding:4,
                        alignSelf:'center',
                        color:'white',
                        fontWeight:'bold'
                    }}>Voltar</Text>
                </TouchableOpacity>
            </View>
            </View>
            </Modal>
            
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
        </ScrollView>
    )
}
