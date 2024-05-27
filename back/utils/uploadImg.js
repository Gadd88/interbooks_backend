const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const uploadImage = async (filePath, folder) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resourse_type: "auto",
        folder: folder
    }
    try {
        const result = await cloudinary.uploader.upload(filePath, options
        //     function(err, result){
        //     if(err){
        //         console.log(err)
        //         return res.status(500).json({
        //             success: false,
        //             message: 'Error'
        //         })
        //     }
        //     res.status(200).json({
        //         success: true,
        //         message: 'Imagen subida',
        //         data: result
        //     })
        // }
        )
        fs.unlinkSync(filePath)
        return result.url
    }catch(error){
        console.error(error)
    }
}

module.exports = uploadImage