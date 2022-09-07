/*
    auth-middleware.js
    create an auth middleware to filter our requests and authorize or deny requests.
*/
const firebase = require("./firebase/index");

const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

/*
async function getRole(req,res){
    console.log("rithish",req);
  const role=await user.findFirst({
      select:{isAdmin:true},
      where:{email:req}
  })
  console.log("quizra",role)
  //return res.status(200).json(role.isAdmin);
  res.json(role);
}*/



function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;//
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];//index 0 is bearer and index 1 is token
  console.log(token)

 

  firebase
    .auth()
    .verifyIdToken(token)
    .then((result) => {//admin=getRole(result.email);
    //console.log("hello man",result); 
    //console.log(result.email); 
    request.email=result.email
    request.fullName=result.name

    next()})
    .catch(() => response.send({ message: "Could not authorize" }).status(403));

//res.send(getRole(result.email))
}

module.exports = {authMiddleware};

//mext in line 45 is , api-endpoint u gave in postman gets called