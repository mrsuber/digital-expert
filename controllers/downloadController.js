const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')
const options = require('../helpers2/options')
// const data = require('../helpers2/data')
const MultipleFile = require('../models/multiplefile')

const downloadview = (req, res, next) => {




    res.render('home');
}

const generatePdf = async (req, res, next)=> {
    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';


        try{
          const data = await MultipleFile.find()
          const newData =data.map(col=>({
            ...col,
            files1:col.files[0].filePath,
            files2:col.files[1].filePath,
            files3:col.files[2].filePath}))

            let array = [];

            newData.forEach(d => {

            const prod = {
                FirstName: d._doc.FirstName,
                LastName:d._doc.LastName,
                DateOfBirth: d._doc.DateOfBirth,
                PlaceOfBirth: d._doc.PlaceOfBirth,
                MotherName: d._doc.MotherName,
                PhoneNumber: d._doc.PhoneNumber,
                IdCardNumber: d._doc.IdCardNumber,
                Region: d._doc.Region,
                Residence: d._doc.Residence,
                IdCardFront: `${process.env.BASE_URL + d.files1}`,
                IdCardBack: `${process.env.BASE_URL + d.files2}`,
                passport: `${process.env.BASE_URL +d.files3}`,
              }
              array.push(prod)


            })


            const obj = {
              Infolist: array

            }

            const document = {
                html:html,
                data:{
                    products:obj
                },
                path: './docs/' + filename

            }

            pdf.create(document, options)
            .then(res=>{
                // console.log(res)
            }).catch(error => {
                console.log(error)
            });

            const filepath = `${process.env.BASE_URL + "docs/"}` + filename


            res.json({
                msg:"download",
                path: filepath
            })
        }catch(error){
          console.log(error)
        }




}

module.exports = {
    downloadview,
    generatePdf
}
