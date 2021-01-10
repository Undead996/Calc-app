window.addEventListener("load", goCalc);
function goCalc():void{
    let calc:Calc = new Calc;
    calc.setInp();
    calc.setOut();
    calc.setButtons();
}
class Calc{

    private inp:any;
    private out:any;
    private btns:any;
    private tmp:string[];
    private keyEvents:string[]=["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*", "=", "."];
    private regExp:RegExp = new RegExp(/^\d+(?:,\d{3})*(?:\.\d{1,6})?|^\-\d+(?:,\d{3})*(?:\.\d{1,6})?|\d+(?:,\d{3})*(?:\.\d{1,6})?|\-|\+|\*|\/|\=/g);
    constructor(){
        this.select = this.select.bind(this);
        this.mainCalc = this.mainCalc.bind(this);
        this.handKeys = this.handKeys.bind(this);
        this.clear = this.clear.bind(this);
        this.inpCheck = this.inpCheck.bind(this);
    }

    public setInp():void{
        let inp:any = document.querySelector("#inp");
        inp.addEventListener("keypress", this.handKeys);
        this.inp = inp;
    }

    public setOut():void{
        let out:any = document.querySelector("#out");
        this.out = out;
    }

    public setButtons():void{
        let btns:any = document.querySelectorAll(".input-area button");
        for(let i:number=0;i<btns.length;i++){
            if(btns[i].innerText === "C"){
                btns[i].addEventListener("click", this.clear);
            }if(btns[i].innerText!="C" && btns[i].textContent!="←"){
                btns[i].addEventListener("click", this.select);
            }         
        }
        this.btns = btns;
    }

    private inpCheck(val:string):boolean{
        for(let i:number=10; i<this.keyEvents.length; i++){
            if(val===this.inp.value[this.inp.value.length-1]&&val===this.keyEvents[i]){
                return true;
            }
            for(let j:number=10; j<this.keyEvents.length; j++){
                if(this.inp.value[this.inp.value.length-1]===this.keyEvents[j]&&val===this.keyEvents[i]){
                    return true;
                }
            }
        }
    }

    public select(e):void{
        if(this.inpCheck(e.target.textContent)){
            return
        };
        this.inp.value = this.inp.value+e.target.textContent;
        this.mainCalc();
    }

    public handKeys(e){
        e.preventDefault();
        if(this.inpCheck(e.key)){
            return
        };
        if(this.keyEvents.includes(e.key)){
            this.inp.value +=e.key;
        }if(e.keyCode=== 13){
            this.inp.value+="=";
        }
        this.mainCalc();
    }

    public mainCalc():void{
        this.tmp=this.inp.value.match(this.regExp);
        let a:number;
        let b:number;
        let c:string;
        if(this.tmp.length>3){
                a=+this.tmp[0];
                b=+this.tmp[2];
                c=this.tmp[3];
                if(this.tmp[1]==="+"){
                    this.tmp=[`${a+b}`,`${c}`];
                }if(this.tmp[1]==="-"){
                    this.tmp=[`${a-b}`,`${c}`];
                }if(this.tmp[1]==="*"){
                    this.tmp=[`${a*b}`,`${c}`];
                }if(this.tmp[1]==="/"){
                    this.tmp=[`${a/b}`,`${c}`];
                }
                if(c==="="){
                    this.tmp.pop();
                }
            let arr:string[]=this.tmp[0].match(this.regExp);
            this.tmp[0]=arr[0];
            console.log(this.tmp);
            this.useOut();
            if(this.tmp[1]){
                this.inp.value=this.tmp[0]+this.tmp[1];
            }else{
                this.inp.value=this.tmp[0];
            }
        }
    }

    private useOut():void{
        this.out.innerHTML+=`<p>${this.tmp[0]}</p>`;
        if(this.out.childNodes.length>3){
            this.out.firstChild.remove();
        }
    }
    
    public clear():void{
        this.inp.value="";
        this.tmp=[];
        this.out.innerHTML="";
    }
}
