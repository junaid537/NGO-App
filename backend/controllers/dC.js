async function hello(req,res,next){
    console.log(req)
    console.log("teja");
    res.send("hello")
}
module.exports = {hello};