jest.mock('cross-fetch');
import React from "react";
import fetch from "cross-fetch";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BookData } from "../BookData";

const mockedFetch = jest.mocked(fetch);

const mockResultISBN = Promise.resolve({
    json: () =>
      Promise.resolve({
        "ISBN:9780980200447": {
            url: "https://openlibrary.org/books/OL22853304M/Slow_reading",
            key: "/books/OL22853304M",
            title: "Slow reading!!!!",
            authors: [
              {
                url: "https://openlibrary.org/authors/OL6548935A/John_Miedema",
                name: "John Miedema",
              },
            ],
            number_of_pages: 92,
            pagination: "80p.",
            weight: "1 grams",
          by_statement: "by John Miedema.",
            identifiers: {
              amazon: ["098020044X"],
              google: ["4LQU1YwhY6kC"],
              librarything: ["8071257"],
              goodreads: ["6383507"],
              isbn_10: ["1936117363"],
              isbn_13: ["9780980200447", "9781936117369"],
              lccn: ["2008054742"],
              oclc: ["297222669"],
              openlibrary: ["OL22853304M"],
            },
            classifications: {
              lc_classifications: ["Z1003 .M58 2009"],
              dewey_decimal_class: ["028/.9"],
            },
            publishers: [{ name: "Litwin Books" }],
            publish_places: [{ name: "Duluth, Minn" }],
            publish_date: "March 2009",
            subjects: [
              {
                name: "Books and reading",
                url: "https://openlibrary.org/subjects/books_and_reading",
              },
              {
                name: "Reading",
                url: "https://openlibrary.org/subjects/reading",
              },
            ],
            notes: "Includes bibliographical references and index.",
            table_of_contents: [
              {
                level: 0,
                label: "",
                title: "The personal nature of slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "Slow reading in an information ecology",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The slow movement and slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The psychology of slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The practice of slow reading.",
                pagenum: "",
              },
            ],
            links: [
              { title: "Author's Website", url: "http://johnmiedema.ca" },
              {
                title: "Chapter 2",
                url: "http://litwinbooks.com/slowreading-ch2.php",
              },
              {
                title: "Get the e-book",
                url: "http://www.powells.com/biblio/91-9781936117369-0",
              },
            ],
            ebooks: [
              {
                preview_url: "https://archive.org/details/slowreading00mied",
                availability: "borrow",
                formats: {},
                borrow_url:
                  "https://openlibrary.org/books/OL22853304M/Slow_reading/borrow",
                checkedout: false,
              },
            ],
            cover: {
              small: "https://covers.openlibrary.org/b/id/5546156-S.jpg",
              medium: "https://covers.openlibrary.org/b/id/5546156-M.jpg",
              large: "https://covers.openlibrary.org/b/id/5546156-L.jpg",
            },
        
        }
      })
  })

  const mockResultOLID = Promise.resolve({
    json: () =>
      Promise.resolve({
        "OLID:OL22853304M": {
            url: "https://openlibrary.org/books/OL22853304M/Slow_reading",
            key: "/books/OL22853304M",
            title: "Slow reading!!!!",
            authors: [
              {
                url: "https://openlibrary.org/authors/OL6548935A/John_Miedema",
                name: "John Miedema",
              },
            ],
            number_of_pages: 92,
            pagination: "80p.",
            weight: "1 grams",
          by_statement: "by John Miedema.",
            identifiers: {
              amazon: ["098020044X"],
              google: ["4LQU1YwhY6kC"],
              librarything: ["8071257"],
              goodreads: ["6383507"],
              isbn_10: ["1936117363"],
              isbn_13: ["9780980200447", "9781936117369"],
              lccn: ["2008054742"],
              oclc: ["297222669"],
              openlibrary: ["OL22853304M"],
            },
            classifications: {
              lc_classifications: ["Z1003 .M58 2009"],
              dewey_decimal_class: ["028/.9"],
            },
            publishers: [{ name: "Litwin Books" }],
            publish_places: [{ name: "Duluth, Minn" }],
            publish_date: "March 2009",
            subjects: [
              {
                name: "Books and reading",
                url: "https://openlibrary.org/subjects/books_and_reading",
              },
              {
                name: "Reading",
                url: "https://openlibrary.org/subjects/reading",
              },
            ],
            notes: "Includes bibliographical references and index.",
            table_of_contents: [
              {
                level: 0,
                label: "",
                title: "The personal nature of slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "Slow reading in an information ecology",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The slow movement and slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The psychology of slow reading",
                pagenum: "",
              },
              {
                level: 0,
                label: "",
                title: "The practice of slow reading.",
                pagenum: "",
              },
            ],
            links: [
              { title: "Author's Website", url: "http://johnmiedema.ca" },
              {
                title: "Chapter 2",
                url: "http://litwinbooks.com/slowreading-ch2.php",
              },
              {
                title: "Get the e-book",
                url: "http://www.powells.com/biblio/91-9781936117369-0",
              },
            ],
            ebooks: [
              {
                preview_url: "https://archive.org/details/slowreading00mied",
                availability: "borrow",
                formats: {},
                borrow_url:
                  "https://openlibrary.org/books/OL22853304M/Slow_reading/borrow",
                checkedout: false,
              },
            ],
            cover: {
              small: "https://covers.openlibrary.org/b/id/5546156-S.jpg",
              medium: "https://covers.openlibrary.org/b/id/5546156-M.jpg",
              large: "https://covers.openlibrary.org/b/id/5546156-L.jpg",
            },
        
        }
      })
  })


describe("<BookData/>", () => {
  
  beforeEach(() => {
    mockedFetch.mockRestore();
  });

  it("should render with ISBN correctly", async () => {
    mockedFetch.mockReturnValue(mockResultISBN)
    render(<BookData bibkey="ISBN:9780980200447" />);

    await waitFor(() => {
    expect(screen.getByText("Slow reading!!!!")).toBeInTheDocument();
    });
  });
  
  it("should render with OLID correctly", async () => {
    mockedFetch.mockReturnValue(mockResultOLID)  
    render(<BookData bibkey="OLID:OL22853304M" />);

    await waitFor(() => {
      expect(screen.getByText("Slow reading!!!!")).toBeInTheDocument();
    });
  });

  it("should render subjects when crop isn't passed to props", async () => {
    mockedFetch.mockReturnValue(mockResultISBN)
    render(<BookData bibkey="ISBN:9780980200447" />);

    await waitFor(() => {
    const subject1 = screen.getByText("Books and reading");
    const subject2 = screen.getByText("Reading");

    expect(subject1).toBeInTheDocument();
    expect(subject2).toBeInTheDocument();
    });
  })

  it("should render subjects when crop is false", async () => {
    mockedFetch.mockReturnValue(mockResultISBN)
    render(<BookData bibkey="ISBN:9780980200447" crop={false} />);

    await waitFor(() => {
    const subject1 = screen.getByText("Books and reading");
    const subject2 = screen.getByText("Reading");
    
    expect(subject1).toBeInTheDocument();
    expect(subject2).toBeInTheDocument();
    });
  })

  it("shouldn't render subjects when crop is passed to props", async () => {
    mockedFetch.mockReturnValue(mockResultISBN)
    render(<BookData bibkey="ISBN:9780980200447" crop={true} />);

    await waitFor(() => {
      const subject1 = (screen.queryByText("Books and reading"));
      const subject2 = (screen.queryByText("Reading"));

      expect(subject1).toBeNull();
      expect(subject2).toBeNull();
    });
  })

    it("should render subjects up to limit, when crop isn't passed to props & limit is 1", async () => {
    mockedFetch.mockReturnValue(mockResultISBN)
    render(<BookData bibkey="ISBN:9780980200447" subjectsLimit={1}/>);

    await waitFor(() => {
      const subject1 = (screen.queryByText("Books and reading"));
      const subject2 = (screen.queryByText("Reading"));
      console.log("subject 2 is: ", subject2);

      expect(subject1).toBeInTheDocument();
      expect(subject2).toBeNull();
      
    });
  })
});