// const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];



function arrayToNodes(nodes) {
    let parentNode = document.createElement(nodes[0]);
    let children = nodes[1];

    children.forEach(currentNode => {
       parentNode.appendChild(arrayToNodes(currentNode));
    });

    return parentNode;
}

arrayToNodes(nodes);