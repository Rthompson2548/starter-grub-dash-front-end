import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDishes, listOrders } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  const [dishesError, setDishedError] = useState(null);

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();

    listOrders(abortController.signal).then(setOrders).catch(setOrdersError);
    listDishes(abortController.signal).then(setDishes).catch(setDishedError);

    return () => abortController.abort();
  }

  const ordersList = orders.map((order, index) => {
    const total = order.dishes.reduce(
      (sum, dish) => sum + dish.price * dish.quantity,
      0
    );
    return (
      <tr key={order.id}>
        <td>{index + 1}</td>
        <td>{order.deliverTo}</td>
        <td>{order.mobileNumber}</td>
        <td>${total}</td>
        <td>{order.status}</td>
        <td>
          <Link
            to={`/orders/${order.id}/edit`}
            className="btn btn-primary"
            title="Edit Order"
          >
            <span className="oi oi-pencil my-1" /> 
          </Link>
        </td>
      </tr>
    );
  });

  const DishesList = dishes.map((dish, index) => {
    return (
      <tr key={dish.id}>
        <td>{index + 1}</td>
        <td>{dish.name}</td>
        <td>{dish.description}</td>
        <td>${dish.price}</td>
        <td>
          <Link
            to={`/dishes/${dish.id}/edit`}
            className="btn btn-primary"
            title="Edit Order"
          >
            <span className="oi oi-pencil my-1" /> 
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <main>
      <h1 class="my-4 font-weight-bold">Dashboard</h1>
      <hr />
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="white-box">
            <div className="d-md-flex mb-3">
              <h2 className="box-title mb-0">Orders</h2>
            </div>
            <ErrorAlert error={ordersError} />
            <div className="table-responsive">
              <table className="table no-wrap">
                <thead>
                  <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">DELIVERY ADDRESS</th>
                    <th className="border-top-0">PHONE</th>
                    <th className="border-top-0">TOTAL</th>
                    <th className="border-top-0">STATUS</th>
                  </tr>
                </thead>
                <tbody>{ordersList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="white-box">
            <div className="d-md-flex my-3">
              <h2 className="box-title mb-0">Dishes</h2>
            </div>
            <ErrorAlert error={dishesError} />
            <div className="table-responsive">
              <table className="table no-wrap my-3">
                <thead>
                  <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">NAME</th>
                    <th className="border-top-0">DESCRIPTION</th>
                    <th className="border-top-0">PRICE</th>
                  </tr>
                </thead>
                <tbody>{DishesList}</tbody>
              </table>
              <div className="d-flex justify-content-end mb-5">
                <Link to="/dishes/new" className="btn btn-success mr-3">
                  <span className="oi oi-plus my-2 mx-1" style={{ fontSize: "20px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
