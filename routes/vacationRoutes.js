
const router = require("express").Router(),
vacationController = require("../controllers/vacationController");

router.get("", vacationController.index, vacationController.indexView);
router.get("/new", vacationController.new);
router.post("/create", vacationController.create, vacationController.redirectView);
router.get("/:id/edit", vacationController.edit);
router.put("/:id/update", vacationController.update, vacationController.redirectView);
router.get("/:id", vacationController.show, vacationController.showView);
router.delete("/:id/delete", vacationController.delete, vacationController.redirectView);

module.exports = router;


