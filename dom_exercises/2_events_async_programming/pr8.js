// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

/*
- Check if `parentElement` exists, if it does not, return `undefined`
- Add an Event Listener to the `parentElement`
- Obtain all the children that match the given selector
- Callback will be called IF the target is within our match collection
*/

function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement) {
        return undefined;
    }

    parentElement.addEventListener(eventType, event => {
        let matchingChildren = parentElement.querySelectorAll(selector);
        let childrenCollection = [].slice.call(matchingChildren);

        if (childrenCollection.includes(event.target)) {
            callback(event);
        }
    });
    
    return true;
}

// console.log(delegateEvent(element1, 'p', 'click', callback));
// console.log(delegateEvent(element2, 'p', 'click', callback));
// console.log(delegateEvent(element2, 'h1', 'click', callback));
// console.log(delegateEvent(element3, 'h1', 'click', callback));
// console.log(delegateEvent(element3, 'aside p', 'click', callback));
// delegateEvent(element2, 'p', 'click', callback);