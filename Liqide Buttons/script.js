const buttons = document.querySelectorAll('button');
const trubulencce = document.querySelector('feTurbulence');
let verticalFrequency = 0.00001;
trubulencce.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
const steps = 30;
const interval = 10;

buttons.forEach(function(button) {
    button.addEventListener('mouseover', function() {
        verticalFrequency = 0.00001;
        for (i = 0; i < steps; i++) {
            setTimeout(function(){
                verticalFrequency += 0.009;
                trubulencce.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
            }, i * interval);
        }
        setTimeout(function(){
            verticalFrequency = 0.00001;
            trubulencce.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
        })
    }, steps * interval)
})