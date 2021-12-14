import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { clearSearchFilters } from '../actions/MainContentActions';

function PrimaryButton(props) {
  const {classes} = props;
  
  const handleClick = (action) => {
    props.setClear(true)
};

  return (
      props.item ?
        <Button 
          variant="contained" 
          color="primary" 
          id={props.item.id} 
          onClick={() => props.handler ? props.handler(props.item.id) : handleClick(props.action)}
          key={props.item.id}
          >
            {props.item.id}
        </Button>
      : ''
  );
}

export default connect(null, {clearSearchFilters})(PrimaryButton);