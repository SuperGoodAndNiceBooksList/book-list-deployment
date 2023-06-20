"client-side";
import React, { useContext, ReactElement } from "react";
import { useState, useEffect } from "react";
import {
  BookDataSearchProps,
  BookDataSearchApiResponse,
  BookDataSearchResponse,
  searchTypes,
} from "./models";
import { BookData } from "./BookData";
import fetch from "cross-fetch";
import "../../globals.css";
import { useSearchParams } from "next/navigation";
import { OptionContext } from "@/context/Context";

("use-client");

const BookList = ({ search }: BookDataSearchProps) => {
  const [option] = useContext(OptionContext);
  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState<BookDataSearchResponse[]>();
  const [books, setBooks] = useState<any>();
  const urls = {
    Title: {
      query: "search.json?q=",
      method: "encode",
    },
    Genre: {
      query: "subjects/",
      method: "encode",
    },
    Author: {
      //query:  "search/authors.json?q=",
      query: "search.json?q=",
      method: "encode",
    },
    Default: {
      query: "search.json?q=",
      method: "encode",
    },
  };
  const getSearchType = () => {
    if (option?.selection && search) {
      const query =
        urls[option.selection].method === "concat"
          ? search?.split(" ").join("+")
          : encodeURI(search);
      return option?.selection != "Genre"
        ? `${urls[option.selection].query}${query}&limit=50&random`
        : `${urls[option.selection].query}${query}.json?limit=50`;
    }
    const query = search ? encodeURI(search) : "";
    return option?.selection != "Genre"
      ? `${urls.Default.query}${encodeURI(query)}&limit=50&random`
      : `${urls.Default.query}${encodeURI(query)}.json?limit=50`;
  };

  const retrieve = async () => {
    if (search) {
      // const query = (search.includes(" ")) ? search.split(" ").join("+") : search;
      // const query = encodeURI(search);
      setLoading(true);
      const url: string = `https://openlibrary.org/${getSearchType()}`;
      const res: Response = (await fetch(url)) as Response;
      const data: BookDataSearchApiResponse = await res.json();
      const worksData = option?.selection != "Genre" ? data?.docs : data?.works;
      setWorks(worksData);
    } else {
      setWorks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    retrieve();
  }, [search]);

  useEffect(() => {
    setBooks(renderBooks());
  }, [works]);

  const renderBooks = () => {
    if (works) {
      return works.map((book, idx) => {
        const olid =
          option?.selection != "Genre"
            ? book?.seed[0]?.split("/")[2]
            : book?.cover_edition_key;
        return olid ? (
          <BookData key={idx} bibkey={"OLID:" + olid} crop={true} />
        ) : null;
      });
    }
  };
  const renderFailedSearch = () => {
    if (!works && !loading) {
      return <h3>{"we couldn't find what you were looking for"}</h3>;
    }
  };

  return (
    <>
      {renderFailedSearch()}
      {works ? (
        <div className="grid grid-cols-6 gap-5">{books}</div>
      ) : null}
    </>
  );
};

export { BookList };
