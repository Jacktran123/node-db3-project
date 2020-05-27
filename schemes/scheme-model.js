const express=require('express');
const db=require('../knexfile-config');


function find(){
  return db('schemes');
}

function findById(id){
    if(id){
        return db('schemes').where({id}).first()
    } else {
        return null
    }
}

function findSteps(id){
    if(id){
        return db("steps as st")
        .select("scheme_name", "instructions","step_number")
        .join("schemes as s","scheme_id","s.id")
        .where("s.id", id)
        .orderBy("step_number");
    } else{
        return null
    }
}

function add(schemeData){
    return db('schemes').insert(schemeData)
    
}

function update(changes, id){
    return db('schemes').update(changes).where({id});
}

function remove(id){
    if(id){
        return db('schemes').where({id}).delete();
    } else {
        return null
    }
};

module.exports={
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}