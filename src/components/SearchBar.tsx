import { FC } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative w-full lg:max-w-[414px]">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-tertiary" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)} // Call onChange with the new value
        className="w-full rounded-[20px] border border-tertiary/50 bg-transparent h-[37px] pl-10 pr-4 text-white placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
      />
    </div>
  );
};

export default SearchBar;
