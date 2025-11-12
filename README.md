# AllCut — Fullstack (Frontend + Backend)

Este pacote une o **frontend (Vite + React + TS)** com o **backend (Node + Express)** do projeto **Cortadora a Laser (AllCut)**.

## Estrutura
```
allcut-fullstack/
  frontend/   # Vite + React (porta 5173 em dev)
  backend/    # Express API (porta 5000 em dev)
```
Em produção, o backend serve os arquivos do build do frontend (`frontend/dist`).

## Ambiente de desenvolvimento (2 terminais)
### 1) API (backend)
```bash
cd backend
npm install
# Configure variáveis em src/.env (ou crie .env na raiz copiando as chaves)
npm run dev   # inicia na porta 5000
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev   # inicia na porta 5173 e faz proxy /api -> http://localhost:5000
```
Abra http://localhost:5173

## Build de produção (servido pelo backend)
```bash
# Build do frontend
cd frontend
npm install
npm run build

# Servir pelo backend
cd ../backend
npm install
npm start  # inicia na porta 5000, servindo / (frontend) e /api (API)
```
Acesse: http://localhost:5000

## Observações
- **CORS** já está configurado no backend. Em dev, o Vite faz proxy para `/api`.
- Endpoints da API ficam em `/api/...` (auth, maquinas, reservas, relatorios).
- Se precisar alterar a porta do backend, edite `PORT` no `.env` e, no `frontend/vite.config.ts`, ajuste o `target` do proxy.
