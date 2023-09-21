const helpers = {
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