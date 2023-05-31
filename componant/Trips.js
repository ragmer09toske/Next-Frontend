import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Image, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import "react-native-gesture-handler"
import { FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { Card, Divider } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'
import car from './car.png'
import Ratings from './Ratings'


const cars = [
    {
        key: 1,
        title: 'Station Wagon',
        action: 'stationWagon',
        image: car,
        cabAgency: 'Ridic Cabs',
        driver: 'Tsholo Makhetha',
        carModel: 'Honda Edix',
        carSits: '4'
    },
    {
        key: 2,
        title: 'Moon light',
        action: 'Moon light',
        image: car,
        cabAgency: 'Dondy Cabs',
        driver: 'Tsholo Makhetha',
        carSits: '4',
        carModel: 'Specios'
    },
    {
        key: 3,
        title: 'Moon light',
        action: 'Moon light',
        image: car,
        cabAgency: 'Dondy Cabs',
        driver: 'Tsholo Makhetha',
        carSits: '4',
        carModel: 'Specios'
    }
]
const Trips = ({openTripBottomSheet,closeTripBottomSheet}) => {
  const navigation = useNavigation();
  const goToTrips = () =>{
    navigation.navigate("HomeScreen")
    closeTripBottomSheet()
  }
  const openBottomSheet = () => {
    openTripBottomSheet()
  }
  return (
    <GestureHandlerRootView style={{backgroundColor:'white', flex: 1,}}>
        <View 
        style={
            {   padding: 20,
                marginTop: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }
        }>
            <TouchableOpacity
                onPress={goToTrips}
            >
            <Icon
                style={tw`p-2 bg-black rounded-full w-10`}
                name="arrowleft"
                color='white'
                type='antdesign'
            />
            </TouchableOpacity>
            <Text 
                style={tw`text-xl font-bold`}
            >
                Available rides
            </Text>
            <Icon
                style={tw`p-2 bg-gray-200 rounded w-20`}
                name="filter"
                color='black'
                type='antdesign'
            />
        </View>
        
        <FlatList
            data={cars}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>(             
                <View style={{padding: 20}}>
                    <Card
                        mode='contained' 
                        style={{minHeight: 160, padding: 20}}
                    >
                    <TouchableOpacity
                        onPress={openBottomSheet}
                    >
                        <View
                            style={
                                {   
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    marginLeft: -30,
                                }
                            }>
                            <View>
                                <Image
                                    style={{width: 120, height: 120, resizeMode: 'contain'}}
                                    source={item.image}
                                />
                            </View>
                            <View>
                                <Text 
                                    style={
                                        {
                                            fontWeight: 'bold',
                                            fontSize: 30
                                        }
                                    }>
                                    {item.cabAgency}
                                </Text>
                                <Text
                                    style={
                                        {
                                            fontWeight:'100',
                                            fontSize: 20
                                        }
                                    }>
                                    {item.carModel}
                                </Text>
                                <Ratings/>
                            </View>
                        </View>
                        <View>
                            <Divider/>
                            <Text
                                style={
                                    {
                                        fontWeight:'100',
                                        fontSize: 15
                                    }
                            }>{item.carSits}-seater</Text>
                        </View>
                    </TouchableOpacity>
                    </Card>
                </View>
            )}
        />
    </GestureHandlerRootView>
  )
}
const styles = {
    card: {
        margin: 20,
        marginTop: 0,
        padding: 10,
        minHeight: 200
    }
}
export default Trips
