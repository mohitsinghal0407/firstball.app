import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import ADIcons from 'react-native-vector-icons/AntDesign'


export default Card = ({ details }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: details.image }} style={styles.img} borderRadius={20}>
                <View style={styles.rateContainer}>
                    <ADIcons name='star' color='gold' />
                    <Text style={{ color: 'white' }}>4.8</Text>
                </View>
            </ImageBackground>
            <View style={styles.details}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{details.title}</Text>
                <Text style={{color: 'grey'}}>with {details.ingredients[0]}</Text>
                <View style={styles.price}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>$ 1.00</Text>
                    <ADIcons color='white' name='plus' size={15} style={{ backgroundColor: '#c58b4e', padding: 10, borderRadius: 10 }} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '40%',
        backgroundColor: '#ffffff',
        borderRadius: 20
    },
    img: {
        height: 150,
    },
    rateContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#00000080',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 30,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingLeft: 5

    },
    details: {
        height: 130,
        padding: 10
    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})