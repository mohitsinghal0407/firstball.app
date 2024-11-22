import { StyleSheet, Text, View, Pressable, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import coffeeImage from '../Assets/images/coffee.png'
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default StartScreen = ({ navigation }) => {

    const handleStart = () => {
        AsyncStorage.setItem('isPressed', 'true')
        // console.log("pressed");
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='black' />
            <View style={{ flex: 1 }}>
                <ImageBackground source={coffeeImage} style={styles.imageContainer}>
                </ImageBackground>
                <LinearGradient
                    style={{ ...StyleSheet.absoluteFillObject }}
                    colors={['#00000000', '#000000', '#000000']}
                    locations={[0.5, 0.7, 1]}
                />
                <View style={styles.bottom} />
            </View>
            <View style={styles.bottomTop}>
                <Text style={styles.textBold}>Coffee so good,</Text>
                <Text style={styles.textBold}>your taste buds</Text>
                <Text style={styles.textBold}>will love it.</Text>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.textSmall}>The best grain, the finest roast, the</Text>
                    <Text style={styles.textSmall}>powerful flavor.</Text>
                </View>
                <View style={styles.button}>
                    <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={handleStart}>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Sora-SemiBold' }}>Get Started</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative'
    },
    imageContainer: {
        flex: 7,

    },
    bottom: {
        flex: 3,
        backgroundColor: 'black',
    },
    bottomTop: {
        backgroundColor: '#00000000',
        position: 'absolute',
        bottom: 0,
        height: (height * 0.35),
        width: width
    },
    textBold: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Sora-Medium'
    },
    textSmall: {
        textAlign: 'center',
        color: 'grey',
        fontFamily: 'Sora-Regular',
        fontSize: 13
    },
    button: {
        backgroundColor: '#c56b4e',
        borderRadius: 20,
        marginHorizontal: 30,
        height: 70,
        marginTop: 25,
    }
})