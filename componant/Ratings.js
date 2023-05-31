import React from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const Ratings = () => {
  return (
    <View
        style={
            {
                fontWeight:'100',
                fontSize: 30,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }
        }>
        <Icon
            name="star"
            size={15}
            color='black'
            type='antdesign'
        />
        <Text>
            5.0
        </Text>
    </View>
  )
}

export default Ratings
