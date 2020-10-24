import {NegotiationStateContext} from './negotiation-state.types';
import {ValidationGuard} from './negotiation.guards';
import {EventObject} from 'xstate';


export function composeGuards(validations: ValidationGuard[]) {
    return (context: NegotiationStateContext, event: EventObject) =>
        validations.reduce((accum, validFunc) =>
            accum && validFunc(context, event), true);
}
