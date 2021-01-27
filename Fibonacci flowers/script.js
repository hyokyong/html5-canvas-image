//canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //canvasrenderingcontext2d 반환
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// let size = 20;
let positionX = 100;
let positionY = 0;
let angle = 0;

//원 만들기
function drawFlower() {
ctx.fillStyle = 'red';
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
ctx.beginPath(); //draw를 시작하기 위해 beginPath 메소드를 실행
ctx.arc(positionX, positionY, 20, 0, Math.PI*2); // arc : 원을 그리는 메소드 (x좌표, y좌표, 반지름, 라디안 각도시작, 라디안 각도끝)
ctx.closePath(); //경로의 현재 지점에서 경로의 시작 지점까지 선을 그림
ctx.fill(); //현재 그리기 경로를 채움
ctx.stroke();
//ctx.fillRect(100,10, 100,100) //사각형 만들기
}

//애니메이션 루프 만드는 함수. 캔버스를 계속 다시 그려줌.
function animate() {
    //draw each framne
    ctx.clearRect(0,0,canvas.width, canvas.height); // 과거값은 지우고 현재값만 보여줌
    // size += 0.05;
    positionX += 1 * Math.sin(angle); //sin함수는 -1 ~ 1 사이를 변동하는 함수이므로 똑같이 움직임. 숫자를 늘리면 배수만큼 늘어짐
    positionY += 1 * Math.sin(angle);
    angle += 0.1;
    drawFlower();
    requestAnimationFrame(animate);
}
animate();

//19분까지 들음