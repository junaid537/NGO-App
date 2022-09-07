const { PrismaClient } = require("@prisma/client");
const { ngo,user } = new PrismaClient();

async function createNgo(req, res) {
  const { name,city,state,address } = req.body;
  const ngoExists = await ngo.findUnique({
    where: {
      name:name,
    },
    select: {
      name: true,
    },
  });

  if (ngoExists) {
    //if not null
    return res.status(400).json({
      msg: "ngo already exists",
    });
  }
console.log("hiii")
  const newNgo = await ngo.create({
    data: {
        name ,
        address,
        city,
        state 
    }
  });
  const getNgoId=await ngo.findUnique({
    where:{
      name:name
    },
    select:{id:true},
  })
  console.log(getNgoId);
  //updating isAdmin and ngoId
  //updating ngoId because if admin , ngoid shud be there also in MyEvents in react , requires ngoid in api
 const uid=await user.findFirst({select:{id:true},where:{email:req.email}})
 console.log("uid is ",uid);

  const updateRoleOfUserAsAdmin=await user.update(
    {
      where:{email:req.email},
      data:{
        id:uid.id,
        isAdmin:true,
        name:req.fullName,
        ngoId:getNgoId.id,
      }
    }
  )
  res.status(200).json(newNgo);

}
/*
async function hello(req,res){
  res.send("hello")
}
module.exports = {hello};*/
/*
async function getNgo(req, res) {
  let queryParam_ngoName = req.query.ngoName;
  const getNgoIdByName = await ngo.findUnique({
    where: {
      name:queryParam_ngoName,
    },
    select: {
      id: true,
    },
  })
  res.send(getNgoIdByName)
}
*/


module.exports = { createNgo};
