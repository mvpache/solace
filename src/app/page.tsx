"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Advocate } from "./models/advocate";
import SearchBar from "./components/searchBar";
import { on } from "events";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [degreeSearch, setDegreeSearch] = useState("");
  const [specialtiesSearch, setSpecialtiesSearch] = useState("");
  const [yearsOfExperienceSearch, setYearsOfExperienceSearch] = useState(0);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(firstNameSearch) ||
        advocate.lastName.includes(lastNameSearch) ||
        advocate.city.includes(citySearch) ||
        advocate.degree.includes(degreeSearch) ||
        advocate.specialties.includes(specialtiesSearch) ||
        advocate.yearsOfExperience >= yearsOfExperienceSearch
      );
    });

    console.log(filteredAdvocates)

    setFilteredAdvocates(filteredAdvocates);
  }, [
    firstNameSearch,
    lastNameSearch,
    citySearch,
    degreeSearch,
    specialtiesSearch,
    yearsOfExperienceSearch,
    advocates,
  ]);

  const onClickReset = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstNameSearch(value);
        break;
      case "lastName":
        setLastNameSearch(value);
        break;
      case "city":
        setCitySearch(value);
        break;
      case "degree":
        setDegreeSearch(value);
        break;
      case "Specialties":
        setSpecialtiesSearch(value);
        break;
      case "yearsOfExperience":
        setYearsOfExperienceSearch(parseInt(value));
        break;
      default:
        break;
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar onChange={onChange} onClickReset={onClickReset} />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty, index) => (
                    <div key={index}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
