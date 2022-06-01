const printDate = function() {
    let d = new Date();
    console.log(" date  ", d.getDate())
}
const printMonth = function() {
    let m = new Date();
    console.log("month", m.getMonth());
}
const getBatchInfo = function() {
    console.log(" radon , week3 day3 , the topic for today is nodejs module system ")
}
module.exports.printDate = printDate()
module.exports.printMonth = printMonth()
module.exports.getBatchInfo = getBatchInfo()