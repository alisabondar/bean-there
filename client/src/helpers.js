// file to store helper functions that may have functionality across multiple components
let helpers = {
  // parses form inputs for their values and builds a request body (input arg is e.target.elements)
  // make sure that each needed form input has a value and name attribute
  formParser: (formNodes) => {
    formNodes = Array.from(formNodes);
    let reqBody = {};
    formNodes.forEach((node) => {
      if (node.value) {
        reqBody[node.name] = node.value;
      }
    })
    return reqBody;
  },
}

export default helpers;