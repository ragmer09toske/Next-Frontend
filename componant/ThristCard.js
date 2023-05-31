import { useNavigation } from "@react-navigation/native";
import {FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Button, Card } from "react-native-paper";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import car from './car.png'
import bag from './bag.png'
import { useEffect } from "react";

const data = [
    {
        id: "1",
        title: 'Get a thrift',
        image: bag,
        screen: "Route"
    },
   
];
const ThristCard = () => {
    const { originDiscription } = useSelector((state)=>state.coordinates)
    const navigation = useNavigation();
    return (
        <FlatList 
            data={data}
            keyExtractor ={(item)=> item.id}
            renderItem={({ item })=>(
                <Card
                    mode="contained"
                    style={[tw`m-2`, {backgroundColor: '#dae5f79a'}]}
                >
                    <TouchableOpacity 
                        // disabled={!originDiscription}
                        style={tw`p-2 pl-6 pr-6 pb-8 m-2 h-60`}
                        onPress={()=>navigation.navigate(item.screen)}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{width: 120, height: 120, resizeMode: 'contain', marginBottom: 3}}
                                source={item.image}
                            />
                            <Button 
                                style={{
                                    width: 250
                                }}
                                // icon="arrow-right"
                                mode="contained"
                            >
                                <Text style={tw`mt-2 text-lg font-semibold`}>
                                    {item.title}
                                </Text>
                            </Button>
                        </View>
                    </TouchableOpacity>
                </Card>
            )}
        />
    );
}

export default ThristCard