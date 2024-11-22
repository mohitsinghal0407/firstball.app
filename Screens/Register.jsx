import { StyleSheet, Text, View, StatusBar, Pressable, Alert, ScrollView, Dimensions } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import React from 'react'
import Input from '../Components/Input'
import Btn from '../Components/Btn'
import { registerAPI } from '../Services/allAPI'
import { FormProvider, useForm } from 'react-hook-form'

export default Register = ({ navigation }) => {

    const handleRegister = async (data) => {
        const response = await registerAPI(data)
        // console.log(response.data);
        if (response.status === 200) {
            Alert.alert('Registered successfully')
            navigation.navigate('Login')
        } else {
            Alert.alert('Something went wrong!')
        }
    }

    const windowHeight = Dimensions.get('window').height

    const formMethods = useForm()

    return (
        <ScrollView contentContainerStyle={{ height: windowHeight }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor='black' />
                {/* top */}
                <View style={styles.top}>
                    <View style={{ flex: 1, paddingLeft: 20 }}>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Icons name='arrowleft' size={35} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: 'white', fontSize: 35 }}>Sign Up</Text>
                    </View>
                </View>
                {/* bottom */}
                <View style={styles.bottom}>
                    {/* form */}
                    <View style={styles.form}>
                        <FormProvider {...formMethods}>
                            <Input label='Name' name='name' rules={{ required: 'Name cannot be empty!' }} />
                            <Input label='Email' name='email' rules={{ required: 'Email cannot be empty!' }} />
                            <Input label='Phone Number' name='phoneNumber' rules={{ required: 'Phone Number cannot be empty!' }} />
                            <Input label='Password' name='password' rules={{ required: 'Password cannot be empty!' }} secureTextEntry />
                            <Input label='Confirm Password' name='confirmPassword' rules={{ required: 'Confirm Password cannot be empty!' }} secureTextEntry />
                        </FormProvider>
                    </View>
                    {/* button */}
                    <View style={styles.footer}>
                        <Btn title='Sign Up' onPress={formMethods.handleSubmit(handleRegister)} />
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', paddingTop: 20 }}>You have an account? Log In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    top: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        flex: 8.5,
        backgroundColor: '#ececec',
        borderTopStartRadius: 100,
    },
    form: {
        flex: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        rowGap: 20
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
})