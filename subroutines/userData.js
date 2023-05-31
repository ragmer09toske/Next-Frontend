// Get the key from storage
// meaning I  need a retrieve function
// get  the ID
// Create a query from the storage to get user details 
import { useState } from "react";

const userData = () => {
    const [myID, setID] = useState()
    //  Attempting to get data from the async storage
    const retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
            setStoredValue(value);
            return value;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //  Calling the function to accesse phone storage
    retrieveData('myKey')
    .then((value) => {
        setID(value)
    })
    .catch((error) => console.log(error))

    // create a fetch request using id 
    fetch('http://192.168.42.24:8000/users/${myID}')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the data here
      console.log("[userData.js]",data);
    //   console.log(data[1].email);
    })
    .catch(error => {
      // Handle any errors here
      console.error('There was a problem fetching the data:', error);
    });
    const getUserByID = () => {
        fetch('http://192.168.42.24:8000/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the data here
          console.log(data[1].email);
        })
        .catch(error => {
          // Handle any errors here
          console.error('There was a problem fetching the data:', error);
        });
    }
}
export default userData