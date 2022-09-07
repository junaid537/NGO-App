const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

//getWhetherUserAdmin is a waste, delete it !!
async function getWhetherUserAdmin(req,res){
const {name}=req.query.name;

    //const id=parseInt(req.params.productId);
    //console.log("id is ",id);
    const role=await user.findUnique({
        where:
        {
            emailId:emailId
        },
        select:{
            name:true
        }
    });
    res.status(200).json(role);

}

async function createUser(req, res) {

    const { name,email,isAdmin,ngoId } = req.body;
  
  //console.log("request received");
    const userExists = await user.findUnique({
      where: {
         email
      },
      select: {
        email: true,
        
      }
    });
    if (userExists) {
        //if not null
        //console.log("userExists",userExists)
        return res.status(400).json({
          msg: "user already exists",
        });
      }
    
      const newUser = await user.create({
        data: {
            name,email,isAdmin,ngoId
        }
      });
      res.status(200).json(newUser);

}


module.exports = {createUser, getWhetherUserAdmin};

