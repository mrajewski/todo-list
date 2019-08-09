import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import RadioUn from '@material-ui/icons/RadioButtonUnchecked';
import RadioChe from '@material-ui/icons/RadioButtonChecked';

import Upcoming from './upcoming'
import Today from './today'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = String(today.getFullYear());
console.log(dd);
console.log(mm);
console.log(yyyy);

// const style = {
//     position: 'absolute',
//     maxWidth: '500px',
//     margin: '0',
//     top: '50%',
//     marginTop: '-250px',
//     left: '50%',
//     marginLeft: '-250px'
// };

class ToDoMain extends Component {

    state = {
        name: '',
        place: '',
        date: '',
        tasks: [],
        isOn: false,
        activeKey: '',
        doneList: [],
        showActive: true,
        btnText: 'Completed',
        today: [],
        upcoming: [],
        showToday: false,
        showUpcoming: false,
        listTitle:'Active'

    };
// Obsluga forma
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        });
        console.log(this.state.today);
        console.log(this.state.upcoming);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.date.slice(0, 4) === yyyy && this.state.date.slice(5, 7) === mm && this.state.date.slice(8, 10) === dd) {
            let today = {
                name: this.state.name,
                place: this.state.place,
                date: this.state.date
            };
            const todayList = [...this.state.today, {...today, id: this.state.today.length + 1}];

            this.setState({
                today: todayList
            });

        } else {
            let upcoming = {
                name: this.state.name,
                place: this.state.place,
                date: this.state.date
            };
            const upcomingList = [...this.state.upcoming, {...upcoming, id: this.state.upcoming.length + 1}];

            this.setState({
                upcoming: upcomingList
            });

        }

        let task = {
            name: this.state.name,
            place: this.state.place,
            date: this.state.date
        };

        const list = [...this.state.tasks, {...task, id: this.state.tasks.length + 1}];

        this.setState({
            tasks: list,
            name: '',
            place: '',
            date: ''
        });


    };

    //Zmiana z Active do Done

    handleSwitch = (e) => {

        this.setState(prev => ({
            showToday: false,
            showUpcoming: false,
            showActive: !prev.showActive,
            btnText: this.state.showActive ? 'Active tasks' : "Completed"
        }));
    };

    //ZMIANA today upcoming

    handleToday = e => {

        this.setState(prev => ({
            showToday: true,
            showUpcoming: false

        }))

    };

    handleUpcoming = e => {

        this.setState(prev => ({
            showToday: false,
            showUpcoming: true
        }))

    };


    /// Dodanie tasku do done
    handleDone = (e, id,name) => {
        const today=this.state.today.filter(el => el.name !== name);
        const upcoming=this.state.upcoming.filter(el => el.name !== name);

        const elem = this.state.tasks.filter(el => el.id === id);


        const newTasks = this.state.tasks.filter(el => el.id !== id);

        const list = [...this.state.doneList, ...elem];

        this.setState({
            doneList: list.map((el, i) => {
                el.id = i;
                return el
            }),
            tasks: newTasks.map((el, i) => {

                el.id = i;
                return el
            }),
            today:today.map((el, i) => {

                el.id = i;
                return el
            }),
            upcoming:upcoming.map((el, i) => {

                el.id = i;
                return el
            })

        });


    };


    //Usuwanie taska
    handleDelete = (e, id,name) => {

        const today=this.state.today.filter(el => el.name !== name);
        const upcoming=this.state.upcoming.filter(el => el.name !== name);

        const list = this.state.tasks.filter(el => el.id !== id);

        this.setState({
            tasks: list.map((el, i) => {

                el.id = i;
                return el
            }),
            today:today.map((el, i) => {

                el.id = i;
                return el
            }),
            upcoming:upcoming.map((el, i) => {

                el.id = i;
                return el
            })
        })

    };

    handleDeleteDone = (e, id,name) => {
        const today=this.state.today.filter(el => el.name !== name);
        const upcoming=this.state.upcoming.filter(el => el.name !== name);

        const list = this.state.doneList.filter(el => el.id !== id);

        this.setState({
            doneList: list.map((el, i) => {

                el.id = i;
                return el
            }),
            today:today.map((el, i) => {

                el.id = i;
                return el
            }),
            upcoming:upcoming.map((el, i) => {

                el.id = i;
                return el
            })
        })

    };

    titleChecker = () =>{
        let text='';
        if(this.state.showActive=== true && this.state.showUpcoming === false && this.state.showToday === false){
            text = 'Active'
        } else if (this.state.showActive=== false && this.state.showUpcoming === false && this.state.showToday === false){
            text = 'Completed'

        } else if (this.state.showToday === true){
            text = 'Today'
        } else {
            text = 'Upcoming'
        }

        return text

    };

    /// Hoever na element listy
    handleEnter = (e, id) => {
        this.setState({
            activeKey: id,
            isOn: true
        })
    };

    handleLeave = (e, id) => {
        this.setState({
            isOn: false
        })
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}
                      // style={this.state.tasks.length <= 0 && this.state.doneList.length <= 0 ? style : null}
                className={this.state.tasks.length <= 0 && this.state.doneList.length <= 0 ?'mobile':''}
                >
                    <h1><p>lets plan something</p></h1>
                    <div className='to-do-input'>
                        <input onChange={this.handleChange} name='name' type="text" autoComplete="off" required
                               value={this.state.name}/>
                        <label>What i have to do?</label>
                    </div>
                    <div className='to-do-input'>
                        <input onChange={this.handleChange} name='place' type="text" autoComplete="off" required
                               value={this.state.place}/>
                        <label>Where?</label>
                    </div>
                    <div className="to-do-input">
                        <input id="datetimepicker" onSelect={this.handleChange} name='date' type="text"
                               value={this.state.date} autoComplete="off" required/>
                        <label>When?</label>
                    </div>
                    <br/>
                    <button type='submit'>ADD TASK</button>
                </form>
                <ul className='task-list'>
                    {this.state.tasks.length <= 0 && this.state.doneList.length <= 0?null:<p className='list-title'>
                        {this.titleChecker()}

                    </p>}
                    {this.state.showActive ? this.state.tasks.map(el => {
                        if (this.state.showToday === true || this.state.showUpcoming === true) {
                            return null
                        }
                        return <li onMouseEnter={e => this.handleEnter(e, el.id)} onMouseLeave={this.handleLeave}
                                   key={el.id}>
                            <RadioUn className='icon-un'/>
                            <div>
                                <p>{el.name}</p>
                                <p>{el.place}</p>
                            </div>
                            <p style={{display: (this.state.isOn && el.id === this.state.activeKey) ? 'none' : 'block'}}>{el.date}</p>
                            <DeleteForeverIcon
                                onClick={e => this.handleDelete(e, el.id,el.name)}
                                style={{display: (this.state.isOn && el.id === this.state.activeKey) ? 'block' : 'none'}}
                                className={'delete-icon'}/>
                            <DoneIcon
                                style={{display: (this.state.isOn && el.id === this.state.activeKey) ? 'block' : 'none'}}
                                className={'done-icon'}
                                onClick={e => this.handleDone(e, el.id,el.name)}/>
                        </li>
                    }) : this.state.doneList.map(el => {
                        if (this.state.showToday === true || this.state.showUpcoming === true) {
                            return null
                        }
                        return (
                            <li onMouseEnter={e => this.handleEnter(e, el.id)} onMouseLeave={this.handleLeave} className='done-list-el' key={el.id}>
                                <RadioChe className='icon-un'/>
                                <div>
                                    <p>{el.name}</p>
                                    <p>{el.place}</p>
                                </div>
                                <p style={{display: (this.state.isOn && el.id === this.state.activeKey) ? 'none' : 'block'}}>{el.date}</p>
                                <DeleteForeverIcon
                                    onClick={e => this.handleDeleteDone(e, el.id,el.name)}
                                    style={{display: (this.state.isOn && el.id === this.state.activeKey) ? 'block' : 'none'}}
                                    className={'delete-icon'}/>
                            </li>
                        )
                    })}
                    {this.state.showUpcoming ? <Upcoming list={this.state.upcoming}/> : null}
                    {this.state.showToday ? <Today list={this.state.today}/> : null}

                </ul>

                <div
                    style={{display: this.state.tasks.length <= 0 && this.state.doneList.length <= 0 ? 'none' : 'block'}}
                    className="inner">
                    <div className="activity">
                        <a onClick={this.handleSwitch} href="#">{this.state.btnText}
                            <p className='counter'>{!this.state.showActive?this.state.tasks.length:this.state.doneList.length}</p>
                        </a>
                        <a onClick={this.handleToday} href="#">Today
                            <p className='counter'>{this.state.today.length}</p>
                        </a>
                        <a onClick={this.handleUpcoming} href="#">Upcoming
                            <p className='counter'>{this.state.upcoming.length}</p>
                        </a>
                    </div>
                </div>

            </>


        )
    }
}

export default ToDoMain;