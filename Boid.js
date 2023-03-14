class Boid {
    constructor(x,y) {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 6));
        this.acceleration = createVector();
        this.r = 8;
        this.maxForce = 1;
        this.maxSpeed = 2;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    flock(boids) {
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        seperation.mult(separationSlider.value());
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation)
    }

    align(boids) {
        let perceptionRadius = 50;
        let total = 0;
        let steering = createVector();
        for (let other of boids) {

            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            // add up the velocity of the boids near this
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            // steering = this.velocity - desired velocity 
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let total = 0;
        let steering = createVector();
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            // add up the velocity of the boids near this
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    seperation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {

            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            // add up the velocity of the boids near this
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                // get the differnce between this.position and others position
                diff.div(d);
                // farther away it is the lower the magnitude 
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }



        
    show() {
        noStroke();
        fill(255);
        push();
        translate(this.position.x, this.position.y);
        //rotate(this.velocity.heading());
        ellipse(this.position.x, this.position.y, this.r*2, this.r);
        triangle(this.position.x + this.r, this.position.y, this.position.x + 15, this.position.y - 5, this.position.x + 15, this.position.y + 5);
        pop();
        //line(this.position.x, this.position.y, this.position.x + this.velocity.x, this.position.y + this.velocity.y);
        //console.log(this.velocity.x, this.velocity.y);
    }

    edges() {
        if (this.position.y >= height) {
            this.position.y = 0;
        } else if (this.position.y <= 0) {
            this.position.y = height;
        }
        if (this.position.x >= width) {
            this.position.x = 0;
        } else if (this.position.x <= 0) {
            this.position.x = width;
        }
    }
}