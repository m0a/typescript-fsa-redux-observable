"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_observable_1 = require("redux-observable");
var typescript_fsa_1 = require("typescript-fsa");
require("rxjs/add/operator/filter");
redux_observable_1.ActionsObservable.prototype.ofAction =
    function (actionCreater) {
        return this.filter(function (action) { return (typescript_fsa_1.isType(action, actionCreater)); });
    };
