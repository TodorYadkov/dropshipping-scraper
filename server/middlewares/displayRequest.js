export default () => (req, res, next) => {
    // Show each request
    console.log(`Request to: ${req.path} with method: ${req.method}`);

    next();
}