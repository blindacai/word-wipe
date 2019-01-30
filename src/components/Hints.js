import React from 'react';

const Hints = () => {
  const hint = {
    one: {id: 1, body: "Six Letters"},
    two: {id: 2, body: "A man who has people working for him"},
    three: {id: 3, body: "Having or showing very great skill or proficiency"}
  }
  
  return(
    <div className="hints">
      <div>{hint.one.body}</div>
      <div>{hint.two.body}</div>
      <div>{hint.three.body}</div>
    </div>
  )
}

export default Hints