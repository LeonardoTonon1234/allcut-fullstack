// 📁 routes/relatoriosRoutes.js
const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');
const { auth, admin } = require('../middleware/auth');

/**
 * Rota para geração de relatórios de uso do sistema
 * 🔒 Acesso restrito a administradores autenticados
 */
router.get('/uso', [auth, admin], relatoriosController.getUsageReports);

module.exports = router;
