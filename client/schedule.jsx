const helper = require('./helper.js');

let defaultSched = '';

const ScheduleForm = (props) => {
    const _csrf = props.csrf;
    
    //the string will be formatted like this
    //d0_hr0:contents,d0_hr1:contents,d0_hr2
    const weekString = props.week;
    const entries = weekString.split(',');
    const formattedEntries = entries.map(entry => {
        let splitEntry = entry.split(':');
        let dayHour = splitEntry[0].replaceAll('_',' ');
        return(
            <textarea key={splitEntry[0]} className={dayHour} id={splitEntry[0]} defaultValue={splitEntry[1]}/>
        )
    });
    
    return (
        <div id="ScheduleBox">
            <div className="emptycell d0 hr0"/>
            
            <div className="day-label d1">Sunday</div>
            <div className="day-label d2">Monday</div>
            <div className="day-label d3">Tuesday</div>
            <div className="day-label d4">Wednesday</div>
            <div className="day-label d5">Thursday</div>
            <div className="day-label d6">Friday</div>
            <div className="day-label d7">Saturday</div>
      
            <div className="time-label hr1">08:00</div>
            <div className="time-label hr2">09:00</div>
            <div className="time-label hr3">10:00</div>
            <div className="time-label hr4">11:00</div>
            <div className="time-label hr5">12:00</div>
            <div className="time-label hr6">01:00</div>
            <div className="time-label hr7">02:00</div>
            <div className="time-label hr8">03:00</div>
            <div className="time-label hr9">04:00</div>
            <div className="time-label hra">05:00</div>
            
            {formattedEntries}
            
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
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

const defaultMyString = () => {
    
    const numDays=7;
    const numHours=10;
    
    defaultSched='';
    
    for(let i=1; i<=numDays; i++){
        for(let n=1; n<=numHours; n++){
            defaultSched = defaultSched.concat('entry_d',i,'_hr',n,':');
            if(i<numDays||n<numHours){
                //if this was not the last entry, add ','
                defaultSched = defaultSched.concat(',');
            }
        }
    }
    
    
    
}

const readSchedule = () => {
    
    const numDays=7;
    const numHours=10;
    
    let schedString='';
    
    for(let i=1; i<=numDays; i++){
        for(let n=1; n<=numHours; n++){
            schedString = schedString.concat('entry_d',i,'_hr',n,':');
            let thisCell = document.querySelector(`#entry_d${i}_hr${n}`);
            schedString = schedString.concat(thisCell.value);
            if(i<numDays||n<numHours){
                //if this was not the last entry, add ','
                schedString = schedString.concat(',');
            }
        }
    }
    
    
    
    return schedString;
    
};

const SaveSchedule = (props) => {
    const _csrf = document.querySelector('#_csrf').value;
    const data = readSchedule();
    
    helper.sendPost('/scheduleData', {data, _csrf});
}

const init = async () => {
    
    const response = await fetch('getToken');
    const data = await response.json();
    
    const saveButton = document.getElementById('saveButton');
    
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        SaveSchedule();
        return false;
    });
    
    defaultMyString();
    
    ReactDOM.render(<ScheduleForm week = {defaultSched} csrf = {data.csrfToken}/> , document.querySelector('#content'));
    
    console.log(readSchedule());
};

window.onload = init;