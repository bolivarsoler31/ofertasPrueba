let selectOffers    = document.getElementById('SelectOffers'),
    idProductOffer  = document.getElementById('idProductOffer'),
    nombreOffer     = document.getElementById('nombreOffer'),
    data            = document.getElementById('data'),
    offers;   
    
fetch("ofertas.json")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log('Error: ',err))

function initialize(response){
    let options = "";
    let offerNumber = 1;
    response.forEach(versions => options+=`<option value="${versions.id}">Oferta ${offerNumber++}</option>`);
    selectOffers.innerHTML = options;
    dataInputsOffer(response);
}



function dataInputsOffer(response){
    idProductOffer.value = selectOffers.value;
    for(i in response){
        if(response[i].id === selectOffers.value){
           nombreOffer.value = response[i].versions[0].name;
           for(j in response[i].versions[0].productOfferingPrices){
                if(j < 4){
                    data.innerHTML += `
                    <tr id="th">
                      <th scope="row">Caracteristica ${parseInt(j) + 1}</th>
                      <td>${response[i].versions[0].productOfferingPrices[j].versions[0].name}</td>
                      <td>${response[i].versions[0].productOfferingPrices[j].versions[0].price.amount}</td>
                    </tr>
                    `;
                }else{
                    break;
                }
           }
        }
    } 
    selectOffers.addEventListener('click', function(){
        idProductOffer.value = selectOffers.value;
        $("#table > tbody").html("");
        for(i in response){
            if(response[i].id === selectOffers.value){
                nombreOffer.value = response[i].versions[0].name;
                for(j in response[i].versions[0].productOfferingPrices){
                    if(j < 4){
                        data.innerHTML += `
                        <tr>
                          <th scope="row">Caracteristica ${parseInt(j) + 1}</th>
                          <td>${response[i].versions[0].productOfferingPrices[j].versions[0].name}</td>
                          <td>${response[i].versions[0].productOfferingPrices[j].versions[0].price.amount}</td>
                        </tr>
                        `;
                    }else{
                        break;
                    }
                }
            }
        } 
    });
}