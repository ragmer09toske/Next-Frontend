import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import "react-native-gesture-handler"
import { FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Card, Divider } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'
import scuba from '../componant/scuba.jpg'
import car from '../componant/car.png'
import Ratings from '../componant/Ratings'
import getUserAsync from '../subroutines/getUserAsync'
import removeUserData from '../subroutines/removeUserAsync'

const User = ({setIsSignedIn}) => {
  const navigation = useNavigation();
  const goBack = () =>{
    navigation.goBack()
  }

  const [user, setUser]  = useState()
  const getDataFromAsyncStorage = async () => {
    const user = await getUserAsync("UserName");
    setUser(user)
    console.log('User:', user);
    // Use the retrieved user data as needed
  };
  getDataFromAsyncStorage();
  const logout = () => {
    removeUserData("UserName",setIsSignedIn);
  }
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
        <View 
          style={
              {   
                padding: 20,
                marginTop: 30,
                display: 'flex',
                flexDirection: 'row',
                gap: 45,
                alignItems: 'center',
              }
          }>
            <TouchableOpacity
              // <PoweroffOutlined />
              onPress={goBack}
            >
            <Icon
              style={tw`p-2 bg-black rounded-full w-10`}
              name="arrowleft"
              color='white'
              type='antdesign'
            />
            </TouchableOpacity>
            <Text 
              style={[tw`text-xl font-bold`,{color:'gray'}]}
            >
              User Account
            </Text>
        </View>
                 
        <View style={{padding: 20}}>
            <Card
              mode='contained' 
              style={{
                minHeight: 160, 
                padding: 20,
                // alignItems: "center"
              }}
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
                  <Avatar.Image size={74} source={scuba} />
                  </View>
                  <View>
                      <Text 
                          style={
                              {
                                fontWeight: 'bold',
                                fontSize: 30
                              }
                          }>
                          {user?.name}
                      </Text>
                      <Ratings/>
                  </View>
              </View>
                  <Divider style={tw`mt-3`}/>
              <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 15,
                    alignItems: 'center'
                  }}
              >
                <Icon
                  style={tw`rounded-full w-10`}
                  name="poweroff"
                  color='gray'
                  type='antdesign'
                />
                  <TouchableOpacity
                  onPress={logout}>
                  <Text
                    style={
                        {
                          fontWeight:'100',
                          fontSize: 15
                        }
                  }>
                    logout
                  </Text>
                  </TouchableOpacity>
              </View>
            </Card>
        </View>
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
export default User