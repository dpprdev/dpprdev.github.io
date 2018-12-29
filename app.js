/*
   ____            _       ____  _                       
 | __ ) _ __ __ _(_)_ __ / ___|| |_ ___  _ __ _ __ ___  
 |  _ \| '__/ _` | | '_ \\___ \| __/ _ \| '__| '_ ` _ \ 
 | |_) | | | (_| | | | | |___) | || (_) | |  | | | | | |
 |____/|_|  \__,_|_|_| |_|____/ \__\___/|_|  |_| |_| |_|
                                                              
*/

const express           = require('express');
const app               = express();
const { join, extname } = require('path');
const fileUpload        = require('express-fileupload');

app.use('/files', express.static('./uploads'));
app.use(express.static('./static'));
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

app.post('/upload', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (!req.body) {
        res.status(401).send(JSON.stringify({
            success: false,
            error: 'Invalid key!'
        }));
    } else {
        if (!req.body.key === "") {
            res.status(401).send(JSON.stringify({
                success: false,
                error: 'Invalid key!'
            }));
        } else {
            const newFileName = Math.random().toString(36).slice(-6);
            req.files.file.mv('./uploads/' + newFileName + extname(req.files.file.name), (err) => {
                if (err) return console.log(err);
            });
            res.status(200).send('https://dppr.xyz/files/' + newFileName + extname(req.files.file.name));
        }
    }
});

app.get('*', (req, res) => {
    res.status(404).sendFile(join(__dirname, 'static/404.html'));
});

app.listen(3000, () => {
    console.log("hi");
}); 
