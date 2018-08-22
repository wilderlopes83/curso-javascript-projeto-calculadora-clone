class CalcController{

    constructor (){
        this._displayCalc = "0";
        this._currentDate;

        this.initialize();
    }

    initialize(){
        let displayCalcEL = document.querySelector("#display");
        let dateELdocument = document.querySelector("#data");
        let timeELdocument = document.querySelector("#hora");

        displayCalcEL.innerHTML = "4567";
        dateELdocument.innerHTML = "22/08/2018";
        timeELdocument.innerHTML = "18:34";
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }

    get currentDate(){
        return this._dataAtual;
    }

    set currentDate(valor){
        this._currentDate = valor;
    }

}