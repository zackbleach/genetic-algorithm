define(['domReady'], function (domReady) {

    String.prototype.replaceAt=function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        }

    function PopulationMember(string, mutationRate) {

        this.string = string;
        this.mutate = mutate;
        this.characters = getCharacters();
        this.breedWith = breedWith;
        this.generation = 1;

        function getCharacters() {
           s = '';
            for(var i = 32; i <= 122; i++) {
                s += String.fromCharCode(i);
            }
            return s;
        }

        function breedWith(otherMember) {
            var children = crossover(otherMember);
            var children = children.map(function(x) {x.mutate(mutationRate); return x});
            for (child in children) {
                children[child].generation = this.generation + 1;
            }   
            return children;
        }

        function mutate(mutationRate) {
            for (var i = 0; i < this.string.length; i++){
                if (Math.random() < mutationRate) {
                    randomCharacter = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
                    this.string = string.replaceAt(i, randomCharacter);
                }
            }
        }

       function crossover(otherMember) {
            var newString = '';
            for (var i = 0; i < string.length; i++) {
                if (i % 2 === 0) {
                   newString += otherMember.string[i];
                } else {
                   newString += string[i];
                }
            }
            var newStringTwo = '';
            for (var i = 0; i < string.length; i++) {
                if (i % 2 !== 0) {
                   newStringTwo += otherMember.string[i];
                } else {
                   newStringTwo += string[i];
                }
            }

            return [new PopulationMember(newString, mutationRate), new PopulationMember(newStringTwo, mutationRate)];
        }

    }

    var GeneticAlgorithm = function(target, populationSize, mutationRate) {

        function sort(a, b) {
            return b.fitness - a.fitness; 
        }


        var characters = getCharacters();
       
        var population = generateRandomPopulation(populationSize, target.length);

        function getCharacters() {
            s = '';
            for(var i = 32; i <= 122; i++) {
                s += String.fromCharCode(i);
            }
            return s;
        }

        function getHammingDistance(string1, string2) {
            var distance = 0;

            for(var i = 0; i < string1.length; i++) {
                if(string2[i] !== string1[i]) {
                    distance += 1
                }
            }
            return distance;
        }

        function generateRandomString(length) {
            var randomString = ""
            for (var i = 0; i < length; i++) {
                randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
                randomString = randomString + randomCharacter;
            }
            return randomString;
        }

        function generateRandomPopulationMember() {
            var randomString = generateRandomString(target.length);
            var member = new PopulationMember(randomString, mutationRate);
            member.fitness = getFitness(randomString);
            return member;
        }

        function generateRandomPopulation(populationSize, stringSize) {
            population = [];
            for (var i = 0; i < populationSize; i++) {
                var randomString = generateRandomString(stringSize);
                var popMember = new PopulationMember(randomString, mutationRate);
                population.push(popMember);
            }
            population.sort(sort);
            return population;
        }

        function selectForBreeding(population) {
            randomNumberOne = Math.random();
            randomNumberTwo = Math.random();
            lowerRandomnumber = randomNumberOne * randomNumberTwo;

            randomIndex = (Math.floor(( (1-lowerRandomnumber) * population.length)));
            return population[randomIndex]
        }

        function getChildrenOfPreviousGeneration(population) {
            var newPopulation = [];
            var one = population[0];
            var two = population[1];
            var firstChildren = one.breedWith(two);
            for (child in firstChildren) {
                newPopulation.push(firstChildren[child]);
            }

            for (var i = 1; i < population.length/2; i++) { 
                var parentOne = selectForBreeding(population);
                var parentTwo = selectForBreeding(population);

                while (parentOne === parentTwo) {
                    parentTwo = selectForBreeding(population);
                }

                children = parentOne.breedWith(parentTwo);
                for (child in children) {
                    newPopulation.push(children[child]);
                }
            }
            return newPopulation;
        }

        function makeUpShortfall(population, newPopulation) {
            var shortfall = (population.length - newPopulation.length);
            for (var j = 0; j < shortfall; j++) {
                member = population[0]
                oldString = member.string
                randomString = generateRandomString(oldString.length);
                newMember = new PopulationMember(randomString, mutationRate); 
                newMember.generation = member.generation + 1;
                newPopulation.push(newMember);
            }
            return newPopulation;
        }

        function generateSubsequentPopulation(population) {
            var newPopulation = getChildrenOfPreviousGeneration(population); 
            newPopulation = makeUpShortfall(population, newPopulation);
            newPopulation.map(function(x) {x.fitness = getFitness(x.string)});
            newPopulation.sort(sort);
            return newPopulation;
        }
        function step() {
            var fittest = getFittestMembersOfPopulation(population, 1)[0];
            if (fittest.fitness !== 0) {
                population = generateSubsequentPopulation(population);
            }
            return fittest;
        }

        function getFitness(string) {
            return getHammingDistance(target, string);
        }

        function getFittestMembersOfPopulation(population, number) {
            return population.slice(population.length - number, population.length);
        }

        return {
            step: step,
            generateRandomPopulationMember: generateRandomPopulationMember
        }
    };
   return GeneticAlgorithm;
});


