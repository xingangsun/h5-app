export default function (router, db) {
    router
    //
    .all('/demo/list', function (req, res, next) {
        res.json(db.get('demos').value())
    })
}
