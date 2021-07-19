import { useState } from 'react';
import { fetchPlace } from './fetchPlace';

const App = () => {
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  return (
    <div className="placesAutocomplete">
      <div className="placesAutocomplete__inputWrap">
        <label htmlFor="city" className="label">
          Your city
          <span
            className={autocompleteErr ? "inputError" : "inputErrorSkeleton"}
          >
            {autocompleteErr}
          </span>
        </label>
        <input
          list="places"
          type="text"
          id="city"
          name="city"
          onChange={handleCityChange}
          value={city}
          required
          pattern={autocompleteCities.join("|")}
          autoComplete="off"
        />
        <datalist id="places">
          {autocompleteCities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
        <span className="placesAutocomplete__hint">
          *start typing and choose your city from the given options
        </span>
      </div>
    </div>
  );
};

export default App;
