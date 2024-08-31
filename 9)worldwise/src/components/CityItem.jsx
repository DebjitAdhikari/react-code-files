import { NavLink } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

const flagemojiToPNG = (flag) => {
        var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
        return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
    }
function CityItem({city}) {
    const {cityName,date,emoji,position}=city
    const {currentCity,deleteCity}=useCities()
    async function handleDelete(e){
        e.preventDefault()
        await deleteCity(city.id)
    }
    return (
        <li>
            <NavLink className={`${styles.cityItem} ${currentCity.id===city.id?styles["cityItem--active"]:""}`} to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
            </NavLink>
        </li>
    )
}

export default CityItem
