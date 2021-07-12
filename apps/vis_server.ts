import * as express from 'express';
import * as path from 'path'

const app = express();
const PORT = 8000;
const staticFilesDir = path.join(__dirname, '..', 'src', 'vis_server', 'public')

app.use('/static', express.static(staticFilesDir))

app.get('/', (req, res) => res.redirect(301, '/static/vis.html'));

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
