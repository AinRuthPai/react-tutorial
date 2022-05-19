import React, { useCallback, useMemo, useRef, useState, useReducer } from "react";
import "./App.css";
import Counter from "./components/Counter";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import useInputs from "./hooks/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },

  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "velopert2",
      email: "public.velopert2@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "velopert3",
      email: "public.velopert3@gmail.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) => {
          return user.id === action.id ? { ...user, active: !user.active } : user;
        }),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count} </div>
    </UserDispatch.Provider>
  );
}

/* // useReducer 사용 전 코드
function countActiveUsers(users) {
  // useMemo를 사용하지 않으면 input의 값을 바꿀때에도 이 함수가 호출된다.
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "velopert2",
      email: "public.velopert2@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "velopert3",
      email: "public.velopert3@gmail.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    // 위의 spread 연산자를 사용해도 되고, 아래의 concat 함수를 사용해도 된다.
    setUsers((users) => users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출하여 새로운 배열을 만듦
    // = user.id가 id인 것을 제거함.
    setUsers(users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) => {
        return user.id === id ? { ...user, active: !user.active } : user;
      })
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className='App'>
      <Counter />
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count} </div>
    </div>
  );
}
*/
export default App;
