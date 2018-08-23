class CalcController{

    constructor (){
        this._operation = [];
        this._displayCalcEL = document.querySelector("#display");
        this._dateEL = document.querySelector("#data");
        this._timeEL = document.querySelector("#hora");
        this._locale = "pt-BR";

        this._currentDate;

        this.initialize();
        this.initButtonsEvents(); 
    }

    initialize(){

        this.setDisplayDateTime();           
        
      
        setInterval(() =>{

            this.setDisplayDateTime();

        }, 1000)
    }

    addEventListenerAll(element, events, fn){
        events.split(' ')        .forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    addOperation(value){
        
        this._operation.push(value);

        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry
                break;
            case 'soma':
                
                break;                
            case 'subtracao':
                
                break;                                
            case 'multiplicacao':
                
                break;                                
            case 'divisao':
                
                break;                                                
            case 'porcento':
                
                break;                                                                
            case 'igual':
                
                break;                                                                                
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;

        }
    }

    initButtonsEvents(){
        //consulta no dom por todas as classes "g" abaixo do id "buttons" 
        //e todas as classes "g" abaixo do id "parts"
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");        

        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', () => {
                //console.log(btn.className.baseVal.replace("btn-", ""));
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {
                btn.style.cursor = "pointer";
            })
        });
                
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalc(){
        return this._displayCalc.innerHTML;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }

    get displayDate(){
        return this._dateEL.innerHTML;
    }

    set displayDate(valor){
        this._dateEL.innerHTML = valor;
    }

    get displayTime(){
        return this._timeEL.innerHTML;
    }    

    set displayTime(valor){
        this._timeEL.innerHTML = valor;
    }

    get currentDate(){                
        return new Date();
    }

    set currentDate(valor){
        this._currentDate = valor;
    }

}