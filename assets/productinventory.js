
async function inventorystatusapi()
{
  
  	let product_id = document.getElementsByClassName("product-template__container")[0].getAttribute("data-productId");
  	let div = document.querySelector('body');
      var location_id = '';
      if (div.classList.contains('user--is-pa')) {
      var location_id = '52305723547';
      }
      if (div.classList.contains('user--is-md')) {
      var location_id = '52306968731';
      }

        var data = { 
            "location_ids": location_id, 
            "product_id": product_id 
        }
          

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
  
        // Fake api for making post requests
        const response = await fetch("https://getblooming.mobikasa.net/api/product",options);
		return response.json();
        
        

}


function checkavailablity(variation_value)
{

	  var div = document.querySelector('body');
      var location_id = '';
      if (div.classList.contains('user--is-pa')) {
       var location_id = '52305723547';
        
      }
      if (div.classList.contains('user--is-md')) {
       var location_id = '52306968731';
      }
  	
  	
	inventorystatusapi().then(data => {
      console.log(data);
			 
      for (variable in data) {
        var locationvar = data[variable];
        if(variable == variation_value )
        {
          for (locvariable in locationvar) 
          {
           // console.log(locvariable);
            if(location_id == locvariable)
            {
              console.log(locationvar[locvariable]);
              console.log('variation qty',locationvar[locvariable]['qty']);
              if(locationvar[locvariable]['qty'] < 1)
              {
                document.querySelectorAll(".product-form__row")[0].style.display = "none";                            
                document.querySelector("#product__variant-qty").style.display = "none";

                 if(locationvar[locvariable]['incoming_qty'] > 0)
                {
					
                    document.querySelectorAll(".alert__sold-out")[0].style.display = "block";
                
                }else{
                  
					document.querySelectorAll(".alert--coming-soon")[0].style.display = "block";
                
                }
              	
              }else{
                document.querySelectorAll("#Quantity-product-template")[0].setAttribute("max",locationvar[locvariable]['qty'] );
                if(locationvar[locvariable]['qty'] < 10){document.querySelectorAll(".qtyerrorapi")[0].innerHTML=`<span class="qtynotice">Only ${locationvar[locvariable]['qty']} Left.</span>`;}
              	document.querySelectorAll(".product-form__row")[0].style.display = "block";
                document.querySelectorAll(".alert--coming-soon")[0].style.display = "none";
                var variantQty = locationvar[locvariable]["qty"];
                document.querySelector("#product__variant-qty").innerHTML = variantQty + " Available";
                document.querySelector("#product__variant-qty").style.display = "block";

              }
            }

          }
       
      }
	}
      
                                 
  });

}


// document.querySelectorAll(".alert--coming-soon")[0].style.display = "none";
document.querySelectorAll(".product-form__row")[0].style.display = "none";
var variationoption = document.querySelectorAll(".single-option-selector");

if(variationoption.length > 0)
{
  for(let i=0; i<variationoption.length; i++)
  {
      variationoption[i].addEventListener('change', function(){
        setTimeout(function(){ 
      		var variation_value = document.querySelectorAll("#ProductSelect-product-template")[0].value;    
      		//console.log(variation_value);
       
		checkavailablity(variation_value);
  		}, 1000);

      }); 	
  }
  var variation_value = document.querySelectorAll("#ProductSelect-product-template")[0].value;
  	setTimeout(function(){ 
	checkavailablity(variation_value);
  
	
	}, 1000);
}else{
 var variation_value = document.querySelectorAll("#ProductSelect-product-template")[0].value;   
  
      console.log('variation_value',variation_value);
  setTimeout(function(){ 
checkavailablity(variation_value);
  
	
}, 1000);

}
 
var cartItems = document.querySelectorAll(".product-form__input--quantity");
for (var i = 0; i < cartItems.length; i++) {
  var cartItem = cartItems[i];

  cartItems[i].oninput = function (event) {
      var inputMax = event.target.max;
      var inputValue = Number(event.target.value);

      if (inputValue > inputMax) {
        setTimeout(() => {
          event.target.value = event.target.max;
        }, 500);
      }
  };
}