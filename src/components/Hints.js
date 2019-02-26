import React from 'react';
import { connect } from 'react-redux';
import { hintsData } from '../hintsData';

const Hints = (props) => {
  const {matched, hintPos} = props;

  if(matched === "true"){
    props.transitOn();
    setTimeout(() => {
      props.restoreMatch();
      props.nextHint();
      props.transitOff();
    }, 1500);
  }

  return(
    <div className="hints">
      <div className="hintone">
        ( {hintPos + 1} / 8 ) {hintsData[hintPos][0].body}
        <span className={"check " + ((matched === "true")? "enable" : "disable")}> - Good </span>
      </div>
      <div>{hintsData[hintPos][1].body}</div>
      <div>{hintsData[hintPos][2].body}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    matched: state.select.matched,
    hintPos: state.hints.currentHint
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    restoreMatch: () => {
      dispatch({type: 'RESTORE_MATCH'})
    },
    nextHint: () => {
      dispatch({type: 'NEXT_HINT'})
    },
    transitOn: () => {
      dispatch({type: "TRANSIT_ON"})
    },
    transitOff: () => {
      dispatch({type: "TRANSIT_OFF"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hints)