const { PrismaClient } = require("@prisma/client");
const { event , donation,ngo } = new PrismaClient();

async function createEvent(req, res) {
  let { name,targetFund,dueDate,ngoId,image } = req.body;
  dueDate= (new Date(dueDate)).toISOString()


  const eventExists = await event.findUnique({
    where: {
        unique_event_per_ngo:{ 
            name:name,
            ngoId:ngoId,
        }
    },
    select: {
      name: true,
      ngoId:true
    }
  });

  if (eventExists) {
    //if not null
    console.log(eventExists)
    return res.status(400).json({
      msg: "event already exists",
    });
  }

  const newEvent = await event.create({
    data: {
        name,
        targetFund:parseInt(targetFund),
        dueDate,
        ngoId,
        image
    }
  });
  const details = await event.findUnique({
    where: {
      unique_event_per_ngo:{ 
          name:name,
          ngoId:ngoId,
      }
  },
    select: {
        id:true,
        name:true,
        image:true,
        targetFund:true,
        dueDate:true,
        ngoId:true,
        status:true,
    }
  });
  res.status(200).json(details);
}

//API to fetch all events where status not completed



async function getEventsWithUncompletedStatus(req,res) {
    let queryParam_ngoId = req.query.ngoId;
    console.log(queryParam_ngoId);

    if(queryParam_ngoId !== undefined){
        let ngoId=parseInt(req.query.ngoId);
        const events=await event.findMany({
          
            where:{
                ngoId:parseInt(ngoId),
            },
        })
        return res.status(200).json(events);
    }

    const getEvents=await event.findMany({
        select:{
            id:true,
            createdAt:true, 
            updatedAt:true,
            image:true,
            name:true,
            targetFund:true,
            dueDate:true,
            status:true,
            ngoId:true,
            ownedBy:{select:{name:true}},
            
        },
        where:{
            status:{
                not:'COMPLETED',
            },
        },
    })
    console.log(getEvents)
    /*const ngoName=await ngo.findUnique({
      select:{
        name:true
      },
      where:{
        id:parseInt(ngoId)
      }
    })*/
    
    res.status(200).json(getEvents);
    
}
async function getdueDate(req,res){
  const id=parseInt(req.params.eventId); 
  let dueDate=await event.findUnique({
    where:{id:id },
    select:{dueDate:true},
  })
  console.log(dueDate);

  let sumOfAmountInEvent=await donation.aggregate({
    _sum:{
      amount:true,
    },
    where:{
      eventId:id,
    }
  })
  console.log("sumOfAmountInEvent",sumOfAmountInEvent);
  console.log('sum is :' + sumOfAmountInEvent._sum.amount)
  dueDate={...dueDate,donationSum:sumOfAmountInEvent._sum.amount};
  res.status(200).json(dueDate);

}


const deleteEvent=async(req,res,next)=>{
  const eid = parseInt(req.params.eventId);
  console.log(eid);
  try {
    const deleted_event = await event.delete({
      where: { id: eid },
    });
    res.json(deleted_event);
  } catch (err) {
    console.error(`Error while deleting in event table`, err.message);
    next(err);
  }

}
/*
const deleteGroup = async (req, res, next) => {
  console.log("deleteGroup request received", req);
  const cid = parseInt(req.params.cid);
  //res.send("hello");
  try {
    const deleted_group = await group.delete({
      where: { name: req.body.name },
    });
    res.json(deleted_group);
  } catch (err) {
    console.error(`Error while posting in likes table`, err.message);
    next(err);
  }
  console.log("delete request completed!");
};
*/
module.exports = { createEvent, getEventsWithUncompletedStatus,getdueDate,deleteEvent};
