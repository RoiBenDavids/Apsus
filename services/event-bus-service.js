function on(eventName, listener) {
    console.log('hi');
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    console.log('hi');
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}


export default { on, emit }