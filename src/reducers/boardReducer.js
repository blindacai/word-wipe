const randomChar = () => {
  const r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}

const letters = Array(10*10).fill(null).map(_ => {return randomChar()});

const boardReducer = (state = letters, action) => {
  switch(action.type){
    default:
      return state
  }
}

export default boardReducer