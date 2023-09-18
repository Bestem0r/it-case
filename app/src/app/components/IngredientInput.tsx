import { Transition, Combobox } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchIngredients } from "@/api/fetchCocktails";

type IngredientInputProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

const IngredientInput = ({ name, setName }: IngredientInputProps) => {
  const [query, setQuery] = useState("");

  const allIngredients = useRef<string[]>([]);

  useEffect(() => {
    fetchIngredients().then((ingredients) => {
      allIngredients.current = ingredients["drinks"].map(
        (ingredient: any) => ingredient.strIngredient1
      );
    });
  }, []);

  const filteredIngredients =
    query === ""
      ? allIngredients.current.slice(0, 10)
      : allIngredients.current
          .filter((ingredient) => {
            return ingredient.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 10);

  return (
        <Combobox value={name} onChange={setName}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
              <Combobox.Input
                className="w-full border-none text-gray-900 focus:ring-0"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Vodka"
              />
{/*              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
*/}         </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredIngredients.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredIngredients.map((ingredient) => (
                    <Combobox.Option
                      key={ingredient}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                          active ? 'text-white bg-primary' : 'text-gray-900'
                        }`
                      }
                      value={ingredient}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {ingredient}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
    )
}

export default IngredientInput;
