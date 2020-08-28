
export default function(state = null, action){

  switch (action.type) {
    case "Select": 
      return action.value;
    default:
      return  state;
  }

}