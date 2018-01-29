/**
 * Created by yuxin on 2018/1/26.
 */

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

})
    .post('/getRoleType', (req, res, next) => {
     res.json([{
         code: null,
         id: 70,
         name: "运动",
         pcode: null,
         status: true,
         type: "TopicType"
     }]);
})
    .put('/addUserPost', (req, res, next) => {
        console.log(req);

    })


module.exports = router;
