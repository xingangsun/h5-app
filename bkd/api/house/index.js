export default function (router, db) {
    // banner list
    router.all('/banner/list', function (req, res, next) {
        res.json(db.get('banners').value())
    })
    // house list
    .all('/brandRent/getBrandList', function (req, res, next) {
        const houses = db.get('houses')
        let p = houses.first().value()
        let items = []
        for(let i = 0; i < 20; i++) {
            items.push(Object.assign({}, p, {
                houseId: i + 1,
                rentType: db._.random(1, 2),
            }))
        }
        res.json({ list: items })
    })
    .all('/brandRent/getRecommendList', function (req, res, next) {
        const houses = db.get('houses')
        let p = houses.first().value()
        let items = []
        for(let i = 0; i < 20; i++) {
            items.push(Object.assign({}, p, {
                houseId: i + 1,
                rentType: db._.random(1, 2),
            }))
        }
        res.json({ list: items, brandRecomId: 'brandRecomId' })
    })
    .all('/brandRent/getBrandDetail', function (req, res, next) {
        res.json(db.get('detail1').value()) // 合租
        // res.json(db.get('detail2').value()) // 整租
    })
}
