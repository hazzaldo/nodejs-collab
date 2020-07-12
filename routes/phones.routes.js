const router = require('express').Router()
const Phone = require('../db/models/phone.model')
const { updatePhoneById } = require('../db/util/phone.util')

router.route('/')
.get(async (req, res) => {
    console.log(`GET`)
    try {
        const phones = await Phone.find();
        res.json(phones)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

router.route('/phone/:id')
.get(async (req, res) => {
    console.log(`GET`)
    try {
        const foundPhone = await Phone.findById(req.params.id)
        res.json(foundPhone)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})
.delete(async (req, res) => {
    try {
        const deletedPhone = await Phone.findByIdAndDelete(req.params.id)
        res.status(200)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})
.patch(async (req, res) => {
    console.log(`req.body: ${req.body}`)
    try {
        const response = await updatePhoneById(req.params.phoneId, req.body);
        res.status(200)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})
.put(async (req, res) => {
    console.log(`req.body: ${req.body}`)
    const {make, model, storage, monthlyPremium, yearlyPremium, excess} = req.body
    let foundPhone = {}
    try {
        foundPhone = await foundPhone.findById(req.params.id)
        foundPhone.make = make
        foundPhone.model = model
        foundPhone.storage = storage
        foundPhone.monthlyPremium = Number(monthlyPremium)
        foundPhone.yearlyPremium = Number(yearlyPremium)
        foundPhone.excess = Number(excess)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

    try {
        const savedPhone = await foundPhone.save();
        res.status(200)
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router