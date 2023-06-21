"use-client";

import React, { useContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/app/components/Book/BookData";
import "../../app/globals.css";
import { Layout } from "@/app/components/Layout/Layout";
import { FavoritesContext } from "@/context/Context";
import { filterReducer } from "@/reducer/filteredList";
import { BookDataBooksResponse } from "@/app/components/Book/models";

("use-client");

export default function Page() {
  const router = useRouter();

  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [filteredList, setFilteredList] = useReducer(
    filterReducer,
    favorites?.list
  );

  useEffect(() => {
    const getFromStorage =
      (!favorites || !favorites.list || favorites.list.length < 1) &&
      localStorage.getItem("favorites") &&
      JSON.parse(localStorage.getItem("favorites") as string);
    if (getFromStorage) {
      const savedFavorites = localStorage.getItem("favorites");
      setFavorites({
        filterTerm: "",
        list: JSON.parse(savedFavorites as string),
      });
    }
  }, []);
  useEffect(() => {
    const filterTerm = favorites?.filterTerm ? favorites.filterTerm : "";
    setFilteredList({
      type: "filter",
      payload: { filterTerm: filterTerm, favoritesList: favorites?.list },
    });
  }, [favorites?.filterTerm, favorites?.list]);

  if (!filteredList)
    return (
      <>
        <p className="flex justify-center mx:auto pb-8">
          User has no favorites.
        </p>
      </>
    );

  return (
    <>
      <div className="grid grid-cols-6 gap-5">
        {filteredList.map((bookData: BookDataBooksResponse, idx: number) => (
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
