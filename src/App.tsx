import { useEffect, useState } from "react";
import axios from "axios";

interface IUser {
  id: string;
  name: string;
  createdAt: string;
}

function App() {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = "https://633b3768f11701a65f604282.mockapi.io/users";

  const onCreateUserHandler = async () => {
    const newUser: IUser = {
      name: `${"user"} ${String(Date.now())}`,
      createdAt: "02",
      id: String(Date.now()),
    };
    try {
      const { data } = await axios.post(url, newUser);
      setUsers([...(users as IUser[]), data]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const onUpdateUserHandler = async (id: string) => {
    const changedUser: IUser = {
      name: `${"user"} ${String(Date.now())}`,
      createdAt: "03",
      id: id,
    };
    try {
      await axios.put(`${url}/${id}`, changedUser);
      const newData = users?.map((user: IUser) =>
        user.id === id ? changedUser : user
      ) as IUser[];
      setUsers(newData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const onDeleteUserHandler = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${url}/${id}`);
      const newData = users?.filter((user: IUser) => user.id !== id) as IUser[];
      setUsers(newData);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const response = async () => {
      try {
        const { data } = await axios.get(url);
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    response();
  }, [users]);

  return (
    <div>
      <button onClick={onCreateUserHandler}>Add user</button>
      {users !== null && (
        <>
          {users.map((user: IUser) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <span>{user.id}</span>
              <span>{user.createdAt}</span>
              <button
                disabled={isLoading}
                onClick={() => onDeleteUserHandler(user.id)}
              >
                Delete
              </button>
              <button onClick={() => onUpdateUserHandler(user.id)}>
                Update user
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
