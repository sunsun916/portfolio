AOS.init();

/* 헤더 상단 백그라운드 별 */

const width = window.innerWidth,
  height = window.innerHeight,
  stars = createStars(width, height, 30),
  moon = {
    x: 0,
    y: height / 2,
    r: 45,
  },
  canvas = document.getElementById("nightsky"),
  ctx = canvas.getContext("2d");
let counter = 0,
  time = 0;

function random(max) {
  return Math.floor(Math.random() * max);
}

function createStars(width, height, spacing) {
  const stars = [];

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const star = {
        x: x + random(spacing),
        y: y + random(spacing),
        r: Math.random() * 1.5,
      };
      stars.push(star);
    }
  }
  return stars;
}

function fillCircle(ctx, x, y, r, fillStyle) {
  ctx.beginPath(),
    (ctx.fillStyle = fillStyle),
    ctx.arc(x, y, r, 0, Math.PI * 2),
    ctx.fill();
}

function getOpacity(factor) {
  const opacityIncrement = 0.6 * Math.abs(Math.sin(factor)),
    opacity = 0.1 + opacityIncrement;
  return opacity;
}

function render() {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  let newX = time / 10 - 45;
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#0a2342");
  //배경 그래디언트
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  stars.forEach(function (star, i) {
    const factor = counter * i,
      x = star.x,
      y = star.y,
      opacity = getOpacity(factor),
      randomColor = Math.floor(Math.random() * 360 + 1);

    fillCircle(ctx, x, y, star.r, `hsla(${randomColor}, 30%, 80%, ${opacity})`); //별 그리기
  });

  /*
  newX <= width + 90 // window 너비에 달 지름 추가
    ? ((moon.x = newX), (moon.y = newY(newX)), (time += 5))
    : (time = 0),
    // 달에 애니메이션 추가
  */
  //fillCircle(ctx, moon.x, moon.y, moon.r, "#f5f3ce");  달 그리기

  fillCircle(ctx, "#f5f3ce"); //달 빼기
  counter++;

  requestAnimationFrame(render);
}

function newY(x) {
  return Math.pow(x - width / 2, 2) / 9000 + height / 2 + 1;
}

(canvas.width = width), (canvas.height = height), render();

//햄버거 메뉴

// const menuTrigger = document.querySelector(".menuTrigger");

// menuTrigger.addEventListener("click", (event) => {
//   event.currentTarget.classList.toggle("active-1");
// });

//햄버거 메뉴 2


  const bamBtn = document.querySelector(".hamBtn"); //클래스 호출
  bamBtn.addEventListener("click", () => {
    bamBtn.classList.toggle("toggle"); // toggle class가 있으면 제거 없으면 추가
  });


//햄버거 메뉴 클릭시 나타나는 sideMenu 


  const fullscreen = document.querySelector(".fullscreen"); //클래스 호출
  bamBtn.addEventListener("click", () => {
    fullscreen.classList.toggle("open"); // toggle class가 있으면 제거 없으면 추가
  });




/*
$('.hamBtn').click(function() {
  $(this).toggleClass('active');
  $('#fullscreen').toggleClass('open');
 });
*/

//메뉴바

$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 1) {
      $(".topMenu").css("background", "#000");
    } else {
      $(".topMenu").css("background", "");
    }
  });
});

//하단 bg

/*
var c = document.getElementById("canv");
var $ = c.getContext("2d");

var w = (c.width = window.innerWidth);
var h = (c.height = window.innerHeight);

var arr = [];
var u = 0;
var dep = w;
var dp = 0.7;
var ms = {
  x: 0,
  y: 0,
};
var msd = {
  x: 0,
  y: 0,
};

function Obj(x, y, z) {
  this.set(x, y, z);
}

Obj.prototype = {
  set: function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  },
  rotX: function (ang) {
    var y = this.y;
    var z = this.z;
    this.y = y * Math.cos(ang) - z * Math.sin(ang);
    this.z = z * Math.cos(ang) + y * Math.sin(ang);
  },
  rotY: function (ang) {
    var x = this.x;
    var z = this.z;
    this.x = x * Math.cos(ang) - z * Math.sin(ang);
    this.z = z * Math.cos(ang) + x * Math.sin(ang);
  },
  rotZ: function (ang) {
    var x = this.x;
    var y = this.y;
    this.x = x * Math.cos(ang) - y * Math.sin(ang);
    this.y = y * Math.cos(ang) + x * Math.sin(ang);
  },
};

function Part(x, y, z) {
  this.op = new Obj(x, y, z);
  this.rp = new Obj(x, y, z);
  this.rot = new Obj();
  this.vel = new Obj();
  this.col = "hsla(216,95%,85%," + rnd(0.5, 1) + ")";
}

function upd(rot) {
  var pos;
  var rot;
  var vel;
  var op;
  var rp;
  var col;
  var size;
  for (var i in arr) {
    op = arr[i].op;
    rp = arr[i].rp;
    rot = arr[i].rot;
    vel = arr[i].vel;
    col = arr[i].col;
    vel.x += msd.x * 0.15;
    vel.y += msd.y * 0.15;
    rp.set(op.x, op.y, op.z);

    rot.x += vel.x;
    rot.y += vel.y;
    rot.z += vel.z;

    rot.x = rot.x > Math.PI * 2 ? 0 : rot.x;
    rot.y = rot.y > Math.PI * 2 ? 0 : rot.y;

    rp.rotY(rot.y);
    rp.rotX(rot.x);

    vel.set(vel.x * dp, vel.y * dp, 0);
  }
  msd.x = 0.0005;
  msd.y = 0.0005;
}

function draw() {
  var t = "Sparkling Blue".split("").join(String.fromCharCode(0x2004));
  $.font = "4em Poiret One";
  $.fillStyle = "hsla(216,95%,85%,.3)";
  $.textBaseline = "middle";
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.5);
  var p, dth;
  for (var i in arr) {
    p = arr[i];
    dth = p.rp.z / dep + 1;
    $.fillStyle = p.col;
    $.fillRect(w + p.rp.x, h + p.rp.y, rnd(dth / 0.8, dth / 2), dth / 0.9);
  }
}

function rnd(min, max) {
  return Math.random() * (max - min) + min;
}

function go() {
  for (var i = 0; i < 6800; i++) {
    var d = new Part(rnd(-w, h), rnd(-w, h), rnd(-dep, dep));
    d.vel.set(0, 0, 0);
    arr.push(d);
  }
}

window.addEventListener(
  "mousemove",
  function (e) {
    msd.x = (e.clientY - ms.y) / w;
    msd.y = (e.clientX - ms.x) / h;
    ms.x = e.clientX;
    ms.y = e.clientY;
  },
  false
);

window.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
    msd.x = (e.touches[0].clientY - ms.y) / w;
    msd.y = (e.touches[0].clientX - ms.x) / h;
    ms.x = e.touches[0].clientX;
    ms.y = e.touches[0].clientY;
  },
  false
);

window.addEventListener(
  "resize",
  function (e) {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
  },
  false
);

function run() {
  $.clearRect(0, 0, w, h);
  var g_ = $.createLinearGradient(
    c.width + c.width,
    c.height + c.height * 1.5,
    c.width + c.width,
    1
  );
  g_.addColorStop(0, "hsla(253, 5%, 75%, 1)");
  g_.addColorStop(0.5, "hsla(314, 95%, 10%, 1)");
  g_.addColorStop(0.8, "hsla(259, 95%, 5%, 1)");
  g_.addColorStop(1, "hsla(0, 0%, 5%, 1)");
  $.globalCompositeOperation = "normal";
  $.fillStyle = g_;
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";
  upd();
  draw();
  window.requestAnimationFrame(run);
}

go();
run();

*/


// 맨위로 버튼 Get the button:
let mybutton = document.getElementById("uptoBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//하단 
/*
var num = 200;
var w = window.innerWidth;
var h = window.innerHeight;
var max = 100;
var _x = 0;
var _y = 0;
var _z = 150;
var dtr = function(d) {
  return d * Math.PI / 180;
};

var rnd = function() {
  return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
};
var dist = function(p1, p2, p3) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
};

var cam = {
  obj: { x: _x,y: _y, z: _z},
  dest: {x: 0, y: 0,z: 1},
  dist: {x: 0,y: 0,z: 200},
  ang: {cplane: 0,splane: 0,ctheta: 0,stheta: 0},
  zoom: 1,
  disp: {x: w / 2,y: h / 2,z: 0},
  upd: function() {
    cam.dist.x = cam.dest.x - cam.obj.x;
    cam.dist.y = cam.dest.y - cam.obj.y;
    cam.dist.z = cam.dest.z - cam.obj.z;
    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
  }
};

var trans = {
  parts: {
    sz: function(p, sz) {
      return {
        x: p.x * sz.x,
        y: p.y * sz.y,
        z: p.z * sz.z
      };
    },
    rot: {
      x: function(p, rot) {
        return {
          x: p.x,
          y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
          z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
        };
      },
      y: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
          y: p.y,
          z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
        };
      },
      z: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
          y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
          z: p.z
        };
      }
    },
    pos: function(p, pos) {
      return {
        x: p.x + pos.x,
        y: p.y + pos.y,
        z: p.z + pos.z
      };
    }
  },
  pov: {
    plane: function(p) {
      return {
        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
        y: p.y,
        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
      };
    },
    theta: function(p) {
      return {
        x: p.x,
        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
      };
    },
    set: function(p) {
      return {
        x: p.x - cam.obj.x,
        y: p.y - cam.obj.y,
        z: p.z - cam.obj.z
      };
    }
  },
  persp: function(p) {
    return {
      x: p.x * cam.dist.z / p.z * cam.zoom,
      y: p.y * cam.dist.z / p.z * cam.zoom,
      z: p.z * cam.zoom,
      p: cam.dist.z / p.z
    };
  },
  disp: function(p, disp) {
    return {
      x: p.x + disp.x,
      y: -p.y + disp.y,
      z: p.z + disp.z,
      p: p.p
    };
  },
  steps: function(_obj_, sz, rot, pos, disp) {
    var _args = trans.parts.sz(_obj_, sz);
    _args = trans.parts.rot.x(_args, rot);
    _args = trans.parts.rot.y(_args, rot);
    _args = trans.parts.rot.z(_args, rot);
    _args = trans.parts.pos(_args, pos);
    _args = trans.pov.plane(_args);
    _args = trans.pov.theta(_args);
    _args = trans.pov.set(_args);
    _args = trans.persp(_args);
    _args = trans.disp(_args, disp);
    return _args;
  }
};

(function() {
  "use strict";
  var threeD = function(param) {
    this.transIn = {};
    this.transOut = {};
    this.transIn.vtx = (param.vtx);
    this.transIn.sz = (param.sz);
    this.transIn.rot = (param.rot);
    this.transIn.pos = (param.pos);
  };

  threeD.prototype.vupd = function() {
    this.transOut = trans.steps(
      this.transIn.vtx,
      this.transIn.sz,
      this.transIn.rot,
      this.transIn.pos,
      cam.disp
    );
  };

  var Build = function() {
    this.vel = 0.04;
    this.lim = 360;
    this.diff = 200;
    this.initPos = 100;
    this.toX = _x;
    this.toY = _y;
    this.go();
  };

  Build.prototype.go = function() {
    this.canvas = document.getElementById("canv");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.$ = canv.getContext("2d");
    this.$.globalCompositeOperation = 'source-over';
    this.varr = [];
    this.dist = [];
    this.calc = [];

    for (var i = 0, len = num; i < len; i++) {
      this.add();
    }

    this.rotObj = {x: 0,y: 0,z: 0};
    this.objSz = {x: w / 5,y: h / 5,z: w / 5};
  };

  Build.prototype.add = function() {
    this.varr.push(new threeD({
      vtx: {x: rnd(),y: rnd(),z: rnd()},
      sz: {x: 0,y: 0,z: 0},
      rot: {x: 20,y: -20,z: 0},
      pos: {
        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
      }
    }));
    this.calc.push({
      x: 360 * Math.random(),
      y: 360 * Math.random(),
      z: 360 * Math.random()
    });
  };

  Build.prototype.upd = function() {
    cam.obj.x += (this.toX - cam.obj.x) * 0.05;
    cam.obj.y += (this.toY - cam.obj.y) * 0.05;
  };

  Build.prototype.draw = function() {
    this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
    cam.upd();
    this.rotObj.x += 0.1;
    this.rotObj.y += 0.1;
    this.rotObj.z += 0.1;

    for (var i = 0; i < this.varr.length; i++) {
      for (var val in this.calc[i]) {
        if (this.calc[i].hasOwnProperty(val)) {
          this.calc[i][val] += this.vel;
          if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
        }
      }

      this.varr[i].transIn.pos = {
        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
      };
      this.varr[i].transIn.rot = this.rotObj;
      this.varr[i].transIn.sz = this.objSz;
      this.varr[i].vupd();
      if (this.varr[i].transOut.p < 0) continue;
      var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p*2);
      this.$.globalCompositeOperation = 'lighter';
       g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
        g.addColorStop(.5, 'hsla('+(i+2)+',85%, 40%,1)');
        g.addColorStop(1,'hsla('+(i)+',85%, 40%,.5)');
        this.$.fillStyle = g;
      this.$.beginPath();
      this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
      this.$.fill();
      this.$.closePath();
    }
  };
  Build.prototype.anim = function() {
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame ||
        function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();
    var anim = function() {
      this.upd();
      this.draw();
      window.requestAnimationFrame(anim);
    }.bind(this);
    window.requestAnimationFrame(anim);
  };

  Build.prototype.run = function() {
    this.anim();

    window.addEventListener('mousemove', function(e) {
      this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
      this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
    }.bind(this));
    window.addEventListener('touchmove',function(e){
      e.preventDefault();
      this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
      this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
    }.bind(this));
    window.addEventListener('mousedown', function(e) {
      for (var i = 0; i < 100; i++) {
        this.add();
      }
    }.bind(this));
    window.addEventListener('touchstart', function(e) {
      e.preventDefault();
      for (var i = 0; i < 100; i++) {
        this.add();
      }
    }.bind(this));
  };
  var app = new Build();
  app.run();
})();
window.addEventListener('resize',function(){
 canvas.width = w = window.innerWidth;
 canvas.height = h = window.innerHeight;
}, false);

*/