import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

import { bracketTreeStaggerFadeAnimationEnter } from 'src/app/animations';

@Component({
  selector: 'app-bracket-tree',
  templateUrl: './bracket-tree.component.html',
  styleUrls: ['./bracket-tree.component.scss'],
  animations: [bracketTreeStaggerFadeAnimationEnter],
})
export class BracketTreeComponent implements OnInit, OnDestroy {
  constructor(public dataService: GamedataService) {}

  winnerOverlayActive: boolean = true;
  fireworks: Fireworks;

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    if (!event.shiftKey) return;
    if (event.code != 'KeyO') return;

    this.winnerOverlayActive = !this.winnerOverlayActive;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event) {
    this.fireworks.resizeCanvas();
  }

  ngOnInit(): void {
    this.fireworks = new Fireworks();
    console.log("new");
    
  }

  ngOnDestroy(): void {
    console.log("stop");
    this.fireworks.shouldStop = true;
  }
}

class Fireworks {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvas2: HTMLCanvasElement;
  ctx2: CanvasRenderingContext2D;

  w: number;
  h: number;
  particles: Particle[] = [];
  probability: number = 0.04;
  shouldStop: boolean = false;

  constructor() {
    this.canvas = document.getElementById('fireworks-cnv') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvas2 = document.createElement('canvas') as HTMLCanvasElement;
    this.ctx2 = this.canvas2.getContext('2d') as CanvasRenderingContext2D;
    this.ctx2.globalAlpha = 0.8;

    this.resizeCanvas();

    this.updateWorld();
  }

  resizeCanvas() {
    this.w = this.canvas.width = this.canvas2.width = window.innerWidth;
    this.h = this.canvas.height = this.canvas2.height = window.innerHeight;
  }

  updateWorld() {
    console.log("update");

    // produce faded copy of current canvas
    this.ctx2.globalAlpha = 0.8;
    this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
    this.ctx2.drawImage(this.canvas, 0, 0);

    // redraw faded copy on original canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.canvas2, 0, 0);

    //this.ctx.fillStyle = "#00000033";
    //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.update();
    this.paint();

    if(!this.shouldStop) {
      window.requestAnimationFrame(this.updateWorld.bind(this));
    }
  }

  update() {
    if (this.particles.length < 500 && Math.random() < this.probability) {
      this.createFirework();
    }
    let alive = [];
    for (let particle of this.particles) {
      if (particle.move()) {
        alive.push(particle);
      }
    }
    this.particles = alive;
  }

  paint() {
    for (let particle of this.particles) {
      particle.draw(this.ctx);
    }
  }

  createFirework() {
    let xPoint = Math.random() * (this.w - 200) + 100;
    let yPoint = Math.random() * (this.h - 200) + 100;
    let nFire = Math.random() * 30 + 50;
    let c =
      'rgb(' +
      ~~(Math.random() * 200 + 55) +
      ',' +
      ~~(Math.random() * 200 + 55) +
      ',' +
      ~~(Math.random() * 200 + 55) +
      ')';
    for (let i = 0; i < nFire; i++) {
      let particle = new Particle(xPoint, yPoint, c);
      let vy = Math.sqrt(25 - particle.vx * particle.vx);
      if (Math.abs(particle.vy) > vy) {
        particle.vy = particle.vy > 0 ? vy : -vy;
      }
      this.particles.push(particle);
    }
  }
}

class Particle {
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  gravity: number = 0.05;

  constructor(x: number, y: number, color: string) {
    this.w = this.h = Math.random() * 4 + 1;

    this.x = x - this.w / 2;
    this.y = y - this.h / 2;

    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;

    this.alpha = Math.random() * 0.5 + 0.5;

    this.color = color;
  }

  move() {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (
      this.x <= -this.w ||
      this.x >= screen.width ||
      this.y >= screen.height ||
      this.alpha <= 0
    ) {
      return false;
    }
    return true;
  }

  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.beginPath();
    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
}
