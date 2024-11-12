import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useFetch } from "../contexts/CitiesContext";
/*eslint-disable */
function CityList() {
  // /*eslint-enable */
  const { isLoading, cities } = useFetch();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by slecting a new place on the map!"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
