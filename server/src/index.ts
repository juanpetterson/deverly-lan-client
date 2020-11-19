import cors from 'cors';
import express from 'express';

import mediaRoutes from './routes/mediaRoutes';
import videoStreamRoutes from './routes/videoStreamRoutes';

// App setup
const PORT = 5000;
const app = express();

app.use(cors());

// Routes
app.use('/api', videoStreamRoutes);
app.use('/api', mediaRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
