/*LET'S BUILD A ZOO!*/

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    describe() {
        return `${this.name} is of the species ${this.species}`;
    }
}

class Exhibits {
    constructor(name) {
        this.name = name;
        this.animals = [];
    }

    addAnimal(animal) {
        if (animal instanceof Animal) {
            this.animals.push(animal);
        } else {
            throw new Error(`You can only add an instance of Animal. Input is not an animal: ${animal}`);
        }
    }

    describe() {
        return `${this.name} has ${this.animals.length} animals.`;
    }
}

class Menu {
    constructor() {
        this.exhibits = [];
        this.selectedExhibit = null;
    }

    start() {
        let selection = this.mainMenu();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createExhibit();
                    break;
                case '2':
                    this.viewExhibit();
                    break;
                case '3':
                    this.deleteExhibit();
                    break;
                case '4':
                    this.displayAllExhibits();
                    break;
                default:
                    selection = 0;
            }
            selection = this.mainMenu();
        }

        alert("Sorry to see you go! Bye bye!");
    }

    mainMenu() {
        return prompt(`
        0) Exit
        1) Create a New Exhibit
        2) View an Exhibit
        3) Delete an Exhibit
        4) Display All Exisisting Exhibits
        `);
    }

    exhibitMenuOptions(exhibitInfo) {
        return prompt(`
        ${exhibitInfo}
        -----------------------
        0) Back
        1) Add an Animal
        2) Delete an Animal
        `);
    }

    createExhibit() {
        let name = prompt('What is the name of the new exhibit?');
        this.exhibits.push(new Exhibits(name));
    }

    viewExhibit() {
        let index = prompt('Enter the index of the exhibit your wish to view:');
        if(index > -1 && index < this.exhibits.length) {
            this.selectedExhibit = this.exhibits[index];
            let description = 'Exhibit Name: ' + this.selectedExhibit.name + '\n';
            
            for(let i = 0; i < this.selectedExhibit.animals.length; i++) {
                description += i + ') ' + this.selectedExhibit.animals[i].name + 
                ' - ' + this.selectedExhibit.animals[i].species + '\n';
            }

            let selection = this.exhibitMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.addAnimal();
                    break;
                case '2':
                    this.deleteAnimal();
            }
        }
    }

    deleteExhibit() {
        let index = prompt('Enter the index of the exhibit you wish to delete:');
        if (index > -1 && index < this.exhibits.length) {
            this.exhibits.splice(index, 1);
        }
    }

    displayAllExhibits() {
        let exhibitString = '';
        for (let i = 0; i < this.exhibits.length; i++) {
            exhibitString += i + ') ' + this.exhibits[i].name + '\n';
        }

        alert(exhibitString);
    }

    addAnimal() {
        let name = prompt('What is the name of the new animal?');
        let species = prompt('What is the species of the new animal?');
        this.selectedExhibit.animals.push(new Animal(name, species));
    }

    deleteAnimal() {
        let index = prompt('Enter the index of the animal you wish to delete:');
        if (index > -1 && index < this.selectedExhibit.animals.length) {
            this.selectedExhibit.animals.splice(index, 1);
        }
    }
}

let buildAZoo = new Menu();
buildAZoo.start();