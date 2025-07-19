import SearchInput from "./searchInput";

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReset: () => void;
}

export default function SearchBar({ onChange, onClickReset }: SearchProps) {
  return (
    <div>
      <p>Search</p>
      <div className="flex gap-4">
     <SearchInput label={"First Name"} onChange={onChange} name="firstName" />
      <SearchInput label={"Last Name"} onChange={onChange} name="lastName" />
      <SearchInput label={"City"} onChange={onChange} name={"city"} />
      <SearchInput label={"Degree"} onChange={onChange} name="degree" />
      <SearchInput
        label={"Specialties"}
        onChange={onChange}
        name="Specialties"
      />
      <SearchInput
        label={"Years of Experience (min)"}
        type={"number"}
        name="yearsOfExperience"
        onChange={onChange}
      />
      </div>
 
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClickReset}>Reset Search</button>
    </div>
  );
}
