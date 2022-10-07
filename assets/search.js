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
        const response = await fetch("https://inventory.getblooming.com/api/productsearch",options);
		return response.json();    

}

async function searchResultsAPI()
{
  let product_card  = document.querySelectorAll(".product-card");
  let div           = document.querySelector('body');
  let location_id   = '';
  let products      = [];
  let variations    = [];

  if (div.classList.contains('user--is-pa')) {
    location_id = '52305723547';
  }

  if (div.classList.contains('user--is-md')) {
    location_id = '52306968731';
  }

  for( let i = 0; i < product_card.length; i++ ){
    let product_id = product_card[i].getAttribute("data-productid");
    let var_id = product_card[i].getAttribute("data-variationid");
    products.push(product_id);
    variations.push(var_id);
  }

  // let search = urlParams.get('q');

  let product_id = products.join(',');

  let data = {
    "location_ids": location_id,
    "product_ids": product_id,
  }

  let options = {
    method: "POST",
    headers: {
      'Content-Type':'application/json;charset=utf-8',
      'Authorization':'Bearer 2|wqQZXoG0GOWATcvUV1yj8RPNUYNoQfChH3BocLT3'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch("https://inventory.getblooming.com/api/productsearchdemo", options);

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
    let soldOutFlag = true;

    for(let i=0; i<product_card.length; i++){

      let product_id = product_card[i].getAttribute("data-productid");
      var var_id = product_card[i].getAttribute("data-variationid");
      // products.push(product_id);
      // variations.push(var_id);
    
      for (productid in data) {
        // console.log(data[productid]);
        var product = data[productid];

        if (productid == product_id) {
          // console.log('match');
          // console.log(product_card[i]);

          console.log(product_id);
          // console.log(product);

          for (locvariable in product) {

            // console.log(locvariable);
            // console.log('next');

            if (product[locvariable][location_id]['qty'] > 0) {
              soldOutFlag = false;
              break;
            } else {
              soldOutFlag = true;
            }
          }

          if (soldOutFlag) {
            console.log('sold out');

            product_card[i].querySelectorAll(".price__badge--sale")[0].style.display = "none";
            product_card[i].querySelectorAll(".price__badge--sold-out")[0].style.display = "block";

          } else {
            console.log('available');
            // product_card[i].querySelectorAll(".price__badge--sale")[0].style.display = "block";
            product_card[i].querySelectorAll(".price__badge--sold-out")[0].style.display = "none";
          }
        }
      }
    }
  });
}, 2000);
