import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default function BreadCrumb(props) {
  const { classes } = props;

  function handleClick(event) {
    event.preventDefault();

    var len = props.navList.length;
    var idx = props.navList.findIndex((nav) => nav.id === event.target.id);

    if (idx + 1 === len - 1)
      props.buttonClickHandler('BACK')
    else
      props.buttonClickHandler('BACK', null, idx)
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {props.navList.length ?
        props.navList.map((nav, idx) => (
          idx < props.navList.length - 1 &&
            ((!props.navList.find((nav) => nav.id === 'Reseller Login') ||
              (props.navList.find((nav) => nav.id === 'Reseller Login') && props.navList.findIndex((nav) => nav.id === 'Reseller Login') < idx)) &&
              ((props.navList.length > 2 && idx >= props.navList.length - 2) || (props.navList.length <= 2)) &&
              (!props.navList.find((nav) => nav.id === 'Log Off') ||
                (props.navList.find((nav) => nav.id === 'Log Off') && props.navList.findIndex((nav) => nav.id === 'Log Off') < idx))) ?
            <Link
              color="inherit"
              href="/"
              onClick={handleClick}
              key={nav.id}
              id={nav.id}
            >
              {nav.id}
            </Link>
            :
            <Typography
              color="textPrimary"
              key={nav.id}
              id={nav.id}
            >{nav.id}</Typography>
        ))
        : ''}
    </Breadcrumbs>
  );
}