import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default CategoryBtn = ({ children, setCategory, selected }) => {

    const pressed = () => {
        setCategory(children)
        console.log(`pressed  ${children}`)
    }

    return (
        <View style={[styles.button, { backgroundColor: selected ? '#c58b4e' : 'white' }]}>
            <Pressable style={{ paddingHorizontal: 15 }} onPress={pressed} >
                <Text style={{ fontFamily: "Sora-SemiBold", color: selected ? 'white' : 'grey' }}>{children}</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        height: 45,
        marginTop: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 10
    },
})