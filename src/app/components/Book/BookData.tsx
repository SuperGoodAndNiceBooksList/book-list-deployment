import React, { useContext, ReactElement } from "react";
import { useState, useEffect } from "react";
import {
  BookDataBooksApiResponse,
  BookDataBooksResponse,
  BookDataProps,
} from "./models";
import Image from "next/image";
import Link from "next/link";
import fetch from "cross-fetch";
import "../../globals.css";
import { FavoritesContext } from "@/context/Context";

("use-client");


const BookData = ({ bibkey, crop, subjectsLimit, preFetchedData, filteredList }: BookDataProps) => {
  const [bookData, setBookData] = useState<BookDataBooksResponse>();
  const [favorites, setFavorites] = useContext(FavoritesContext);

  // isbn format should be "ISBN:#########" ex: ISBN:9780980200447
  // olid should be "OLID:OL######"" ex: OLID:OL22853304M

  const url: string = `https://openlibrary.org/api/books?bibkeys=${bibkey}&jscmd=data&format=json`;
  const retrieve = async () => {
    if (!preFetchedData){
      const res: Response = (await fetch(url)) as Response;
      const data: BookDataBooksApiResponse = await res.json();
      // console.log("bookdata is: ", data);
      // console.log("bibkey is: ", data[bibkey])
      setBookData(data[bibkey]);
    } else{
      setBookData(preFetchedData);
    }
    //console.log("favorites are",favorites?.list);
  };

  useEffect(() => {
    retrieve();
}, [favorites?.list, favorites?.filterTerm, filteredList, favorites]);
  
const favoritesHasBook = (bookData: BookDataBooksResponse | undefined) => {
    let result = false;

    if(!favorites || !favorites.list || !bookData){
      return result;
    }

      favorites.list.map((favorite) => {
        if(favorite.key === bookData.key){
          result = true;
          return;
        };
      });
    return result;
  }
  const filterFavorites = (bookData: BookDataBooksResponse | undefined) => {
    if(!favorites || !favorites.list || !bookData){
      return;
    }
    let copyFavoritesList = favorites.list;
    copyFavoritesList = copyFavoritesList.filter((favorite) => {return favorite.key !== bookData.key});
    localStorage.setItem("favorites", `${JSON.stringify(copyFavoritesList)}`);
    setFavorites({...favorites, list:[...copyFavoritesList]});
  }

  const addToFavorites = (bookData: BookDataBooksResponse | undefined) => {
    if(!bookData){
      return;
    }
    if(!favorites || !favorites.list){
      setFavorites({list:[bookData]});
      return;
    }
    if (!favoritesHasBook(bookData)) {
      localStorage.setItem("favorites", `${JSON.stringify(favorites.list)}`);
      setFavorites({...favorites, list:[...favorites.list, bookData]});
    } 
  };

  const removeFromFavorites = (bookData: BookDataBooksResponse | undefined) => {
    if (favoritesHasBook(bookData)) {
      filterFavorites(bookData);
    }
  };



  const FavoritesButton = () => {
    let bookInFavs = favoritesHasBook(bookData);
    return(
      <button
        className="bg-mossGreen-default hover:bg-mossGreen-dark active:bg-mossGreen-light m-2 text-white font-bold py-2 px-4 rounded-full"
        onClick={ () => {bookInFavs ? removeFromFavorites(bookData) : addToFavorites(bookData)}}
      >
        {bookInFavs ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    );
  }

  const Title = (): ReactElement => {
    return (
      <div className="m-2">
        <h3
          className="m-2"
        >{bookData?.title}</h3>
        <p
          className="m-2"
        >{bookData?.by_statement}</p>
      </div>
    );
  };
  //todo: add links to each subject for a genre page
  const showDetails = () => {
    let subjects = bookData?.subjects;
    if (subjectsLimit) {
      subjects = bookData?.subjects?.splice(0, subjectsLimit);
    }
    if (!crop && subjects) {
      return (
        <div className="border-1 p-2">
          <h4 className="">Subjects:</h4>
          <ul>
            {subjects.map((subject, i) => (
              <li key={i}>{subject.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const BookCover = () => {
    let imageProps = {
      imageSrc: "/loading.gif",
      height: 100,
      width: 100,
    };

    if (bookData) {
      //temp fix for books without covers
      imageProps.imageSrc = crop
        ? bookData.cover?.medium
        : bookData.cover?.large;
      imageProps.height = crop ? 150 : 800;
      imageProps.width = crop ? imageProps.width : 500;
    }

    return (
      <Image
        src={imageProps.imageSrc ? imageProps.imageSrc : "/placeHolder.jpg"}
        alt="Book Cover Preview"
        priority={true}
        className=""
        blurDataURL="/loading.gif"
        placeholder="blur"
        height={imageProps.height}
        width={imageProps.width}
      />
    );
  };

  const TitleAndCover = () => {
    if (!crop) {
      return (
        <div
          className="flex flex-col items-center"
        >
          <Title />
          <BookCover />
          <FavoritesButton />
        </div>
      );
    } else {
      return (
        <div
          className="flex flex-col"
        >
          <Link href={"/book" + bookData?.key.substring(6)}
            className="flex flex-col items-center"
          >
            <Title />
            <BookCover />
          </Link>
          <FavoritesButton/>
        </div>
      );
    }
  };

  if (bookData === undefined) return null;
  //TODO: add tailwind styling to book details
  return (
    <>
      <article className="border border-grey-500 flex flex-col p-8 shadow-md">
        <TitleAndCover />
        {showDetails()}
      </article>
    </>
  );
};

export { BookData };
