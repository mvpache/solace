"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Advocate } from "./models/advocate";
import SearchBar from "./components/searchBar";
import { on } from "events";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [degreeSearch, setDegreeSearch] = useState("");
  const [specialtiesSearch, setSpecialtiesSearch] = useState("");
  const [yearsOfExperienceSearch, setYearsOfExperienceSearch] = useState(0);

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  useEffect(() => {
    console.log("fetching advocates...");
    let queryParams = "?";
    if (firstNameSearch.length > 0) {
      queryParams += `firstName=${firstNameSearch}&`;
    }

    if (lastNameSearch.length > 0) {
      queryParams += `lastName=${lastNameSearch}&`;
    }

    if (citySearch.length > 0) {
      queryParams += `city=${citySearch}&`;
    }

    if (degreeSearch.length > 0) {
      queryParams += `degree=${degreeSearch}&`;
    }

    if (specialtiesSearch.length > 0) {
      queryParams += `specialties=${specialtiesSearch}&`;
    }


    if (yearsOfExperienceSearch > 0) {
      queryParams += `yearsOfExperience=${yearsOfExperienceSearch}&`;
    }

    if (queryParams.length > 1) {
      fetch(`/api/advocates${queryParams}`).then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        });
      });
    }
  }, [
    firstNameSearch,
    lastNameSearch,
    citySearch,
    degreeSearch,
    specialtiesSearch,
    yearsOfExperienceSearch,
  ]);

  const fetchAdvocates = () => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  };

  const onClickReset = () => {
    console.log(advocates);
    fetchAdvocates();
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
      <table className="w-full border-spacing-2">
        <thead>
          <tr className="border-b">
            <th className="min-w-28 text-left">First Name</th>
            <th className="min-w-28 text-left">Last Name</th>
            <th>City</th>
            <th className="min-w-16">Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr key={advocate.id} className="border-b">
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td className="text-center">{advocate.degree}</td>
                <td className="flex flex-wrap gap-x-2">
                  {advocate.specialties.map((specialty, index) => (
                    <div key={index}>{specialty}{index < advocate.specialties.length - 1 ? ", " : ""}</div>
                  ))}
                </td>
                <td className="text-center">{advocate.yearsOfExperience}</td>
                <td className="min-w-36 text-center">{advocate.phoneNumber.toString().slice(0, 3) + "-" + advocate.phoneNumber.toString().slice(3, 6) + "-" + advocate.phoneNumber.toString().slice(6, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
