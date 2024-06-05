import express from "express";
import { getAllUserController, loginController, registerController } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// import { updateProductController } from "../controllers/productController.js";

//route object
const router = express.Router();

//routing
//Register || METHOD->POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);


//test routes

//protected user routes auth
// router.get("/user-auth", requireSignIn, (req, res) => {
//   res.status(200).send({ ok: true });
// });

//protected admin routes auth
// router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
//   res.status(200).send({ ok: true });
// });

//upDATE PROFILE
// router.put("/profile", requireSignIn, updateProfileController);

//orders
// router.get("/orders", requireSignIn, getOrderController);

//orders
router.get("/users", requireSignIn, getAllUserController);

//order startus update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );

//delete order
// router.put('/user_orders/:orderId', requireSignIn, userOrderStatusController);

export default router;
