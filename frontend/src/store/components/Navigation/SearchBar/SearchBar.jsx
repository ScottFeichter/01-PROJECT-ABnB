import { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

import './SearchBar.css';

function SearchBar() {
  const [where, setWhere] = useState("Search destinations");
  const [checkIn, setCheckIn] = useState("Add dates");
  const [checkOut, setCheckOut] = useState("Add dates");
  const [who, setWho] = useState("Add guests");
  const [errors, setErrors] = useState({});

  return (
    <form id="SearchBarForm">
      <label className="SearchBarLabel">Where
        <input
          className="SearchBarInput"
          type="text"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
      </label>
      {errors.where && <p>{errors.where}</p>}


      <label className="SearchBarLabel">Check in
        <input
          className="SearchBarInput"
          type="text"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </label>
      {errors.checkIn && <p>{errors.checkIn}</p>}


      <label className="SearchBarLabel">Check out
        <input
          className="SearchBarInput"
          type="text"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>
      {errors.checkOut && <p>{errors.checkOut}</p>}


      <label className="SearchBarLabel">Who
        <input
          className="SearchBarInput"
          type="text"
          value={who}
          onChange={(e) => setWho(e.target.value)}
        />
      </label>
      {errors.who && <p>{errors.who}</p>}



      <FaMagnifyingGlass id="FaMagnifyingGlass">
        <button type="submit">Search</button>
      </FaMagnifyingGlass>


    </form>
  )
}

export default SearchBar;
