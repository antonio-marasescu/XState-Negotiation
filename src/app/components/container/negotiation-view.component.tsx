import React, {useEffect, useState} from 'react';
import {
    ERROR_STATE,
    getTransitionsFromStateBasedOnContext,
    isErrorState,
    resolveState
} from '../../xstate/negotiation.machine';
import {NegotiationStateAction, NegotiationStateContext, NegotiationStatus} from '../../xstate/negotiation-state.types';
import NegotiationActionSelect from '../presentational/negotiation-action.select';
import {NegotiationProcessType} from '../../models/negotiation-process.type';
import NegotiationContextForm from '../presentational/negotiation-context.form';
import {AppBar, Button, Chip, createStyles, Grid, Paper, Theme, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridItem: {
            margin: theme.spacing(2),
        }
    }),
);

export function NegotiationViewComponent() {
    const classes = useStyles();
    const [negotiationStatus, setNegotiationStatus] = useState<NegotiationStatus>(null);
    const [negotiationContext, setNegotiationContext] = useState<NegotiationStateContext>(null);
    const [negotiationSelectedAction, setNegotiationSelectedAction] = useState<NegotiationStateAction | string>('');
    const [negotiationAvailableActions, setNegotiationAvailableActions] = useState<NegotiationStateAction[]>([]);
    const [error, setError] = useState(null);

    function changeNegotiationState(): void {
        const newState = resolveState(negotiationStatus, negotiationContext, negotiationSelectedAction as NegotiationStateAction);
        if (isErrorState(newState)) {
            setError(ERROR_STATE);
            return;
        }
        const status: NegotiationStatus = newState.value as NegotiationStatus;
        const availableActions: NegotiationStateAction[] = getTransitionsFromStateBasedOnContext(status, negotiationContext);
        setNegotiationStatus(status);
        setNegotiationAvailableActions(availableActions);
        setError(null);
    }

    function resetView(): void {
        const context = {type: NegotiationProcessType.UNSHARED, participants: []};
        const availableActions: NegotiationStateAction[] = getTransitionsFromStateBasedOnContext(NegotiationStatus.DRAFT, context);
        setNegotiationStatus(NegotiationStatus.DRAFT);
        setNegotiationContext(context);
        setNegotiationAvailableActions(availableActions);
        setNegotiationSelectedAction('');
    }

    useEffect(() => {
        resetView();
    }, []);


    useEffect(() => {
        if (!negotiationStatus || !negotiationContext) {
            return;
        }
        const availableActions: NegotiationStateAction[] = getTransitionsFromStateBasedOnContext(negotiationStatus, negotiationContext);
        setNegotiationAvailableActions(availableActions);
    }, [negotiationStatus, negotiationContext]);

    return <Paper><Grid container spacing={3}>
        <Grid item xs={12}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4">
                        Status: {negotiationStatus}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.gridItem}>
                Negotiation Context
            </Typography>
            {negotiationContext &&
            <NegotiationContextForm context={negotiationContext}
                                    onContextChange={setNegotiationContext}/>}
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.gridItem}>
                Negotiation Actions
            </Typography>
            <NegotiationActionSelect availableActions={negotiationAvailableActions}
                                     selectedAction={negotiationSelectedAction}
                                     onSelectAction={setNegotiationSelectedAction}/>
            <Button variant='contained' size="large" color="primary" onClick={() => changeNegotiationState()}
                    className={classes.gridItem}>Change
                State</Button>
            <Button variant='contained' size="large" color="primary" onClick={() => resetView()}
                    className={classes.gridItem}>Reset</Button>
            {error && <Chip label='Transition Error' color='secondary' className={classes.gridItem}/>}
        </Grid>
    </Grid></Paper>
}
