const root = 'http://localhost:3005';
const newDogForm = document.querySelector('#new-dog');
const dogContainer = document.querySelector('#dogs');
const state = {
    dogs: []
};

//Six
const editDogIsGood = (id, isGood) => {
    const data = {
        isGood: !isGood
    };
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(`${root}/dogs/${id}`, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Optionally, you can update your local state and re-render the dogs here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

//Two
const renderDog = () => {
    // Clear the existing dogContainer
    dogContainer.innerHTML = '';

    state.dogs.forEach((dog) => {
        const dogForm = document.createElement('form');
        const name = document.createElement('p');
        name.innerText = `Name: ${dog.name}`;
        const breed = document.createElement('p');
        breed.innerText = `Breed: ${dog.breed}`;
        const isGood = document.createElement('input');
        isGood.type = 'checkbox';
        isGood.checked = dog.isGood; // If the checkbox is checked isGood = true , else is good will be false
        const editButton = document.createElement('button');
        editButton.innerText = 'Update isGood Status';

        //Seven
        dogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            editDogIsGood(dog.id, dog.isGood);
        });

        dogForm.append(name);
        dogForm.append(breed);
        dogForm.append(isGood);
        dogForm.append(editButton);
        dogContainer.append(dogForm);
    });
};

//One
// Fetch dogs and render them
fetch(`${root}/dogs`)
    .then((response) => response.json())
    .then((data) => {
        state.dogs = data;
        renderDog(); //There
    })
    .catch((error) => {
        console.error('Error:', error);
    });


//four
newDogForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        name: e.target[0].value,
        breed: e.target[1].value,
        isGood: e.target[2].checked
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    // After posting a new dog, refetch the data and render
    fetch(`${root}/dogs`, options)
        .then((response) => response.json())
        .then(() => {
            renderDog(); //five
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
