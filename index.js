const express = require('express');
const multer = require('multer');
const camelot = require('camelot-py');

const app = express();
const port = 3000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/process-pdf', upload.single('pdfFile'), async (req, res) => {
    try {
        
        const tables = await camelot(req.file.buffer);

        
        res.json({ camelotTables: tables });
    } catch (error) {
        console.error('Erro ao processar o PDF:', error);
        res.status(500).json({ error: 'Erro interno ao processar o PDF.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
