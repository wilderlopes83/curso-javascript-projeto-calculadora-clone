class CalcController{

    constructor (){
        this._lastOperator = '';
        this._lastNumber = '';
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

        this.setLastNumberToDisplay();
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
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this._lastNumber = this.getLastItem(false);
        this._lastOperator = this.getLastItem();
        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];        
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);
        
        if (this._operation.length > 3){

            this.calc();
        }

    }

    getResult(){
        return eval(this._operation.join(""));
    }

    

    calc(){

        let last = '';
        this._lastOperator = this.getLastItem();

        //tratamentos para funcionalidade de "=" da calculadora do windows
        if (this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }
        
        if (this._operation.length > 3){
            last = this._operation.pop();            
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%'){
            //result = result / 100;
            result /= 100;

            this._operation = [result];
        } else {

            this._operation = [result];

            if (last) this._operation.push(last);
        }

        

        this.setLastNumberToDisplay();
        
    }

    getLastItem(isOperator=true){
        let lastItem;

        for (let i=this._operation.length-1; i>=0; i--){

            if (this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }


        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (! lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){
        
        if(isNaN(this.getLastOperation())){
        
            if (this.isOperator(value)){
                //trocar o operador                
                this.setLastOperation(value);                
            } else if (isNaN(value)) {
                //outra coisa 
                console.log("A" + value);
            } else {
                this.pushOperation(value); 
                
                //atualizar display
                this.setLastNumberToDisplay();
            }

        } else {

            if (this.isOperator(value)){
                //adiciona o operador no array
                this.pushOperation(value); 

            } else {            
                
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberToDisplay();
            }
        }

        

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
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;                
            case 'subtracao':
            this.addOperation('-');
                break;                                
            case 'multiplicacao':
            this.addOperation('*');
                break;                                
            case 'divisao':
            this.addOperation('/');
                break;                                                
            case 'porcento':
            this.addOperation('%');
                break;                                                                
            case 'igual':
                this.calc();
                break;                                                                                
            case 'ponto':
                this.addOperation('.');
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
        return this._displayCalcEL.innerHTML;
    }

    set displayCalc(valor){
        this._displayCalcEL.innerHTML = valor;
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