import {NegotiationPartyModel} from '../models/negotiation-party.model';

export const mockParticipants: NegotiationPartyModel[] = [
    {
        id: '76b1d220-64fc-4693-831d-46726943913d',
        name: 'Alice',
        role: 'SIMPLE_PARTICIPANT'
    },
    {
        id: 'b2d92314-721a-44e8-8c50-41aa4e664ded',
        name: 'Bob',
        role: 'SIMPLE_PARTICIPANT'
    },
    {
        id: '842af6ea-05c2-402c-92dd-acb725956d79',
        name: 'Malory',
        role: 'NEGOTIATOR'
    }
];
