function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

var version = detectIE();
var largestHeight = 0;


// CHANGE THUMBNAIL SIZES TO BE THE SAME
jQuery(window).on("load", function(){

  jQuery('.thumbnail').each(function(){
    var imageHeight = jQuery(this).find('img').height();
    console.log(imageHeight);
    if(imageHeight > largestHeight){
      largestHeight = imageHeight
      console.log(largestHeight, imageHeight)
    }
    return largestHeight;
  })
  return largestHeight
})
// FIRE largestHeight ON RESIZE FOR THUMBNAIL
jQuery(window).on("load resize", function(){
  jQuery('.thumbnail').height(largestHeight);
})



// ORDER_REVIEW FOLLOW ON WAY DOWN
var $el = jQuery('#order_review');
if ( $el.length && jQuery(window).width() > 960 ) {
  jQuery(window).on("scroll", function(){
    var height = $el.height();
    var scroll = jQuery(this).scrollTop();
    var payment = $el.offset().top;
    var offset = scroll;
    if(scroll >= payment){
      $el.css('transform', 'translateY(' + offset + 'px)');
    }else {
      $el.css('transform', 'translateY(0px)');
    }
  })
}

// SLIDER / GALLERY
jQuery( document ).ready( function( $ ) {

  var int = $('.slides').data('time');
  var time = int * 1000;

  $(function(){
    $('.slide:gt(0)').hide();
    setInterval(function(){
      $('.slide:first-child').fadeOut()
         .next('.slide').fadeIn()
         .end().appendTo('.slides');},
      time);
    });
});

// ADD 'hover' CLASS ON LINK HOVER
jQuery( document ).ready( function( $ ) {
  $('.product-link a').on('mouseover', function(){
    var title = $(this).data('title');
    $('.product-thumb').each(function(){
      if( $(this).data('title') == title ){
        $(this).addClass('hover');
      }
    })
  })
  $('.product-link a').on('mouseout', function(){
    var title = $(this).data('title');
    $('.product-thumb').each(function(){
      if( $(this).data('title') == title ){
        $(this).removeClass('hover');
      }
    })
  })
});


jQuery( document ).ready( function( $ ) {

  $('#bag').on('click', function(){
    $('.bag').toggleClass('show');
  })

  $('#open-menu').on('click', function(){
    $('body').toggleClass('menu-open');
  })

  $(document).on('click', '#main-content', function(){
    $('body').removeClass('bag-open');
    $('body').removeClass('menu-open');
  })

  $(document).on('click', '#open-bag', function(){
    $('body').toggleClass('bag-open');
  })

  $('#categories-button').on('click', function(){
    $(this).siblings('.categories').toggleClass('show');
  })

  $('.bag').on('click', '.remove-item', function(){
    var id = $(this).data('id');
    var url = $(this).data('url');
    var product = $(this).parent().parent();

    $.ajax({
       cache: false,
       type: 'POST',
       url: url,
       data: {
          'action': 'remove_cart_item',
          'product_id': id
       },
       dataType: 'JSON',
       success: function (response) {
         console.log(response);
         removeCartItemCallback(product, response);
       },
       error: function (XMLHttpRequest, status, error) {
         console.log(error);
       }
     });

     removeCartItemCallback = function(product, response){
       $('.cart-total').empty();
       $('.cart-total').append(response.total);
       $('#cart-count').empty();
       $('#cart-count').append(response.count);
       product.hide();
     }

  })

  $('.add-to-cart').on('click .add-to-cart', function(e){

    var $btn = $(this);

    e.preventDefault();
    var request = $btn.data('url');
    var post_id = $btn.data('id');
    var quantity = $btn.siblings('.quantity-selector').find('.quantity').val();
    var url = request + '?add-to-cart=' + post_id;

    $btn.find('.price').addClass('loading');

    $.ajax({
     cache: false,
     type: 'GET',
     url: url,
     data: {
        'action': 'add_product_to_cart',
        'id': post_id
     },
     dataType: 'JSON',
     success: function (response) {
       addProductToCartCallback(response, $btn);
     },
     error: function (XMLHttpRequest, status, error) {
       console.log("error", error);
     }
   });

   addProductToCartCallback = function(response, $btn){

     $btn.find('.price').removeClass('loading');
     $btn.find('.price').addClass('added');
     $('#cart-count').empty();
     $('#cart-count').append(response.count);
     setTimeout(function(){
        $btn.find('.price').removeClass('added');
        $('body').addClass('bag-open');
      }, 1000);

     $('.bag').empty();
     $('.bag').append(response.bag);

     console.log('response: ', response);

     return;

   }

  })

  $('.bag').on('click', '.q-increment', function(){
    var $btn = $(this);
    var key = $btn.data('key');
    var url = $btn.data('url');

    $.ajax({
      cache: false,
      type: 'POST',
      url: url,
      data: {
        'action' : 'quantity_increment',
        'key'    : key
      },
      dataType: 'JSON',
      success: function(response) {
        quantityIncrementCallback(response, $btn);
      }
    })
  })

  quantityIncrementCallback = function(response, $btn){
    console.log(response);
    $('.woocommerce-Price-amount').empty();
    $('.woocommerce-Price-amount').append(response.total);
    var quantity = $btn.closest('div').find('.quantity');
    quantity.empty();
    quantity.append(response.quantity);
    $('#cart-count').empty();
    $('#cart-count').append(response.count);
  }

  $('.bag').on('click', '.q-decrement', function(){
    var $btn = $(this);
    var key = $btn.data('key');
    var url = $btn.data('url');
    var id = $btn.data('name');

    $.ajax({
      cache: false,
      type: 'POST',
      url: url,
      data: {
        'action' : 'quantity_decrement',
        'key'    : key,
        'id'     : id
      },
      dataType: 'JSON',
      success: function(response) {
        quantityDecrementCallback(response, $btn);
      }
    })
  })

  quantityDecrementCallback = function(response, $btn){
    $('.woocommerce-Price-amount').empty();
    $('.woocommerce-Price-amount').append(response.total);
    $('#cart-count').empty();
    $('#cart-count').append(response.count);

    var quantity = $btn.closest('div').find('.quantity');
    quantity.empty();
    quantity.append(response.quantity);

    if(response.deleted == true){
      var el = $('.cart-products').find("[data-name='" + response.id + "']");
      el.fadeOut('slow');
    }

  }

});
