const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const { auth } = require('../middleware/auth');

router.post('/', auth, reservasController.create);
router.put('/:id/cancel', auth, reservasController.cancel);
router.get('/', auth, reservasController.list);
router.post('/:id/suplente', auth, reservasController.addSuplente);
router.put('/:id/reagendar', auth, reservasController.reagendar);
router.put('/:id/confirmar', auth, reservasController.confirmarPresenca);

module.exports = router;
