import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

export default Btn = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress} android_ripple={{ color: '#bfbfbf', borderless: false }}>
      <Text style={{ color: 'white', fontSize: 25, }}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    backgroundColor: 'black',
    borderRadius: 10,
    borderTopEndRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})