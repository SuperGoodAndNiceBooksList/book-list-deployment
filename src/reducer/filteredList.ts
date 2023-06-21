import { BookDataBooksResponse, Favorites } from '@/app/components/Book/models';
import { FavoritesContext } from '@/context/Context';
import React, { useContext } from 'react';

export const filterReducer: React.Reducer<BookDataBooksResponse[] | undefined | null, any> = (state: BookDataBooksResponse[] | null | undefined, action: any ) => {
    switch (action.type){
        case "filter":
            if (state){
                const favoritesList: BookDataBooksResponse[] = action.payload.favoritesList;
                return favoritesList.filter(
                    (book) =>
                      book.title.toLowerCase().includes(action.payload.filterTerm.toLowerCase()) ||
                      book.subjects?.forEach((subject) =>
                        subject.name.toLowerCase().includes(action.payload.filterTerm.toLowerCase())
                      ) ||
                      book.by_statement?.toLowerCase().includes(action.payload.filterTerm.toLowerCase())
                ); 
            }
            return [];
        default:
            return [];
    }
};