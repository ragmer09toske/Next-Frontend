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
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUSerID, setCurrentUserObject } from "./redux/AppSlice"
import getUserData from "../subroutines/getUserData"

const LoginScreen = ({setIsSignedIn}) => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errorDisplay, setErrordisplay] = useState();
const [load, setLoad] = useState(false)
const { registerMessage } = useSelector((state)=> state.appData)
const dispatch = useDispatch()
const { currentUserObject } = useSelector((state)=>state.appData)
const UserID = currentUserObject

const goToRegistrationScreen = () => {
    navigation.navigate('RegistrationSCreen')
}

const RegisterUser = () => {
goToRegistrationScreen()
}
console.log('[login.js] the userID is:', UserID)
const storeData = async (key, value) => {
if (value !== null) {
    await AsyncStorage.setItem(key, value);
    } else {
        await AsyncStorage.removeItem(key);
    }
};

const SignInUser = async () => {
// load after the Signup button is clicked
setLoad(true);
// load response from Auth servers
signInWithEmailAndPassword(authentication,email,password)
.then(()=>{
    getUserData('email',email,setLoad)
    setIsSignedIn(true)
    storeData('myKey', UserID);
    // setLoad(false);
})
.catch((error)=>{
    const errorMessage = error.code
    if(errorMessage === "auth/invalid-email"){
        console.log("Invalid Email")
        setLoad(false)
        setErrordisplay('Invalid Email')
    }
    else if(errorMessage === "auth/internal-error"){
        console.log("Internal-error")
        setLoad(false)
        setErrordisplay('Invalid Email')
    }
    else if(errorMessage === "auth/user-not-found"){
        console.log("user-not-found")
        setLoad(false)
        setErrordisplay('user not found')
    }
    else if(errorMessage === "auth/wrong-password"){
        console.log("wrong-password")
        setLoad(false)
        setErrordisplay('wrong password')
    }
    // console.log(errorMessage);
})
}

const navigation = useNavigation()

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
                value={email}
                onChangeText={text => setEmail(text) }
                style={styles.input}
                placeholder="Email"
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
          onPress={SignInUser}
          style={styles.contained}
        >
            <Text style={styles.containedText}>Signin</Text>
        </Button>
        
        <Button style={styles.outlined} onPress={RegisterUser}>
            <Text style={styles.outlinedText}>Register</Text>
        </Button>
        
        <TouchableOpacity style={[tw`mt-2`]} onPress={goToHomeScreen}>
            {registerMessage &&
              <Text style={styles.outlinedText}>{registerMessage}</Text>
            }
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
export default LoginScreen