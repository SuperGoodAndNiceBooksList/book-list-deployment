import React from "react";
import { Navigation } from "../Navigation/Navigation";
import { Search } from "../Navigation/Search/Search";
import '../../globals.css'

("use-client");

const Layout = ({children}: any) => {
    return (<>
    <div className="px-20">
    <Navigation/>
    <Search />
        <main>{children}</main>
    <footer className="flex justify-center border-t-2 mt-12">SuperNiceAndGoodFooter</footer>
    </div>
    </>);
}

export { Layout };