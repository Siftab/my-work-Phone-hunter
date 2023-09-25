const loadPhone = async (search='a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data, isShowAll)

}
const displayPhones = (phones, isShowAll) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    if (phones.length > 12 && !isShowAll) {

        document.getElementById('showAll').classList.remove('hidden')
    }
    else {
        document.getElementById('showAll').classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone)

        const card = document.createElement('div');
        card.classList = 'card w-96 bg-base-100 shadow-xl';
        // console.log(card)
        card.innerHTML = `
        <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.brand}</p>
                    <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn  bg-lime-300">Show Details</button>
                    </div>
                </div>
                `;
        cardContainer.appendChild(card);
    });
    toggleSpinner(false);
}

// loadPhone();
const searchPhone = (isShowAll) => {
    toggleSpinner(true);
    const search = document.getElementById('inputBox').value;
    loadPhone(search, isShowAll);
}
// show All button 
const showAllContainer = () => {
    searchPhone(true);
}

// toggle
const toggleSpinner = (isLoading) => {
    const spin = document.getElementById('spinner')

    if (isLoading) {
        spin.classList.remove('hidden')
    }
    else {
        spin.classList.add('hidden')
    }
}

// SHow Modal 
const handleShowDetail= async (id)=>{
// console.log('data_working',id)
const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
console.log(data.data);
showDetail(data.data);
}
const showDetail=(phone)=>{
    show_details_modal.showModal()
     
    // document.getElementById('imageDiv').innerHTML=`<img src="${phone.image}">`
    document.getElementById('showDetailPhoneName').innerText=phone.name;
   
    document.getElementById('modalContainer').innerHTML=`
    <div ><img class="mx-auto" src="${phone.image}" alt=""/></div>
    <p><b>Storage:</b> ${phone.mainFeatures.storage}</p>
    <p><b>Display:</b> ${phone?.mainFeatures?.displaySize}</p>
    <p><b>chipset:</b>${phone?.mainFeatures.chipSet}</p>
    <p><b>Memory:</b>${phone.mainFeatures.memory}</p>
    <p><b>release Date:</b>${phone.releaseDate}</p>
    <p><b>Gps:</b>${phone.others.GPS}</p>
    `
    
}
// loadPhone();