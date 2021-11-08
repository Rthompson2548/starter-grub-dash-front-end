import React, { useEffect, useState } from "react";
import { listDishes } from "../utils/api";
import DishCard from "./DishCard";
import ErrorAlert from "../layout/ErrorAlert";

function Home({ addToCart }) {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(loadDishes, []);

  function loadDishes() {
    const abortController = new AbortController();
    setError(null);
    listDishes(abortController.signal).then(setDishes).catch(setError);
    return () => abortController.abort();
  }

  const cards = dishes.map((dish) => (
    <DishCard key={dish.id} dish={dish}>
      <div class="text-center">
      <button className="btn btn-success px-3 pb-1 pt-2 my-2" onClick={() => addToCart(dish)}>
       <h6>Add to cart</h6>
      </button>
      </div>
    </DishCard>
  ));

  return (
    <main>
      <ErrorAlert error={error} />
      <div className="row">{cards}</div>
    </main>
  );
}

export default Home;
