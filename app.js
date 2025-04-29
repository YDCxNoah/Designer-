
function showSection(sectionId) {
  document.getElementById('closetSection').style.display = 'none';
  document.getElementById('outfitGeneratorSection').style.display = 'none';
  document.getElementById('plannerSection').style.display = 'none';
  document.getElementById(sectionId).style.display = 'block';
}

function loadCloset() {
  db.collection('closet')
    .where('user', '==', auth.currentUser.email)
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      const closetGrid = document.getElementById('closetGrid');
      closetGrid.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        closetGrid.innerHTML += `
          <div class="col">
            <div class="card">
              <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}" />
              <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
              </div>
            </div>
          </div>`;
      });
    });
}

function generateOutfit() {
  db.collection('closet')
    .where('user', '==', auth.currentUser.email)
    .get()
    .then(snapshot => {
      const items = [];
      snapshot.forEach(doc => items.push(doc.data()));
      const outfitDisplay = document.getElementById('outfitDisplay');
      outfitDisplay.innerHTML = '';
      for (let i = 0; i < 2 && items.length; i++) {
        const index = Math.floor(Math.random() * items.length);
        const item = items.splice(index, 1)[0];
        outfitDisplay.innerHTML += `
          <div class="col">
            <div class="card">
              <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}" />
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
              </div>
            </div>
          </div>`;
      }
    });
}

auth.onAuthStateChanged(user => {
  if (user) loadCloset();
});
