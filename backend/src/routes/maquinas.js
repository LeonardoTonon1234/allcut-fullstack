const express = require('express');
const router = express.Router();
const maquinasController = require('../controllers/maquinasController');
const { auth, admin } = require('../middleware/auth');

// 🔹 Rotas de administração (somente o administrador pode usá-las)
router.post('/', auth, admin, maquinasController.create);          // Criar nova máquina
router.put('/:id', auth, admin, maquinasController.update);        // Atualizar informações da máquina
router.delete('/:id', auth, admin, maquinasController.del);        // Remover máquina

// 🔹 Rotas específicas de gerenciamento de agenda
router.post('/:id/adicionar-data', auth, admin, maquinasController.adicionarData);       // Adicionar nova data
router.post('/:id/remover-data', auth, admin, maquinasController.removerData);           // Remover uma data
router.post('/:id/adicionar-horario', auth, admin, maquinasController.adicionarHorario); // Adicionar horário disponível
router.post('/:id/remover-horario', auth, admin, maquinasController.removerHorario);     // Remover horário disponível
router.post('/:id/atualizar-capacidade', auth, admin, maquinasController.atualizarCapacidade); // Atualizar limite de pessoas

// 🔹 Rotas acessíveis a todos os usuários autenticados
router.get('/', auth, maquinasController.list);   // Listar todas as máquinas disponíveis
router.get('/:id', auth, maquinasController.get); // Ver detalhes de uma máquina

module.exports = router;
