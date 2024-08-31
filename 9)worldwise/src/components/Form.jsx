// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import UseUrlPosition from "../hooks/UseUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [cityName, setCityName] = useState("");
  const [lat,lng]=UseUrlPosition()
  const [isGeoLocationLoading,setIsGeoLoactionLoading]=useState(false)
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji]=useState("")
  const [geoLocationError,setGeoLocationError]=useState("")
  const navigate=useNavigate()
  const {createNewCity,flagemojiToPNG}=useCities()

  useEffect(function(){
    async function fetchCityData(){
      try{
        setIsGeoLoactionLoading(true)
        setGeoLocationError("")
        const res=await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data=await res.json()
        console.log(data)
        if(!data.countryCode) throw new Error("Its not a place, please click some where else.")
        setCityName(data.city||data.locality||"")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }catch(err){
        setGeoLocationError(err.message)
      }finally{
        setIsGeoLoactionLoading(false)
      }
    }
    fetchCityData()
  },[lat,lng])

  async function handleSubmit(e){
    if(!date || !cityName) return
    console.log("submitted")
    const newCity={
      cityName,
      emoji,
      date,
      country,
      notes,
      position:{
        lat,lng
      }
    }
    await createNewCity(newCity)
    navigate("/app")
  }

  if(geoLocationError) return <Message message={geoLocationError}></Message>
  if(isGeoLocationLoading) return <Spinner></Spinner>
  if(!lat && !lng) return <Message message="Start by clicking somewhere in the map"></Message>
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        {/* <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat="dd/mm/yy"></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" 
        clickEvent={handleSubmit}>Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
