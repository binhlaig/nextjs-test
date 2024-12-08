"use client"

import { categories } from "@/data"
import WorkLiist from "../workList/WorkLiist"
import { useEffect, useState } from "react";
import Loader from "../Loader/loader";
import "@/styles/categories.scss"

const Feed = () => {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [workList, setWorkList] = useState([]);

    console.log(workList);
    const getWorkList = async () => {
        const response = await fetch(`/api/work/list/${selectedCategory}`);
        const data = await response.json();
        setWorkList(data);
        setLoading(false);
      };

      useEffect(() => {
        getWorkList();
      }, [selectedCategory]);
  return loading ? (
    <Loader/>
  ) : (
    <>
      <div className="categories">
        {categories?.map((item, index) => (
          <p onClick={() => setSelectedCategory(item)}
          className={`${item === selectedCategory ? "selected" : ""}`}
          key={index} >
            {item}
          </p>
        ))}
      </div>

      <WorkLiist data={workList}/>
    </>
  )

}

export default Feed