import {NegotiationStateContext} from './negotiation-state.types';
import {EventObject} from 'xstate';
import {NegotiationProcessType} from '../models/negotiation-process.type';


export type ValidationGuard = (context: NegotiationStateContext, event: EventObject) => boolean;

export function oneOrMoreParticipants(context: NegotiationStateContext, _: EventObject) {
    return context?.participants && context.participants.length > 0;
}

export function typeIsShared(context: NegotiationStateContext, _: EventObject) {
    return context?.type && context.type === NegotiationProcessType.SHARED;
}

export function typeIsUnshared(context: NegotiationStateContext, _: EventObject) {
    return context?.type && context.type === NegotiationProcessType.UNSHARED;
}
