export default () => (req, res, next) => {
    // Show each request
    console.log(`Request to: ${req.path} with method: ${req.method}`)
    
    // If there is information in the body - show it
    const isEmpty = Object.keys(req.body).length === 0;  // TODO remove when we have real users 
    if (isEmpty === false) {
        console.log(req.body);
    }

    next();
}