document.addEventListener('DOMContentLoaded', () => {

let giftList = document.querySelector('.gift-list')
let searchInput = document.querySelector('#filter-input')
let newGiftBtn = document.querySelector('#gift-form-button')

displayGifts(gifts);
searchInput.addEventListener('input', searchByName)
newGiftBtn.addEventListener('click', createGift)

function clearDisplay () {
  while (giftList.hasChildNodes()) {
     giftList.removeChild(giftList.firstChild);
  }
}

function displayGifts (giftArray) {
  for (let gift of giftArray) {
    let li = document.createElement('li')
    li.innerHTML = gift.name
    giftList.appendChild(li)

    let img = document.createElement('img')
    img.src = gift.image
    img.width = "300"
    li.appendChild(img)

    let editBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    deleteBtn.innerHTML = 'Delete'
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)

    editBtn.addEventListener('click', function () {editGift(gift)})
    deleteBtn.addEventListener('click', function () {deleteGift(gift)})
  }
}

function editGift (gift) {
  let name = prompt('Gift Name: ', gift.name)
  let image = prompt('Image URL: ', gift.image)
  if (name != null && image!= null) {
    gift.name = name
    gift.image = image
  } else {
    alert('Changes Cancelled')
  }
  clearDisplay()
  displayGifts(gifts)
}

function deleteGift (gift) {
  gifts.splice(gift.id - 1, 1)
  clearDisplay()
  displayGifts(gifts)
}

function searchByName () {
   clearDisplay()

  let newGifts = gifts.filter(function (gift) {
    return gift.name.includes(searchInput.value)
  })
  displayGifts(newGifts)
}

function createGift () {
  let giftNameInput = document.querySelector('#gift-name-input')
  let giftImageInput = document.querySelector('#gift-image-input')
  newGift = {id: gifts.length + 1, name: giftNameInput.value, image: giftImageInput.value}
  gifts.push(newGift)
  clearDisplay();
  displayGifts(gifts);
}


})
