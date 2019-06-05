var characterImages = ["assets/images/ajani.jpg", "assets/images/chandra.jpg", "assets/images/liliana.jpg","assets/images/jace.jpg","assets/images/karn.jpg","assets/images/nissa.jpg", "assets/images/serra.jpg"];
var characterPics = ["assets/images/ajani.jpg", "assets/images/chandra.jpg", "assets/images/liliana.jpg", "assets/images/jace.jpg", "assets/images/karn.jpg", "assets/images/nissa.jpg", "assets/images/serra.jpg"];

var ajani = {Name: "Ajani",
             Power: 5,
             Health: 150
};
var chandra =  {Name: "Chandra",
                Power: 7,
                Health:120,
};
var liliana = { Name: "Liliana",
                Power: 6,
                Health:100,
};

var jace = { Name: "Jace",
             Power: 7,
             Health:100,
};

var karn = { Name: "Karn",
             Power:11,
             Health:90,    
};

var nissa = { Name: "Nissa",
              Power:9,
              Health:110,
};

var serra = { Name: "Serra",
              Power:10,
              Health:110,
};


//var characters and buttonVal help link selection to object from radio buttons. 
var characters = [ajani, chandra, liliana, jace, karn, nissa, serra];
var buttonVal = ["Ajani","Chandra","Liliana", "Jace", "Karn", "Nissa","Serra"];
var playerChoice;
var enemyChoice;

//variables for slected characters and their pictures. 
var playerCharacter;
var playerImage;
var enemyCharacter;
var enemyImage;


// variable to let me hide beaten characters from selection page;
var killedCharacters= [];

var playerHealth;
var playerPower;
var enemyHealth;
var enemyPower;
//Loads character images,name and stats in html and links classes.

$("#character-selection").ready(charSelect());
    
    
function charSelect(){
    $("#battle-screen").hide();
    $("#fight-button").hide();

    for(var i = 0; i < characterImages.length; i++){

        //variables to pull info from objects in characters array
        var charName = characters[i].Name;
        var charPower = characters[i].Power;
        var charHealth = characters[i].Health;
        var charChoice = characters[i];
        
        //html layout consists of label/button/image and p tag
        //messy but works
        characterImages[i] = $("<label class=\"btn btn-outline-dark\"><input type=\"radio\" value="+ buttonVal[i] +" + name=\"options\" class=\"characterButtons\" autocomplete=\"off\"><img class=\"characterImages\" src =" + characterImages[i] + ">" + 
        "<p>"+charName +"</p>" + "<p>Power:" + charPower +"</p>" + "<p>Health:" + charHealth +"</p>"+ "</input></label>");
        $("#character-select").append(characterImages[i]);
        $(characterImages[i]).addClass("select-character col-sm-2");
        console.log(charName);
        console.log(charPower);
        console.log(charHealth);
    };
    
};

//Function for selecting the chatactes using the radio buttons.
// if/else statements to prevent same character being selected.

$("#accept-btn").on("click", function(){
    if(playerChoice == undefined){
    playerChoice = $( "input[type='radio'][name='options']:checked" ).val();
    console.log(playerChoice);
    alert("You chose" + " " + playerChoice);
}else if(enemyChoice==undefined){
    enemyChoice = $( "input[type='radio'][name='options']:checked" ).val();
    if(playerChoice == enemyChoice){
        enemyChoice = undefined;
        alert("You must choose someone else.");
    }else{
    console.log(enemyChoice);
    alert("Your enemy shall be" + " " + enemyChoice);
}};

});

//function to loop to be called later if player wins. Preventing
//defeted characters from being chosen again. 

function charRemoval(){

    for(j = 0; j < killedCharacters.length; j++){

        deadChar = document.getElementById(killedCharacters[j]);
        $(deadChar).remove();
        
    }

};



//Function that starts the battle.
$("#start-btn").on("click", function(){
    if(enemyChoice != undefined){
//loop that checks values from buttons and
//then links that to object for characters.
    for(i = 0; i < buttonVal.length; i++){
        if(playerCharacter === undefined){
           if(playerChoice == buttonVal[i]){
               playerCharacter = characters[i];
               playerImage = $("<img class=\"battle-pic\" src="+characterPics[i]+"><p>"+buttonVal[i]+"</p></img><div class=\"progress\"><div class=\"progress-bar progress-bar-striped bg-danger\" id=\"player-bar\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow="+ playerCharacter.Health +" aria-valuemin=\"0\" aria-valuemax="+ playerCharacter.Health +"></div></div>");
               console.log(playerCharacter);
           }};
        if(enemyCharacter === undefined){   
            if(enemyChoice == buttonVal[i]){
                enemyCharacter = characters[i];
                enemyImage = $("<img class=\"battle-pic\" src="+characterPics[i]+"><p>"+buttonVal[i]+"</p></img><div class=\"progress\"><div class=\"progress-bar progress-bar-striped bg-danger\" id=\"enemy-bar\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow="+ enemyCharacter.Health +" aria-valuemin=\"0\" aria-valuemax="+ enemyCharacter.Health +"></div></div>");
                console.log(enemyCharacter);
        };
    }};

//Hides HTML for character selection and makes battle screen. 
    
        $("#character-select").hide();
        $("#character-select").empty();
        $("#select-buttons").hide();
        $("#battle-screen").show();
        $("#player-spot").append(playerImage);
        $("#enemy-spot").append(enemyImage);
        $("#fight-button").show();

//created vars here so character can level up 
//I know instructions show health does not return to full
//but I'm a rebel... "RAGL FRAGL"
    playerHealth = playerCharacter.Health;
    playerPower = playerCharacter.Power;
    enemyHealth = enemyCharacter.Health;
    enemyPower = enemyCharacter.Power;



//onClick fight button that does damage and reflects on progress bars.

   if(enemyHealth <= 0){
       alert("You won the battle.");
   }if(playerHealth <= 0){
       alert("You have lost.");
   }
    $("#fight-button").on("click", function(){
        var damage = playerHealth - enemyPower;
        playerHealth = damage;
        $("#player-bar").attr('aria-valuenow', playerHealth).css('width', (playerHealth/playerCharacter.Health) * 100  + "%");
        var attack = enemyHealth - playerPower;
        enemyHealth = attack;
        $("#enemy-bar").attr('aria-valuenow', enemyHealth).css('width', (enemyHealth/enemyCharacter.Health) * 100  + "%");
        console.log(damage);
        console.log(attack);
        playerPower = playerPower * 2;
        if(enemyHealth <= 0){
            alert("You won the battle.");
            $("#fight-button").empty();
            $("#battle-screen").empty();
            $("#character-select").show();
            $("#select-buttons").show();
            $("#character-select").empty();
            charSelect();
            enemyCharacter = undefined;
          /*  killedCharacters.push(enemyCharacter)
            enemyCharacter = undefined;
            playerCharacter = playerCharacter;
            charRemoval();
            $("#character-select").show();
            $("#select-buttons").show(); */

        }if(playerHealth <= 0){
            alert("You Lost!");
        };

    });



}else{
    alert("You must choose an enemy before starting.")
};

});

