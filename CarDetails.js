import React, { useState } from 'react'
import { Image, Text, View, Platform, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Button, Card } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'
import car from './componant/car.png'
import scuba from './componant/scuba.jpg'
import Ratings from './componant/Ratings'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'
// import { DateTimePicker } from '@react-native-community/datetimepicker';
import visa from './images/visa.png'
import paypal from './images/paypal.png'


const CarDetails = ({closeBottomSheet, closeParentBottomSheet}) => {
  const  [PaymentMethod, setPaymentMethod] = useState(false)
  const [ date, setDate] = useState(new Date())
  const [ mode, setMode] = useState('date')
  const [ show, setShow] = useState(false)
  const [ text, setText] = useState('Empty')

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);

    let tempDate =new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)

    console.log(fDate + '(' + fTime + ')')
  }
    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }
    const navigation = useNavigation();
    const goToMap = () => {
        closeBottomSheet()
        navigation.navigate("MapScreen")
    }
    const goToPaypal = () => {
        closeParentBottomSheet()
        navigation.navigate("MapScreen")
    }
    const goToVisa = () => {
        closeParentBottomSheet()
        navigation.navigate("Visa")
    }
    const goToMobilePay = () => {
        closeParentBottomSheet()
        navigation.navigate("MobilePay ")
    }
    const handlePayPal = () => {
        console.log("PayPal method chosen");
    }
    const handleVisa = () => {
        console.log("Visa method chosen");
        goToVisa();
    }
    const handleEcocash = () => {
        closeParentBottomSheet()
        navigation.navigate("EcocashPayment")
        alert("Ecocash has not been fully integrated proceed with Mpesa!")
        console.log("Ecocash method chosen");
    }
    const handleMpesa = () => {
        closeParentBottomSheet()
        navigation.navigate("MpesaPayment")
        console.log("Mpesa method chosen");
    }
  const { selectedCar } = useSelector((state)=>state.appData)
  return (
    <View>
        <Text style={{color: '#4F80E6', fontWeight: 'bold', fontSize: 23}}>Cancel</Text>
        <View style={{display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
            <Image
                style={{width: 250, height: 250, resizeMode: 'contain'}}
                source={car}
            />
        </View>
        <Text style={{ fontWeight: 'normal',fontSize: 23}}>{selectedCar?.title}</Text>
        <View style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontWeight: '100',fontSize: 23}}>{selectedCar?.make}</Text>
            <Text style={{ fontWeight: '100',fontSize: 23}}>{selectedCar?.sits}-seater</Text>
        </View>
        <Text style={{ fontWeight: '100',fontSize: 18}}>Plate Number: <Text style={{fontWeight: '300',color: '#4F80E6'}}>{selectedCar?.plateNumber}</Text></Text>
        <View style={{marginTop: 50}}>
            <Text style={{ fontWeight: '400',fontSize: 30, }}>Driver</Text>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                <Avatar.Image size={74} source={scuba} />
                <View style={{margin: 15, marginTop: 5}}>
                    <Text style={{ fontWeight: '400',fontSize: 20, }}>{selectedCar?.driver}</Text>
                    <Text style={{ fontWeight: '100',fontSize: 15, }}>{selectedCar?.residence}</Text>
                    <Ratings/>
                </View>
            </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30,padding: 10}}>
            <TouchableOpacity 
                style= {{borderWidth: 2, borderColor: '#4f7fe6c8', marginRight: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10}}
                onPress={()=>showMode('time')}
                disabled={true}
            >
                <Icon
                    name="calendar"
                    color='#4f7fe6c8'
                    type='entypo'
                />
            </TouchableOpacity>
            <View
                style={{
                    width: !PaymentMethod ? 250 : 310,
                    height: !PaymentMethod ? 50 : 50,
                    backgroundColor: !PaymentMethod ? '#4f7fe6c8' : '#4f7fe622',
                    padding: !PaymentMethod ? 5 : 0,
                    paddingBottom: 13,
                    borderRadius: 5,
                    alignItems: !PaymentMethod ? 'center' : 'flex-start',
                    marginBottom: 10
                }}
                mode="contained"
            >
                {
                    !PaymentMethod ?
                    <TouchableOpacity
                        onPress={()=>{setPaymentMethod(true)}}
                    >
                        <Text style={[tw`mt-2 text-lg font-semibold`, {color: 'white'}]}>
                            Continue with payment
                        </Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.groupButtons}>
                        <TouchableOpacity 
                            style={[styles.paymentMethod, styles.mpesa]}
                            onPress = {handleMpesa}
                        >
                            <Text style={[tw`mt-2 text-lg font-semibold`, {color: 'white'}]}>
                                M-Pesa
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.paymentMethod, styles.ecocash]}
                            onPress = {handleEcocash}
                        >
                            <Text style={[tw`mt-2 text-lg font-semibold`, {color: 'white'}]}>
                                Ecocash
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.paymentMethod, styles.visa]}
                            onPress = {handleVisa}
                        >
                            <Image
                                style={{width: 50, height: 50, resizeMode: 'contain'}}
                                source={visa}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    groupButtons: {
        paddingLeft: "13%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    paymentMethod: {
        padding: 5,
        borderRadius: 3,
        height: 50
    },
    mpesa: {
        backgroundColor: 'red',
        paddingLeft: 10,
        paddingRight: 10,
    },
    ecocash: {
        backgroundColor: 'blue',
        paddingLeft: 10,
        paddingRight: 10,
    },
    paypal: {
        marginTop: 2,
        marginRight: 10,
        width: 70,
        maxHeight: 50,
        marginBottom: 100,
        justifyContent: 'center'
    },
    visa: {
        width: 70,
        marginTop: -2,
    }
})
export default CarDetails