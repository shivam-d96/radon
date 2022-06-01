const upper = function() {
    const text = "javascript is great language";
    console.log(text);
    console.log(text.toLocaleUpperCase());
}
const lower =  function() {
    const text1 = "I AM LEARNING NODE JS ";
    console.log(text1);
    console.log(text1.toLocaleLowerCase())
}
const trimx = function() {
    const text3 = "    Function up    ";
    console.log(text3);
    console.log(text3.trim());

}
module.exports.upper = upper()
module.exports.lower = lower()
module.exports.trimx = trimx()