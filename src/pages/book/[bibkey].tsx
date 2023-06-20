import React from "react";
import { useRouter } from "next/router";
import { BookData } from "@/app/components/Book/BookData";
import '../../app/globals.css';
import { Layout } from "@/app/components/Layout/Layout";

("use-client");

export default function Page() {
    const router = useRouter();
    let bibkey = "";
    if (typeof router.query.bibkey === "string"){
        bibkey=router.query.bibkey;
    }
    return (<>
    <div className="flex justify-center">
    <BookData bibkey={bibkey} subjectsLimit={20} />
    </div>
    </>
    );
}