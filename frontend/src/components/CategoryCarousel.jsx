import React from "react";
import {
  Code2,
  Server,
  Database,
  BrainCircuit,
  Layers3,
  Smartphone,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import "./CategoryCarousel.css";

const categories = [
  {
    name: "Frontend Developer",
    icon: Code2,
  },
  {
    name: "Backend Developer",
    icon: Server,
  },
  {
    name: "Data Science",
    icon: BrainCircuit,
  },
  {
    name: "Full Stack Developer",
    icon: Layers3,
  },
  {
    name: "Database",
    icon: Database,
  },
  {
    name: "Mobile Developer",
    icon: Smartphone,
  },
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="category-section category-animated">

      <div className="category-container">

        <div className="category-header">
          <div>
            <p>EXPLORE OPPORTUNITIES</p>
            <h2>
              Find jobs by <span>specialization</span>
            </h2>
          </div>

          <button
            onClick={() => navigate("/browse")}
            className="view-all-jobs"
          >
            View all jobs →
          </button>
        </div>

        <div className="category-grid">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => searchJobHandler(category.name)}
                className="category-card"
              >

                <div className="category-icon">
                  <Icon size={21} />
                </div>

                <span>{category.name}</span>

                <span className="category-arrow">
                  →
                </span>

              </button>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default CategoryCarousel;