import { db } from "../firebase";
import { ITodo } from "../store/todo/todosSlice";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref } from "firebase/storage";

type DataBaseTodo = {
  fbId: string;
  id: string;
  title: string;
  textBody: string;
  date: string;
  isCompleted: string;
  isExpiried: string;
  file: string;
};

const getArrayWithFBId = async () => {
  const todoRef = collection(db, "todos");
  const docsSnap = await getDocs(todoRef);
  const currentArray: DataBaseTodo[] = [];
  docsSnap.forEach((doc): void => {
    const todo = doc.data();
    currentArray.push({
      id: todo.id,
      title: todo.title,
      textBody: todo.textBody,
      isCompleted: todo.isCompleted,
      file: todo.file,
      date: todo.date,
      isExpiried: todo.isExpiried,
      fbId: doc.id,
    });
  });
  return currentArray;
};
export const addTodoToDB = async (todoData: ITodo) => {
  const todoRef = collection(db, "todos");
  await setDoc(doc(todoRef), todoData);
};
export const deleteTodoFromDB = async (id: string) => {
  const currentArray = await getArrayWithFBId();
  const deletTodo = currentArray.find((todo) => todo.id === id);
  if (deletTodo) {
    await deleteDoc(doc(db, "todos", deletTodo.fbId));
  }
};

export const toggleTodoCompleted = async (id: string) => {
  const currentArray = await getArrayWithFBId();
  const currentTodo = currentArray.find((todo) => todo.id === id);
  if (currentTodo) {
    console.log(currentTodo);
    const washingtonRef = doc(db, "todos", currentTodo.fbId);
    await updateDoc(washingtonRef, { isCompleted: !currentTodo.isCompleted });
  }
};

export const saveNewTitleAndBody = async (
  id: string,
  title: string,
  textBody: string
) => {
  const currentArray = await getArrayWithFBId();
  const currentTodo = currentArray.find((todo) => todo.id === id);
  if (currentTodo) {
    const washingtonRef = doc(db, "todos", currentTodo.fbId);
    await updateDoc(washingtonRef, { title, textBody });
  }
};
