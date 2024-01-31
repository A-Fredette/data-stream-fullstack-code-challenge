import express from 'express';
import projects from './routes/projects';
import posts from './routes/posts';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use('/projects', projects);
app.use('/posts', posts);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
