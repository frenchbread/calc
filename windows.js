'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

let mainWindow, hotelsWindow, transfersWindow, driversWindow, excursionsWindow, restaurantsWindow;

exports.mainWindow = function () {

  // Main Window
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });
  mainWindow.loadURL(`file://${__dirname}/views/index.html`);

  return mainWindow;
}

exports.dbWindows = [
  function () {

    hotelsWindow = new BrowserWindow({ width: 400, height: 800, show: false });
    hotelsWindow.loadURL(`file://${__dirname}/views/windows/hotelsWindow.html`);

    return hotelsWindow;
  },
  function () {

    transfersWindow = new BrowserWindow({ width: 400, height: 800, show: false });
    transfersWindow.loadURL(`file://${__dirname}/views/windows/transfersWindow.html`);

    return transfersWindow;
  },
  function () {

    driversWindow = new BrowserWindow({ width: 400, height: 800, show: false });
    driversWindow.loadURL(`file://${__dirname}/views/windows/driversWindow.html`);

    return driversWindow;
  },
  function () {

    excursionsWindow = new BrowserWindow({ width: 400, height: 800, show: false });
    excursionsWindow.loadURL(`file://${__dirname}/views/windows/excursionsWindow.html`);

    return excursionsWindow;
  },
  function () {

    restaurantsWindow = new BrowserWindow({ width: 400, height: 800, show: false });
    restaurantsWindow.loadURL(`file://${__dirname}/views/windows/restaurantsWindow.html`);

    return restaurantsWindow;
  }
];

exports.IPCs = [
  'show-hotelsWindow',
  'show-transfersWindow',
  'show-driversWindow',
  'show-excursionsWindow',
  'show-restaurantsWindow'
];