import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const readingFile = async () => {
    const filePath = './posts.json';
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
}

app.get('/posts', async (req, res) => {
    try {
        const fileData = await readingFile()
        res.json(fileData);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Error reading JSON file');
    }
});

app.post('/newpost', async (req, res) => {
    try {
        const fileData = await readingFile();
        fileData.posts.push(req.body);

        const updatedData = JSON.stringify(fileData, null, 2);
        await fs.writeFile('./posts.json', updatedData);

        res.status(200).json({ message: 'Post added successfully' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error adding post' });
    }
});

app.delete('/deletepost/:postId', async (req, res) => {
    try {
        const fileData = await readingFile();
        fileData.posts.splice(req.params.postId, 1);

        const updatedData = JSON.stringify(fileData, null, 2);
        await fs.writeFile('./posts.json', updatedData);

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error adding post' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
