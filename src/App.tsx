import React, { useEffect } from "react";
import { Todo } from "./components/Todo/Todo";
import { getTodosFromServer, ITodo } from "./store/todo/todosSlice";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAppDispatch } from "./helper/hook";

function App() {
  const dispatch = useAppDispatch();

  const getDate = async () => {
    const tempArray: ITodo[] = [];
    const q = query(collection(db, "todos"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any): void => {
      const todo: ITodo = doc.data();
      tempArray.push({ ...todo });
    });
    dispatch(getTodosFromServer(tempArray));
  };

  useEffect(() => {
    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Todo />
    </>
  );
}

export default App;
