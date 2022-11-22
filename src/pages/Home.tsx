import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  // Constructor
  public constructor(props: any) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount = () => {
    this.apiFetch();
  };

  //Fetch data from API
  apiFetch = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        this.setState((prevState) => {
          return { ...prevState, items: json };
        });
      });
  };

  // Sort Title (A-Z)
  setSortedItemsTitle = () => {
    const { items }: any = this.state;
    const sortedTitle = items.sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    console.log(sortedTitle);

    this.setState((prevState) => {
      return { ...prevState, items: sortedTitle };
    });
  };

  // Sort ID (1-200)
  setSortedItemsID = () => {
    const { items }: any = this.state;
    const sortedID = items.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return items.direction === "ascending" ? -1 : 1;
      }
      if (a.id > b.id) {
        return items.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    console.log(sortedID);

    this.setState((prevState) => {
      return { ...prevState, items: sortedID };
    });
  };

  render() {
    const { items }: any = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <table>
          <thead>
            <tr>
              <th>View Normal</th>
              <th>
                <Link target="self" to={`/groupbyuserid`}>
                  Group By UserID
                </Link>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>
                ID
                <button type="button" onClick={() => this.setSortedItemsID()}>
                  ⬇️
                </button>
              </th>
              <th>
                User ID
              </th>
              <th>
                Title
                <button
                  type="button"
                  onClick={() => this.setSortedItemsTitle()}
                >
                  ⬇️
                </button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id + item.title}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>
                  <Link target="self" to={`/details/${item.id}`}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
