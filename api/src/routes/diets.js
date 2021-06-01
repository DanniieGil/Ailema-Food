const { Router } = require("express");
const DietController = require('../controllers/diets')
const router = Router();

router.get("/", DietController.getAll);
router.get("/:id",DietController.getById);
router.post("/", DietController.add);
router.put("/:id",DietController.update);
router.delete("/:id",DietController.delete);

module.exports = router;
