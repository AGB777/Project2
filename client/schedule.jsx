const helper = require('./helper.js');


const ScheduleForm = (props) => {
    
    const weekString = loadSchedule();
    const entries = weekString.split(',');
    const formedEntries = entries.map(entry => {
        let splitEntry = entry.split(':');
        let dayHour = splitEntry[0].replace('d','').split('h');
        return(
            <div key={splitEntry[0]} class=`day{{dayHour[0]}} hour{{dayHour[1]}}` id={splitEntry[0]}>
                {splitEntry[1]}
            </div>
        )
    });
    
    return (
        <div id="ScheduleBox">
        </div>
    )
};

const loadSchedule = async () => {
    const response = await fetch('/scheduleData');
    const data = await response.json();
    console.log(data.myWeek);
    //ok now this should be the string I want.
    //the big string to parse into a json obj for all the data for each day/hour
    return data.myWeek;
};

const init = () => {
    
    ReactDOM.render(
        <ScheduleForm/>,
        document.querySelector('#content')
    );
    
};

window.onload = init;