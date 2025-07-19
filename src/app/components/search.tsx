interface SearchProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReset: () => void;
}

export default function Search({
  searchTerm,
  onChange,
  onClickReset,
}: SearchProps) {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for:
        <span id="search-term"></span>
      </p>
      <input value={searchTerm} style={{ border: "1px solid black" }} onChange={onChange} />
      <button onClick={onClickReset}>Reset Search</button>
    </div>
  );
}
