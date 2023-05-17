import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { FC } from "react";
import Chip from "../display/Chip";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
interface Props {
  name: string;
  initialValue?: string[];
  changeHandler?: (value: string[]) => void;
  placeholder?: string;
  options: string[];
}

const MultiSelect: FC<Props> = ({
  name,
  initialValue,
  changeHandler,
  placeholder = "Select Allergens",
  options,
}) => {
  const [selected, setSelected] = useState(initialValue || []);

  const handleChange = (value: string[]) => {
    if (changeHandler) {
      changeHandler(value);
    }
    setSelected(value);
  };

  return (
    <div className="w-full z-30">
      <input type="hidden" value={selected.join(",")} name={name} />
      <Listbox value={selected} onChange={handleChange} multiple>
        <div className="relative ">
          <Listbox.Button className=" relative bg-opacity-50 dark:bg-opacity-50 font-light w-full cursor-default border py-2 px-2 border-gray-300 dark:border-neutral-700 rounded-2xl  bg-neutral-200 dark:bg-neutral-800 pl-3 pr-10 text-left  text-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 ">
            <span className="flex flex-wrap gap-2 items-center ">
              {selected.length > 0 ? (
                selected.map((s) => <Chip key={s} content={s} />)
              ) : (
                <p className=" m-0.5 text-neutral-400  text-md">
                  {placeholder}
                </p>
              )}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-neutral-700"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-300"
            enterFrom="opacity-0  "
            enterTo="opacity-100 "
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-2 bg-neutral-100 z-50   rounded-2xl max-h-60 w-full  overflow-auto   dark:bg-neutral-800 py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
              {options.map((o, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-neutral-700  text-neutral-100"
                        : "dark:text-neutral-300 text-neutral-700"
                    }`
                  }
                  value={o}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {o}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MultiSelect;
