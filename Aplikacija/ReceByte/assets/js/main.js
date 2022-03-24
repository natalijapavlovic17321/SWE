import { user} from "./user.js";
import { namirnice} from "./namirnice.js";
import { recept } from "./recept.js";

function openForm() {
    
  document.getElementById("ReceptForma").style.display = "block";
  
}

function closeForm() {
  document.getElementById("ReceptForma").style.display = "none";

  }
  function resetForm()
  {
      document.getElementById('Name').value='';
      document.getElementById('Surname').value='';
      document.getElementById('Number').value='';
      document.getElementById('Email').value='';

}
function reset()
  {
      
document.getElementById("ReceptForma").reset();
}

(function($) {
  "use strict";

  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  /*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
  window.sr = ScrollReveal();
  sr.reveal('.foo', {
    duration: 1000,
    delay: 15
  });

  /*--/ Carousel owl /--*/
  $('#carousel').owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  /*--/ Animate Carousel /--*/
  $('.intro-carousel').on('translate.owl.carousel', function() {
    $('.intro-content .intro-title').removeClass('animate__zoomIn animate__animated').hide();
    $('.intro-content .intro-price').removeClass('animate__fadeInUp animate__animated').hide();
    $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('animate__fadeIn animate__animated').hide();
  });

  $('.intro-carousel').on('translated.owl.carousel', function() {
    $('.intro-content .intro-title').addClass('animate__zoomIn animate__animated').show();
    $('.intro-content .intro-price').addClass('animate__fadeInUp animate__animated').show();
    $('.intro-content .intro-title-top, .intro-content .spacial').addClass('animate__fadeIn animate__animated').show();
  });

  /*--/ Navbar Collapse /--*/
  $('.navbar-toggle-box-collapse').on('click', function() {
    $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  $('.close-box-collapse, .click-closed').on('click', function() {
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
    $('.menu-list ul').slideUp(700);
  });

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).bind('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-default').addClass('navbar-reduce');
      $('.navbar-default').removeClass('navbar-trans');
    } else {
      $('.navbar-default').addClass('navbar-trans');
      $('.navbar-default').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Property owl /--*/
  $('#property-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });

  /*--/ Property owl owl /--*/
  $('#property-single-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  /*--/ News owl /--*/
  $('#new-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });

  /*--/ Testimonials owl /--*/
  $('#testimonial-carousel').owlCarousel({
    margin: 0,
    autoplay: true,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInUp',
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });
  function uploadFile()
  {
    const fileSelector = document.getElementById('files');
    fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
  }
  
  $("#upload").click(function () {

    if (window.FormData == undefined)
        alert("Error: FormData is undefined");

    else {console.log("ovde");
        var fileUpload = $("#files").get(0);
        var files = fileUpload.files;

        var fileData = new FormData();

        fileData.append(files[0].name, files[0]);

        $.ajax({
            url: '/Test/uploadFile',
            type: 'post',
            datatype: 'json',
            contentType: false,
            processData: false,
            async: false,
            data: fileData,
            success: function (response) {
                alert(response);
            }
        });
    }

});
})(jQuery);
var app = angular.module('App', []);
app.controller('myCtrl', function($scope) {

    $scope.add = function () {
      if ($scope.nazivRecepta != undefined && $scope.vremePripreme != undefined && $scope.kalorijskaVrednost != undefined  && $scope.vrstaKuhinje != undefined && $scope.nacinPripreme != undefined) {
          var recept = [];
          recept.nazivRecepta = $scope.nazivRecepta;
          recept.vremePripreme = $scope.vremePripreme;
          recept.kalorijskaVrednost = $scope.kalorijskaVrednost;
          recept.vrstaKuhinje = $scope.vrstaKuhinje;
          recept.nacinPripreme = $scope.nacinPripreme;

          $scope.receptArray.push(recept);
          $scope.nazivRecepta = null;
          $scope.vremePripreme = null;
          $scope.kalorijskaVrednost= null;
          $scope.vrstaKuhinje= null;
          $scope.nacinPripreme= null;
      }
    };
  });
  var noviRecept = angular.module('noviReceptApp', []);
  noviRecept.controller('noviReceptCtrl', function($scope) {
    $scope.recepti=[]
    $scope.nazivRecepta = '';
    $scope.vremePripreme = '';
    $scope.kalorijskaVrednost= '';
    $scope.brojPorcija= '';
    $scope.nacinPripreme= '';
    $scope.addRecept = function(myForm)
    {
        if($scope.nazivRecepta && $scope.vremePripreme && $scope.kalorijskaVrednost && $scope.brojPorcija && $scope.nacinPripreme)
        {
            $scope.recepti.push({nazivRecepta:$scope.nazivRecepta, vremePripreme:$scope.vremePripreme, kalorijskaVrednost:$scope.kalorijskaVrednost, brojPorcija:$scope.brojPorcija, nacinPripreme:$scope.nacinPripreme});
            var listaPosalji=[];
              listaZaBazu.forEach(element=>{
                listaPosalji.push(element.naziv);
              });
            console.log(listaPosalji);
            var us=new user();
            var rec=new recept();
            rec.naziv=$scope.nazivRecepta;
            rec.vremePripreme=$scope.vremePripreme;
            rec.kcalVrednost=$scope.kalorijskaVrednost;
            rec.brojPorcija=$scope.brojPorcija;
            rec.tekst=$scope.nacinPripreme;
            rec.namirnice=listaZaBazu;
            rec.posaljiRecept();
            $scope.nazivRecepta = "";
            $scope.vremePripreme = "";
            $scope.kalorijskaVrednost= "";
            $scope.brojPorcija= "";
            $scope.nacinPripreme= "";
            if (myForm) 
            {
              myForm.$setPristine();
              myForm.$setUntouched();
            } 
        }
        
    };
});
var listaZaBazu=[];
noviRecept.controller("sastojciNoviReceptCtrl", function($scope) {
          $scope.listaSastojaka = [];
          $scope.listaSastojaka2 = [];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }
              else{ $scope.sastojak=$scope.sastojak.toLowerCase(); }     
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                getNamirnicu($scope.sastojak,$scope.listaSastojaka,$scope.listaSastojaka2,$scope.errortext);
                $scope.sastojak="";
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u receptu.";
              }
          }
          $scope.obrisi = function (x) {
          }
        });
        
function hideSignUp() {
  document.getElementById("signUp").style.visibility = "hidden";
  document.getElementById("signupSpecifikacije").style.visibility = "visible";
}
function hideLogIn() {
  document.getElementById("logIn").style.visibility = "hidden";
  document.getElementById("loginSpecifikacije").style.visibility = "visible";
}

var pom=["Milk", "Bread", "Cheese"];
var aplikacija = angular.module('FriziderApp', []);
  
        aplikacija.controller("voceCtrl", function($scope) {
          $scope.listaSastojaka = pom;
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }         
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
                  $scope.errortext="greska";
                  
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }voceCtrl.reset();
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("povrceCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }        
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("mesoCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }        
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("ribaCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }        
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("mlecniProizvodiCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }       
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("orasastiProizvodiCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }      
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("zaciniCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
              $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }          
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else {
                  $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
              }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
        });
        aplikacija.controller("ostaloCtrl", function($scope) {
          $scope.listaSastojaka = ["Milk", "Bread", "Cheese"];
          $scope.dodaj = function () {
            $scope.errortext = "";
              if (!$scope.sastojak)   
              {
                $scope.errortext = "Neophodno je uneti sastojak.";
                 return;
              }        
              if ($scope.listaSastojaka.indexOf($scope.sastojak) == -1) {
                  $scope.listaSastojaka.push($scope.sastojak);
                  $scope.sastojak = null;
              } else 
                  {
                      $scope.errortext = "Ovaj sastojak se već nalazi u frižideru.";
                  }
          }
          $scope.obrisi = function (x) {
              $scope.errortext = "";    
              $scope.listaSastojaka.splice(x, 1);
          }
          app.controller('validateFriziderCtrl', function($scope) {
            $scope.sastojak = '';
            $scope.add = function(myForm)
            {
                if($scope.ime && $scope.broj && $scope.email)
                {
                    $scope.persons.push({ime:$scope.ime, prezime:$scope.prezime, broj:$scope.broj, email:$scope.email});
                    $scope.prezime="";
                    $scope.ime="";
                    $scope.broj="";
                    $scope.email="";
                    if (sastForm) 
                    {
                      sastForm.$setPristine();
                      sastForm.$setUntouched();
                    } 
                }
                
            };
        });
});
    var registracija = angular.module('regApp', []);
    registracija.controller('validacijaCtrl', function($scope) {
      $scope.persons=[];
      $scope.errortext = "";
      $scope.ime = '';
      $scope.prezime= ''
      $scope.username = '';
      $scope.adresa='';
      $scope.sifra='';
      $scope.opis='';
      $scope.confirmR='';$scope.errortext = "";
      $scope.addPerson = function(regForm)
      {
        if (!/\d/.test($scope.sifra) || !/[A-Z]/.test($scope.sifra) || !/[a-z]/.test($scope.sifra) || !/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test($scope.sifra))   
              {
                $scope.errortext = "Šifra mora sadržati brojeve,  velika slova, mala slova i specijalne karaktere.";
                 return;
                }
                  $scope.errortext ="";
          if($scope.ime && $scope.prezime && $scope.username && $scope.adresa && $scope.sifra && $scope.confirmR)
          {  
              $scope.persons.push({ime:$scope.ime, prezime:$scope.prezime, username:$scope.username, adresa:$scope.adresa,sifra:$scope.sifra,opis:$scope.opis, confirmR:$scope.confirmR});
              RegistrujSe($scope.ime,$scope.prezime,$scope.username,$scope.adresa,$scope.sifra,$scope.confirmR,$scope.opis);
              $scope.ime = "";
              $scope.prezime= ""
              $scope.username = "";
              $scope.adresa="";
              $scope.sifra="";
              $scope.opis="";
              $scope.confirmR="";
              if (regForm) 
              {
                regForm.$setPristine();
                regForm.$setUntouched();
              } 
          }  
        
      };
});

registracija.controller('logCtrl', function($scope) {
  $scope.persons=[];
  $scope.korisnickoIme = '';
  $scope.lozinka='';
  $scope.addPerson = function(logForm)
  {
      if($scope.korisnickoIme && $scope.lozinka)
      {
          $scope.persons.push({korisnickoIme:$scope.korisnickoIme,lozinka:$scope.lozinka});
          prijavise($scope.korisnickoIme,$scope.lozinka);
          $scope.korisnickoIme= "";
          $scope.lozinka="";
          if (logForm) 
          {
            logForm.$setPristine();
            logForm.$setUntouched();
          } 
        }
  };
});

  registracija.directive("compareWith", function ()  
  {  
      return {  
          require: "ngModel",  
          scope:  
          {  
              confirmR: "=compareWith"  
          },  
          link: function (scope, element, attributes, paramval)  
          {  
              paramval.$validators.compareWith = function (val)  
              {  
                  return  scope.confirmR==val ;  
              };  
              scope.$watch("confirmR", function ()  
              {  
                  paramval.$validate();  
              });  
          }  
      };  
  });  
function RegistrujSe(ime,prezime,username,adresa,sifra,drugaSifra,opis)
{
   var usr=new user();
   usr.register(username,adresa,prezime,ime,opis,sifra,drugaSifra);
}
function prijavise(username,pass)
{
   var us=new user();
   us.login(username,pass);
}
function posaljiSliku(Image){
  fetch("https://localhost:5001/Recepti/UploadAsync", {                      
  method: "POST",  
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(Image)
  })
  .then(res => res.json())
  .then(data => {
        alert("Uspesno postavljena slika");
       });  
}
function getNamirnicu(naziv, niz1, niz2, error)
{
    fetch("https://localhost:5001/Recepti/proveriPostojanje/"+naziv, {
      method: "GET",
      headers: {
        //"Content-Type": "application/json",
        "accept": "text/plain",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    }).then((p) => {
      if (p.ok) {
        p.json().then((data) => {
          var n=new namirnice();
          n.id=data.id;
          n.naziv=data.naziv;
          n.vrsta=data.vrsta;
          n.kcalVrednost=data.kcalVrednost;
          niz2.push(n);
          niz1.push(naziv);
          naziv = null;
          listaZaBazu=niz2;
          crtajSastojak(n);
        });
      }
      else{
         alert("Ovaj sastojak ne postoji u bazi");
      } 
    });
}
function crtajSastojak(n){
  var host=document.getElementById("sastojciDodajRecept");

        const s=document.createElement("div");
        s.innerHTML=n.naziv;
        host.appendChild(s);
        const dugme = document.createElement("button");
          dugme.innerHTML="X";
          dugme.style="btn";
          dugme.style="color: red"; 
          s.appendChild(dugme);
          s.onclick=(ev)=>{
            s.remove();
            listaZaBazu.forEach(element=>{
            if(element==n)
               listaZaBazu.pop(element);
            });
          }
 function posaljiRecept(nazivRecepta,vremePripreme,kalorijskaVrednost,brojPorcija,nacinPripreme,nizNaziva)
 {
  fetch("https://localhost:5001/Recepti/UnosRecepta", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify({
      "naziv": nazivRecepta,
      "tekst": nacinPripreme,
      "imgPath": sessionStorage.getItem("image"),
      "kcalVrednost": kalorijskaVrednost,
      "brojPorcija": brojPorcija,
      "vremePripreme": vremePripreme,
      "prosecnaOcena": 0,
      "namirnice": nizNaziva
    })
}).then(p => {
    if (p.ok) {
        alert("Uspesno dodavanje recepta");
        listaZaBazu=[];
    }
    else {
        alert("Greska kod dodavanja");
    }
}).catch(p => {
    alert("Greška sa konekcijom.");
});
 }
} 