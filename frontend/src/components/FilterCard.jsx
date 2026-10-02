import React from "react";
import { MapPin, BriefcaseBusiness, IndianRupee, X } from "lucide-react";

import "./FilterCard.css";

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    array: [
      "Noida",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
    ],
  },

  {
    filterType: "Industry",
    icon: BriefcaseBusiness,
    array: [
      "Frontend Developer",
      "Backend Developer",
      "IT",
      "Java Developer",
    ],
  },

  {
    filterType: "Salary",
    icon: IndianRupee,
    array: [
      "0 LPA-2 LPA",
      "2 LPA-5 LPA",
      "5 LPA or Above",
    ],
  },
];

const FilterCard = ({
  selectedLocation,
  selectedIndustry,
  selectedSalary,

  setSelectedLocation,
  setSelectedIndustry,
  setSelectedSalary,

  onFilterSelect,
  onClearFilters,
}) => {

  /*
   * -----------------------------------------
   * HANDLE FILTER CLICK
   * -----------------------------------------
   *
   * Clicking selected option again removes it.
   */
  const handleFilterClick = (filterType, value) => {

    if (filterType === "Location") {
      setSelectedLocation(
        selectedLocation === value ? "" : value
      );
    }

    if (filterType === "Industry") {
      setSelectedIndustry(
        selectedIndustry === value ? "" : value
      );
    }

    if (filterType === "Salary") {
      setSelectedSalary(
        selectedSalary === value ? "" : value
      );
    }

    if (onFilterSelect) {
      onFilterSelect();
    }
  };


  /*
   * -----------------------------------------
   * CHECK ACTIVE FILTER
   * -----------------------------------------
   */
  const isSelected = (filterType, value) => {

    if (filterType === "Location") {
      return selectedLocation === value;
    }

    if (filterType === "Industry") {
      return selectedIndustry === value;
    }

    if (filterType === "Salary") {
      return selectedSalary === value;
    }

    return false;
  };


  const hasAnyFilter =
    selectedLocation ||
    selectedIndustry ||
    selectedSalary;


  return (
    <div className="filter-main">

      {/* -----------------------------------------
          HEADER
      ----------------------------------------- */}
      <div className="filter-header">

        <div>
          <h1>
            Filter Jobs
          </h1>

          <p>
            Find jobs that match your preferences.
          </p>
        </div>

        {hasAnyFilter && (
          <button
            className="filter-clear-icon"
            onClick={onClearFilters}
            title="Clear filters"
          >
            <X size={17} />
          </button>
        )}

      </div>


      <div className="filter-divider" />


      {/* -----------------------------------------
          FILTER GROUPS
      ----------------------------------------- */}
      {filterData.map((data) => {

        const Icon = data.icon;

        return (
          <div
            className="filter-group"
            key={data.filterType}
          >

            {/* GROUP TITLE */}
            <div className="filter-group-title">

              <Icon size={17} />

              <span>
                {data.filterType}
              </span>

            </div>


            {/* OPTIONS */}
            <div className="filter-options">

              {data.array.map((item) => {

                const active = isSelected(
                  data.filterType,
                  item
                );

                return (
                  <button
                    type="button"
                    key={item}
                    className={`filter-option ${
                      active ? "filter-option-active" : ""
                    }`}
                    onClick={() =>
                      handleFilterClick(
                        data.filterType,
                        item
                      )
                    }
                  >

                    <span
                      className={`filter-radio ${
                        active
                          ? "filter-radio-active"
                          : ""
                      }`}
                    >
                      {active && (
                        <span className="filter-radio-dot" />
                      )}
                    </span>

                    <span>
                      {item}
                    </span>

                  </button>
                );

              })}

            </div>

          </div>
        );
      })}


      {/* -----------------------------------------
          CLEAR ALL
      ----------------------------------------- */}
      {hasAnyFilter && (
        <button
          type="button"
          className="clear-all-filters"
          onClick={onClearFilters}
        >
          Clear All Filters
        </button>
      )}

    </div>
  );
};

export default FilterCard;