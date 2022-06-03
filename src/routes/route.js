const express = require('express');
const myHelper = require('../util/helper')
const arrayOperation = require('../previous_assign_q4.js')
const underscore = require('underscore')
const lodash = require('lodash')
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     myHelper.printDate()
//     myHelper.getCurrentMonth()
//     myHelper.getCohortData()
//     let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
//     console.log('The first element received from underscope function is '+firstElement)
//     res.send('My first ever api!')
// });

router.get('/hello', function (req, res) {
    
   console.log("before : ",arrayOperation.arr)
   let arrchunk = lodash.chunk(arrayOperation.arr,4)
   console.log(arrchunk)
   console.log("before tail() : ",arrayOperation.arr1)
   let arrtail = lodash.tail(arrayOperation.arr1)
   console.log(" after tail : ",arrtail);
      res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get('/movies', function(req,res){
    const arrMovie = [ 'doctor strange','dil chahta hai','inception','tenet','RRR'];
    res.send(arrMovie)
})
router.get('/movies/:indexNumber', function(req,res){
    const arrMovie = [ 'doctor strange','dil chahta hai','inception','tenet','RRR'];
    let index = req.params.indexNumber
    if( index < arrMovie.length)
    {
    let movie = arrMovie[index]
    console.log( 'at',index,"movie is",movie)
    res.send(movie)
    }
    else
    { 
      res.send( "ERROR : use valid index" )
    }
})
router.get('/films', function(req,res){
    const arrObjectMovie = [ {
                            "id" : 1,
                            "name" : "RRR",
                        },
                        {
                            "id" : 2,
                            "name" : "tenet",
                        },
                        {
                            "id" : 3,
                            "name" : "interstellar",
                        },
                        {
                            "id" : 4,
                            "name" : "inception",
                        }]
    res.send(arrObjectMovie)                     
})

router.get('/films/:filmId', function(req,res){
    const arrObjectMovie = [ {
                            "id" : 1,
                            "name" : "RRR",
                        },
                        {
                            "id" : 2,
                            "name" : "tenet",
                        },
                        {
                            "id" : 3,
                            "name" : "interstellar",
                        },
                        {
                            "id" : 4,
                            "name" : "inception",
                        }]
    let objectid  = req.params.filmId  
    if ( objectid > arrObjectMovie.length ) {
        res.send('ERROR : use id less than 5')
    }
    else {
    let index = objectid - 1           
    res.send(arrObjectMovie[index])   
        }                
})
router.get('/sol1', function(req, res){
    const arr =[1,2,3,5,6,7]
    let sumOfNumber =0
    for( let i=0 ; i<6 ; i++){
        sumOfNumber += arr[i]
    }
    let num = arr.pop();
    let totalSum = ((num*(num+1))/2);
    let missingNumber = totalSum - sumOfNumber
    res.send( {data: missingNumber} )
})

module.exports = router;
// adding this comment for no reason