import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ENTER_LOGIN_VIEW      = 'ENTER_LOGIN_VIEW';
const LEAVE_LOGIN_VIEW      = 'LEAVE_LOGIN_VIEW';
const ENTER_HOME_VIEW       = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW       = 'LEAVE_HOME_VIEW';
const ENTER_ADMIN_DASHBOARD_VIEW       = 'ENTER_ADMIN_DASHBOARD_VIEW';
const LEAVE_ADMIN_DASHBOARD_VIEW       = 'LEAVE_ADMIN_DASHBOARD_VIEW';
const ENTER_PROTECTED_VIEW  = 'ENTER_PROTECTED_VIEW';
const LEAVE_PROTECTED_VIEW  = 'LEAVE_PROTECTED_VIEW';
const ENTER_PAGENOTFOUND_VIEW  = 'ENTER_PAGENOTFOUND_VIEW';
const LEAVE_PAGENOTFOUND_VIEW  = 'LEAVE_PAGENOTFOUND_VIEW';
const ENTER_REPORTFORM_VIEW = 'ENTER_REPORTFORM_VIEW';
const LEAVE_REPORTFORM_VIEW = 'LEAVE_REPORTFORM_VIEW';
const ENTER_PRINTQR_VIEW      = 'ENTER_PRINTQR_VIEW';
const LEAVE_PRINTQR_VIEW     = 'LEAVE_PRINTQR_VIEW';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null
};

export default function (state = initialState, action) {
  switch (action.type) {

  case ENTER_HOME_VIEW:
  case ENTER_ADMIN_DASHBOARD_VIEW:
  case ENTER_PAGENOTFOUND_VIEW:
  case ENTER_LOGIN_VIEW:
  case ENTER_REPORTFORM_VIEW:
  case ENTER_PRINTQR_VIEW:
  case ENTER_PROTECTED_VIEW:
    // on peux pas entrer sur une page où l on est déjà
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;

  case LEAVE_HOME_VIEW:
  case LEAVE_ADMIN_DASHBOARD_VIEW:
  case LEAVE_PAGENOTFOUND_VIEW:
  case LEAVE_LOGIN_VIEW:
  case LEAVE_REPORTFORM_VIEW:
  case LEAVE_PRINTQR_VIEW:
  case LEAVE_PROTECTED_VIEW:
    // on peut pas quitter une page où l on est pas déjà
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function enterHome(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'home',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveHome(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'home',
    enterTime:    null,
    leaveTime:    time
  };
}
export function enterAdminDashboard(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_ADMIN_DASHBOARD_VIEW,
    currentView:  'adminDashboard',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveAdminDashboard(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_ADMIN_DASHBOARD_VIEW,
    currentView:  'adminDashboard',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterPageNotFound(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_PAGENOTFOUND_VIEW,
    currentView:  'pageNotFound',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leavePageNotFound(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_PAGENOTFOUND_VIEW,
    currentView:  'pageNotFound',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterLogin(time = moment().format()) {
  return {
    type:         ENTER_LOGIN_VIEW,
    currentView:  'Login',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveLogin(time = moment().format()) {
  return {
    type:         LEAVE_LOGIN_VIEW,
    currentView:  'Login',
    enterTime:    null,
    leaveTime:    time
  };
}


export function enterProtected(time = moment().format()) {
  return {
    type:         ENTER_PROTECTED_VIEW,
    currentView:  'Protected',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveProtected(time = moment().format()) {
  return {
    type:         LEAVE_PROTECTED_VIEW,
    currentView:  'Protected',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterReportForm(time = moment().format()) {
  return {
    type:         ENTER_REPORTFORM_VIEW,
    currentView:  'ReportForm',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveReportForm(time = moment().format()) {
  return {
    type:         LEAVE_REPORTFORM_VIEW,
    currentView:  'ReportForm',
    enterTime:    null,
    leaveTime:    time
  };
}


export function enterPrintQr(time = moment().format()) {
  return {
    type:         ENTER_PRINTQR_VIEW,
    currentView:  'PrintQr',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leavePrintQr(time = moment().format()) {
  return {
    type:         LEAVE_PRINTQR_VIEW,
    currentView:  'PrintQr',
    enterTime:    null,
    leaveTime:    time
  };
}

