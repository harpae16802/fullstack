import React from "react";
import { FaSistrix } from "react-icons/fa";

export default function SearchBarNobutton() {
  return (
    <>
      <div className="search-item">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="search-bar">
              <form className="d-flex justify-content-between">
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary rounded-pill" type="submit">
                  搜尋
                </button>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="search-bar">
              <form className="d-flex justify-content-between">
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary rounded-pill" type="submit">
                  搜尋
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
