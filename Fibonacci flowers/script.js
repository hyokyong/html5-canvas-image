//canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //canvasrenderingcontext2d 반환
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.globalCompositeOperation = 'destination-over' //도형 합성. 새로운 도형이 원래 도형 아래에 그려집니다.
let hue = Math.random() * 360;

let number = 0; //하나의 입자나 꽃잎이 그려지기 위해
let scale = 10; //반지름이 커지는 역할


//원 만들기
function drawFlower() {
    let angle = number * 2; // number와 동일
    let radius = scale * Math.sqrt(number); //sacle과 동일 //제곱근 함수 - 아주 느리게 증가시키기 위해 사용
    let positionX = radius * Math.sin(angle) + canvas.width/2;
    let positionY = radius * Math.cos(angle) + canvas.height/2;

    ctx.fillStyle = 'hsl(' + hue + ', 80%, 80%)'; //색조, 채도 및 명도 (HSL)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath(); //draw를 시작하기 위해 beginPath 메소드를 실행
    ctx.arc(positionX, positionY, 8, 0, Math.PI*2); // arc : 원을 그리는 메소드 (x좌표, y좌표, 반지름, 라디안 각도시작, 라디안 각도끝)
    ctx.closePath(); //경로의 현재 지점에서 경로의 시작 지점까지 선을 그림
    ctx.fill(); //현재 그리기 경로를 채움
    ctx.stroke();

    number++;
    hue+=0.5;
}

//애니메이션 루프 만드는 함수. 캔버스를 계속 다시 그려줌.
function animate() {
    //draw each framne
    drawFlower();
    if(number > 300) return;
    requestAnimationFrame(animate);// 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출
} 

animate();