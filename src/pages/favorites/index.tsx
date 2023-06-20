"use-client"

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/app/components/Book/BookData";
import "../../app/globals.css";
import { Layout } from "@/app/components/Layout/Layout";
import { FavoritesContext } from "@/context/Context";

("use-client");

export default function Page() {
  const router = useRouter();
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [filteredList, setFilteredList] = useState(favorites?.list);

  useEffect(() => {
    const getFromStorage = (!favorites || !favorites.list || favorites.list.length < 1) && localStorage.getItem("favorites") && JSON.parse(localStorage.getItem("favorites") as string);
    if(getFromStorage){
      const savedFavorites = localStorage.getItem("favorites")
      setFavorites({filterTerm: "", list: JSON.parse(savedFavorites as string)})
    }
  },[])
  useEffect(() => {
    const filterTerm = favorites?.filterTerm ? favorites.filterTerm : "";
    setFilteredList(
      favorites?.list?.filter(
        (book) =>
          book.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
          book.subjects?.forEach((subject) =>
            subject.name.toLowerCase().includes(filterTerm.toLowerCase())
          ) ||
          book.by_statement?.toLowerCase().includes(filterTerm.toLowerCase())
      )
    );
  }, [favorites?.filterTerm, favorites?.list]);

  if (!filteredList)
    return (
      <>
          <p className="flex justify-center mx:auto pb-8">User has no favorites.</p>
      </>
    );

  return (
    <>
        <div className="grid grid-cols-6 gap-5">
          {filteredList.map((bookData, idx) => (
            <BookData
              key={idx}
              bibkey={"prefetched"}
              crop={true}
              preFetchedData={bookData}
              filteredList={filteredList}
            />
          ))}
        </div>
    </>
  );
}
