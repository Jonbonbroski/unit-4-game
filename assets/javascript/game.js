var characterImages = ["assets/images/ajani.jpg", "assets/images/chandra.jpg", "assets/images/liliana.jpg"];

var ajani = {Name: "Ajani",
             Power: 5,
             Health: 150
};
var chandra =  {Name: "Chandra",
                Power: 7,
                Health:120
};
var liliana = { Name: "Liliana",
                Power: 6,
                Health:100,
};

var characters = [ajani, chandra, liliana];
var playerChoice;
var enemyChoice;

//Loads character images,name and stats in html and links classes.

$("#character-selection").ready(function(){

    for(var i = 0; i < characterImages.length; i++){

        //variables to pull info from objects in characters array
        var charName = characters[i].Name;
        var charPower = characters[i].Power;
        var charHealth = characters[i].Health;
        var charChoice = characters[i];

        //html layout consists of label/button/image and p tag
        //messy but works
        characterImages[i] = $("<label class=\"btn btn-outline-dark\"><input type=\"radio\" value="+ charName +" + name=\"options\" class=\"characterButtons\" autocomplete=\"off\"><img class=\"characterImages\" src =" + characterImages[i] + ">" + 
        "<p>"+charName +"</p>" + "<p>Power:" + charPower +"</p>" + "<p>Health:" + charHealth +"</p>"+ "</input></label>");
        $("#character-select").append(characterImages[i]);
        $(characterImages[i]).addClass("select-character col-sm-2");
        console.log(charName);
        console.log(charPower);
        console.log(charHealth);
    };
    
});

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


//
$(document).ready(function(){
    if(enemyChoice != undefined){
        $("#accept-btn").on("click", function(){

            
})};

});

