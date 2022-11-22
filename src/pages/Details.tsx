import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Details: React.FunctionComponent = () => {
  const { id } = useParams<string>();
  const [todo, setTodo] = useState<Data>();

  useEffect(() => {
    let isFalse: Boolean = false;
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isFalse) {
          setTodo(data);
        }
      });

    return () => {
      isFalse = true;
    };
  }, [id]);

  return (
    <div>
      <h1>Details Page</h1>
      {todo && (
        <div>
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>UserID:</strong> {todo.userId}
          </p>
          <p>
            <strong>Completed:</strong> {todo.completed === false ? "False": "True"}
          </p>
        </div>
      )}
      <Link target="self" to="/">
        Home
      </Link>
    </div>
  );
};

export default Details;
