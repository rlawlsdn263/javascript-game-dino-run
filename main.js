let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = "dinosaur.png";

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
    ctx.drawImage(img2, this.x, this.y);
  },
};

var img1 = new Image();
img1.src = "catcus.png";

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
    // 네모는 히트박스다
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(img1, this.x, this.y);
  }
}

let cactus = new Cactus();
cactus.draw();

let timer = 0;
let 선인장들 = [];
let 점프타이머 = 0;
let animation;

//*애니메이션 만들려면 1초에 60번 x++해줘야함.
function 프레임마다실행할거() {
  //웹브라우저 기본 기능
  //함수 안에 함수가 있다
  animation = requestAnimationFrame(프레임마다실행할거);
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
  선인장들.forEach((a, i, o) => {
    //x 좌표가 0 미만이면 장애물 제거
    if (a.x < 0) {
      //*제거해주는 코드
      o.splice(i, 1);
    }
    //장애물 이동
    a.x--;

    //충돌체크
    //주인공 VS 모든 장애물 해야하니까 반복문 안에서 했음
    충돌하나(dino, a);
    a.draw();
  });
  //점프기능&속도
  //스페이스바 누를 때만 동작
  if (점프중 == true) {
    dino.y--;
    점프타이머++;
  }

  //뛰었으면 내려와야지
  if (점프중 == false) {
    //최저값 안 정해주면 지옥까지 내려감
    if (dino.y < 200) {
      dino.y++;
    }
  }

  if (점프타이머 > 100) {
    점프중 = false;
    점프타이머 = 0;
  }
  dino.draw();
}

프레임마다실행할거();

//충돌하면 뭔가 일어나야함 => Collision Detection
//충돌 감지는? 좌표계산으로 해야함.
//a요소의 오른쪽 좌표와 b요소의 왼쪽 좌표를 바꿔 음수가 되면 충돌된겨
//y축에서도 동일함. x,y가 만났을 때의 상황을 고려해야함.

//충돌확인인 코드
function 충돌하나(dino, cactus) {
  let x축차이 = cactus.x - (dino.x + dino.width);
  let y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    //충돌했어? 그럼 게임 오버?
    ctx.clearRect(0, 0, canvas, width, canvas, height);
    cancelAnimationFrame(animation);
  }
}

var 점프중 = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});
