//////////// BACK END LOGIC

var pricingSheet = {
  adult: 3,
  kid: 0,
  senior: 1,
  evening: 2,
  matinee: 0,
  latenight: 1
}

var bankAccounts = [];

function Ticket (age, movie, time) {
  this.age = age;
  this.movie = movie;
  this.time = time;
}

Ticket.prototype.price = function() {
  return 5 + pricingSheet[this.age] + pricingSheet[this.time];
}

Ticket.prototype.display = function() {
  $('.result').append("<div class='ticket'><p>"+this.movie.toUpperCase()+"<br>"+this.time.toUpperCase()+"<br>"+this.age.toUpperCase()+"<br>$"+this.price()+"</p></div>");
  $('.movietime').fadeIn(1200);
}

function BankAccount (firstName, initialDeposit) {
  this.firstName = firstName;
  this.balance = initialDeposit;
}

BankAccount.prototype.deposit = function(amount) {
  if (!isNaN(amount)) {
    this.balance += amount;
  }
}

BankAccount.prototype.withdraw = function(amount) {
  if (!isNaN(amount)) {
    this.balance -= amount;
  }
}

function findAccount(specificClass) {
  var correctAccount;
  bankAccounts.forEach(function(account) {
    if (specificClass === account.firstName) {
      correctAccount = account;
    }
  });
  return correctAccount;
}

function appendAccounts() {
  $("#existingAccounts").children().remove();
  bankAccounts.forEach(function(account) {
    $("#existingAccounts").append("<li class='" + account.firstName + "'>" + account.firstName + "</li>");

    $("#existingAccounts li").last().click(function() {
      var object = $(this).attr("class");
      console.log(object);
      object = findAccount(object);
      console.log(object);
      $("#existingAccounts").hide();
      $("#newAccountBtn").hide();
      $("#accountPage").show();

      $("#accountName").text(object.firstName);
      $("#accountBalance").text(object.balance);
    });
  });
}

/////////////////// FRONT END LOGIC



$(function(){

  var newAccount = new BankAccount("Brad", 300);
  bankAccounts.push(newAccount);
  var newAccount = new BankAccount("Slug", 30023);
  bankAccounts.push(newAccount);
  var newAccount = new BankAccount("Rrnng", 23469);
  bankAccounts.push(newAccount);

  var bubbles = document.createElement('audio');
  bubbles.setAttribute('src', 'img/bubbles.wav');
  var laugh = document.createElement('audio');
  laugh.setAttribute('src', 'img/laugh.wav');
  var slurp = document.createElement('audio');
  slurp.setAttribute('src', 'img/slurp.wav');
  slurp.play();

  $('.age').change(function () {
    $('.age').hide();
    $('.movie').show();
    $('.speech').text("MMMMM. AND WHAT MOVIE DO YOU WANT TO SEE?");
    bubbles.play();
  });

  $('.movie').change(function () {
    $('.movie').hide();
    $('.time').show();
    $('.speech').text("THAT'S NICE. WHAT TIME?");
    bubbles.play();
  });

  $('.time').change(function () {
    $('.time').hide();
    $('.btn').show();
    $('.speech').text("OK, SEE YOU INSIDE.");
  });

  $('.movietime').click(function() {
    $(this).animate({ marginLeft: "-100vw"}, 10000);
    laugh.play();
  });

  $(".bankButton").click(function() {
    $("#bankForm").show();
    $(".age").hide();
    $(".speech").text("WELCOME TO THE FLESH BANK. HAVE I SEEN YOU BEFORE??");
    appendAccounts();
  });

  $("#newAccountBtn").click(function() {
    event.preventDefault();
    $(".newAccount").show();
    $("#existingAccounts").hide();
    $("#newAccountBtn").hide();
  });

  $("#withdraw").click(function() {
    event.preventDefault();
    var amount = parseInt($("#amount").val());
    var account = findAccount($("#accountName").text());
    account.withdraw(amount);
    $("#accountBalance").text(account.balance);
  });

  $("#deposit").click(function() {
    event.preventDefault();
    var amount = parseInt($("#amount").val());
    var account = findAccount($("#accountName").text());
    account.deposit(amount);
    $("#accountBalance").text(account.balance);
  });

  $("#returnToMain").click(function() {
    event.preventDefault();
    appendAccounts();
    $('#accountPage').hide();
    $('#existingAccounts').show();
    $('#newAccountBtn').show();
  })

  $("#bankForm").submit(function(event) {
    event.preventDefault();

    var firstName = $("#name").val();
    var deposit = parseInt($("#initialDeposit").val());
    var newAccount = new BankAccount(firstName, deposit);
    bankAccounts.push(newAccount);

    appendAccounts();

    $(".newAccount").hide();
    $("#existingAccounts").show();
    $("#newAccountBtn").show();
  });

  $('.selectors').submit(function(event) {
    event.preventDefault();

    $('.btn').hide();
    var age = $('.age').val();
    var movie = $('.movie').val();
    var time = $('.time').val();
    var newTicket = new Ticket(age,movie,time);

    slurp.play();
    newTicket.display();
  });
});
