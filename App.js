import React, { useEffect, useState } from 'react';
import Home from './screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import "react-native-gesture-handler"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MapScreen from './screens/MapScreen'
import {useRef} from 'react'
import tw from 'tailwind-react-native-classnames'
import BottomSheetModal,{BottomSheetView,BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import Specials from './componant/Specials'
import Trips from './componant/Trips'
import CarDetails from './CarDetails'
import LoginScreen from './componant/LoginScreen'
import MapOverView from './screens/MapOverView'
import EditLocations from './componant/EditLocations'
import store from './componant/redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import SuggestedCars from './componant/SuggestedCars'
import DestinationView from './componant/DestinationView'
import MobilePay from './screens/MobilePay'
import Visa from './screens/Visa'
import Mpesa from './screens/Mpesa'
import PushNotifications from './screens/push'
import Registration from './componant/Registration'
import User from './screens/User'
import getUserAsync from './subroutines/getUserAsync';

export default function App() {
  const [ homeBottomSheetState, setHomeBottomSheetState ] = useState(false)
  const [ tripsBottomSheetState, setTripsBottomSheetState ] = useState(false)
  const [ editBottomSheetState,setEditBottomSheetState ] = useState(false)
  const [ selectedCarBottomSheetState, setselectedCarBottomSheetState ] = useState(false)
  const [ availableCars, setAvailableCars ] = useState(false)
  const [userID, setUserID] = useState();
  const [userObj, setUserObj] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  const HomeBottomSheetRef = useRef(null)
  const selectedCarBottomsheetRef = useRef(null)
  const TripBottomsheetRef = useRef(null)
  const editBottomsheetRef = useRef(null)
  const AvailableCarBottomsheetRef = useRef(null)

  const selectedCarSnapPoints = ['85%']
  const AvailableCarSnapPoints = ['75%']
  const snapPoints = ['20%']
  const tripSnapPoints = ['85%']
  const editSnapPoints = ["45%"]
  
  const [originLatitude,setOriginLatitude] = useState()
  const [originLongitude,setOriginLongitude] = useState()
  // Am putting my life onto this code
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  
  const openBottomSheet = () => {
    setHomeBottomSheetState(true)
    HomeBottomSheetRef.current?.snapToIndex(0)
  }

  const closeCarDetailsBottomSheet = () => {
    setTripsBottomSheetState(false)
    selectedCarBottomsheetRef.current?.close()
  }

  const openCarBottomSheet = () => {
    setselectedCarBottomSheetState(true)
    selectedCarBottomsheetRef.current?.snapToIndex(0)
  }

  const AvailableCarBottomSheet = () => {
    setAvailableCars(true)
    AvailableCarBottomsheetRef.current?.snapToIndex(0)
  }

  const openTripBottomSheet = () => {
    setTripsBottomSheetState(true)
    TripBottomsheetRef.current?.snapToIndex(0)
  }

  const openEditBottomSheet = () => {
    setEditBottomSheetState(true)
    editBottomsheetRef.current?.snapToIndex(0)
  }

  const closeTripBottomSheet = () => {
    setTripsBottomSheetState(false)
    TripBottomsheetRef.current?.close()
  }

  const closeEditBottomSheet = () => {
    setEditBottomSheetState(false)
    editBottomsheetRef.current?.close()
  }
  const closeAvailableCarBottomSheet = () => {
    setAvailableCars(false)
    AvailableCarBottomsheetRef.current?.close()
  }
  const closeBottomSheet = () => {
    setHomeBottomSheetState(false)
    HomeBottomSheetRef.current.close()
  }
  const Stack = createStackNavigator();
 

  const HomeComponent = () => {
    return <Home 
            openBottomSheet={openBottomSheet} 
            origin={setOrigin} 
            originVal={origin} 
            setOriginLatitude={setOriginLatitude} 
            setOriginLongitude={setOriginLongitude}
            setIsSignedIn={setIsSignedIn}
          />
  }

  const LoginScreenComponent = () => {
    return <LoginScreen setIsSignedIn={setIsSignedIn}/>
    // <PushNotifications/>
  }

  const MapSCreenComponent = () => {
    return <MapScreen 
            destination={setDestination} 
            origin={setOrigin} 
            originVal={origin} 
            destinationVal={destination} 
            originLatitude={originLatitude} 
            originLongitude={originLongitude} 
            openEditBottomSheet={openEditBottomSheet}
            openCarBottomSheet={openCarBottomSheet}
            AvailableCarBottomSheet={AvailableCarBottomSheet}
          />
  }
  const UserComponent = () => {
    return <User 
            setIsSignedIn={setIsSignedIn}
          />
  }
  const TripsComponent = () => {
    return <Trips 
            openTripBottomSheet={openTripBottomSheet} 
            closeTripBottomSheet={closeTripBottomSheet}
          />
  }

  if(isSignedIn === true){
    console.log('sign in is true')
  }
  getUserAsync("UserName");  
  return (
  <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator>
              {
                isSignedIn === true ?
                <Stack.Screen 
                  name="LoginScreen" 
                  component={LoginScreenComponent}
                  options={{
                    headerShown: false,
                  }}
                />
              :
                <Stack.Screen 
                  name="HomeScreen" 
                  component={HomeComponent}
                  options={{
                    headerShown: false,
                  }}
                />
              }
              <Stack.Screen 
                name="MapScreen" 
                component={MapSCreenComponent}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="Trips" 
                component={TripsComponent}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="MapOverView" 
                component={MapOverView}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="DestinationView" 
                component={DestinationView}
                options={{
                  headerShown: false,
                }}
              />
              {/* Adding route: 1 */}

              <Stack.Screen 
                name="MobilePay" 
                component={MobilePay}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen 
                name="Visa" 
                component={Visa}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen 
                name="MpesaPayment" 
                component={Mpesa}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen 
                name="EcocashPayment" 
                component={Mpesa}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen 
                name="RegistrationSCreen" 
                component={Registration}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen 
                name="UserAccountScreen" 
                component={UserComponent}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
            {/* Home bottomshit */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                ref={HomeBottomSheetRef}
                index={-1}
                backgroundStyle={{
                borderRadius: 25,
                backgroundColor: '#F8F8FF'
                }}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                >
                <BottomSheetView
                    style={tw`p-5`}
                >
                <Specials closeBottomSheet={closeBottomSheet}/> 
                </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* Trips navigation */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                  ref={TripBottomsheetRef}
                  index={-1}
                  backgroundStyle={{
                  borderRadius: 25,
                  backgroundColor: '#F8F8FF'
                  }}
                  snapPoints={tripSnapPoints}
                  enablePanDownToClose={true}
                  >
                  <BottomSheetView
                      style={tw`p-5`}
                  >
                  <CarDetails closeBottomSheet={closeTripBottomSheet} />
                  </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* Edit Origin and Destination */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={editBottomsheetRef}
                    index={-1}
                    backgroundStyle={{
                    borderRadius: 25,
                    padding: 0,
                    backgroundColor: '#f0f0f0'
                    }}
                    snapPoints={editSnapPoints}
                    enablePanDownToClose={true}
                    >
                    <BottomSheetView
                        style={tw`p-5`}
                    >
                        <EditLocations closeBottomSheet={closeEditBottomSheet} originVal={origin} destinationVal={destination} openEditBottomSheet={openEditBottomSheet}/>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* Selected Cat Bottomshit */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={selectedCarBottomsheetRef}
                    index={-1}
                    backgroundStyle={{
                    borderRadius: 25,
                    backgroundColor: '#F8F8FF'
                    }}
                    snapPoints={selectedCarSnapPoints}
                    enablePanDownToClose={true}
                    >
                    <BottomSheetView
                        style={tw`p-5`}
                    >
                    <CarDetails closeBottomSheet={closeTripBottomSheet} closeParentBottomSheet={closeCarDetailsBottomSheet} />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* Available Cars */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={AvailableCarBottomsheetRef}
                    index={-1}
                    backgroundStyle={{
                    borderRadius: 25,
                    // backgroundColor: '#F8F8FF'
                    }}
                    snapPoints={AvailableCarSnapPoints}
                    enablePanDownToClose={true}
                    >
                    <BottomSheetView style={tw`p-5`}>
                    <SuggestedCars openCarBottomSheet={openCarBottomSheet} closeCarBottomSheet={closeAvailableCarBottomSheet}/>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </NavigationContainer>
    </GestureHandlerRootView>
  </Provider>
  );
}