import { Action, ActionCreator } from 'typescript-fsa';
import 'rxjs/add/operator/filter';
declare module 'redux-observable' {
    interface ActionsObservable<T> {
        ofAction<T, P>(action: ActionCreator<P>): ActionsObservable<Action<P>>;
    }
}
