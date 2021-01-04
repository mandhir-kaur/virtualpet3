var dog,happydDog,Garden,Living,milk,Milk;
var database,foodStock,foodS;


function preload(){
  dogimg = loadImage("dogImg.png");
  dogimg2 = loadImage("dogImg1.png");
  Garden = loadImage("running.png");
  Living = loadImage("Living Room.png");
  milk = loadImage("milk.png");
}

function setup() {
  var canvas = createCanvas(500,500);
  
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
  foodStock.set(20)
  dog = createSprite(200,400,10,10);
  dog.addImage(dogimg);
  dog.scale = 0.3;
  
    
  
}
 
function draw() {  
background("orange");

  
  if(foodS !== undefined){
  fill("blue");
  textSize(22);
  stroke(100);
  text("PRESS UP ARROW KEY TO FEED  MILK ",10,100);
  text("food remaining :"+foodS,150,150)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg2);
  }
  
     
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dogimg);
    
  
  }
  
    
  }
  if(foodS === 0){
  dog.addImage(Garden);
  dog.scale = 0.4;
  textSize(25);
  fill("blue")
  text("My Tummy is Full..",240,190)
  text("I want to play now..",230,230)
  text ("thank you!!",105,220)
  }
  
if(foodS === 20){
  dog.addImage(Living);
  textSize(20);
  fill("red");
  text("Hi I am your Pluto..",240,190)
  text("I am very hungry..",230,230)
}

  if(foodS === 19){
     textSize(15)
     fill("blue")
     text("The Milk is Yummy..",220,200)
  }
  if(foodS === 19 ){
    push();
    Milk = createSprite(120,450,10,10);
    Milk.addImage(milk)
    Milk.scale = 0.1;
  }
  
 
  
  drawSprites();
}

function writeStock(x){
 if(x<=0){
  x = 0
 }else{
   x = x-1
 }
 database.ref("/").update({
   food:x
 })

 
  }
function readStock(data){
  foodS=data.val();
}


