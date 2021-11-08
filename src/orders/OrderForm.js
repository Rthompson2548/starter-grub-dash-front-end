import React from "react";
import OrderFormDish from "./OrderFormDish";

function OrderForm({
  order = {
    deliverTo: "",
    mobilePhone: "",
    status: "pending",
    dishes: [],
  },
  setOrder,
  onCancel,
  onSubmit,
  children,
  readOnly = false,
  showStatus = false,
}) {
  function changeHandler({ target: { name, value } }) {
    setOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(order);
  }

  function setDishQuantity(dishId, quantity) {
    setOrder((previousOrder) => {
      const dishes = previousOrder.dishes.map((dish) => {
        return {
          ...dish,
          quantity: dish.id === dishId ? Math.max(1, quantity) : dish.quantity,
        };
      });

      return {
        ...previousOrder,
        dishes,
      };
    });
  }

  function deleteDish(dishId) {
    setOrder((previousOrder) => {
      return {
        ...previousOrder,
        dishes: previousOrder.dishes.filter((dish) => dish.id !== dishId),
      };
    });
  }

  const dishes = order.dishes.map((dish) => (
    <OrderFormDish
      key={dish.id}
      dish={dish}
      setDishQuantity={setDishQuantity}
      deleteDish={deleteDish}
      readOnly={readOnly}
    />
  ));

  const total = order.dishes.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  return (
    <form onSubmit={submitHandler}>
      <fieldset className="mb-2">
        {showStatus && (
          <div className="form-group">
            <label htmlFor="status">Order Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              required={true}
              value={order.status}
              placeholder="Select a status for the order"
              disabled={readOnly}
              onChange={changeHandler}
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out-for-delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label
            htmlFor="deliverTo"
            className="my-3 font-weight-bold"
            style={{ fontSize: "30px" }}
          >
            Delivery address
          </label>
          <input
            type="text"
            className="form-control"
            id="deliverTo"
            name="deliverTo"
            required={true}
            value={order.deliverTo}
            placeholder="Enter your delivery address"
            disabled={readOnly}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="deliverTo"
            className="my-3 font-weight-bold"
            style={{ fontSize: "30px" }}
          >
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            required={true}
            value={order.mobileNumber}
            placeholder="Enter your mobile number "
            disabled={readOnly}
            onChange={changeHandler}
          />
        </div>
        {dishes}
        <div className="form-row mt-5">
          <h3>
            <span className="font-weight-bold">Total: ${total}</span>
          </h3>
        </div>
      </fieldset>
      <div className="form-row">{children}</div>
    </form>
  );
}

export default OrderForm;
