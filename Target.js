class Target extends Vehicle {
    constructor(x,y) {
        super(x,y);
        //this.vel = createVector(5,3);
        this.vel = createVector(0,0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill('#f063A4');
        push()
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        circle(0, 0, this.r*2);
        pop();
    }
}