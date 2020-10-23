// Всегда импортируем библиотеку Реакт из реакта
import React from 'react'
// импортируем компонент библиотеки prop-types
import PropTypes from 'prop-types'
// импортируем компонент одной задачи
import TodoItem from './TodoItem'

// Описываем стили как объект
const styles = {
    ul: {
        // используем CamelCase для написание стилей с 2мя словами и больше list-style = listStyle
        listStyle: "none",
        margin: 0,
        padding: 0
    }
}
    /* atr - обьект со свойсвом todos, что мы отправили из App.js со значением массива обьектов tasks*/
function TodoList(atr){
    console.log(atr);
    return (
        // Присваеваем обьект со стилями списку
        <ul style={styles.ul}>
            {atr.todo.map((item, i) => {
                return (
                    <TodoItem 
                        obj={item}
                        key={item.id } 
                        index={i} 
                        chengeFn={atr.toggleFn} 
                    />
                )
            })}
        </ul>
    );
}

// Задаем типизацию для данных благодаря библиотеке npm install prop-types
TodoList.propTypes = {
    //говорим что todo это "массивИЗ" (arrayOf) обьектов (object)
    todo: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleFn: PropTypes.func.isRequired,
    // deleteTask: PropTypes.func.isRequired
}

// экспортируем компонент "Список"
export default TodoList