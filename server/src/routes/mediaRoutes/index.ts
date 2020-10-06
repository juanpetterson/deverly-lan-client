import express from 'express';

import { getMediasFromPath } from '../../controllers/mediasFolderController';

const router = express.Router();

router.get('/v1/medias', async (req, res) => {
  const medias = await getMediasFromPath();

  res.json(medias);
});

export default router;
