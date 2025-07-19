interface SearchInputProps {
  label: string;
  type?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  label,
  type = "text",
  name,
  onChange,
}: SearchInputProps) {
  return (
    <div className="flex flex-col">
      <p>
        {label}:<span id="search-term"></span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        type={type}
        name={name}
        onChange={onChange}
      />
    </ div>
  );
}
