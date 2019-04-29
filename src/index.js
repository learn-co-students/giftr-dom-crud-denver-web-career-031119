document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  const giftsList = document.querySelector('.gift-list')
  const searchInput = document.querySelector('#filter-input')

  const createButton = document.querySelector('#gift-form-button')

  searchInput.addEventListener('input', filterSearch)
  createButton.addEventListener('click', createNewGift)

  function displayGifts(gifts){
    while (giftsList.hasChildNodes()){
      giftsList.removeChild(giftsList.firstChild)
    }
    for (let gift of gifts){
      let li = document.createElement('li');
      li.innerText = gift.name;
      giftsList.appendChild(li)

      let img = document.createElement('img');
      img.src = gift.image;
      img.width = "300"
      li.appendChild(img)

      let editButton = document.createElement('button')
      let deleteButton = document.createElement('button')
      editButton.innerText = "Edit";
      deleteButton.innerText = "Delete"

      // editButton.id = gift.id
      // deleteButton.id = gift.id

      editButton.addEventListener('click', function(){editGift(gift.id)})
      deleteButton.addEventListener('click', function(){deleteGift(gift.id)})

      li.appendChild(editButton)
      li.appendChild(deleteButton)
    }
  }

  displayGifts(gifts)

  function filterSearch() {
    console.log(searchInput.value)
    let newGifts = gifts.filter( gift => {
      return gift.name.includes(searchInput.value)
    })


    displayGifts(newGifts)
  }

  function createNewGift() {
    const giftName = document.querySelector('#gift-name-input')
    const giftImage = document.querySelector('#gift-image-input')
    gifts.push({id: `${gifts.length + 1}`,
      name: `${giftName.value}`,
      image: `${giftImage.value}`})
    giftName.value = '';
    giftImage.value = '';
    displayGifts(gifts)
  }

  function editGift(giftId) {
    gift = gifts[giftId - 1]
    let name = prompt('Name: ', `${gift.name}`)
    console.log(name)
    let imageLink = prompt('Image URL:', `${gift.image}`)
    console.log(imageLink)
    if (name != null && imageLink != null) {
      gifts[giftId - 1].name = name
      gifts[giftId - 1].image = imageLink
    } else {
      alert('Changes Canceled')
    }

    displayGifts(gifts)
  }

  function deleteGift(giftId) {
    console.log(giftId)

    // console.log(yeet)
    // console.log(gifts)
    for ( let i = (giftId - 1); i < gifts.length; i++){
      gifts[i].id--
    }

    gifts.splice(giftId-1 ,1)
    displayGifts(gifts)
  }

})
