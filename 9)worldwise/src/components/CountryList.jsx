import CityItem from './CityItem'
import styles from './CountryList.module.css'
import Spinner from "./Spinner"
import Message from "./Message"
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'

function CountryList() {
    const {isLoading,cities}=useCities()
    const countries= cities.reduce((arr,city)=>{
        if(!arr.map(el=>el.incluedes).includes(city.country))
            return [...arr,{country:city.country,emoji:city.emoji}]
        else
            return arr
    },[])
    if (isLoading) return <Spinner></Spinner>
    if(!cities.length) return <Message message={"No cities..."}></Message>
    return (
         <ul className={styles.countryList}>
                {
                    countries.map((country,i)=><CountryItem country={country} key={i} ></CountryItem>)
                }
            </ul>
    )
}

export default CountryList
