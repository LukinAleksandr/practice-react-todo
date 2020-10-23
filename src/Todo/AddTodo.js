// Всегда импортируем библиотеку Реакт из реакта
import React, { useState } from 'react'
// импортируем компонент библиотеки prop-types
import PropTypes from 'prop-types'

function useInputValue(defaultValue = ''){
    //переменная велью которая хранит в себе все что записывается в инпут
    let [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value: value,
            onChange: event => setValue(event.target.value)
        },
        clear: ()=> setValue(''),
        value: ()=> value
    }
}

// компонент который принимает в себя функцию аддТ из App.js и  возвращает форму 
function AddTodo({ onCreate }){

    const input = useInputValue("");
    // внутренняя функция сабмит хендлер которая проверяет есть ли что то в переменной инпут - вызывает функцию аддТ передавая в нее значение инпута - и очещает переменную велью, а в месте с ней и сам инпут
    function submitHandler(ev){
        ev.preventDefault();

        if(input.bind.value.trim()){
            onCreate(input.value());
            input.clear();
        }
    }

    return (
        // событие сабмит вызывает функцию сабмитХендлер
        <form style={{margin: '0 0 0.5rem 0.5rem'}}  onSubmit={submitHandler}>
            {/* <input type="text" value={value} onChange={event=>setValue(value = event.target.value)}></input> */}
            <input type="text" {...input.bind}/>
            <button type="submit">Add Todo</button>
        </form>
    )
}


AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo