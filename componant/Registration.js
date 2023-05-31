import { useNavigation } from "@react-navigation/native"
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button } from "react-native-paper"
import tw from "tailwind-react-native-classnames"
import { authentication } from "./firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import logo from '../screens/logo.png'
import Loadloop from "../images/Loadloop"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from "../screens/Home"
import { useDispatch, useSelector } from "react-redux"
import { setRegisterMessage } from "./redux/AppSlice"
import ApiURI from "../subroutines/ApiURI"

const Registration = ({setIsSignedIn}) => {
  const [password, setPassword] = useState('')
  const [errorDisplay, setErrordisplay] = useState()
  const [load, setLoad] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [number, setNumber] = useState('')
  const [age, setAge] = useState('')
  const [user, setUser] = useState(null)

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const sendUserToOurAPI = (name,email,number) => {
    // Attemp to post data to our API: CREATE
    const Newuser = {
        name: name,
        email: email,
        number: number
    };
    const URI = ApiURI();
    fetch(`${URI}/user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Newuser)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok')
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        // Handle any errors here
        console.error('There was a problem with the fetch operation:', error)
    })
  } 

  const RegisterUser = async () => {
    await AsyncStorage.setItem('key', 'value')
    // load after the register button is clicked
    setLoad(true);
    // load response from Auth servers
    createUserWithEmailAndPassword(authentication, email, password)
    .then((results) => {
        sendUserToOurAPI(userName,email,number)
        dispatch(setRegisterMessage("Registered!"))
        console.log(results)
        navigation.goBack()
        setLoad(false)
    })
    .catch((error)=>{
        const errorMessage = error.code
        if(errorMessage === "auth/invalid-email"){
            console.log("Invalid Email")
            setLoad(false);
            setErrordisplay('Invalid Email')
        }
        else if(errorMessage === "auth/internal-error"){
            console.log("Internal-error")
            setLoad(false);
            setErrordisplay('Invalid Email')
        }
        else if(errorMessage === "auth/user-not-found"){
            console.log("user-not-found")
            setLoad(false);
            setErrordisplay('user not found')
        }
        else if(errorMessage === "auth/wrong-password"){
            console.log("wrong-password")
            setLoad(false);
            setErrordisplay('wrong password')
        }
        else if(errorMessage === "auth/weak-password"){
            console.log("weak-password")
            setLoad(false);
            setErrordisplay('weak password')
        }
        else if(errorMessage === "auth/email-already-in-use"){
            console.log("email already in use")
            setLoad(false);
            setErrordisplay('email already in use')
        }
        // console.log(errorMessage);
    })
  }


  const goToHomeScreen = () => {
    setIsSignedIn(true)
  }
  
  return (
    <View style={styles.container}>
        {load && <Loadloop />}
        <Image
            style={{
                width: 170,
                height: 170,
                resizeMode: 'contain'
            }}
            source={logo}
        />
        <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
                value={userName}
                onChangeText={text => setUserName(text) }
                style={styles.input}
                placeholder="Username"
            />
            <TextInput
                value={email}
                onChangeText={text => setEmail(text) }
                style={styles.input}
                placeholder="Email"
            />
             <TextInput
                value={number}
                onChangeText={text => setNumber(text) }
                keyboardType="numeric"
                style={styles.input}
                placeholder="Phone number"
            />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text) }
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            {
                errorDisplay && 
                <Text style={{color: 'red'}}>{errorDisplay}</Text>
            }
        </KeyboardAvoidingView>
        <Button
            onPress={RegisterUser}
            style={styles.contained}
        >
            <Text style={styles.containedText}>Registrater</Text>
        </Button>
        
        <TouchableOpacity style={[tw`mt-2`]} onPress={goToHomeScreen}>
            {/* <Text style={styles.outlinedText}>Pass without Auth</Text> */}
        </TouchableOpacity>
    </View>    

  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containedText: {
        color: 'white',
    },
    contained: {
        padding: 4,
        margin: 15,
        backgroundColor: '#4F80E6',
        width: '60%'
    },
    outlined: {
        width: '60%',
        borderColor: '#4F80E6',
        margin: 5,
        borderWidth: 2
    },
    outlinedText: {
        color: '#4F80E6'
    },
    input: {
        margin: 7,
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        fontSize: 16,
        paddingLeft: 15,
        borderRadius: 10
    }
})
export default Registration;