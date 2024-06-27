const schemaValidation = (schema) => (req, res, next) =>
{
    const { error } = schema.validate(req.body);
    if(error)
        return res.send(error.message);
    next();
}

module.exports = schemaValidation;