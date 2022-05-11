import { useRef } from "react";
import "./App.css";
import InputSample from "./components/InputSample";
import UserList from "./components/UserList";

function App() {
  const users = [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "velopert2",
      email: "public.velopert2@gmail.com",
    },
    {
      id: 3,
      username: "velopert3",
      email: "public.velopert3@gmail.com",
    },
  ];

  const nextId = useRef(4);
  const onCreate = () => {
    nextId.current += 1;
  };
  return (
    <div className='App'>
      <InputSample />
      <UserList users={users} />
    </div>
  );
}

export default App;
