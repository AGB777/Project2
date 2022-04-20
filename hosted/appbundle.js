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
  //the string will be formatted like this
  //d0_hr0:contents,d0_hr1:contents,d0_hr2
  const weekString = props.week;
  const entries = weekString.split(',');
  const formattedEntries = entries.map(entry => {
    let splitEntry = entry.split(':');
    let dayHour = splitEntry[0].replaceAll('_', ' ');
    return /*#__PURE__*/React.createElement("div", {
      key: splitEntry[0],
      className: dayHour,
      id: splitEntry[0]
    }, splitEntry[1]);
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "ScheduleBox"
  }, formattedEntries);
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

const init = () => {
  //here i need to construct my default schedule string
  //i aint typing all that myself
  defaultSched = '';

  for (let i = 0; i < 7; i++) {
    for (let n = 0; n < 7; n++) {
      defaultSched = defaultSched.concat('entry_d', i, '_hr', n, ':agawaga,');
    }
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(ScheduleForm, {
    week: defaultSched
  }), document.querySelector('#content'));
};

window.onload = init;
})();

/******/ })()
;