const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { productRules, updateRules } = require('../middleware/validate');

router.get('/stats', ctrl.getStats);
router.get('/categories', ctrl.getCategories);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', productRules, ctrl.create);
router.put('/:id', updateRules, ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
