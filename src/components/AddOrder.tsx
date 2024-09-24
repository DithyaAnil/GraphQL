import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

export type AppProps = {
  customerId: number;
};

const GET_DATA = gql`
  {
    customers {
      id
      name
      industry
      orders {
        id
        description
        totalInCents
      }
    }
  }
`;

const MUTATE_DATA = gql`
  mutation MUTATE_DATA(
    $description: String!
    $totalInCents: Int!
    $customer: ID!
  ) {
    createOrder(
      customer: $customer
      description: $description
      totalInCents: $totalInCents
    ) {
      order {
        id
        customer {
          id
        }
        description
        totalInCents
      }
    }
  }
`;

export default function AddOrder({ customerId }: AppProps) {
  const [active, setActive] = useState(false);
  const [total, setTotal] = useState(NaN);
  const [description, setDescription] = useState("");

  const [createOrder, { loading, error, data }] = useMutation(MUTATE_DATA, {
    refetchQueries: [{ query: GET_DATA }],
  });
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
              createOrder({
                variables: {
                  customer: customerId,
                  description: description,
                  totalInCents: total * 100,
                },
              });
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
              <label htmlFor="total">Total:</label>
              <input
                id="total"
                type="number"
                value={isNaN(total) ? "" : total}
                onChange={(e) => {
                  setTotal(parseFloat(e.target.value));
                }}
              />
            </div>
            <br />
            {/* 
            <button disabled={createOrderLoading ? true : false}>
              Add Order
            </button>
            {createOrderError ? <p>Error creating order</p> : null}
            */}
            <button disabled={loading ? true : false}>Add order</button>
          </form>
          {error ? <p>Something wrong</p> : null}
        </div>
      ) : null}
    </div>
  );
}
