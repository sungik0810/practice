import {Hill} from "./hill.js";

import {SheepController} from "./sheep-controller.js";

class App {
    constructor(){
        //캔버스 만들기 & html에 캔버스 삽입
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#fd6bea',0.2,12),
            new Hill('#ff59c2',0.5,8),
            new Hill('#ff4674',1.4,6)
        ];
        
        this.sheepController = new SheepController();

        // 윈도우가 resize되면 this.resize를 실행할건데 resize를 지금 this를 넣어 실행하라
        window.addEventListener("resize",this.resize.bind(this),false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2)

        for(let i = 0; i<this.hills.length; i++){
            this.hills[i].resize(this.stageWidth,this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        
        let dots;
        for(let i=0; i<this.hills.length; i++){
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx,t,dots)
    }

}

window.onload = () => {
    new App()
};