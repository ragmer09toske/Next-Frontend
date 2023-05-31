import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import tw from "tailwind-react-native-classnames"
import car from './car.png'
import { selectCar, setPriceToPay } from "./redux/AppSlice"

const cars  = [
    {
        key: 1,
        price: 0.047,
        image: car,
        distance: 11,
        title: 'Dondy Cabs',
        make: 'Toyata Spacios',
        plateNumber: 'RA 238',
        driver: 'Tsholo Makhetha',
        sits: 4,
        residence: "Ha Pita"
    },
    {
        key: 2,
        price: 0.05,
        image: car,
        distance: 14,
        title: 'Nuclues Cabs',
        make: 'Handa Edix',
        plateNumber: 'RA238',
        driver: 'Retsepile Shao',
        sits: 4,
        residence: "Maseru-west",
    },
    {
        key: 3,
        price: 0.049,
        image: car,
        distance: 17,
        title: 'Motlomelo Cabs',
        make: 'Toyota Vits',
        plateNumber: 'RC236ED',
        driver: 'Atang Motlomelo',
        sits: 4,
        residence: "Borokhoaneng"
    },
    {
        key: 4,
        price: 0.056,
        image: car,
        distance: 23,
        title: 'Box Cabs',
        make: 'Opal R3',
        plateNumber: 'RC2384GH',
        driver: 'Thulo Monare',
        sits: 4,
        residence: "Moshoeshoe II"
    },
    {
        key: 5,
        price: 0.052,
        image: car,
        distance: 23,
        title: 'Next Cabs',
        make: 'Toyota Yaris',
        plateNumber: 'BA238TY',
        driver: 'Rethabile Bofelo',
        sits: 4,
        residence: "Ha Thamae"
    },
    {
        key: 6,
        price: 0.07,
        image: car,
        distance: 23,
        title: 'Urban Cabs',
        make: 'Handa Edix',
        plateNumber: 'RE345Gy',
        driver: 'Retsepile Shao',
        sits: 4,
        residence: "Borokhoaneng"
    }
]
const NearByCars = () => {

  const { cost } = useSelector((state)=> state.distanceMatrix)
  const { duration } = useSelector((state)=> state.distanceMatrix)
  const { distance } = useSelector((state)=> state.distanceMatrix)
  const { selectedCar } = useSelector((state)=> state.appData)
  const { priceToPay } = useSelector((state)=> state.appData)

  const dispatch = useDispatch(); 

  const setSelect = (item) => {
    dispatch(selectCar(item))
    dispatch(setPriceToPay(selectedCar?.price * cost))
  }

  console.log("price is: ", priceToPay)

  return (
    <>
    {
        duration && 
        <View style={{justifyContent: 'center',flexDirection: 'row', paddingTop: 10}}>
            <Text style={{color: '#4F80E6', fontWeight: '100'}}>{duration} / {distance}</Text>
        </View>
    }
    <FlatList
        data={cars}
        keyExtractor = {(item)=>item.key}
        renderItem={({item: {key}, item})=>(
            <TouchableOpacity
                onPress={()=>setSelect(item)}
                style={key === selectedCar?.key  && {backgroundColor: '#4f7fe6c8'}}
            >
                
                <View style={styles.container}>
                    <Image
                        style={{width: 60, height: 60, resizeMode: 'contain', margin: 10}}
                        source={item.image}
                    />
                    <View style={styles.detailsContainer}> 
                        <Text style={[tw`text-lg font-semibold`,key === selectedCar?.key  ? {color: 'white'} : {color: 'black'}]}>M{parseFloat(item.price * cost).toFixed(0)}.00</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )}
    />
    </>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 70
    }
})
export default NearByCars
