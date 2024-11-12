import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useFetch } from "../contexts/CitiesContext";
/*eslint-disable */
function CountryList() {
  const { isLoading, cities } = useFetch();
  // /*eslint-enable */
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by slecting a new place on the map!"}
      />
    );
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((city) => city.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else return [...acc];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
