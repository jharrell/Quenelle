import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Dispatch, FC } from "react";
import Spinner from "../LoadingSpinner";

interface Props {
  handleChange: Dispatch<React.SetStateAction<string>>;
  value: string;
  loading: boolean;
}

const SearchBar: FC<Props> = ({ handleChange, value, loading = false }) => {
  return (
    <div className="grow">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer">
          <MagnifyingGlassIcon className="w-5 h-5 text-zinc-700 dark:text-neutral-400" />
        </div>
        <input
          id={"search"}
          name={"search"}
          className={`rounded-2xl transition-all bg-opacity-50 dark:bg-opacity-50 duration-300  block h-12 w-full p-2 pl-10      dark:focus:ring-indigo-500 dark:focus:border-indigo-500  focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none   focus:ring-2  bg-zinc-100 dark:bg-zinc-900 font-light border relative  border-zinc-300 dark:border-zinc-700  text-xl text-zinc-800       placeholder-neutral-500   dark:placeholder-neutral-400 dark:text-neutral-50 `}
          placeholder={"Search..."}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          required
        />
        <div
          onClick={
            value.length > 0 && !loading ? () => handleChange("") : undefined
          }
          className="absolute inset-y-0 right-2 flex items-center pl-3  cursor-pointer"
        >
          {value.length > 0 && !loading && (
            <XMarkIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 cursor-pointer" />
          )}{" "}
          {value.length > 0 && loading && <Spinner size={5} />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
