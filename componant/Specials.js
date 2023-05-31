import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Button, Card, List, MD3Colors } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'
const data = [
    {
        key: 1,
        title: 'Take a trip',
        screen: 'Trips',
        icon: 'will get it soon'
    },
]
const Specials = ({closeBottomSheet}) => {
  const navigation = useNavigation();
  const goToTrips = () =>{
    navigation.navigate("Trips")
    closeBottomSheet()
  }
  return (
    <List.Section>
        <View style={{display: 'flex', alignItems: 'center'}}>
            <List.Subheader style={tw`text-xl text-blue-500 font-bold`}>Specials</List.Subheader>
        </View>
        <FlatList
            data = {data}
            keyExtractor= {(item)=>item.key}
            renderItem = {({item})=>(
                <View style={{alignItems: 'center'}}>
                    <Button style={styles.outlined} onPress={goToTrips}>
                        <Text style={styles.outlinedText}>{item.title}</Text>
                    </Button>
                </View>
            )}
        />
    </List.Section>
  )
}
let styles = {
    container: {
        margin: 3,
        backgroundColor: "white"
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
}
export default Specials
