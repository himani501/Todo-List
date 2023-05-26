import './App.css';
import Header from './myComponents/Header';
import {Todos} from "./myComponents/Todos";
import {Footer} from "./myComponents/Footer";
import {useEffect, useState} from "react";
import {AddTodo} from "./myComponents/AddTodo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {About} from "./myComponents/About";

function App() {

    let iniTodo;
    if (localStorage.getItem("todos") === null) {
        iniTodo = [];
    } else {
        iniTodo = JSON.parse(localStorage.getItem("todos"));
    }
    const onDelete = (todo) => {
        setTodos(todos.filter((e) => {
            return e!==todo;
        }))
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    const addTodo = (title, desc) => {
        let sno
        if (todos.length === 0) {
            sno = 0;
        } else {
            sno = todos[todos.length -1].sno + 1
        }
        const myTodo = {
            sno: sno,
            title: title,
            description: desc
        }
        setTodos([...todos, myTodo])
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const [todos, setTodos] = useState(iniTodo);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    // whenever todos will change useEffect will be called and execute the function inside it

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <Header title="To-do List"/>
                    <AddTodo addTodo={addTodo}/>
                    <Todos todos={todos} onDelete={onDelete}/>
                    <Footer/>
                </>
            ),
        },
        {
            path: "/about",
            element: (
                <>
                    <Header title="To-do List"/>
                    <About />
                    <Footer/>
                </>
            ),
        },
    ]);

  return (
      <>
          <RouterProvider router={router}/>
      </>
  );
}

export default App;
