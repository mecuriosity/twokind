/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    
             
    
    
    var view = {
        openCard: function(cellLocation, className){ 
            
            $("#"+cellLocation).removeClass().addClass(className);
        },
        closeCard: function(cellLocation){       
            $("#"+cellLocation).removeClass().addClass("cardBack"); 
        },
        closeAllCards: function(){
            for (i = 0; i < model.numberOfSquares; i++){
                $("#"+i).removeClass().addClass("cardBack");
            }         
        },
        floatingStars: function(){
            $("#stars").show();
            for(i=0;i<70;i++){
                var randomOnCircle = (Math.random(i)*2)-1;
                var randomDistance = Math.random()*180+30;                
                var randX = Math.cos(randomOnCircle*Math.PI)*randomDistance;
                var randY = Math.sin(randomOnCircle*Math.PI)*randomDistance;

                $("#star"+i).animate({ top: randX+260, left:randY+260, opacity: 0.5, queue: false}, 2200, function(){
                    $(this).animate({height: 0, width: 0, opacity: 0, queue: false}, 1800);
                });
           } 
        }
        
    };
    
    var model = {
        //variables for the controller
        //could not be stored in the controller, for then it would be reset again for every click, without being able to retrieve previous state
        celebrationTime: 10,
        celebrationGoing: false,
        
        restarting: false,
        
        points: 0,
        correctPairs: 0,
        
        secondChecked: "",
        firstChecked: "",
        firstCardClass: "",
        secondCardClass: "",
        firstCardSquare: "",
        secondCardSquare: "",
        
        gameStarted: false,
        startBtnPressed: false,
        numberOfSquares: 16,
        answerArray: [],
        
        openCardsArray: [],
        
        flipCardSound: function(){
            var playFlopp = document.getElementById("flipCard");
            playFlopp.volume = 0.1;
            playFlopp.play();
        },
        
        neiIkkeSound: function(){
            var playNeiIkke = document.getElementById("neiIkke");
            playNeiIkke.play();
        },
        riktigSound: function(){
            var playRiktig = document.getElementById("riktig");
            playRiktig.play();
        },
        feilSound: function(){
            var playFeil = document.getElementById("feil");
            playFeil.volume = 0.6;
            playFeil.play();
        },
        
        jippiSound: function(){
            var playJippi = document.getElementById("jippi");
            playJippi.volume = 0.6;
            playJippi.play();
        },
        
        backgroundSound: function(){
            var backMusic = document.getElementById("backgroundMusic");
        
        backMusic.volume=0.3;
        backMusic.loop = true;
        backMusic.play();
            
        },
        
        makeSimpleArray: function(){
            var simpleArray = [];
            for (i = 0; i < this.numberOfSquares; i++){
            simpleArray[i] = i;
            }
            return simpleArray;
        }, 
        makeAnswerArray: function(){
            var simpleArray = model.makeSimpleArray();
            var arrayLength = simpleArray.length;
            var positionsLeft = simpleArray.length;
            var indexToFetch;
            
            for(var i = 0; i < arrayLength; i++){
                indexToFetch = Math.floor(Math.random() * positionsLeft);   
                this.answerArray[i] = simpleArray[indexToFetch];
                simpleArray.splice(indexToFetch,1);       
                positionsLeft--;    
            } 
        },
        setInitialCards: function(){
            model.makeAnswerArray();
            console.log(this.answerArray);
            for (var i = 0; i < this.answerArray.length; i++){
                this.decideClass(i);
            }                  
        },
        decideClass: function(i){
                if(this.answerArray[i]===0||this.answerArray[i]===1){
                    view.openCard(i, "apple");
                } else if (this.answerArray[i]===2||this.answerArray[i]===3){
                    view.openCard(i, "monster");
                } else if (this.answerArray[i]===4||this.answerArray[i]===5){
                    view.openCard(i, "tractor");
                } else if (this.answerArray[i]===6||this.answerArray[i]===7){
                    view.openCard(i, "spaceship");
                } else if (this.answerArray[i]===8||this.answerArray[i]===9){
                    view.openCard(i, "troll");
                } else if (this.answerArray[i]===10||this.answerArray[i]===11){
                    view.openCard(i, "house");
                } else if (this.answerArray[i]===12||this.answerArray[i]===13){
                    view.openCard(i, "police");
                } else if (this.answerArray[i]===14||this.answerArray[i]===15){
                    view.openCard(i, "dog");
                }   
        },
        checkClass: function(i){
                if(this.answerArray[i]===0||this.answerArray[i]===1){
                    return "apple";
                } else if (this.answerArray[i]===2||this.answerArray[i]===3){
                    return "monster";
                } else if (this.answerArray[i]===4||this.answerArray[i]===5){
                    return "tractor";
                } else if (this.answerArray[i]===6||this.answerArray[i]===7){
                    return "spaceship";
                } else if (this.answerArray[i]===8||this.answerArray[i]===9){
                    return "troll";
                } else if (this.answerArray[i]===10||this.answerArray[i]===11){
                    return "house";
                } else if (this.answerArray[i]===12||this.answerArray[i]===13){
                    return "police";
                } else if (this.answerArray[i]===14||this.answerArray[i]===15){
                    return "dog";
                }   
        },
        
        
        stars: [],
        
        createManyStars: function(){
            for(i=0;i<70;i++){
                this.stars[i] = new Image();
                this.stars[i].src = "star1.png";          
            }
            $("#stars").empty();
            $("#stars").append(this.stars).hide();
            $("#stars img").each(function(index){
                var posX = 260;
                var posY = 260;
                var starID = "star"+index;
                $(this).css({
                    height: "15px",
                    width: "15px",
                    position: "absolute",
                    top: posY,
                    left: posX
                }).attr("id", starID);
            });   
        }
    };
    var controller = {
        
        restartInit: function(){
            model.firstChecked = false;
            model.secondChecked = false;
            model.gameStarted=false;
            model.setInitialCards();
            model.createManyStars();
            model.restarting=false;
            model.points=0;
            model.correctPairs=0;
            model.celebrationTime=10;
        },
        
        
        runTime: setInterval(function(){
                    if(model.startBtnPressed===true && model.gameStarted===false){
                       model.points--;
                       $("#pointCount").text(model.points);
                    }
                    if(model.celebrationGoing){
                        console.log(model.celebrationTime);
                        model.celebrationTime--;
                        console.log(model.celebrationTime);
                        if(model.celebrationTime<1){
                                    $("body").fireworks('destroy');
                                    $("#coverBoard").show().animate({opacity: 1},1000);
                                    $("#startBtn").show().animate({opacity: 1}, 2000);
                                    model.celebrationGoing = false;
                                    return;
                                }
                                
                    }
                    
                },1000),
        
        playOpenSound: function(){
            document.getElementById("openingSound").play();
       
        },
        
        clickedClass: function(){
            $("td").click(function(){
                //stores the Id of the square clicked
                var squareClicked = $(this).attr("Id");

                var hasClass = $("#"+squareClicked).hasClass(model.checkClass(squareClicked)); 
                //check if card is already open, but only after game has started
                if(model.gameStarted && hasClass){
                    //returns out of the function if it's already clicked
                    model.neiIkkeSound();
                    return; 
                }
                
                //when cards are open and the board is clicke, all cards are turned, and the game is set to start.
                if(model.gameStarted === false){
                   model.gameStarted = true;
                   model.firstChecked = false;
                   model.secondChecked = false;
                   view.closeAllCards();
                } else {
                    //plays a sound and opens a card everytime board is clicked while game is running, no matter what
                    //logics to check the guesses are done after new card is opened, and this in it's own if-statements below.
                    model.flipCardSound();
                    
                    model.decideClass(squareClicked);
                    //this first condition only happens at the very beginning of the game, one first card is opened.2
                    if(model.firstChecked===false && model.secondChecked===false){
                        model.firstChecked=true;
                        model.secondChecked = false;
                        model.firstCardClass=model.checkClass(squareClicked);
                        model.firstCardSquare = squareClicked;
                        clearInterval(this.runTime);
                        
                    } else if (model.firstChecked===true && model.secondChecked===false) {
                        model.firstChecked=true;
                        model.secondChecked=true;
                        model.secondCardClass=model.checkClass(squareClicked);
                        model.secondCardSquare = squareClicked;
                        console.log("true false");
                        if(model.firstCardClass === model.secondCardClass){
                            model.points += 10;
                            $("#pointCount").text(model.points);
                            model.correctPairs++;
                            if(model.correctPairs===8){
                                model.jippiSound();
                                model.startBtnPressed=false;
                                model.celebrationGoing = true;
                                $("body").fireworks();
                            } else {
                                model.riktigSound();
                            }
                            
                        } else {
                            model.feilSound();
                            model.points -= 5;
                            $("#pointCount").text(model.points);
                        }
                    } else if (model.firstChecked===true && model.secondChecked===true) {
                        if(model.firstCardClass !== model.secondCardClass){
                            view.closeCard(model.firstCardSquare);
                            view.closeCard(model.secondCardSquare);  
                        } 
                        model.firstChecked=true;
                        model.secondChecked = false;
                        model.firstCardClass=model.checkClass(squareClicked);
                        model.firstCardSquare = squareClicked;
                    }
                }
                
            });          
        },
        clickedStart: function(){
            $("#startBtn").click(function(){
                model.startBtnPressed=true;
                controller.restartInit();
                view.floatingStars();
                model.backgroundSound();
                $(this).animate({opacity: 0}, 2000, function(){
                    $(this).hide();
                });
                $("#coverBoard").animate({opacity: 0}, 4000, function(){
                    $(this).hide();
                });
                $("#fadeLightElement").show().fadeOut(300);
                controller.playOpenSound();
                
            });
        }
    };
    
    init();
    function init(){
        $("#fadeLightElement").hide();
        model.setInitialCards();
        controller.clickedClass();
        controller.clickedStart(); 
        model.createManyStars();
        
        
        
    }
    
});

