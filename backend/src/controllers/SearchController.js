const Dev = require('../models/Dev');
const parseString = require('../utils/parseString');
module.exports = {
    async index(req, res){
        //Search 
        const {longitude, latitude, techs} = req.query;
        const techsArray = parseString(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100000,
                },
            },
        });

        return res.json({devs});
    }
}