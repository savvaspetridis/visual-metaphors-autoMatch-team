import { Meteor } from 'meteor/meteor';

import './soaps/energySoaps.js';
import './soaps/fallSoaps.js';
import './soaps/fashionSoaps.js';
import './soaps/halloweenSoaps.js';
import './soaps/healthySoaps.js';
import './soaps/imaginationSoaps.js';
import './soaps/natureSoaps.js';
import './soaps/newYearsSoaps.js';
import './soaps/nightSoaps.js';
import './soaps/springSoaps.js';
import './soaps/summerSoaps.js';
import './soaps/valentinesSoaps.js';
import './soaps/wealthSoaps.js';
import './soaps/winterSoaps.js';
import './soaps/writingSoaps.js';


import './soaps_brand/oreoSoaps.js';
import './soaps_brand/bicycleSoaps.js';
import './soaps_brand/lipstickSoaps.js';
import './soaps_brand/doctorSoaps.js';
import './soaps_brand/NewYorkCitySoaps.js';
import './soaps_brand/footballSoaps.js';
import './soaps_brand/chefSoaps.js';
import './soaps_brand/legotoysSoaps.js';
import './soaps_brand/planeSoaps.js';
import './soaps_brand/baseballSoaps.js';
import './soaps_brand/LosAngelesSoaps.js';
import './soaps_brand/scienceSoaps.js';
import './soaps_brand/SanFranciscoSoaps.js';
import './soaps_brand/McDonaldsSoaps.js';
import './soaps_brand/cameraSoaps.js';
import './soaps_brand/CocaColaSoaps.js';

/*
var concept_to_soap = {
    'Fall (season)': fallSoaps,
    'New Years (Holiday)': newYearsSoaps,
    'Fashion': fashionSoaps,
    'Wealth': wealthSoaps,
    'Spring (season)': springSoaps,
    'Nature': natureSoaps,
    'Healthy': healthySoaps,
    'Energy': energySoaps,
    'Halloween': halloweenSoaps,
    'Writing': writingSoaps,
    'Imagination': imaginationSoaps ,
    'Winter (season)': winterSoaps,
    'Night': nightSoaps,
    "Valentine's Day": valentinesSoaps,
    'Summer (season)': summerSoaps,
}
*/

var soaps = [
    {concept: "fall", label: 'Fall (season)', soap: fallSoaps},
    {concept: "newyears", label: 'New Years (Holiday)', soap: newYearsSoaps},
    {concept: "fashion", label: 'Fashion', soap: fashionSoaps},
    {concept: "wealth", label: 'Wealth', soap: wealthSoaps},
    {concept: "spring", label: 'Spring (season)', soap: springSoaps},
    {concept: "nature", label: 'Nature', soap: natureSoaps},
    {concept: "healthy", label: 'Healthy', soap: healthySoaps},
    {concept: "energy", label: 'Energy', soap: energySoaps},
    {concept: "halloween", label: 'Halloween', soap: halloweenSoaps},
    {concept: "writing", label: 'Writing', soap: writingSoaps},
    {concept: "imagination", label: 'Imagination', soap: imaginationSoaps},
    {concept: "winter", label: 'Winter (season)', soap: winterSoaps},
    {concept: "night", label: 'Night', soap: nightSoaps},
    {concept: "valentinesday", label: "Valentine's Day", soap: valentinesSoaps},
    {concept: "summer", label: 'Summer (season)', soap: summerSoaps},
]

var brandSoaps = [
  {concept: "oreo", label: "oreo", soap: oreoSoaps},
  {concept: "bicycle", label: "bicycle", soap: bicycleSoaps},
  {concept: "lipstick", label: "lipstick", soap: lipstickSoaps},
  {concept: "doctor", label: "doctor", soap: doctorSoaps},
  {concept: "NewYorkCity", label: "New York City", soap: NewYorkCitySoaps},
  {concept: "football", label: "football", soap: footballSoaps},
  {concept: "chef", label: "chef", soap: chefSoaps},
  {concept: "legotoys", label: "lego toys", soap: legotoysSoaps},
  {concept: "plane", label: "plane", soap: planeSoaps},
  {concept: "baseball", label: "baseball", soap: baseballSoaps},
  {concept: "LosAngeles", label: "Los Angeles", soap: LosAngelesSoaps},
  {concept: "science", label: "science", soap: scienceSoaps},
  {concept: "SanFrancisco", label: "San Francisco", soap: SanFranciscoSoaps},
  {concept: "McDonalds", label: "McDonalds", soap: McDonaldsSoaps},
  {concept: "camera", label: "camera", soap: cameraSoaps},
  {concept: "CocaCola", label: "CocaCola", soap: CocaColaSoaps},
]

Meteor.methods({
  save_canvas(id, canvas_data, drawnShape) {
  	Images1.update(id, {
  		$set: { canvas_data: canvas_data, drawnShape: drawnShape },
  	})
  },

  bam(){
    console.log('bam')
  },

  save_canvas2(id, canvas_data, drawnShape) {
  	Images2.update(id, {
  		$set: { canvas_data: canvas_data, drawnShape: drawnShape },
  	})
  },


  save_mix_canvas(metaphorPair_id, concept1, concept2, image1_id, image1_drawnShape, image1_canvas_data, image2_id, image2_drawnShape, image2_canvas_data, mix_canvas_obj) {
    MixCanvases.insert(
      { metaphorPair_id: metaphorPair_id,
        concept1: concept1,
        concept2: concept2,
        image1_id: image1_id,         
        image1_drawnShape: image1_drawnShape, 
        image1_canvas_data: image1_canvas_data,
        

        image2_id: image2_id,
        image2_drawnShape: image2_drawnShape, 
        image2_canvas_data: image2_canvas_data, 

        mix_canvas_obj: mix_canvas_obj
      }
    )
  },  

});

Meteor.startup(() => {
  //MetaphorPairs


/*
  
    var num_brainstorms = Images2Brainstorm.find().count() 
    if(num_brainstorms == 0){  
      _.each(soaps, function(thisSoap){
              
        Images2Brainstorm.insert({
            concept: thisSoap.concept,
            label: thisSoap.label,
            soap: thisSoap.soap,
            createdBy: "admin"
        })
      }) 
      _.each(brandSoaps, function(thisSoap){
              
        Images2Brainstorm.insert({
            concept: thisSoap.concept,
            label: thisSoap.label,
            soap: thisSoap.soap,
            createdBy: "admin"
        })
      }) 
    } 

  
    var has_metaphor_pairs = MetaphorPairs.find().count()
    if(has_metaphor_pairs == 0){
        MetaphorPairs.insert(
          {
              //_id: "warmup1",
              concept1: "Starbucks",
              concept2: "winter"
          }
        )
        MetaphorPairs.insert(
          {
              //_id: "warmup1",
              concept1: "Starbucks",
              concept2: "summer"
          }
        )
        MetaphorPairs.insert(
          {
              //_id: "warmup1",
              concept1: "baseball",
              concept2: "summer"
          }
        )
        MetaphorPairs.insert(
          {
              //_id: "warmup1",
              concept1: "orange",
              concept2: "summer"
          }
        )
        MetaphorPairs.insert(
          {
              //_id: "warmup1",
              concept1: "orange",
              concept2: "winter"
          }
        )


      }
      */
});


