define(function () {

    function ControlsView(generationsCallback,
        fitnessCallback) {

        document.getElementById("generations-box").onclick = function() {
            generationsCallback();
        }

        document.getElementById("fitness-box").onclick = function() {
            fitnessCallback();
        }

        function hide() {
            var controls = document.querySelector("#controls-container");
            controls.style.display = "none";
        }

        function show() {
            var controls = document.querySelector("#controls-container");
            controls.style.display = "initial";
        }

        function getPopulationSize() {
            var populationSizeBox = document.getElementById("population-size-input");
            return getText(populationSizeBox);
        }

        function getMutationRate() {
            var mutationRate = document.getElementById("mutation-rate-input");
            return getText(mutationRate);
        }

        function getText(element) {
           text = element.value || element.placeholder
           return parseFloat(text);
        }

       return {
            hide: hide,
            show: show,
            getPopulationSize: getPopulationSize,
            getMutationRate: getMutationRate
        }
    };
    return ControlsView
});

