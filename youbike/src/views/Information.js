import React, { useEffect, useState } from "react";
import "../styles/Information.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function Information() {
  const [citys, setCitys] = useState([
    "台北市",
    "桃園市",
    "苗栗縣",
    "新竹市",
    "新竹科學園區",
    "台中市",
    "台南市",
    "高雄市",
  ]);
  const [data, setData] = useState([]);
  const [uniqueSarea, setUniqueSarea] = useState([]);
  const [selectedSareas, setSelectedSareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchCityText, setSearchCityText] = useState("");
  const [isCitySearching, setIsCitySearching] = useState(false);
  const [filteredCity, setFilteredCity] = useState([]);

  const [filteredStations, setFilteredStations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const apiUrl =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("無資料");
        }
        return response.json();
      })
      .then((data) => {
        const cleanedData = Object.values(data).map((station) => ({
          sarea: station.sarea,
          sna: station.sna.substring(11),
          available_rent_bikes: station.available_rent_bikes,
          available_return_bikes: station.available_return_bikes,
        }));
        console.log(cleanedData);
        setData(cleanedData);

        const uniqueSarea = [...new Set(data.map((station) => station.sarea))];
        setUniqueSarea(uniqueSarea);
        setSelectedSareas(uniqueSarea);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 選擇縣市
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };
  // 點選Checkbox
  const handleCheckbox = (sarea) => {
    setSelectedSareas((prevSelectedSareas) =>
      prevSelectedSareas.includes(sarea)
        ? prevSelectedSareas.filter((item) => item !== sarea)
        : [...prevSelectedSareas, sarea]
    );
  };

  // 點選全部勾選
  const handleAllChange = (e) => {
    if (e.target.checked) {
      setSelectedSareas(uniqueSarea);
    } else {
      setSelectedSareas([]);
    }
  };

  // 縣市打字
  const handleSearchCityTextChange = (e) => {
    const text = e.target.value;
    setSearchCityText(text);
    if (text) {
      const filtered = citys.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCity(filtered);
    } else {
      setFilteredCity([]);
    }
  };

  //縣市搜尋
  const handleCitySelect = (cityName) => {
    setSearchCityText(cityName);

    setSelectedCity(cityName);

    // setFilteredData(filtered);
    setFilteredCity([]);
    // setIsCitySearching(true);
  };

  // 打字
  const handleSearchTextChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text) {
      const filtered = data.filter((station) =>
        station.sna.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStations(filtered);
      setIsSearching(true);
    } else {
      setFilteredStations([]);
      setFilteredData([]);
      setIsSearching(false);
    }
  };

  //搜尋
  const handleStationSelect = (stationName) => {
    setSearchText(stationName);
    const filtered = data.filter((station) => station.sna === stationName);
    setFilteredData(filtered);
    setFilteredStations([]);
    setSelectedSareas([]);
    setIsSearching(true);
  };

  const filteredDatas = data.filter((station) =>
    selectedSareas.includes(station.sarea)
  );

  return (
    <main>
      <div>
        <div className="search">
          <select
            className="form-select"
            onChange={handleCityChange}
            value={selectedCity}
          >
            <option selected>選擇縣市</option>

            {citys.map((city, key) => (
              <option value={city}>{city}</option>
            ))}
          </select>
          <div className="position-relative">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="搜尋縣市"
                // aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={searchCityText}
                onChange={handleSearchCityTextChange}
              />
              <button className="btn btn-outline-secondary" id="button-addon1">
                <img className="search" src="search.svg" alt="search" />
              </button>
            </div>
            {filteredCity.length > 0 && (
              <ul className="list-group position-absolute filtered-stations-list">
                {filteredCity.map((city, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {selectedCity === "台北市" ? (
          <>
            <div className="container">
              <div className="allcheck">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="all"
                    onChange={handleAllChange}
                    checked={selectedSareas.length === uniqueSarea.length}
                  />
                  <label className="form-check-label">全部勾選</label>
                </div>
                <div className="checkusarea">
                  {uniqueSarea.map((usarea, key) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={usarea}
                        checked={selectedSareas.includes(usarea)}
                        onChange={() => handleCheckbox(usarea)}
                      />
                      <label className="form-check-label">{usarea}</label>
                    </div>
                  ))}
                </div>
              </div>
              <img className="image" src="image.png" alt="images" />
            </div>

            <div className="position-relative">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋站點"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                >
                  <img className="search" src="search.svg" alt="search" />
                </button>
              </div>
              {filteredStations.length > 0 && (
                <ul className="list-group position-absolute filtered-stations-list">
                  {filteredStations.map((station, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleStationSelect(station.sna)}
                    >
                      {station.sna}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="ubiketable-container">
              <div className="ubiketable">
                <div className="tabletitle">
                  <div style={{ width: "15%" }}>縣市</div>
                  <div style={{ width: "15%" }}>區域</div>
                  <div style={{ width: "40%" }}>站點名稱</div>
                  <div style={{ width: "15%" }}>可藉車輛</div>
                  <div style={{ width: "15%" }}>可還空位</div>
                </div>
                <div className="tablebody">
                  {isSearching
                    ? filteredData.map((station, index) => (
                        <div className="item" key={index}>
                          <div style={{ width: "15%" }}>台北市</div>
                          <div style={{ width: "15%" }}>{station.sarea}</div>
                          <div style={{ width: "40%" }}>{station.sna}</div>
                          <div style={{ width: "15%" }}>
                            {station.available_rent_bikes}
                          </div>
                          <div style={{ width: "15%" }}>
                            {station.available_return_bikes}
                          </div>
                        </div>
                      ))
                    : filteredDatas.map((station, index) => (
                        <div className="item" key={index}>
                          <div style={{ width: "15%" }}>台北市</div>
                          <div style={{ width: "15%" }}>{station.sarea}</div>
                          <div style={{ width: "40%" }}>{station.sna}</div>
                          <div style={{ width: "15%" }}>
                            {station.available_rent_bikes}
                          </div>
                          <div style={{ width: "15%" }}>
                            {station.available_return_bikes}
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>暫無資料</div>
        )}
      </div>
    </main>
  );
}

export default Information;
