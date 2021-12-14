import React from 'react';
import { Grid } from '@material-ui/core';
import RW0001 from '../pageComponents/RW0001';
import RW0900 from '../pageComponents/RW0900';
import RW0901 from '../pageComponents/RW0901';
import RW0902 from '../pageComponents/RW0902';
import RW0903 from '../pageComponents/RW0903';
import RW0904 from '../pageComponents/RW0904';
import RW0905 from '../pageComponents/RW0905';

function DialogScreenRenderer(props) {
    const { classes } = props;

    return (
        (() => {
            switch (props.name) {
                case 'RW0001':
                    return (
                        <Grid
                            container
                            spacing={0}
                        >
                            <RW0001
                                {...props}
                            />
                        </Grid>
                    )
                    case 'RW0900':
                    return (
                        <Grid
                            container
                            spacing={0}
                        >
                            <RW0900
                                {...props}
                            />
                        </Grid>
                    )
                    case 'RW0901':
                    return (
                        <Grid
                            container
                            spacing={0}
                        >
                            <RW0901
                                {...props}
                            />
                        </Grid>
                    )
                case 'RW0902':
                    return (
                        <Grid
                            container
                            spacing={0}
                        >
                            <RW0902
                                {...props}
                            />
                        </Grid>
                    )
                    case 'RW0903':
                        return (
                            <Grid
                                container
                                spacing={0}
                            >
                                <RW0903
                                    {...props}
                                />
                            </Grid>
                        )
                        case 'RW0904':
                        return (
                            <Grid
                                container
                                spacing={0}
                            >
                                <RW0904
                                    {...props}
                                />
                            </Grid>
                        )
                    case 'RW0905':
                        return (
                            <Grid
                                container
                                spacing={0}
                            >
                                <RW0905
                                    {...props}
                                />
                            </Grid>
                        )
                default:
                    return null;
            }
        })()
    );
}

export default DialogScreenRenderer;