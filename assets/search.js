async function inventorystatusapi()
{
  
  	var product_card = document.querySelectorAll(".product-card");
    var products = [];
    var variations = [];
    for(let i=0; i<product_card.length; i++){

      let product_id = product_card[i].getAttribute("data-productid");
      var var_id = product_card[i].getAttribute("data-variationid");
      products.push(product_id);
      variations.push(var_id);

    }
  	
  	let product_id = products.join(',');
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
            "product_ids": product_id 
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
        const response = await fetch("https://getblooming.mobikasa.net/api/productsearch",options);
		return response.json();    

}

setTimeout(function(){
  inventorystatusapi().then(data => {
    	let div = document.querySelector('body');
      var location_id = '';
      if (div.classList.contains('user--is-pa')) {
      var location_id = '52305723547';
      }
      if (div.classList.contains('user--is-md')) {
      var location_id = '52306968731';
      }
     
    var product_card = document.querySelectorAll(".product-card");
    var products = [];
    var variations = [];
    for(let i=0; i<product_card.length; i++){

      let product_id = product_card[i].getAttribute("data-productid");
      var var_id = product_card[i].getAttribute("data-variationid");
      products.push(product_id);
      variations.push(var_id);

    
    for (productid in data) {
        var variables = data[productid];
        if(productid == product_id )
        {
//           console.log('match');
//           console.log(product_card[i]);
          for (locvariable in variables) 
          {
            
            if(var_id == locvariable)
            {
           // console.log('var id',var_id);
              //console.log(variables[locvariable][location_id]['qty']);
              if(variables[locvariable][location_id]['qty'] < 1)
              {
                product_card[i].querySelectorAll(".price__badge--sale")[0].style.display = "none";
                product_card[i].querySelectorAll(".price__badge--sold-out")[0].style.display = "block";
                
              	
              }else{
               // product_card[i].querySelectorAll(".price__badge--sale")[0].style.display = "block";
                product_card[i].querySelectorAll(".price__badge--sold-out")[0].style.display = "none";
                
              }
            }

          }
       
      }
	}
    }
    //console.log(data);
  });
}, 2000);