/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

const handleError = message => {
  document.querySelector('#errorMessage').textContent = message;
  document.querySelector('#errorMessenger').classList.remove('hidden');
};

const hideError = () => {
  document.querySelector('#errorMessenger').classList.add('hidden');
};

const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  hideError();

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

module.exports = {
  handleError,
  hideError,
  sendPost
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const helper = __webpack_require__(1);

let defaultSched = '';

const ScheduleForm = props => {
  const _csrf = props.csrf; //the string will be formatted like this
  //d0_hr0:contents,d0_hr1:contents,d0_hr2

  const weekString = props.week;
  const entries = weekString.split(',');
  const formattedEntries = entries.map(entry => {
    let splitEntry = entry.split(':');
    let dayHour = splitEntry[0].replaceAll('_', ' ');
    return /*#__PURE__*/React.createElement("textarea", {
      key: splitEntry[0],
      className: dayHour,
      id: splitEntry[0],
      defaultValue: splitEntry[1]
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "ScheduleBox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "emptycell d0 hr0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "day-label d1"
  }, "Sunday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d2"
  }, "Monday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d3"
  }, "Tuesday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d4"
  }, "Wednesday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d5"
  }, "Thursday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d6"
  }, "Friday"), /*#__PURE__*/React.createElement("div", {
    className: "day-label d7"
  }, "Saturday"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr1"
  }, "08:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr2"
  }, "09:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr3"
  }, "10:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr4"
  }, "11:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr5"
  }, "12:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr6"
  }, "01:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr7"
  }, "02:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr8"
  }, "03:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hr9"
  }, "04:00"), /*#__PURE__*/React.createElement("div", {
    className: "time-label hra"
  }, "05:00"), formattedEntries, /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

const loadSchedule = async () => {
  const response = await fetch('/scheduleData');
  const data = await response.json();
  console.log(data.myWeek); //ok now this should be the string I want.
  //the big string to parse into a json obj for all the data for each day/hour

  ReactDOM.render( /*#__PURE__*/React.createElement(ScheduleForm, {
    week: data.myWeek
  }), document.querySelector('#content'));
};

const defaultMyString = () => {
  const numDays = 7;
  const numHours = 10;
  defaultSched = '';

  for (let i = 1; i <= numDays; i++) {
    for (let n = 1; n <= numHours; n++) {
      defaultSched = defaultSched.concat('entry_d', i, '_hr', n, ':');

      if (i < numDays || n < numHours) {
        //if this was not the last entry, add ','
        defaultSched = defaultSched.concat(',');
      }
    }
  }
};

const readSchedule = () => {
  const numDays = 7;
  const numHours = 10;
  let schedString = '';

  for (let i = 1; i <= numDays; i++) {
    for (let n = 1; n <= numHours; n++) {
      schedString = schedString.concat('entry_d', i, '_hr', n, ':');
      let thisCell = document.querySelector(`#entry_d${i}_hr${n}`);
      schedString = schedString.concat(thisCell.value);

      if (i < numDays || n < numHours) {
        //if this was not the last entry, add ','
        schedString = schedString.concat(',');
      }
    }
  }

  return schedString;
};

const SaveSchedule = props => {
  const _csrf = document.querySelector('#_csrf').value;
  const data = readSchedule();
  helper.sendPost('/scheduleData', {
    data,
    _csrf
  });
};

const init = async () => {
  const response = await fetch('getToken');
  const data = await response.json();
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', e => {
    e.preventDefault();
    SaveSchedule();
    return false;
  });
  defaultMyString();
  ReactDOM.render( /*#__PURE__*/React.createElement(ScheduleForm, {
    week: defaultSched,
    csrf: data.csrfToken
  }), document.querySelector('#content'));
  console.log(readSchedule());
};

window.onload = init;
})();

/******/ })()
;