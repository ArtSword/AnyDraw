var url = "ws://106.55.58.155:8080/ws/";
//var url = "ws://192.168.2.108:8080/ws/";
var ws;


var username;
var penColor = '#000000';

const width = 1900;
const height = 900;

/**
 * 登录
 * @param username 用户名
 */
function login(username) {
    ws = new WebSocket(url + username);
    setup();
}

/**
 * p5js初始化
 */
function setup() {
    let myCanvas = createCanvas(width, height);
    myCanvas.parent('myContainer');
    background(230);
    strokeWeight(2);
}

/**
 * p5js每帧绘画
 */
function draw() {
    if (mouseIsPressed) {
        //画线
        drawLine(penColor, mouseX, mouseY, pmouseX, pmouseY);
        //发送数据包
        sendData(penColor, mouseX, mouseY, pmouseX, pmouseY);
    }
    //更新其他玩家的笔记
    updateDraw();
}

/**
 * 画圆
 */
function drawEllipse() {
    fill(penColor);
    ellipse(mouseX, mouseY, 15, 15);
}

/**
 * 画线
 */
function drawLine(penColor, mouseX, mouseY, pmouseX, pmouseY) {
    stroke(penColor);
    line(mouseX, mouseY, pmouseX, pmouseY);

}

function sendData(penColor, mouseX, mouseY, pmouseX, pmouseY) {
    if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
            message: {
                color: penColor,
                type: 'line',
                mouseX: mouseX,
                mouseY: mouseY,
                pmouseX: pmouseX,
                pmouseY: pmouseY,
            },
            username: username,
            to: "All",
        }));
    }
}

function updateDraw() {
    if (ws.readyState === ws.OPEN) {
        ws.onmessage = function (evt) {//绑定收到消息事件
            let receivedData = JSON.parse(evt.data);
            let data = JSON.parse(receivedData.textMessage);
            drawLine(data.color, data.mouseX, data.mouseY, data.pmouseX, data.pmouseY);
        };
    }
}


function init() {
    //width = windowWidth * 0.8;
    //height = windowHeight * 0.8;

    //初始化颜色选择器
    layui.use('colorpicker', function () {
        var colorpicker = layui.colorpicker;
        //渲染
        colorpicker.render({
            elem: '#colorPicker',  //绑定元素
            colors: penColor,
            change: function (color) {
                penColor = color;
            }
        });
    });
}

window.onload = function () {
    init();
    username = prompt("输入昵称在线玩");
    if (!username) {
        alert("不输入昵称自己玩");
    } else {
        login(username);
    }
};



