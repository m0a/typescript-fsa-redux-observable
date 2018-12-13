// for actions
import actionCreatorFactory, { AnyAction, Action, Success } from 'typescript-fsa';

// for reducers
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

//for epics
import { delay, map, tap, ignoreElements } from 'rxjs/operators';
import { ofAction } from '../src';
import { combineEpics, Epic, createEpicMiddleware } from 'redux-observable';

//reducer
import {createStore, applyMiddleware} from 'redux';


// action
const actionCreator = actionCreatorFactory();
const actions = {
    increment: actionCreator.async<undefined, undefined>('INCREMENT'),
    decrement: actionCreator.async<undefined, undefined>('DECREMENT')
};

// reducers & state

interface State {
    counter: number;
}

const counter = reducerWithInitialState(0)
    .case(actions.increment.done, state => state + 1)
    .case(actions.decrement.done, state => state - 1);
const rootReducer = combineReducers({
    counter
});

// epics
const counterIncrementEpic: Epic<AnyAction, Action<Success<undefined, undefined>>, State> =
    action$ =>
        action$.pipe(
            ofAction(actions.increment.started),
            delay(300),
            map(action => actions.increment.done({
                params: action.payload,
                result: undefined
            }))
        );

const counterDecrementEpic: Epic<AnyAction, Action<Success<undefined, undefined>>, State> =
    action$ =>
        action$.pipe(
            ofAction(actions.decrement.started),
            delay(300),
            map(action => actions.decrement.done({
                params: action.payload,
                result: undefined
            }))
        );

const loggingEpic: Epic<AnyAction, AnyAction, State> =
    action$ =>
        action$.pipe(
            ofAction(
                actions.decrement.started,
                actions.increment.started,
            ),
            tap(action => console.log(action.type)),
            ignoreElements()
        );


const rootEpic = combineEpics(
    counterIncrementEpic,
    counterDecrementEpic,
    loggingEpic,
);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

// tool
async function sleep(time: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => (resolve()), time)
    })
}

it("increment decrement test", async () => {
    expect(store.getState()).toEqual({ counter: 0 });

    store.dispatch(actions.increment.started(undefined));
    expect(store.getState()).toEqual({ counter: 0 });

    await sleep(300);
    expect(store.getState()).toEqual({ counter: 1 });

    store.dispatch(actions.decrement.started(undefined));
    expect(store.getState()).toEqual({ counter: 1 });

    await sleep(300);
    expect(store.getState()).toEqual({ counter: 0 })
});
