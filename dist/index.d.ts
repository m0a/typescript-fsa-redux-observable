import { Observable } from 'rxjs';
import { Action, ActionCreator } from 'typescript-fsa';
import { MiddlewareAPI, Middleware } from 'redux';
import 'rxjs/add/operator/filter';
declare module 'redux-observable' {
    interface ActionsObservable<T> {
        ofAction<T, P>(action: ActionCreator<P>): ActionsObservable<Action<P>>;
    }
    interface EpicWithD<T, S, D> {
        (action$: ActionsObservable<T>, store: MiddlewareAPI<S>, depends: D): Observable<T>;
    }
    interface EpicMiddlewareWithD<T, S, D> extends Middleware {
        replaceEpic(nextEpic: EpicWithD<T, S, D>): void;
    }
    interface AdapterOption {
        input: (input$: Observable<any>) => any;
        output: (output$: any) => Observable<any>;
    }
    interface OptionsWithD<D> {
        adapter?: AdapterOption;
        dependencies?: D;
    }
    function createEpicMiddleware<T, S, D>(rootEpic: EpicWithD<T, S, D>, options?: OptionsWithD<D>): EpicMiddlewareWithD<T, S, D>;
    function combineEpics<T, S, D>(...epics: EpicWithD<T, S, D>[]): EpicWithD<T, S, D>;
}
