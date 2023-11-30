import React, { useEffect, useState } from 'react';

import reactLogo from './images/react-logo.svg';
import tesLogo from './images/tes-logo.svg';
import nodeLogo from './images/nodejs-logo.svg';
import './App.css';
import Table from './components/Table';
import UniversityCard from './components/UniversityCard';

import { uniApiUrl, countryData } from './CONSTANTS';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [dropdownSelection, setDropDownSelection] = useState("");

  const getCountries = async () => {
    setCountries(countryData);
  };

  const getUniversities = async (query) => {
    setIsLoading(true);

    fetch(`${uniApiUrl}${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {      
        setUniversities(data)
        setIsLoading(false)

      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const search = (e) => {
    e.preventDefault();
    getUniversities(country);
  };

  const onCountryChange = (e) => setCountry(e.target.value);

  const selectUniversity = (name) => {
    const university = universities.find((uni) => uni.name === name);
    if (university) {
      setOpenModal(true);
      setSelectedUniversity(university);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedUniversity(null);
  };

  return (
    <div className="App">
      <img src={tesLogo} className="App-logo" alt="Tes logo" />
      <header className="App-header container">
        <img src={reactLogo} className="App-logo-react" alt="React logo" />
        <h1 className="App-header title">University Challenge</h1>
        <img src={nodeLogo} className="App-logo-nodejs" alt="NodeJs logo" />
      </header>
      <section>
        <div className="input-group mb-3">
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            onChange={onCountryChange}
            placeholder="Type to search..."
          />
          <button
            className="search-button"
            type="button"
            id="button-addon2"
            disabled={country != ""? false : true}
            onClick={search}
          >
            Search
          </button>

          <datalist id="datalistOptions" value={country}>
            {countries.map((countryItem) => (
              <option
                key={countryItem.name.official}
                value={countryItem.name.common}
              >
                {countryItem.name.common}
              </option>
            ))}
          </datalist>
        </div>

        <p>
          Total number of countries:
          {' '}
          {countries.length}
        </p>
        {universities.length > 0 && (
        <p>
          Number of universities in
          {' '}
          <strong>{country}</strong>
          :
          {' '}
          {universities.length}
        </p>
        )}
      </section>
      {isLoading ? (
          <p>Loading...</p>
        ):
        (
          <>
            <section>
              {openModal && selectedUniversity && (
                <UniversityCard university={selectedUniversity} closeModal={closeModal} />
              )}
            </section>
            <section>
              {universities.length > 0 && !openModal && (
                <Table universities={universities} selectUniversity={selectUniversity} />
              )}
            </section>
          </>
        )
      }
    </div>
  );
};

export default App;
