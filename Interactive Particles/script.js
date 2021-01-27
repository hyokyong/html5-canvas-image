const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); 

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = []; //color, position와 하나의 파티클을 저장하기 위함


// 마우스 position
let mouse = {
	x: null,
	y: null,
    radius: 100 // circle 사이즈 정의. 마우스 주변에.  
}

//mousemove 이벤트의 이벤트 리스너 설정
window.addEventListener('mousemove', 

    //디폴트로 계속 실행됨?
	function(event){
		mouse.x = event.x + canvas.clientLeft/2; // 왼쪽 테두리의 너비를 마우스 x 포지션에 더함
		mouse.y = event.y + canvas.clientTop/2; // 위쪽 테두리의 너비를 마우스 y 포지션에 더함
});

//안에 코드는 나중에 load event에 붙일 거임
//왜냐면 이 안에 코드들은 이미지가 완벽하게 loading된 후에 필요함
function drawImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;

    const data = ctx.getImageData(0, 0, imageWidth, imageHeight); //ImageData추출 할 직사각형의 왼쪽 상단 모서리에 대한 x 축, y축 좌표, 사각형 너비, 높이
    console.log(data);

    ctx.clearRect(0,0,canvas.width, canvas.height); //사각형 영역을 지워줌

    class Particle {
        constructor(x, y, color, size){
            this.x = x + canvas.width/2 - png.width*2,
            this.y = y + canvas.height/2 - png.width*2,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2 - png.width*2,
            this.baseY = y + canvas.height/2 - png.width*2,
            this.density = ((Math.random() * 10) + 2); //얼마나 빨리 마우스에서 떨어지느냐 2-12 쓸수 있음
        }

        // particle들을 나타내기 위해서 원을 그림
        draw() {
            ctx.beginPath(); //draw를 시작하기 위해 beginPath 메소드를 실행
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); // arc : 원을 그리는 메소드 (x좌표, y좌표, 반지름, 라디안 각도시작, 라디안 각도끝)
            ctx.closePath(); //경로의 현재 지점에서 경로의 시작 지점까지 선을 그림
            ctx.fill(); //현재 그리기 경로를 채움
        }

        // particle의 위치를 계산
        update() {
            ctx.fillStyle = this.color;

            // check mouse position/particle position - collision detection
            // 마우스 interactiong이 시작되면 입자들이 잘 닫히는지 알아야함
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy); // sqrt => 제곱근
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            // distance past which the force is zero
            var maxDistance = 100;
            var force = (maxDistance - distance) / maxDistance;

            // if we go below zero, set it to zero.
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density) * 0.6;
            let directionY = (forceDirectionY * force * this.density) * 0.6;

            if (distance < mouse.radius + this.size){
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX ) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.x -= dx/20;
                } if (this.y !== this.baseY) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.y -= dy/20;
                }
            }
            this.draw();
        }
    }
    function init(){
        particleArray = [];

        //이중 FOR문 돌면서 
        for (var y = 0, y2 = data.height; y < y2; y++) {
            for (var x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb("+data.data[(y * 4 * data.width)+ (x * 4)]+","
                                      +data.data[(y * 4 * data.width)+ (x * 4) +1]+","
                                      +data.data[(y * 4 * data.width)+ (x * 4) +2]
                                      +")";

                    particleArray.push(new Particle(positionX*4, positionY*4, color));

                }
            }
        }
        
    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0,255,0,.5)'; //배경값 밝게 바꿈
        ctx.fillRect(0,0,innerWidth,innerHeight);
       // ctx.clearRect(0,0,innerWidth,innerHeight);
	    
	    for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
	    }
    }
    init();
    animate();

    // RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
    window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	});
}


var png = new Image();
png.src = "data:image/png;base64,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";

// Run drawImage after page has been fully loaded
window.addEventListener('load', (event) => {
    console.log('page has loaded');
    ctx.drawImage(png, 0, 0);
    drawImage();
});