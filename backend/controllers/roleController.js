const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();


async function getRole(req,res){
    //console.log("rithish",req);
    console.log("role controller")
    const role=await user.findFirst({
      select:{isAdmin:true,ngoId:true},
      where:{email:req.email}
  })
  console.log("checkpoint",role)
  if(role===null){
    const newUser = await user.create({
      data: {
          name:req.fullName,
          email:req.email,
      }
    });
    const newUserRole=await user.findUnique({
      select:{isAdmin:true},
      where:{email:req.email}
  })
    return res.status(200).json(newUserRole);
  }
    console.log("role is ",role)
    //return res.status(200).json(role.isAdmin);
    res.status(200).json(role);
}

module.exports = {getRole};
