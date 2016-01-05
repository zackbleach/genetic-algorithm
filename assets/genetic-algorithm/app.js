requirejs.config({
    baseUrl: 'assets/genetic-algorithm/lib',
    paths: {
        app: '../assets/genetic-algorithm/app',
    }
});

define(['gen', 'view', 'controlsView', 'domReady'], function(GeneticAlgorithm, GeneticView, ControlsView, domReady) {

    var geneticAlgorithmInterval;

    var controlsView;
    var geneticAlgorithmView;

    var populationSize;
    var mutationRate;

    function startGeneticAlgorithm(targetString, populationSize, mutationRate) {
       document.getElementById("tick").style.display="none";
       clearInterval(geneticAlgorithmInterval);
       var geneticAlgorithm = new GeneticAlgorithm(targetString, populationSize, mutationRate);
       geneticAlgorithmInterval = setInterval(function() {
            var fittest = geneticAlgorithm.step();
            geneticAlgorithmView.updateGenetic(fittest);
            var randomMember = geneticAlgorithm.generateRandomPopulationMember()
            randomMember.generation = fittest.generation;
            geneticAlgorithmView.updateRandom(randomMember);
            if (fittest.fitness === 0) {
                document.getElementById("tick").style.display="initial";
            }
        })
    }

    domReady(function() {
       geneticAlgorithmView = new GeneticView(getText().length);
       controlsView = new ControlsView(geneticAlgorithmView.toggleGenerations,
                                       geneticAlgorithmView.toggleFitness);
       controlsView.hide();
       console.log(controlsView.getMutationRate());
       startGeneticAlgorithm(getText(), controlsView.getPopulationSize(), controlsView.getMutationRate());
       document.getElementById("evolve-button").onclick = function() {startGeneticAlgorithm(getText(),
                                                                                            controlsView.getPopulationSize(),
                                                                                            controlsView.getMutationRate())};
       document.getElementById("more-options-button").onclick = function() {toggleControls()};
    })

    function toggleControls() {
        controlsView.show()
        var button = document.getElementById("more-options-button")
        var text = button.textContent;
        if (text === "More Options") {
            controlsView.show();
            button.textContent = "Less Options";
        } else {
            controlsView.hide();
            button.textContent = "More Options";
        }
    }

    function getText() {
       input = document.getElementById("inputbox")
       text = input.value || input.placeholder
       return text;
    }
});
