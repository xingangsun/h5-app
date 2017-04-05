export default function (router, db) {
    router
    // suggestions
    .all('/city/list', function (req, res, next) {
        res.json(db.get('cityList').value())
    })
    // suggestions
    .all('/brandRent/search', function (req, res, next) {
        res.json(db.get('suggestions').value())
    })
}
