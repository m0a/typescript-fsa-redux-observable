"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
function ofAction() {
    var actionCreators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionCreators[_i] = arguments[_i];
    }
    return function (actions$) {
        return actions$.pipe(operators_1.filter(function (action) { return actionCreators.some(function (actionCreator) { return actionCreator.match(action); }); }));
    };
}
exports.ofAction = ofAction;
