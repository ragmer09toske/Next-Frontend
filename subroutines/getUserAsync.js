import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserAsync = async(key,setIsSignedIn) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // Data found, parse it back to an object
          const data = JSON.parse(value);
          console.log('Retrieved data:', data);
          setIsSignedIn(true)
          return data
        } else {
          // No data found
          console.log('No data found.');
          return null
    }
    } catch (error) {
      console.log('Error retrieving data:', error);
      setIsSignedIn(false)
      return null
    }
};
export default getUserAsync;