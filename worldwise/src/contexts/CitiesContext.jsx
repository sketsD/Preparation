import {
  createContext,
  useContext,
  // useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CityContextProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const citiesData = await res.json();
        // setCities(citiesData);
        dispatch({ type: "cities/loaded", payload: citiesData });
        // console.log(citiesData);
      } catch {
        dispatch({
          type: "rejected",
          payload: "Ther was an error loading cities...",
        });
      }
      //  finally {
      //   // setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const cityData = await res.json();
        // console.log(cityData);
        // setCurrentCity(cityData);
        dispatch({ type: "city/loaded", payload: cityData });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Ther was an error loading data...",
        });
      }
      // finally {
      //   // setIsLoading(false);
      // }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      // console.log(newCity);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cityData = await res.json();
      // console.log(cityData);
      // setCities((cities) => [...cities, cityData]);
      dispatch({ type: "city/created", payload: cityData });
    } catch (err) {
      console.log(err);

      // alert("Ther was an error creating the city...");
    }
    // finally {
    //   // setIsLoading(false);
    // }
  }

  async function deleteCity(cityID) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      // console.log(newCity);
      await fetch(`${BASE_URL}/cities/${cityID}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: cityID });
      // setCities((cities) => cities.filter((city) => city.id !== cityID));
    } catch (err) {
      console.log(err);

      alert("Ther was an error deleting the city...");
    }
    // finally {
    //   // setIsLoading(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useFetch() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("You was trying to reach context outside of child element");
  return context;
}

export { CityContextProvider, useFetch };
