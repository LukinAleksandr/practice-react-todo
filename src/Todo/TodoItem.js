// Всегда импортируем библиотеку Реакт из реакта, дополнительно используем хук (функцию) {useContext} для передачи контекста
import React, {useContext} from 'react'
// импортируем компонент библиотеки prop-types
import PropTypes from 'prop-types'
//подключаем контекст
import Context from '../context'

// Описываем стили как объект
const styles = {
    span: {

    },
    li: {
        // используем CamelCase для написание стилей с 2мя словами и больше justify-сontent = justifyContent
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}


function TodoItem({obj, index, chengeFn}){
    //тут используем функцию useContext и передаем в него контекст который мы подключали
    const {deleteTaskItem} = useContext(Context);
    let classes = [];
    if(obj.complited === true){
        classes.push("complite")
    }
    // возвращаем JSX 
    return (
        // Присваеваем обьект со стилями списку
        <li style={styles.li}>
            <span className={classes.join(' ')} >
                <input
                    checked={obj.complited} 
                    style={styles.input} 
                    type="checkbox" 
                    onChange={()=>chengeFn(obj.id)} 
                />
                <strong>{index+1}</strong>
                &nbsp;
                { obj.title }
            </span>
            <button 
                //вешаем на кнопку оброботчик
                 className="rm" onClick={deleteTaskItem.bind(null, obj.id)}

            >
                &times;
            </button>
        </li>
    );
}

// Задаем типизацию для данных благодаря библиотеке npm install prop-types
TodoItem.propTypes = {
    obj: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    chengeFn: PropTypes.func.isRequired,
    // fn2: PropTypes.func.isRequired
}

// экспортируем компонент "Задача"
export default TodoItem