import React, { useState } from "react";
import { Search, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import "./herosection.css";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const popularSearch = (search) => {
    setQuery(search);
    dispatch(setSearchedQuery(search));
    navigate("/browse");
  };

  return (
    <section className="hero-section">

      {/* Background decoration */}
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>

      <div className="hero-wrapper">

        {/* Badge */}

        <div className="hero-badge">
          <Sparkles size={15} />
          India's growing job discovery platform
        </div>

        {/* Heading */}

        <h1 className="hero-title">
          Find work that
          <br />

          <span>moves your career forward.</span>
        </h1>

        {/* Description */}

        <p className="hero-description">
          Discover opportunities from top companies, apply faster,
          and take the next step in your career.
        </p>

        {/* Search */}

        <div className="hero-search">

          <div className="search-field">
            <Search size={21} />

            <input
              type="text"
              value={query}
              placeholder="Search jobs, skills or companies..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchJobHandler();
                }
              }}
            />
          </div>

          <button
            onClick={searchJobHandler}
            className="hero-search-button"
          >
            Search Jobs
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Location */}

        <div className="hero-location">
          <MapPin size={16} />
          <span>Explore opportunities across India</span>
        </div>

        {/* Popular searches */}

        <div className="popular-searches">

          <span>Popular:</span>

          <button onClick={() => popularSearch("Frontend Developer")}>
            Frontend Developer
          </button>

          <button onClick={() => popularSearch("Backend Developer")}>
            Backend Developer
          </button>

          <button onClick={() => popularSearch("Data Science")}>
            Data Science
          </button>

          <button onClick={() => popularSearch("Java Developer")}>
            Java Developer
          </button>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;