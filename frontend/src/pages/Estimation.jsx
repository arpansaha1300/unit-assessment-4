import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";

export default function Estimation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createOrUpdateTab("/estimation"));
  });

  return <div>hello</div>;
}
