import { Router } from 'express';
const mockData  = require('../public/data/kl_b-junioren_niedersachsen_named_distances_big.json');

export const router = Router();

router.get('/', (req, res) => {
  res.json(mockData);
});
