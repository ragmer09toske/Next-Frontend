import AsyncStorage from "@react-native-async-storage/async-storage";

const removeUserData = async (key,setIsSignedIn) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully!');
      setIsSignedIn(false)
    } catch (error) {
      console.log('Error removing data:', error);
    }
  };
export default removeUserData;