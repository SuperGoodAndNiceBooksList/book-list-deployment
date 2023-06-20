import React from "react";
import Link from "next/link";
import "../../globals.css";

("use-client");

const Navigation = () => {
    //TODO: style with tailwind -- space-between w/ no horizontal list, no bullet points
  return (
    <>
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto border-b-2">
        <Link href="/">
          <h1 className="text-xl">SuperGoodAndNiceBooksList</h1>
        </Link>
        <div>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/favorites"}>Favorites</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export { Navigation };
