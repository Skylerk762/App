import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react"; 
import { Image, StatusBar, Text, View, ActivityIndicator, Animated } from "react-native";

export default function TelaLoading() {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true); 
    const [loadingComplete, setLoadingComplete] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0]; // Inicializa o valor da opacidade

    useEffect(() => {
        // Inicia a animação de fade
        Animated.timing(fadeAnim, {
            toValue: 1, // Opacidade final
            duration: 3000, // Duração da animação em milissegundos
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            setLoading(false); 
            setLoadingComplete(true); 
        }, 4000);
        return () => clearTimeout(timer); 
    }, []);

    useEffect(() => {
        if (loadingComplete) {
            const navigateTimer = setTimeout(() => {
                navigation.navigate('Login'); 
            }, 1000); 

            return () => clearTimeout(navigateTimer);
        }
    }, [loadingComplete, navigation]);

    return (
        <Animated.View style={{
            backgroundColor: 'lightblue',
            flex: 1,
            justifyContent: 'center',
            opacity: fadeAnim, // Aplica a opacidade animada
        }}>
            <StatusBar backgroundColor={'blue'} />

            <Image style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                resizeMode: 'contain',
            }} source={require('../imagens/img-escola.png')} />

            <Text style={{
                marginTop: 10,
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center'
            }}>Colégio Estadual Renato Azevedo</Text>

            <Text style={{
                marginTop: 40,
                color: 'black',
                fontSize: 25,
                fontWeight: '900',
                alignSelf: 'center'
            }}>Gerenciamento de Turmas</Text>

            <View style={{ marginTop: 70 }}>
                {loading ? ( // Condicional para mostrar o loading
                    <View>
                        <ActivityIndicator size={50} color="#131166"/>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Carregando, aguarde...</Text>
                    </View>
                ) : (
                    <Text style={{
                        marginTop: 20,
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                    }}>Carregamento concluído!</Text>
                )}
            </View>

            <Text style={{
                justifyContent:'flex-end',
                alignSelf:'center',
                fontWeight:'bold',
                marginTop:200
            }}>Versão do aplicativo: v.1.0.1</Text>
        </Animated.View>
    );
}
