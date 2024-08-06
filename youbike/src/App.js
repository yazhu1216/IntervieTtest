import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import News from "./views/News";
import Information from "./views/Information";
import Charges from "./views/Charges";
import Activity from "./views/Activity";
import Description from "./views/Description";

import "./styles/app.scss";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="App">
      <header>
        <img className="logo" src="YouBike.svg.png" alt="Yubike" />
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`menu-items ${isMenuOpen ? "show" : ""}`}>
          <ul>
            <li>
              <Link
                to="/Description"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                使用說明
              </Link>
            </li>
            <li>
              <Link
                to="/Charges"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                收費方式
              </Link>
            </li>
            <li>
              <Link
                to="/Information"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                站點資訊
              </Link>
            </li>
            <li>
              <Link
                to="/News"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                最新消息
              </Link>
            </li>
            <li>
              <Link
                to="/Activity"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                活動專區
              </Link>
            </li>
            <li></li>
          </ul>
          <button>登入</button>
        </div>
      </header>
      <Routes>
        <Route>
          <Route index element={<Information />} />
          <Route path="Description" element={<Description />} />
          <Route path="Information" element={<Information />} />
          <Route path="Charges" element={<Charges />} />
          <Route path="News" element={<News />} />
          <Route path="Activity" element={<Activity />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
