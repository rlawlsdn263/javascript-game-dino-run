let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//*등장 캐릭터의 속성부터 Object 자료에 정리해두면 편리함
let dino = {
  //공룡 등장 좌표
  x: 10,
  y: 200,
  //공룡 사이즈
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    //왼쪽 위에서부터 (x, y)에 width*height 네모 생성
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

dino.draw();

//*장애물도 역시 속성부터  Object 자료에 정리해두면 편리함
//장애물들은 width, height이 각각 달라 비슷한 객체가 많이 필요해 class로 만드는 게 일반적
class Cactus {
  constructor() {
    //등장위치
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let cactus = new Cactus();
cactus.draw();

let timer = 0;
let 선인장들 = [];

//*애니메이션 만들려면 1초에 60번 x++해줘야함.
function 프레임마다실행할거() {
  //자바스크립트 기본 함수
  //함수 안에 함수가 있다
  requestAnimationFrame(프레임마다실행할거);
  timer++;

  //그리기 전에 지우면 잔상 사라짐
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //*우측에 소환된 장애물&배경이 서서히 다가옴
  //실행횟수는 모니터마다 다름
  //장애물은 2-3초에 나와야함. 1초에 60프레임.
  //*120F마다 {장애물} 이쁘게 생성
  if (timer % 120 === 0) {
    //장애물 여러개 관리하기 => 장애물 만들때마다 array에 담아서 보관.
    let cactus = new Cactus();
    선인장들.push(cactus);
  }

  //배열 안에 있던거 한 번에 draw();
  선인장들.forEach((a) => {
    a.x--;
    a.draw();
  });
  cactus.draw();

  dino.draw();
}

프레임마다실행할거();
