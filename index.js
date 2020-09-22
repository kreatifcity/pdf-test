const docx = require("docx-templates");
const libre = require("libreoffice-convert");
const fs = require("fs");
const path = require("path")

const template = fs.readFileSync('template.docx');

docx.createReport({
    template,
    data: {
        name: 'John',
    },
    cmdDelimiter: ['${', '}']
}).then(buffer => {

    libre.convert(buffer, ".pdf", undefined, (err, done) => {
        if (err) {
            console.log(`Error converting file: ${err.stack}`);
            return;
        }
    
        // Here in done you have pdf file which you can save or transfer in another stream
        fs.writeFileSync(path.resolve(__dirname,"report.pdf"), done);
    });
})
.catch(error => {
    console.log(error.stack)
});

