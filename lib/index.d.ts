import { Action, ActionCreator } from 'typescript-fsa';
import * as Redux from 'redux';
import 'rxjs/add/operator/filter';
declare module 'redux-observable' {
    interface ActionsObservable<T extends Redux.Action> {
        ofAction<T, P>(action: ActionCreator<P>): ActionsObservable<Action<P>>;
    }
}
