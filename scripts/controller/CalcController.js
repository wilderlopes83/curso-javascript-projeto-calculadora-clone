class CalcController{

    constructor (){
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

    initButtonsEvents(){
        //consulta no dom por todas as classes "g" abaixo do id "buttons" 
        //e todas as classes "g" abaixo do id "parts"
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");        

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e=>{
                console.log(btn.className.baseVal.replace("btn-", ""));
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