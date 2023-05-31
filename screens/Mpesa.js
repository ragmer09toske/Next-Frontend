import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Vodacomlogo from '../images/mpesa.jpeg'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Loadloop from '../images/Loadloop'

export default function Mpesa() {
  const { priceToPay } = useSelector((state)=> state.appData)
  const [load, setLoad] = useState(false);
 
  let hasFunctionBeenCalled = false;

  function callAfterThreeSeconds() {
    if (!hasFunctionBeenCalled) {
      setTimeout(function() {
        console.log("The loader will removed after three seconds and the user will be taken to the mapScreen");
        setLoad(false)
        alert("You cannot Authenticate this transaction because we blocked our gateway!");
        goToMapScreen()
        hasFunctionBeenCalled = true;
      }, 5000);
    }
  }
  const navigation = useNavigation()  
  const goToMapScreen = () => {
    navigation.navigate("MapScreen")
  }
  const handlePay = async () => {
    setLoad(true);
    console.log('calling API or load data')
    // call API or load data here
    callAfterThreeSeconds(); // Call this function to initiate the setTimeout
  };
  return (
    <View style={styles.container}>
      {load && <Loadloop />}
        <View style={styles.banner}>
            <View style={styles.branding}>
                <Image
                    style={{
                        width: 170,
                        height: 170,
                        resizeMode: 'contain'
                    }}
                    source={Vodacomlogo}
                />
            </View>
        </View>
        <View style={styles.body}>
            <Text style={{fontWeight: '900', fontSize: 15}}>Thank you for making your payment with Mpesa</Text>
            <Text>Transaction Amount</Text>
            <Text style={{fontWeight: '900', fontSize: 50, color:"#EA1B21"}}>M{parseFloat(priceToPay).toFixed(0)}.00</Text>
            <TouchableOpacity
                onPress={handlePay}
                style={{backgroundColor: '#EA1B21', padding: 10, borderRadius: 8, width: '90%', justifyContent:'center', alignItems: 'center'}}
              >
                <Text style={{fontWeight: '800',color: 'white', fontSize: 20}}>Proceed to pay</Text>
              </TouchableOpacity>
            <Text style={{fontWeight: '300', fontSize: 10, color:"#EA1B21"}}>Together we can!</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        position: 'relative',
    },
    banner: {
        paddingTop: 5,
        alignItems: 'center',
        width: '100%',
        height: 300,
        backgroundColor: '#EA1B21'
    },
    body: {
        width: '80%',
        height: '70%',
        left: '10%',
        top: '20%',
        backgroundColor: '#FEFEFE',
        position: 'absolute',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    branding: {
        flexDirection: "row",
        gap: 10
    }
})
// vodacom red : #DF0100
// vodacom WHITE : #FEFEFE
// vodacom BACKGROUND : #EBEBEB
