import React, {Component} from 'react';
import './App.css';
import "./styles.scss";
import ToDoMain from './components/mainToDos';


class App extends Component {
    render() {
        return (
            <>
                <div className='container'>
                    <ToDoMain/>
                </div>

            </>
        );
    }

}

export default App;
