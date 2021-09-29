// This is the service worker with the Cache-first network

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
/*if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("/pwabuilder-sw.js", {
        scope: "/"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}*/

async function share(title, text, url, discription) {
  if (window.Windows) {
    const DataTransferManager = window.Windows.ApplicationModel.DataTransfer.DataTransferManager;

    const dataTransferManager = DataTransferManager.getForCurrentView();
    dataTransferManager.addEventListener("datarequested", (ev) => {
      const data = ev.request.data;

      data.properties.title = title;
      data.properties.url = url;
      data.properties.discription = discription;
      data.setText(text);
    });

    DataTransferManager.showShareUI();

    return true;
  } else if (navigator.share) {
    try {
		console.log("shared");
      await navigator.share({
        title: title,
        text: text,
        discription: discription,
        url: url,
      });

      return true;
    } catch (err) {
      console.error('There was an error trying to share this content');
      //alert('Browser Anda tidak mendukung');
      return false;
    }
  }
}

async function copyToClipboard(stringToCopy) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(stringToCopy);
      console.log('string copied to clipboard');
	  M.toast({html: 'Link berhasil disalin', classes: 'green lighten-4 black-text'});
    } catch (err) {
      console.error('Failed to copy: ', err);
	  M.toast({html: 'Link gagal disalin. '+err, classes: 'red lighten-4 black-text'});
    }
  }
}

$(function() {
    'use strict';

    var elem = document.querySelector('.collapsible.products');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });

    $('select').formSelect();

    // preloader
    $(".preloader").fadeOut();

    // sidebar
    $('.sidenav').sidenav();

    if ($(document).scrollTop() >= ($(document).height() - $(window).innerHeight())) {
        $(".navbar-bottom").css({
            "box-shadow": "none"
        });
    }

    // navbar on scroll
    $(window).on('scroll', function() {

        if ($(document).scrollTop() > 50) {

            $(".navbar").css({
                "box-shadow": "rgba(0, 0, 0, 0.6) 0px 0px 16px"
            });

        } else {

            $(".navbar").css({
                "box-shadow": "none"
            });

        }

        if ($(document).scrollTop() < ($(document).height() - $(window).innerHeight())) {

            $(".navbar-bottom").css({
                "box-shadow": "rgba(0, 0, 0, 0.6) 0px 0px 16px"
            });

        } else {

            $(".navbar-bottom").css({
                "box-shadow": "none"
            });
//0px -3px 4px -2px rgba(0,0,0,0.75)
        }

    });

    // slider
    $(".slide-show").owlCarousel({
        items: 1,
        navigation: true,
        slideSpeed: 1000,
        dots: true,
        paginationSpeed: 400,
        singleItem: true,
        loop: true,
        margin: 10,
        autoplay: false
    });

    // product-slide
    $(".product-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // product-slide
    $(".product-slide-two").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // product-d-slide
    $(".product-d-slide").owlCarousel({
        items: 1,
        navigation: true,
        slideSpeed: 1000,
        dots: true,
        paginationSpeed: 400,
        loop: false,
        margin: 10,
    });

    // tabs
    $('ul.tabs').tabs();

    // collapse
    //$('.collapsible').collapsible();

    // testimonial
    $(".testimonial").owlCarousel({
        items: 1,
        loop: false
    })

});


function format_rupiah(a,b=false){
	//angka = angka.toFixed(2);
	angka = Math.abs(a);
	var rupiah = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
  if(b){
  	if(a<0)
  		return '('+rupiah.split('',rupiah.length-1).reverse().join('')+')';
  	else
  		return ''+rupiah.split('',rupiah.length-1).reverse().join('');
  }else{
  	if(a<0)
  		return '(Rp '+rupiah.split('',rupiah.length-1).reverse().join('')+')';
  	else
  		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
  }
}
