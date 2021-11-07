import React from "react";

function DishCard({ dish, children }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-2">
      <div className="card my-5 mx-2">
        <img
          src={dish.image_url}
          className="card-img-top"
          alt={`${dish.name} interior`}
        />
        <div className="card-body">
          <h4 className="card-title font-weight-bold">{dish.name}</h4>
          <h6 className="card-text">{dish.description}</h6>
          <h6 className="card-text font-weight-bold">${dish.price}</h6>
        </div>
        <div className="card-footer" style={{ backgroundColor: "white" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DishCard;
