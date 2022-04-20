const helper = require('./helper.js');

let defaultSched = '';

const ScheduleForm = (props) => {
    //the string will be formatted like this
    //d0_hr0:contents,d0_hr1:contents,d0_hr2
    const weekString = props.week;
    const entries = weekString.split(',');
    const formattedEntries = entries.map(entry => {
        let splitEntry = entry.split(':');
        let dayHour = splitEntry[0].replaceAll('_',' ');
        return(
            <div key={splitEntry[0]} className={dayHour} id={splitEntry[0]}>
                {splitEntry[1]}
            </div>
        )
    });
    
    return (
        <div id="ScheduleBox">
            {formattedEntries}
        </div>
    )
};

const loadSchedule = async () => {
    const response = await fetch('/scheduleData');
    const data = await response.json();
    console.log(data.myWeek);
    //ok now this should be the string I want.
    //the big string to parse into a json obj for all the data for each day/hour
    ReactDOM.render(
        <ScheduleForm week = {data.myWeek}/>,
        document.querySelector('#content')
    );
};

const init = () => {
    
    //here i need to construct my default schedule string
    //i aint typing all that myself
    
    defaultSched='';
    
    for(let i=0; i<7; i++){
        for(let n=0; n<7; n++){
            defaultSched = defaultSched.concat('entry_d',i,'_hr',n,':agawaga,');
        }
    }
    
    ReactDOM.render(
        <ScheduleForm week = {defaultSched}/>,
        document.querySelector('#content')
    );
    
};

window.onload = init;