define(function () {

    function GeneticView(maxDistance) {

        var colors = getColors(maxDistance);

        function updateGenetic(populationMember) {
            var textDisplay = document.querySelector("#output");
            var distanceDisplay = document.querySelector("#distance");
            var generationsDisplay = document.querySelector("#generation");
            textDisplay.textContent = populationMember.string;
            textDisplay.style.color = getColorOfText(populationMember);
            distanceDisplay.textContent = populationMember.fitness;
            generationsDisplay.textContent = populationMember.generation;
        }

        function updateRandom(randomMember) {
            var randomDisplay = document.querySelector("#randomOutput");
            var randomDistanceDisplay = document.querySelector("#randomDistance");
            var randomGenerationsDisplay = document.querySelector("#randomGeneration");
            randomDisplay.textContent = randomMember.string;
            randomDisplay.style.color = getColorOfText(randomMember);
            randomDistanceDisplay.textContent = randomMember.fitness;
            randomGenerationsDisplay.textContent = randomMember.generation;
        }

        function toggleGenerations() {
           var generations = document.querySelector("#gen-generation");
           var randomGenerations = document.querySelector("#random-generation");
           toggleElement(generations);
           toggleElement(randomGenerations);
        }

        function toggleFitness() {
           var distance = document.querySelector("#gen-distance");
           var randomDistance = document.querySelector("#random-distance");
           toggleElement(distance);
           toggleElement(randomDistance);
        }

        function toggleElement(element) {
           if (element.style.display === "inline") {
                element.style.display = "none";
           } else {
                element.style.display = "inline";
           }
        }

        function getColor(red, green, blue) {
            return "rgb(" + red + ", " + green + ", " + blue +")";
        }


        function getColorOfText(populationMember) {
            var fitness = populationMember.fitness
            colorIndex = colors.length - (Math.floor((fitness / maxDistance) * colors.length));
            return colors[colorIndex]
        }

        function getColors(maxDistance) {
            var colors = []

                var red = 255
                var green = 0 
                var blue = 0

                var interval = 210/maxDistance

                for (var i = 0; i < 210; i = i + interval) {
                    colors.push(getColor(red, green, blue));
                    green = Math.floor(green + interval);
                }

                var interval = 255/maxDistance

                blue = 150
                for (var i = 0; i < 255; i = i + interval) {
                    colors.push(getColor(red, green, blue));
                    red = Math.floor(red - interval);
                    interval = interval * 1.3
                }

            return colors;
        }
        return {
            updateGenetic: updateGenetic,
            updateRandom: updateRandom,
            toggleGenerations: toggleGenerations,
            toggleFitness: toggleFitness
        }
    };
    return GeneticView
});

