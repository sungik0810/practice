export class Hill {
    constructor(color,speed,total){
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stagewidth, stageHeight){
        this.stagewidth = stagewidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stagewidth / (this.total - 2));

        for(let i = 0; i < this.total; i++){
            this.points[i] = {
                x : i * this.gap,
                y : this.getY()
            }
        }
    }
    //실제 윈도우에 그려주는 함수
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        if(cur.x > -this.gap){
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getY()
            });
        } else if(cur.x >this.stagewidth + this.gap){
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x,cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for(let i = 1; i< this.points.length; i++){
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x,prev.y,cx,cy);

            dots.push({
                x1:prevCx,
                y1:prevCy,
                x2:prev.x,
                y2:prev.y,
                x3:cx,
                y3:cy,
            });
            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x,prev.y);
        ctx.lineTo(this.stagewidth,this.stageHeight);
        ctx.lineTo(this.points[0].x,this.stageHeight);
        ctx.fill();

        return dots;
    }
    //언덕의 y값을 랜덤으로 주기 위해 만든 함수
    getY(){
        const min = this.stageHeight/8;
        const max = this.stageHeight-min;
        return min + Math.random() * max;
    }
}