//////////// BACK END LOGIC

var pricingSheet = {
  adult: 3,
  kid: 0,
  senior: 1,
  evening: 2,
  matinee: 0,
  latenight: 1
}

function Ticket (age, movie, time) {
  this.age = age;
  this.movie = movie;
  this.time = time;
}

Ticket.prototype.price = function() {
  return 5 + pricingSheet[this.age] + pricingSheet[this.time];
}

Ticket.prototype.display = function() {
  $('.result').append("<div class='ticket'>"+this.movie+"<br>"+this.time+"<br>"+this.age+"<br>$"+this.price()+"</div>")
}



/////////////////// FRONT END LOGIC

$(function(){
  $('.selectors').submit(function(event) {
    event.preventDefault();
    var age = $('.age').val();
    var movie = $('.movie').val();
    var time = $('.time').val();

    var newTicket = new Ticket(age,movie,time);
    // var newPrice = newTicket.price();
    newTicket.display();

  })
})
