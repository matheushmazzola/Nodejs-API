const express = require("express");
const Campaigns = require("../model/campaigns");
const router = express.Router();

router.post('/create', async(request, response)=>{

    try{

        const campaigns = await Campaigns.create(request.body);
        return response.send({ campaigns });

    }catch(error){
        return response.status(400).send({ error: 'Creation failed' }) ;
    }
});

router.get('/find', async(request, response)=>{
    const { campaign_name, advertiser, country, conversion, bid } = request.query;

    try{
        if(!campaign_name && !advertiser && !country && !conversion && !bid){
            var campaign = await Campaigns.find();
        }else{
            var campaign = await Campaigns.find({$or:[
                {campaign_name: campaign_name ? campaign_name : ""},
                {advertiser: advertiser ? advertiser : ""},
                {country: country ? country : ""},
                {conversion: conversion ? conversion : ""},
                {bid: bid ? bid : "" }]});
        }

        return response.send({ campaign });

    }catch(error){
        return response.status(400).send({ error: 'Find failed' }) ;
    }
});

router.put('/edit', async(request, response)=>{
    const { campaign_name, advertiser, country, conversion, bid } = request.body;

    try{
        const campaigns = await Campaigns.updateOne({ campaign_name },{ $set: { advertiser, country, conversion, bid }});
        return response.send({ success: "successfully update campaign" });

    }catch(error){
        return response.status(400).send({ error: 'Edit failed' }) ;
    }
});

router.delete('/delete', async(request, response)=>{
    const { campaign_name } = request.body;
    var deleted = { campaign_name: campaign_name };

    try{

        const campaigns = await Campaigns.deleteOne(deleted);
        return response.send({ success: "successfully deleted campaign" });

    }catch(error){
        return response.status(400).send({ error: 'Delete failed' }) ;
    }
});

module.exports = app => app.use('/campaigns', router);