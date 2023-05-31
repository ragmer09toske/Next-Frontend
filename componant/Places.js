import { Text, View } from "react-native"
import { Icon } from "react-native-elements"
import { useSelector } from "react-redux"
import tw from "tailwind-react-native-classnames"

const Places = () => {
  const { destinationDecription } = useSelector((state) => state.coordinates)
  const { originDiscription } = useSelector((state) => state.coordinates)
  return (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Icon
            style={[tw`w-20 opacity-20`]}
            name="flow-line"
            color='gray'
            type='entypo'
            size={120}
        />
        <View>
          <View style={[tw`text-lg p-5 pb-6`]}>
            <Text style={[tw`text-sm opacity-50`, {color: 'gray'}]}>Pickup</Text>
            <Text style={[tw`font-semibold text-lg`, {color: 'black'}]}>{originDiscription}</Text>
          </View>

          <View style={[{borderTopWidth: 1, borderColor: 'gray', margin: 5, width: '85%'},tw`opacity-20`]}/>

          <View style={[tw` text-lg p-5 pt-3`]}>
            <Text style={[tw`text-sm opacity-50`, {color: 'gray'}]}>Drop off</Text>
            <Text style={[tw`font-semibold text-lg`, {color: 'black'}]}>{destinationDecription}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
export default Places
