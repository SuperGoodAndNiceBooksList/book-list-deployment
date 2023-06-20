import { BookDataBooksResponse, Favorites, Option } from "@/app/components/Book/models";
import React, { useState } from "react";

export const SearchContext = React.createContext<[string| null | undefined, React.Dispatch<React.SetStateAction<string | null | undefined>>]>([null!, () => null!]);

export const FavoritesContext = React.createContext<[Favorites | null | undefined, React.Dispatch<React.SetStateAction<Favorites | null | undefined>>]>([null!, () => null!]);

export const OptionContext = React.createContext<[Option | null | undefined, React.Dispatch<React.SetStateAction<Option>>]>([null!, () => null!]);