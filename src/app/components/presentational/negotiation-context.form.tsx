import React from 'react';
import {NegotiationStateContext} from '../../xstate/negotiation-state.types';
import {Chip, createStyles, FormControl, Input, MenuItem, Select, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {NegotiationPartyModel} from '../../models/negotiation-party.model';
import {NegotiationProcessType, NegotiationProcessTypes} from '../../models/negotiation-process.type';
import {mockParticipants} from '../../_mock/mock-data';

export interface NegotiationContextFormConfig {
    context: NegotiationStateContext;
    onContextChange: (context: NegotiationStateContext) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            maxWidth: 400,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        }
    }),
);

const NegotiationContextForm = ({context, onContextChange}: NegotiationContextFormConfig) => {
    const classes = useStyles();

    function handleParticipantChange(newParticipants: NegotiationPartyModel[]) {
        const newContext = {...context};
        newContext.participants = newParticipants;
        onContextChange(newContext);
    }

    function handleTypeChange(type: NegotiationProcessType) {
        const newContext = {...context};
        newContext.type = type;
        onContextChange(newContext);
    }

    return <div>
        <FormControl className={classes.formControl}>
            <Select
                multiple
                value={context.participants}
                onChange={(e) => handleParticipantChange(e.target.value as NegotiationPartyModel[])}
                input={<Input/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as NegotiationPartyModel[]).map((value) => (
                            <Chip key={value.id} label={value.name} className={classes.chip}/>
                        ))}
                    </div>
                )}
            >
                {mockParticipants?.map((participant) => (
                    <MenuItem key={participant.id} value={participant as any}>
                        {participant.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <Select
                value={context.type}
                onChange={(e) => handleTypeChange(e.target.value as NegotiationProcessType)}
            >
                {NegotiationProcessTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
        </FormControl>
    </div>
};

export default NegotiationContextForm;
