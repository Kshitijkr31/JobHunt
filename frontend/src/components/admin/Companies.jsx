import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Search, Plus, Building2 } from "lucide-react";
import "./Companies.css";

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className='companies-page'>
      <Navbar />

      <main className='companies-container'>
        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className='companies-header'>
          <div className='companies-title-section'>
            <div className='companies-icon'>
              <Building2 size={24} />
            </div>

            <div>
              <h1 className='companies-title'>Companies</h1>

              <p className='companies-subtitle'>
                Manage and organize your registered companies
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className='new-company-button'
          >
            <Plus size={18} />
            New Company
          </Button>
        </div>

        {/* =====================================
            SEARCH SECTION
        ====================================== */}
        <div className='companies-toolbar'>
          <div className='company-search-wrapper'>
            <Search size={18} className='company-search-icon' />

            <Input
              value={input}
              placeholder='Search companies by name...'
              onChange={(e) => setInput(e.target.value)}
              className='company-search-input'
            />

            {input && (
              <button
                className='clear-search'
                onClick={() => setInput("")}
                type='button'
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* =====================================
            COMPANY TABLE
        ====================================== */}
        <section className='companies-table-card'>
          <div className='table-card-header'>
            <div>
              <h2>Registered Companies</h2>
              <p>View and manage companies available on JobHunt</p>
            </div>
          </div>

          <CompaniesTable />
        </section>
      </main>
    </div>
  );
};

export default Companies;
