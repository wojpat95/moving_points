// window.requestAnimationFrame = window.requestAnimationFrame
//     || window.mozRequestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.msRequestAnimationFrame;
//
var Point = function (_x, _y) {
    var randAngle = Math.random() * 2* Math.PI;
    this.spead = 0.3;
    this.x = _x;
    this.y = _y;
    this.direction = [Math.cos(randAngle)*this.spead ,Math.sin(randAngle)*this.spead ];
    this.move = function(){

        this.x += this.direction[0];
        this.y += this.direction[1];
    }
};
//
// var Engine = function (id) {
//     this.canvas = document.getElementById(id);
//     this.ctx = this.canvas.getContext("2d");
//     this.canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
//     this.canvas.width = window.innerWidth;
//     this.points = [];
//
//     this.drawPoint = function (point) {
//         var index = (point.x + point.y * this.canvas.width) * 4;
//         this.canvasData.data[index] = 255;
//         this.canvasData.data[index+1] = 0;
//         this.canvasData.data[index+2] = 0;
//         this.canvasData.data[index+3] = 255;
//     };
//
//     this.show = function () {
//         this.ctx.putImageData(this.canvasData, 0, 0);
//     };
//     this.run = function () {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         this.ctx.fillStyle = '#262673';
//         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
//         for(var i= 0; i < this.points.length; i++){
//             this.points[i].move();
//             this.drawPoint(this.points[i]);
//         }
//         this.show();
//     }
// };
//
// var engine = new Engine('myCanvas');
// engine.ctx.fillStyle = '#262673';
// engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);


var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
var ctx = canvas.getContext("2d");

var points = [];
for (var i = 0; i < 100; i++){
    points.push(new Point(Math.ceil(Math.random()*canvas.width),Math.ceil(Math.random()*canvas.height)))
}

function resize_canvas(){
    canvas.width = window.innerWidth;
}

// function run(){
//     engine.run();
//     window.requestAnimationFrame(run)
// }
// run();



function update(event) {
    var x = event.clientX;
    var y = event.clientY;
    var obj = new Point(x,y);
    points.push(obj);
}
function correctPosition(point){
    if (point.x > canvas.width){
        point.x = 0;
        point.direction[1] = -point.direction[1];
    }
    if (point.x < 0){
        point.x = canvas.width;
        point.direction[1] = -point.direction[1];
    }

    if (point.y > canvas.height){
        point.y = 0;
        point.direction[0] = -point.direction[0];
    }
    if (point.y < 0){
        point.y = canvas.height;
        point.direction[0] = -point.direction[0];
    }
}
function distance(point1,point2) {
    return Math.sqrt(Math.pow(Math.abs(point1.x - point2.x),2)+Math.pow(point1.y - point2.y,2));
}

function drawConnections(point){
    var limit = 0.1 * canvas.width;
    points.forEach(function(checkPoint){
        var dist = distance(point,checkPoint);
        if(dist < limit){
            ctx.strokeStyle = "rgba(0,0,128, 0.4)";
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(checkPoint.x, checkPoint.y);
            ctx.lineWidth = 1.3 - 1*dist/limit ;
            ctx.stroke();

            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(checkPoint.x, checkPoint.y);
            ctx.lineWidth = 0.9 - 0.9*dist/limit ;
            ctx.stroke();
        }
    });

}

function run(){
    ctx.fillStyle = '#00001a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.forEach(function(point){
        correctPosition(point);
        point.move();
        ctx.beginPath();
        var grd = ctx.createRadialGradient(point.x, point.y, 1.5, point.x, point.y, 2);
        grd.addColorStop(0, "white");
        grd.addColorStop(0.5, "#0000b3");
        ctx.fillStyle = grd;
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        drawConnections(point);

    });

    window.requestAnimationFrame(run);
}
run();
