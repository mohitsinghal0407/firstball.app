import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { useController, useFormContext } from 'react-hook-form'

export default Input = ({ label, name, rules, defaultValue = '', secureTextEntry }) => {

    const { formState: { errors } } = useFormContext()

    const { field } = useController({ name, rules, defaultValue })

    const errorMsg = errors[name]?.message

    return (
        <View style={{ borderColor: errorMsg ? 'red' : 'white', ...styles.input }}>
            <Text style={{ color: 'black', fontSize: 20 }}>{label}</Text>
            <TextInput
                style={{ ...styles.text }}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                secureTextEntry={secureTextEntry}
            />
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 75,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
    },
    text: {
        backgroundColor: 'white',
        fontSize: 15,
        height: 38,
        color: 'black',
    }
})