const express = require('express')
const router = express.Router();
const { Appointment } = require('../../model/appointment/Appointment')



router.post('/appointment/data',async (req,res)=>{
    let tab = req.body;
    let appointments;
    let whereClause = {...tab}
    appointments = await Appointment.find(whereClause).sort({createdAt: -1})
    res.status(200).send(appointments)
})


router.post('/appointment', async (req, res) => {
    try {  
        const newAppointment = new Appointment(req.body);
        const saved = await newAppointment.save();
        res.status(200).send(saved)
    } catch (error) {
        console.log("POST /appointment err", error)
        res.status(400).send(error)
    }
})

router.put('/appointment/update/:id', async (req, res) => {
    try {  
        let id = req.params.id
        const filter = { _id: id };
        const update = {...req.body}

        const newAppointment = await Appointment.findOneAndUpdate(filter, update);
        res.status(200).send(newAppointment)
    } catch (error) {
        console.log("POST /appointment err", error)
        res.status(400).send(error)
    }
})


module.exports = router