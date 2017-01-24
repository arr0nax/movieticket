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
  $('.result').append("<div class='ticket'><p>"+this.movie.toUpperCase()+"<br>"+this.time.toUpperCase()+"<br>"+this.age.toUpperCase()+"<br>$"+this.price()+"</p></div>");
  $('.movietime').fadeIn(1200);
}




/////////////////// FRONT END LOGIC



$(function(){
  $('.age').change(function () {
    $('.age').hide();
    $('.movie').show();
    $('.speech').text("MMMMM. AND WHAT MOVIE DO YOU WANT TO SEE?")
  });

  $('.movie').change(function () {
    $('.movie').hide();
    $('.time').show();
    $('.speech').text("THAT'S NICE. WHAT TIME?")
  });

  $('.time').change(function () {
    $('.time').hide();
    $('.btn').show();
    $('.speech').text("OK, SEE YOU INSIDE.");
  });

  $('.movietime').click(function() {
    $(this).animate({ marginLeft: "-100vw"}, 2000);
  });

  $('.selectors').submit(function(event) {
    event.preventDefault();

    $('.btn').hide();
    var age = $('.age').val();
    var movie = $('.movie').val();
    var time = $('.time').val();
    var newTicket = new Ticket(age,movie,time);

    newTicket.display();
  });
});
