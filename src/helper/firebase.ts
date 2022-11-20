import { db, storage } from "../firebase";
import { ITodo } from "../store/todo/todosSlice";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes, listAll, deleteObject } from "firebase/storage";
type DataBaseTodo = {
  fbId: string;
  id: string;
  title: string;
  textBody: string;
  date: string;
  isCompleted: string;
  isFiled: boolean;
  isExpiried: string;
};

const getArrayWithFBId = async () => {
  const todoRef = collection(db, "todos");
  const docsSnap = await getDocs(todoRef);
  const currentArray: DataBaseTodo[] = [];
  docsSnap.forEach((doc: any): void => {
    const todo = doc.data();
    currentArray.push({
      id: todo.id,
      title: todo.title,
      textBody: todo.textBody,
      isCompleted: todo.isCompleted,
      isFiled: todo.isFiled,
      date: todo.date,
      isExpiried: todo.isExpiried,
      fbId: doc.id,
    });
  });
  return currentArray;
};

const changeTodoStatusImageUpload = async (id: string) => {
  const currentArray = await getArrayWithFBId();
  const currentTodo = currentArray.find((todo) => todo.id === id);
  if (currentTodo) {
    const washingtonRef = doc(db, "todos", currentTodo.fbId);
    await updateDoc(washingtonRef, { isFiled: !currentTodo.isFiled });
  }
};

export const addTodoToDB = async (todoData: ITodo) => {
  const todoRef = collection(db, "todos");
  await setDoc(doc(todoRef), todoData);
};

export const deleteTodoFromDB = async (id: string, filesNames: string[]) => {
  const currentArray = await getArrayWithFBId();
  const deletTodo = currentArray.find((todo) => todo.id === id);
  if (deletTodo) {
    await deleteDoc(doc(db, "todos", deletTodo.fbId));
    if (deletTodo.isFiled) {
      filesNames.forEach(async (file) => {
        const filesListRef = ref(storage, `${id}/${file}`);
        await deleteObject(filesListRef);
      });
      console.log("all files was deleted");
    }
  }
};

export const toggleTodoCompleted = async (id: string) => {
  const currentArray = await getArrayWithFBId();
  const currentTodo = currentArray.find((todo) => todo.id === id);
  if (currentTodo) {
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

export const attachImages = async (files: File[], id: string) => {
  files.map(async (file: any) => {
    const imageRef = ref(storage, `${id}/${file.name}`);
    await uploadBytes(imageRef, file).then(() => {
      // changeTodoStatusImageUpload(id);
      console.log("files was uploaded");
    });
  });
};

export const getUrl = async (id: string) => {
  const filesListRef = ref(storage, `${id}/`);
  const list = await listAll(filesListRef);
  const arr: any[] = [];
  list.items.forEach(async (el) => {
    arr.push(el);
  });
  return arr;
};
