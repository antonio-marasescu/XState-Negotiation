import {NegotiationProcessType} from './negotiation-process.type';
import {NegotiationPartyModel} from './negotiation-party.model';

export interface NegotiationProcessModel {
    id?: string;
    participants?: NegotiationPartyModel[];
    type: NegotiationProcessType;
}
