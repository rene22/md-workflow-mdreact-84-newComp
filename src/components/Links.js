import React from 'react';
import List from '@material-ui/core/List';
import LinkIcon from '@material-ui/icons/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


export default function Links(props) {
    const {classes} = props;

    /* Rendering sidebar links */
    return (
        props.links ?
            <List
                component="nav"
                aria-labelledby="Links"
                subheader={
                    props.subHeader ? 
                    <ListSubheader component="div" id="Links">
                        {props.subHeader}
                    </ListSubheader>
                    : ''
                }
            >
                {/* If there is an array of links then map the array otherwise just render a link */}
                {Array.isArray(props.links) ? 
                    props.links.map((link) => (
                        <ListItem button key={link.id} id={link.id} onClick={(e) => props.handler(link.id)}>
                            {/*<ListItemIcon><LinkIcon /></ListItemIcon>*/}
                            <ListItemText primary={link.value} className={classes.sidebarMenu}/>
                        </ListItem>
                    ))
                    : 
                    <ListItem button key={props.links.id} id={props.links.id} onClick={(e) => props.handler(props.links.id)}>
                        {/*<ListItemIcon><LinkIcon /></ListItemIcon>*/}
                        <ListItemText primary={props.links.value} className={classes.sidebarMenu}/>
                    </ListItem>}

                <div>
                {props.dfdlinks ?
                    <ListItem
                        button
                        key={props.dfdlinks.id}
                        id={props.dfdlinks.id}
                        onClick={(e) => props.handler(e, props.dfdlinks.id)}
                    >
                        <ListItemText
                        primary={props.dfdlinks.value}
                        className={classes.sidebarMenu}
                        />
                    </ListItem>
                : '' }

                </div>

            </List>
        : ''
    );
}