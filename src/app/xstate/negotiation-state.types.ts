import {NegotiationProcessModel} from '../models/negotiation-process.model';

export enum NegotiationStateAction {
    SAVE = 'Save',
    SUBMIT_NEGOTIATION = 'Submit Negotiation',
    NEGOTIATE = 'Negotiate',
    SETTLE = 'Settle',
}

export enum NegotiationStatus {
    DRAFT = 'Draft',
    NEGOTIATION = 'Negotiation',
    SETTLED = 'Settled'
}

export const NegotiationStateActionTypes = [NegotiationStateAction.SUBMIT_NEGOTIATION, NegotiationStateAction.SAVE, NegotiationStateAction.SETTLE, NegotiationStateAction.NEGOTIATE];
export type NegotiationStateContext = NegotiationProcessModel;

