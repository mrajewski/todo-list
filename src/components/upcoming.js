import React, {Component} from 'react';
import Timer from '@material-ui/icons/Timer';



class Upcoming extends Component {
    render() {
        return (
            <>
                {this.props.list.map(el=>{
                    return <li className='upcoming-list' key={el.id}>
                        <Timer className='icon-un'/>
                        <div>
                            <p>{el.name}</p>
                            <p>{el.place}</p>
                        </div>
                        <p>{el.date}</p>

                    </li>
                })}

            </>
        );
    }

}

export default Upcoming;
