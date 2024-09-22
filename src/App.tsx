import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_DATA = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    console.log(loading, error, data);
  });
  return (
    <div className="App">
      {data
        ? data.launchesPast.map((launch: any) => {
            return <p>{launch.mission_name}</p>;
          })
        : null}
    </div>
  );
}
export default App;
