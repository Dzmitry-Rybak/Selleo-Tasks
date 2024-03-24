import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(express.json({extended: true}));

const _PORT = 5000;
const folderPath = '../frontend/public/YourFiles/'; // Path to folder

app.get('/', (req, res) => {
    res.send('ok')
})

const isFileFolder = (files, newPath) => {
    const fileSets = [];
    files.map(file => {
        const filePath = path.resolve(newPath, file);
        const stats = fs.statSync(filePath);
        if(stats.isDirectory()) {
            fileSets.push({fileName: file, type: 'folder'});
        } else {
            fileSets.push({fileName: file, type: 'file'});
        }
    })
    return fileSets;
}

// Endpoint to GET lists of files in folder
app.get('/files', (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                res.status(500).send('Error while reading dir');
                return;
            }
            const filesWithSets = isFileFolder(files, folderPath)
            res.json(filesWithSets);
        });
    } else {
        const filePath = path.resolve(folderPath, filename);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    res.status(500).send('Error while reading dir');
                    return;
                }
                const filesWithSets = isFileFolder(files, filePath)
                res.json(filesWithSets);
            });
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(404).send('No such file');
                    return;
                }
                const extension = path.extname(filePath);
                const src = `${path.dirname(filePath).split('public')[1]}/${path.basename(filePath)}`;
                res.send({data: data, extension: extension, src: src});
            });
        }
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${folderPath}uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// lists of tyles that user can upload
const types = ['.png', '.jpg', '.jpeg', '.txt', '.json'];

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    if(types.includes(extension)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter }) // upload only filtered files

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if(req.file){
            res.json(req.file)
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(_PORT, () => {
    console.log(`Server is listening on port ${_PORT}`);
});