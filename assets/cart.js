async function inventorystatusapi()
{
  
  	var cart_tr = document.querySelectorAll(".cart__product-table tbody tr");
    var variations = [];
    for(let i=0; i<cart_tr.length; i++){

      var var_id = cart_tr[i].getAttribute("data-tomit-variant-id");
      variations.push(var_id);

    }
  	
  	let variation_id = variations.join(',');
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
            "variant_ids": variation_id 
        }
          

        let options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8',
				'Authorization':'Bearer 2|wqQZXoG0GOWATcvUV1yj8RPNUYNoQfChH3BocLT3'
            },
            body: JSON.stringify(data)
        }
  
        // Fake api for making post requests
        const response = await fetch("https://getblooming.mobikasa.net/api/cartproduct",options);
		return response.json();    

}


setTimeout(function(){
  if(document.querySelectorAll(".cart__product-table tbody tr").length > 0)
  {
  inventorystatusapi().then(data => {
    	let div = document.querySelector('body');
      var location_id = '';
      if (div.classList.contains('user--is-pa')) {
      var location_id = '52305723547';
      }
      if (div.classList.contains('user--is-md')) {
      var location_id = '52306968731';
      }
     
    var product_card =  document.querySelectorAll(".cart__product-table tbody tr");
    var variations = [];
    for(let i=0; i<product_card.length; i++)
    {
      var var_id = product_card[i].getAttribute("data-tomit-variant-id");
      variations.push(var_id);

    
    for (varid in data) {
        var variables = data[varid];
        if(varid == var_id )
        {
			 product_card[i].querySelectorAll(".cart__qty-input")[0].setAttribute("max",variables[location_id]['qty'] );
              if(variables[location_id]['qty'] < 10)
              {
             	
                product_card[i].querySelectorAll(".api_inventorymsg")[0].innerHTML = `<br/> Only ${variables[location_id]['qty']} Left`; 
              	
              }else{
               product_card[i].querySelectorAll(".api_inventorymsg")[0].innerHTML = `<br/>  ${variables[location_id]['qty']} Available`;
                 product_card[i].querySelectorAll(".api_inventorymsg")[0].style.color = 'green';
              }
			product_card[i].querySelectorAll(".cart__qty-input")[1].setAttribute("max",variables[location_id]['qty'] );
       
      }
	}
    }
    //console.log(data);
  });
  }
}, 1000);


var cartItems = document.querySelectorAll(".cart__qty-input");
for (var i = 0; i < cartItems.length; i++) {
  var cartItem = cartItems[i];

  cartItems[i].onblur = function (event) {
  
    var inputMax = event.target.max;
    var inputValue = Number(event.target.value);

    if (inputValue > inputMax) {
      event.target.value = event.target.max;
         }
  };
}