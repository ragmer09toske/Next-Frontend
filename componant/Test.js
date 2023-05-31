import { useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import { Button } from "react-native-paper"

const Test = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>
                Screen One
            </Text>
            <Button
                title="To the next screen"
                onPress={navigation.navigate("ScreenTwo")}
            />
        </View>
    )
}

export default Test
