import React from 'react';
import {NegotiationStateAction, NegotiationStateActionTypes} from '../../xstate/negotiation-state.types';
import {createStyles, FormControl, InputLabel, MenuItem, Select, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

export interface NegotiationActionSelectConfig {
    availableActions: NegotiationStateAction[];
    selectedAction: NegotiationStateAction | string;
    onSelectAction: (action: NegotiationStateAction) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        }
    }),
);

const NegotiationActionSelect = ({availableActions, selectedAction, onSelectAction}: NegotiationActionSelectConfig) => {
    const classes = useStyles();
    return <FormControl className={classes.formControl}>
        <InputLabel>Actions</InputLabel>
        <Select
            value={selectedAction}
            onChange={(e) => onSelectAction(e.target.value as NegotiationStateAction)}
        >
            {NegotiationStateActionTypes.map(action => <MenuItem disabled={!availableActions.includes(action)}
                                                                 key={action} value={action}>{action}</MenuItem>)}
        </Select>
    </FormControl>
};

export default NegotiationActionSelect;
