import SearchInput from "./searchInput";

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReset: () => void;
}

export default function SearchBar({ onChange, onClickReset }: SearchProps) {
  return (
    <div>
      <p>Search</p>
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
        label={"Years of Experience"}
        type={"number"}
        name="yearsOfExperience"
        onChange={onChange}
      />
      <button onClick={onClickReset}>Reset Search</button>
    </div>
  );
}
