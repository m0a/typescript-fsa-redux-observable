import {ActionCreator, AnyAction} from 'typescript-fsa';

import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';
import {ofAction} from './ofAction';

export function ofActionPayload<A>(
    ac1: ActionCreator<A>,
): OperatorFunction<AnyAction, A>

export function ofActionPayload<A, B>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
): OperatorFunction<AnyAction, A | B>

export function ofActionPayload<A, B, C>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
): OperatorFunction<AnyAction, A | B | C>

export function ofActionPayload<A, B, C, D>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
): OperatorFunction<AnyAction, A | B | C | D>

export function ofActionPayload<A, B, C, D, E>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
    ac5: ActionCreator<E>,
): OperatorFunction<AnyAction, A | B | C | D | E>

export function ofActionPayload<A, B, C, D, E, F>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
    ac5: ActionCreator<E>,
    ac6: ActionCreator<F>,
): OperatorFunction<AnyAction, A | B | C | D | E | F>

export function ofActionPayload<A, B, C, D, E, F, G>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
    ac5: ActionCreator<E>,
    ac6: ActionCreator<F>,
    ac7: ActionCreator<G>,
): OperatorFunction<AnyAction, A | B | C | D | E | F | G>

export function ofActionPayload<A, B, C, D, E, F, G, H>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
    ac5: ActionCreator<E>,
    ac6: ActionCreator<F>,
    ac7: ActionCreator<G>,
    ac8: ActionCreator<H>,
): OperatorFunction<AnyAction, A | B | C | D | E | F | G | H>

export function ofActionPayload<A, B, C, D, E, F, G, H, I>(
    ac1: ActionCreator<A>,
    ac2: ActionCreator<B>,
    ac3: ActionCreator<C>,
    ac4: ActionCreator<D>,
    ac5: ActionCreator<E>,
    ac6: ActionCreator<F>,
    ac7: ActionCreator<G>,
    ac8: ActionCreator<H>,
    ac9: ActionCreator<I>,
): OperatorFunction<AnyAction, A | B | C | D | E | F | G | H | I>

export function ofActionPayload<P>(
    ...acs: ActionCreator<P>[]
): OperatorFunction<AnyAction, P>

export function ofActionPayload(...actionCreators: ActionCreator<any>[]) {
    return (actions$: Observable<AnyAction>) =>
        actions$.pipe(
            ofAction(...actionCreators),
            map(action => action.payload)
        )
}
