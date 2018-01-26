/**
 * Created by yuxin on 2018/1/26.
 */

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

});

router.post('/getRoleType', (req, res, next) => {
     res.json([{
         code: null,
         id: 70,
         name: "运动",
         pcode: null,
         status: true,
         type: "TopicType"
     }]);
});

module.exports = router;