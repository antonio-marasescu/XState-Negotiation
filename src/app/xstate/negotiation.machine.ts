import {interpret, Machine} from 'xstate';
import {NegotiationStateAction, NegotiationStateContext, NegotiationStatus} from './negotiation-state.types';
import {State} from 'xstate/lib/State';
import {composeGuards} from './negotiation.utils';
import {oneOrMoreParticipants, typeIsShared, typeIsUnshared} from './negotiation.guards';

export const ERROR_STATE = 'ERROR_STATE';

const NEGOTIATION_MACHINE = Machine({
    states: {
        [NegotiationStatus.DRAFT]: {
            on: {
                [NegotiationStateAction.SAVE]: {
                    target: NegotiationStatus.DRAFT,
                    cond: typeIsUnshared
                },
                [NegotiationStateAction.SUBMIT_NEGOTIATION]: {
                    target: NegotiationStatus.NEGOTIATION,
                    cond: composeGuards([typeIsShared, oneOrMoreParticipants])
                },
                '*': ERROR_STATE
            }
        },
        [NegotiationStatus.NEGOTIATION]: {
            on: {
                [NegotiationStateAction.NEGOTIATE]: {
                    target: NegotiationStatus.DRAFT,
                    cond: composeGuards([typeIsShared, oneOrMoreParticipants])
                },
                [NegotiationStateAction.SETTLE]: {
                    target: NegotiationStatus.SETTLED,
                    cond: composeGuards([typeIsShared, oneOrMoreParticipants])
                },
                '*': ERROR_STATE
            }

        },
        [NegotiationStatus.SETTLED]: {
            type: 'final'
        },
        [ERROR_STATE]: {},
    },
});

export function resolveState(status: NegotiationStatus, context: NegotiationStateContext, action: NegotiationStateAction): State<NegotiationStateContext> {
    const stateService = interpret(NEGOTIATION_MACHINE);
    stateService.machine.context = context;
    stateService.init(status);
    return stateService.send({type: action});
}

export function getTransitionsFromStateBasedOnContext(status: NegotiationStatus, context: NegotiationStateContext): NegotiationStateAction[] {
    const stateService = interpret(NEGOTIATION_MACHINE);
    stateService.machine.context = context;
    stateService.init(status);
    return stateService.machine.getStateNode(status).transitions
        .filter(t => t.eventType !== '*')
        .filter(t => !t.cond || t.cond.predicate(context))
        .map(t => t.eventType as NegotiationStateAction);
}

export function isErrorState(state: State<NegotiationStateContext>) {
    return state.value === ERROR_STATE;
}
