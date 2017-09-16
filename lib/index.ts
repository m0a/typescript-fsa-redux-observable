import { ActionsObservable } from 'redux-observable';
import { Action, ActionCreator, isType } from 'typescript-fsa';
import * as Redux from 'redux';
import 'rxjs/add/operator/filter';

declare module 'redux-observable' {

    interface ActionsObservable<T extends Redux.Action> {
        ofAction<T, P>(action: ActionCreator<P>): ActionsObservable<Action<P>>;
    }
}

ActionsObservable.prototype.ofAction =
    function <P>(actionCreater: ActionCreator<P>): ActionsObservable<Action<P>> {
        return this.filter(action => (isType(action, actionCreater))) as ActionsObservable<Action<P>>;
    };
