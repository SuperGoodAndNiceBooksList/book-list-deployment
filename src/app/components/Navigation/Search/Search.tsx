'use-client'
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FavoritesContext, OptionContext, SearchContext } from "@/context/Context";
import { SearchOptions } from "./SearchOptions";
import path from "path";

export function Search () {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");
    const [term,setTerm] = useContext(SearchContext);
    const [option] = useContext(OptionContext);
    const [favorites, setFavorites] = useContext(FavoritesContext);
    const pathname = usePathname();
    
    function getSearchLabelText ():string {
      const searchText = {
         Title: "Search for a Book",
         Author: "Search by Author",
         Genre: "Search by Genre",
         Favorites: "Search your Favorites",
         Default: "Search",
       };
      if(pathname === "/favorites"){
         return searchText.Favorites
      } else if (option && option.selection){
         return searchText[option.selection];
      }
      return searchText.Default;
      
    };

    function updateQuery(event:React.FormEvent<HTMLButtonElement>){
        event.preventDefault()
        if (pathname == "/favorites") {
            setFavorites({list: favorites?.list, filterTerm: query})
            router.push(pathname + '?search=' + encodeURI(query as string));
        }else{
            query ? setTerm(query) : null;
            router.push("/?search=" + encodeURI(query as string));
        }
    };

    return(<>
        <div className="flex flex-col m-10 px-5">
            <form className="border-2 border-grey-800 rounded-md flex flex-auto justify-start">
                <label
                    htmlFor="Search"
                    className="flex min-w-1/4 text-gray-300 m-2"
                >
                    {getSearchLabelText()}
                </label>
                    <input
                        className="flex flex-auto mx-2 text-black pl-1 pr-1"
                        name="Search"
                        id="Search"
                        autoFocus={true}
                        maxLength={200}
                        value={query}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    />
                <label>
                  <button 
                     className="bg-transparent hover:bg-dogWood-light active:dogWood-dark text-eerieBlack font-semibold hover:text-white py-2 px-4 border border-dogWood-dark hover:border-transparent rounded"
                     type="submit"
                     onClick={(e) => updateQuery(e)}
                  >
                     Search
                    </button>
                </label>
            </form>
            <SearchOptions />
        </div>
    </>);
}