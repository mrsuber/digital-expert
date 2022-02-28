const express = require("express");
const router = express.Router();
const {
  getPrivateData,
  updateUser,
  findUser,
  getAllUsers,
  deleteUser,
  getUserStatistics,
  createNewProdject,
  updateProdject,
  deleteProdject,
  getAProdject,
  getAllProdject,
  getRandomProdject

} = require('../controllers/private')
const { protect,isAdmin } = require('../middleware/auth')

//manupulate user data
router.route("/updateuser/:id").put(protect,updateUser)
router.route("/finduser/:id").get(protect,findUser)
router.route("/getallusers").get(protect,isAdmin,getAllUsers)
// router.route("/stats").get(protect,getUserStatistics)
router.route("/deleteuser/:id").delete(protect,isAdmin,deleteUser)

//
// //movie routes
router.post('/createnewprodject',protect,createNewProdject)
router.route('/createnewprodject').post(protect,createNewProdject)
router.route("/updateprodject/:prodjectId").put(protect,isAdmin,updateProdject)
router.route("/deleteprodject/:prodjectId").delete(protect,isAdmin,deleteProdject)
router.route("/getaprodject/:prodjectId").get(protect,getAProdject)
router.route("/getallprodject").get(protect,getAllProdject)
router.route("/getrandomprodject").get(protect,getRandomProdject)


router.route("/").get(protect,getPrivateData);

module.exports = router;
