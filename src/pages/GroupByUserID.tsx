import React from "react";
import "./GroupByUserID.css";
import { Link } from "react-router-dom";

export default class GroupByUserID extends React.Component {
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

  // Fetch data from API
  apiFetch = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((fetchData) => {
        this.setState((prevState) => {
          const sortedItems: any = {}
          const uniqueUserId = fetchData.map((value: any) => value.userId).filter((val: any, ind: any, arr: any) => arr.indexOf(val) === ind)
          for (let i of uniqueUserId) {
            sortedItems[i] = fetchData.filter((value: any) => value.userId === i)
          }

          const items = Object.entries(sortedItems)

          return { ...prevState, items };
        });
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
              <th>
                <Link target="self" to="/">
                  View Normal
                </Link>
              </th>
              <th>Group By UserID</th>
            </tr>
            </thead>
            <thead>
            <tr>
              <th>
                User ID
              </th>
              <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {items.map((value: any, index: any) => (
                <tr key={index}>
                  <td>{value[0]}</td>
                  <td>
                    <ul>
                      {value[1].map(({userId, title, id}: any)=>(<li key={`${userId}_${id}`}>{title}</li>))}
                    </ul>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
    );
  }
}