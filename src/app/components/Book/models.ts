export interface BookDataProps {
  bibkey: string;
  crop?: boolean;
  subjectsLimit?: number;
  preFetchedData?: BookDataBooksResponse;
  filteredList?: BookDataBooksResponse[];
}

export interface BookDataSearchProps{
  search?: string | null;
}

export interface BookDataBooksApiResponse {
  [bib_key: string]: BookDataBooksResponse;
}

export interface BookDataBooksResponse {
  url: string;
  key: string;
  title: string;
  authors: Author[];
  number_of_pages: number;
  pagination: string;
  weight: string;
  by_statement: string;
  identifiers: {
    [website: string]: string[];
  };
  classifications: {
    [classification: string]: string[];
  };
  publishers: string[];
  publish_places: string[];
  publish_date: string;
  subjects: Subject[];
  notes: string;
  table_of_contents: Chapter[];
  links: Link[];
  cover: Cover;
}

export interface Cover {
  small: string;
  medium: string;
  large: string;
}

export interface Chapter {
  title: string;
  label: string;
  level: number;
  pagenum: string;
}

export interface Author {
  url: string;
  name: string;
}

export interface Subject {
  name: string;
  url: string;
}

export interface Link {
  title: string;
  url: string;
}


export interface BookDataSearchResponse {
  cover_i: number;
  has_fulltext: boolean;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  seed: string[];
  ia: string[];
  author_key: string[];
  public_scan_b: boolean;
  cover_edition_key: string;
}

export interface BookDataSearchApiResponse {
  start: number;
  num_found: number;
  docs: BookDataSearchResponse[];
  works: BookDataSearchResponse[];
}

export interface BookISBN {
  bibkey: string,
}

export interface Favorites {
  list?: BookDataBooksResponse[];
  filterTerm?: string;
}

export enum searchTypes {
  title = "Title",
  author = "Author",
  genre = "Genre",
  default = ""}
  
export interface Option {
  selection: searchTypes;
}

