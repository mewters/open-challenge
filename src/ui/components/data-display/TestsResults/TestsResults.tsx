import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import {
    DescriptionInterface,
    TestsResultsInterface,
} from '@typing/TestsInterface';
import React from 'react';
// import {  } from '@mui/material';
// import { Component } from './TestsResults.style';

export interface TestsResultsProps extends TestsResultsInterface {}

const TestsResults: React.FC<TestsResultsProps> = ({
    totalTests,
    passedTests,
    failedTests,
    stats,
}) => {
    return (
        <div>
            <Typography variant={'h2'} color={'textPrimary'}>
                {totalTests} Tests:{' '}
                <Typography
                    variant={'h2'}
                    color={'success.main'}
                    component={'span'}
                >
                    {passedTests} passed
                </Typography>
                ,{' '}
                <Typography
                    variant={'h2'}
                    color={'error.main'}
                    component={'span'}
                >
                    {failedTests} failed
                </Typography>
            </Typography>
            {stats.map((stat, statIndex) => (
                <List key={statIndex}>
                    <ListSubheader>{stat.name}</ListSubheader>
                    {stat.it.map((it, itIndex) => (
                        <ListItem key={itIndex}>
                            <ListItemText
                                primary={
                                    <Typography color={'textSecondary'}>
                                        {it.name}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        {it.expects.map(
                                            (expect, expectIndex) => (
                                                <Box
                                                    key={expectIndex}
                                                    component={'span'}
                                                    sx={{
                                                        display: 'block',
                                                        whiteSpace: 'pre-wrap',
                                                        color: expect.status
                                                            ? 'success.main'
                                                            : 'error.main',
                                                    }}
                                                >
                                                    {expect.status ? (
                                                        <i className="fas fa-fw fa-check" />
                                                    ) : (
                                                        <i className="fas fa-fw fa-times" />
                                                    )}{' '}
                                                    {expect.name}
                                                </Box>
                                            )
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ))}
        </div>
    );
};

export default TestsResults;
