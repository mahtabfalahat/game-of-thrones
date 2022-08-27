import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { houses , details} from "./Path";
import Spinner from "./../components/Spinner/Spinner";
const Houses = lazy(() => import("../views/Houses/Houses"));
const Details = lazy(() => import("../views/Details/Details"));

const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path={details} element={<Details />} />
          
            <Route  path="*" element={<main style={{ padding: "1rem" }}> {" "}   <p>There's nothing here!</p>{" "}</main> }/>
            <Route path={houses} element={<Houses />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
export default MainRoutes;
