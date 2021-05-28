UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
LOWERS = 'abcdefghijklmnopqrstuvwxyz'
DIGITS = '0123456789'
SPECIAL = "!@#$%^&*()_+"
var qrcode

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getSeed(allowUpper, allowLower, allowDigits, allowSpecial){
    seed = []
    if (allowUpper){
        seed = seed.concat(UPPERS.split('')).sort(() => Math.random() - 0.5)
        
    }
    if (allowLower){
        seed = seed.concat(LOWERS.split('')).sort(() => Math.random() - 0.5)
    }
    if (allowDigits){
        seed = seed.concat(DIGITS.split('')).sort(() => Math.random() - 0.5)
    }
    if (allowSpecial){
        seed = seed.concat(SPECIAL.split('')).sort(() => Math.random() - 0.5)
    }
    return seed
}
function getRandomPassword(allowUpper, allowLower, allowDigits,allowSpecial, length){
    password_seed = getSeed(allowUpper, allowLower, allowDigits, allowSpecial)
    seed_len = password_seed.length
    var password = []
    for(let i=0; i<length; i++){
        password.push(password_seed[getRandomInt(seed_len)])
    }
    return password.join('')
}

function showPassword(){
    len = parseInt($('#password-len').val());
    var allowUpper = $("#alpha").prop( "checked")
    var allowLower = $("#alpha").prop( "checked")
    var allowDigits =  $("#digits").prop( "checked")
    var allowDigits =  $("#digits").prop( "checked")
    var allowSpecial = $("#special").prop( "checked")
    
    
    $('#passwordy').val(getRandomPassword(allowUpper,allowLower,allowDigits, allowSpecial,len));
}
function setLengthLabel(){
    len = $('#password-len').val();
    $('#length-val').text(len)
}

function refreshPassword(){
    setLengthLabel();
    showPassword();
}
$( "#password-len" ).on('input',function() {
    refreshPassword();
  });


function copy(){
    var copyText = document.getElementById("passwordy");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
}

$( document ).ready(function() {
    $(document).ready(function(){
        $('.tooltipped').tooltip();
      });    
    $("#refresh-btn").click(function(){
        refreshPassword();
    });
      refreshPassword();
      qrcode = new QRCode(document.getElementById("qrcode"),{
        text: "",
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
});


$('.tooltipped-click').click(function() {
    $(this).tooltip();
    $(this).tooltip('open');
  });
      
  $('.tooltipped-click').mouseleave(function() {
    if ($(this).tooltip()){
      $(this).tooltip('destroy');
    }
  });

$("#show-qr").click(function(){
    qrcode.clear(); 
    qrcode.makeCode($("#passwordy").val()); // make another code.
});

$(".allow").click(function(){
    refreshPassword();
});