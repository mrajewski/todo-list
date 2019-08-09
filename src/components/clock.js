import React  from 'react';
import Clock from 'react-live-clock';

export default class MyComponent extends React.Component {
    render() {
        return <Clock
            className='clock'
            format={'HH:mm:ss'}
            ticking={true}

        />
    }
}