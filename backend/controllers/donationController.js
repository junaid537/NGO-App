const { PrismaClient } = require("@prisma/client");
const { off } = require("../app");
const { user,donation ,event} = new PrismaClient();

async function createDonation(req,res,next){
    //res.send("hello")
    console.log("req.params.eventId",req.params.eventId)
    const id=parseInt(req.params.eventId); 
    const {amount,status}=req.body;
    //amount=parseInt(amount);
    console.log('amount',amount);
    //get userId from user table
    const userId=await user.findUnique({
        where:{email:req.email},
        select:{id:true}
    });
    console.log("userId is ----",userId);
    const newDonation=await donation.create({
        data:{
            amount:parseInt(amount),
            eventId:id,
            userId:userId.id,   //taken from line 11

        }
    
    });
//update status in Event Table
    const updateStatus=await event.update({
        where:{
            id:id
        },
        data:{
            status:status,
        },
    })
    console.log('newDonation',newDonation)
    res.status(200).json(newDonation);


}

async function getDonationsOfNgo(req,res,next){
let param=req.query;
res.send(param);
}

async function getDonations(req,res,next){
    let {ngoid}=req.query;
    if(ngoid===undefined){
        const getUserDonations=await donation.findMany({
            select:{
                id:true,
                createdAt:true,
                amount:true,
                event:{select:{name:true}},
            },
            where:{
                user:{
                    email:req.email,
                }
            }
        })
        getUserDonations1=getUserDonations.map(item=>{return {id:item.id,createdAt:item.createdAt,amount:item.amount,event:item.event.name}})
        console.log(getUserDonations1);
        res.send(getUserDonations1)      
    }
    else if(ngoid!==undefined){
        const getNgoDonations=await donation.findMany({
            select:{
                id:true,
                createdAt:true,
                amount:true,
                event:{select:{name:true}},
            },
            where:{
                event:{
                    ngoId:parseInt(ngoid)
                }
            }        
        })
        //const ngoidnew=getEventIds.map((i)=>{return i.ngoid})
        getNgoDonations1=getNgoDonations.map(item=>{return {id:item.id,createdAt:item.createdAt,amount:item.amount,event:item.event.name}})

        res.send(getNgoDonations1)

    }
    //res.send(userid);
    }

module.exports = {createDonation,getDonations};


/*
const getUser = await prisma.user.findUnique({
  where: {
    id: 19,
  },
  select: {
    name: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
*/
