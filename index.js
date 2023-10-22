const root = 'http://localhost:3005';
const newDogForm = document.querySelector('#new-dog');
const dogContainer = document.querySelector('#dogs');
const state = {
    dogs: []
};

///Eight Delete
const deleteDogRequest = (id) => {
    const options = {
        method: 'DELETE'
    };

    fetch(`${root}/dogs/${id}`, options)
        .then((response) => response.json())
        .then(() => {
            renderDog();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

//Six Edit
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

//Two 
const renderDog = () => {
    dogContainer.innerHTML = '';

    state.dogs.forEach((dog) => {
        const dogForm = document.createElement('form');
        const name = document.createElement('p');
        name.innerText = `Name: ${dog.name}`;
        const breed = document.createElement('p');
        breed.innerText = `Breed: ${dog.breed}`;
        const isGood = document.createElement('input');
        isGood.type = 'checkbox';
        isGood.checked = dog.isGood;
        const editButton = document.createElement('button');
        editButton.innerText = 'Update isGood Status';

        dogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            editDogIsGood(dog.id, dog.isGood); //Seven
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Dog';
        deleteButton.type = 'button';

        deleteButton.addEventListener('click', () => {
            deleteDogRequest(dog.id); //  Nine
        });

        dogForm.append(name);
        dogForm.append(breed);
        dogForm.append(isGood);
        dogForm.append(editButton);
        dogForm.append(deleteButton);
        dogContainer.append(dogForm);
    });
};

///One fetch 
fetch(`${root}/dogs`)
    .then((response) => response.json())
    .then((data) => {
        state.dogs = data;
        renderDog(); //Three
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //Four Post Request
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

    fetch(`${root}/dogs`, options)
        .then((response) => response.json())
        .then(() => {
            renderDog();//Five
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
