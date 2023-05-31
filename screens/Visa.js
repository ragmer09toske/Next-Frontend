import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import Loadloop from '../images/Loadloop'
import visa from '../images/visa.png'
import logo from './logo.png'

const Visa = () => {
  const [cardName, setCardName] = useState()
  const [cardNumber, setCardNumber] = useState('')
  const [CardExp, setCardExp] = useState()
  const [CardCVV, setCardCVV] = useState()
  const [load, setLoad] = useState(false);

  const handleCardNumber = (text) => {
    text = text.replace(/\D/g, ''); // remove any non-numeric characters
    text = text.substring(0, 16); // limit the input to a maximum of 16 numbers
    text = text.replace(/(\d{4})/g, '$1 '); // add a space after every four numbers
    setCardNumber(text.trim()); // remove any extra space at the end of the text
  }
  const handleExp = (text) => {
    text = text.replace(/\D/g, ''); // remove any non-numeric characters
    text = text.substring(0, 5); // limit the input to a maximum of 5 numbers
    text = text.replace(/(\d{2})(\d{1,2})/, '$1/$2'); // add a slash after the first two numbers
    setCardExp(text.trim()); // remove any extra space at the end of the text
  }
  const navigation = useNavigation()  
  const goToMapScreen = () => {
    navigation.navigate("MapScreen")
  }
  let hasFunctionBeenCalled = false;

  function callAfterThreeSeconds() {
    if (!hasFunctionBeenCalled) {
      setTimeout(function() {
        console.log("The loader will removed after three seconds and the user will be taken to the mapScreen");
        setLoad(false)
        alert("We not yet in production so, for security and testing sake we will not pass this through our payment gatways");
        goToMapScreen()
        hasFunctionBeenCalled = true;
      }, 5000);
    }
  }

  const { priceToPay } = useSelector((state)=> state.appData)
  const handlePay = async () => {
    setLoad(true);
    console.log('calling API or load data')
    // call API or load data here
    callAfterThreeSeconds(); // Call this function to initiate the setTimeout
  };
  return (
    <View style={styles.container}>
      {load && <Loadloop />}
      <Image
        style={{
            width: 90,
            height: 90,
            resizeMode: 'contain'
        }}
        source={logo}
      />
      <View style={styles.VisaCardContainer}>
        <View style={styles.VisaCard}>
          <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Text style={{color: 'white', padding: 20, fontWeight: 'bold', fontSize: 20}}>Bank Card</Text>
            {
              CardExp &&
              <Image
                  style={{
                      width: 90,
                      height: 90,
                      resizeMode: 'contain'
                  }}
                  source={visa}
              />
            }
          </View>
          <View style={{paddingLeft: 25,display: "flex", justifyContent:'center'}}>
             <Text style={{color: 'white', paddingLeft: 46, fontWeight: 'bold', fontSize: 20}}>{cardNumber}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
             <Text style={{color: 'white', padding: 20}}>Vailid Thru {CardExp}</Text>
             <Text style={{color: 'white', padding: 20}}>{cardName}</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
                value={cardName}
                onChangeText={text => setCardName(text) }
                style={styles.input}
                placeholder="Name on card"
            />
            <TextInput
                value={cardNumber}
                onChangeText={text => handleCardNumber(text) }
                style={styles.input}
                keyboardType="numeric"
                placeholder="Card Number"
            />
            <TextInput
                value={CardExp}
                onChangeText={text => handleExp(text) }
                style={styles.input}
                placeholder="Exp"
                maxLength={5}
                keyboardType="number-pad"
            />
            <TextInput
                value={CardCVV}
                onChangeText={text => setCardCVV(text) }
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
            />
        </KeyboardAvoidingView>
        <View style={{backgroundColor: '#4f7fe6c8', padding: 10, borderRadius: 8, width: '90%', justifyContent:'center', alignItems: 'center'}}>
          <TouchableOpacity
              disabled={!CardCVV}
              style={tw`${ !CardCVV  && "opacity-20"}`}
              onPress={handlePay}
            >
            <Text style={{fontWeight: '800',color: 'white', fontSize: 20}}>PAY NOW LSL {parseFloat(priceToPay).toFixed(0)}.00 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  VisaCardContainer: {
    width: "90%",
    height: '85%',
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },
  VisaCard: {
    justifyContent: 'center',
    width: "85%",
    height: '30%',
    borderRadius: 10,
    backgroundColor: "black"
  },
  input: {
    margin: 7,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    fontSize: 16,
    paddingLeft: 15,
    borderRadius: 10
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default Visa
