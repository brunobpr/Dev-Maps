module.exports = function parseString(arrayAsString){
 return arrayAsString.split(',').map(techs => techs.trim());

}