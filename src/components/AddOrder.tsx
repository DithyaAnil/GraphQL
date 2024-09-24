import { useState } from "react";

export type AppProps = {
  customerId: number;
};

export default function AddOrder({ customerId }: AppProps) {
  const [active, setActive] = useState(false);
  const [cost, setCost] = useState(NaN);
  const [description, setDescription] = useState("");
  return (
    <div>
      {active ? null : (
        <button
          onClick={() => {
            setActive(true);
          }}
        >
          New Order
        </button>
      )}
      {active ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              /* createCustomer({
                variables: { name: name, industry: industry },*/
            }}
          >
            <div>
              <label htmlFor="description">Name</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="cost">Cost:</label>
              <input
                id="cost"
                type="number"
                value={isNaN(cost) ? "" : cost}
                onChange={(e) => {
                  setCost(parseFloat(e.target.value));
                }}
              />
            </div>
            <br />
            {/* 
            <button disabled={createCustomerLoading ? true : false}>
              Add Customer
            </button>
            {createCustomerError ? <p>Error creating customer</p> : null}
            */}
            <button>Add order</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
