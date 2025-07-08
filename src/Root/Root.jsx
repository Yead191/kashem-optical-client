import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import AppBar from "@/components/Appbar";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="flex flex-col min-h-screen ">
      <ScrollRestoration />
      <nav className="h-[64px]">
        {/* <Navbar></Navbar> */}
        <AppBar />
      </nav>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
