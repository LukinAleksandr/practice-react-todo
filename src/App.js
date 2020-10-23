// Всегда импортируем библиотеку Реакт из реакта
import React, {useEffect} from 'react';
// Подключаем наш экспортируемый туду-лист
import TodoList from './Todo/TodoList'
//подключаем контекст
import Context from './context'
// import AddTodo from './Todo/AddTodo'
import Loader from './Loader'
import Modal from './Modal/Modal';

const AddTodo = React.lazy(
  ()=> 
    new Promise(res=>{
      setTimeout(
        ()=>{ 
          res(import('./Todo/AddTodo'))
        }, 2000)
  })
)

function App() {
  //нельзя просто изменять состояние обьекта и перерендеривать страницу, необходимо использовать хуки useІtate
  //функция юзСтейт возвращает всегда массив из 2х элементов
  //1 элемент - это состояние, оно будет равно данному дефолтному значению (task)
  //2 элемент - это функция позволяющая изменять данное состояние обьекта
  // const [tasks, setTasks] = React.useState([
  //   {id: 1, complited: false, title: "Купить хлеб!"},
  //   {id: 2, complited: true, title: "Купить масло!"},
  //   {id: 3, complited: false, title: "Купить молоко!"}
  // ])
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(tasks => {
        setTimeout(()=>{
          setTasks(tasks)
          setLoading(false);
        }, 2000)
      })
  }, [])

  function toggleTask(id) {
    setTasks(
      tasks.map(i => {
        if (i.id === id){
          i.complited = !i.complited;
        }
        return i
      })
    )
  }

  function deleteTaskItem(id){
    //очень быстрый способ удалить нужный нам обьект в обьекте
    //проходим по обьектам и оставляем только те у которых id не совпадает
    setTasks(tasks.filter(i => i.id !== id))
  }
  
  //функция принимает то что пришло с инпута
  function AddT(title) {
    //и добавляет к существующему массиву обьектов новый обьект
     return setTasks(
      tasks.concat([
        {
          title,
          id: Date.now(),
          complited: false
        }
      ])
      )
  }

  return (
    // что бы передавать контекст между компонентами на прямую избегая вложенности нужно обернуть шаблон (JSX) в специальный компонент Context.Provider
    //передаем велью, в первых ковычках мы говорим что здесь будет JS ,а вторые отвечают за тот обьект который мы передаем, (передавать можно что угодно)
    <Context.Provider value={{ deleteTaskItem: deleteTaskItem }}>
      {/* что бы присвоить класс пишем className */}
    <div className="wrapper">   
      <h1>React tutorial</h1>
      <Modal></Modal>
      {/* передаем в форму аддТуду функцию аддТ */}
      <React.Suspense fallback={<Loader />}>
        <AddTodo onCreate={AddT}/>
      </React.Suspense>
      {loading && <Loader />}
      {tasks.length ? (
      <TodoList todo={tasks} toggleFn={toggleTask}/>
      ) : (
        loading ? null : <p>No todos!</p>
      )}
      
    </div>
    </Context.Provider>
  );

  
}

export default App;
