import React, { useEffect, useRef } from 'react';

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

const viewWidth =  window.innerWidth; // 768 window.innerWidth does not quite work
const viewHeight = window.innerHeight; // 400
const timeStep = 1 / 60;

class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Particle {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
  time: number;
  duration: number;
  color: string;
  w: number;
  h: number;
  complete: boolean;
  x: number;
  y: number;
  r: number;
  sy: number;

  constructor(p0: Point, p1: Point, p2: Point, p3: Point) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);

    this.w = 8;
    this.h = 6;

    this.complete = false;
    this.x = p0.x;
    this.y = p0.y;
    this.r = 0;
    this.sy = 1;
  }

  update() {
    this.time = Math.min(this.duration, this.time + timeStep);

    const f = Ease.outCubic(this.time, 0, 1, this.duration);
    const p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

    const dx = p.x - this.x;
    const dy = p.y - this.y;

    this.r = Math.atan2(dy, dx) + HALF_PI;
    this.sy = Math.sin(Math.PI * f * 10);
    this.x = p.x;
    this.y = p.y;

    this.complete = this.time === this.duration;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.scale(1, this.sy);

    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

    ctx.restore();
  }
}

class Loader {
  x: number;
  y: number;
  r: number;
  private _progress: number;
  complete: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.r = 24;
    this._progress = 0;

    this.complete = false;
  }

  reset() {
    this._progress = 0;
    this.complete = false;
  }

  set progress(p: number) {
    this._progress = p < 0 ? 0 : p > 1 ? 1 : p;

    this.complete = this._progress === 1;
  }

  get progress() {
    return this._progress;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, -HALF_PI, TWO_PI * this._progress - HALF_PI);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.fill();
  }
}

// pun intended
class Exploader {
  x: number;
  y: number;
  startRadius: number;
  time: number;
  duration: number;
  progress: number;
  complete: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.startRadius = 24;

    this.time = 0;
    this.duration = 0.4;
    this.progress = 0;

    this.complete = false;
  }

  reset() {
    this.time = 0;
    this.progress = 0;
    this.complete = false;
  }

  update() {
    this.time = Math.min(this.duration, this.time + timeStep);
    this.progress = Ease.inBack(this.time, 0, 1, this.duration);

    this.complete = this.time === this.duration;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.startRadius * (1 - this.progress), 0, TWO_PI);
    ctx.fill();
  }
}

const Ease = {
  inCubic(t: number, b: number, c: number, d: number) {
    t /= d;
    return c * t * t * t + b;
  },
  outCubic(t: number, b: number, c: number, d: number) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  inOutCubic(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },
  inBack(t: number, b: number, c: number, d: number, s = 1.70158) {
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
};

function cubeBezier(p0: Point, c0: Point, c1: Point, p1: Point, t: number): Point {
  const p = new Point();
  const nt = 1 - t;

  p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
  p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

  return p;
}

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const loader = useRef<Loader>();
  const exploader = useRef<Exploader>();
  const phase = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    initDrawingCanvas(ctx);

    const loop = () => {
      update();
      draw(ctx);

      if (phase.current === 0 && loader.current?.complete) {
        phase.current = 1;
      } else if (phase.current === 1 && exploader.current?.complete) {
        phase.current = 2;
      } else if (phase.current === 2 && checkParticlesComplete()) {
        // reset
        return
        // phase.current = 0;
        // loader.current?.reset();
        // exploader.current?.reset();
        // particles.current.length = 0;
        // createParticles();
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  const initDrawingCanvas = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current!;
    canvas.width = viewWidth;
    canvas.height = viewHeight;

    createLoader();
    createExploader();
    createParticles();
  };

  const createLoader = () => {
    loader.current = new Loader(viewWidth * 0.5, viewHeight * 0.5);
  };

  const createExploader = () => {
    exploader.current = new Exploader(viewWidth * 0.5, viewHeight * 0.5);
  };

  const createParticles = () => {
    particles.current = [];
    for (let i = 0; i < 128; i++) {
      const p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
      const p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
      const p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
      const p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

      particles.current.push(new Particle(p0, p1, p2, p3));
    }
  };

  const update = () => {
    switch (phase.current) {
      case 0:
        if (loader.current) loader.current.progress += 1 / 45;
        break;
      case 1:
        if (exploader.current) exploader.current.update();
        break;
      case 2:
        particles.current.forEach((p) => p.update());
        break;
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    switch (phase.current) {
      case 0:
        loader.current?.draw(ctx);
        break;
      case 1:
        exploader.current?.draw(ctx);
        break;
      case 2:
        particles.current.forEach((p) => p.draw(ctx));
        break;
    }
  };

  const checkParticlesComplete = () => {
    return particles.current.every((p) => p.complete);
  };

  return <canvas ref={canvasRef} id="drawing_canvas" />;
};

export default Confetti;
