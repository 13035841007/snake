// 游戏类: 负责渲染，游戏交互（判断游戏结束等）
function Game(snake, map, food, block, time) {
    // 存储属性
    this.snake = snake;
    this.map = map;
    this.food = food;
    this.block = block;
    // 定时器句柄
    this.timebar = null;
    // 循环的事件
    this.time = time || 1000;
    // 游戏是否可以正常进行
    this.state = true;
    
    // 初始化
    this.init();
}
// 初始化方法
Game.prototype.init = function() {
    // 将地图初始化
    // this.map.init();
    this.renderMap();
    // 渲染食物
    this.renderFood();
    // 绘制障碍物
    this.renderBlock();
    // 绘制蛇
    this.renderSnake();

    // 启动游戏
    this.start();
    // 绑定事件
    this.bindEvent();
}
// 渲染地图
Game.prototype.renderMap = function() {
    this.map.init();
}
// 渲染食物
Game.prototype.renderFood = function() {
    // 根据食物的横纵坐标，在地图中找到对应的元素，设置其背景图片
    this.map.arr[this.food.y][this.food.x].style.backgroundImage = 'url(' + this.food.img + ')';
    // console.log(this.map, this.food);
    // console.log(this.map.arr[this.food.y][this.food.x]);
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
    // 遍历障碍物成员，将其一一绘制
    for (var i = 0, len = this.block.arr.length; i < len; i++) {
        // 将其渲染
        // 缓存障碍物
        var item = this.block.arr[i]
        // y对应的是行，x对应的是列
        this.map.arr[item.y][item.x].style.backgroundImage = 'url(' + this.block.img + ')'
    }
}
// 渲染蛇
Game.prototype.renderSnake = function() {
    // 特殊绘制头和尾
    var head = this.snake.arr[0];
    var tail = this.snake.arr[this.snake.arr.length - 1];
    // 绘制头
    this.map.arr[head.y][head.x].style.backgroundImage = 'url(' + this.snake.headImage + ')';
    // 绘制身体： 从第二张，绘制到倒数第二张
    for (var i = 1, len = this.snake.arr.length - 1; i < len; i++) {
        // 缓存身体元素
        var body = this.snake.arr[i];
        // 绘制身体
        this.map.arr[body.y][body.x].style.backgroundImage = 'url(' + this.snake.bodyImage + ')'
    }
    // 绘制尾部
    this.map.arr[tail.y][tail.x].style.backgroundImage = 'url(' + this.snake.tailImage + ')';
}
// 清空地图
Game.prototype.clear = function() {
    // 通过地图对象清空
    this.map.clear();
}

// 启动游戏
Game.prototype.start = function() {
    // 缓存this
    var me = this;
    // 启动定时器
    this.timebar = setInterval(function() {
        // console.log(this)
        // 移动蛇
        me.snake.move();
        // 判断边界
        me.checkMap();
        // 是否碰撞障碍物
        me.checkBlock();
        // 检测是否吃到食物
        me.checkFood();
        // 如有游戏在运行，正常绘制
        if (me.state) {
            // 清空之后，重新渲染
            me.clear();
            // 渲染墙和食物
            me.renderBlock();
            // 渲染食物
            me.renderFood();
            // 重新渲染
            me.renderSnake();
        }
    }, this.time)
}

// 绑定事件，控制蛇的移动
Game.prototype.bindEvent = function() {
    // 缓存this
    var me = this;
    // 监听键盘事件
    document.onkeydown = function(e) {
        // console.log(e.keyCode)
        // 改变运行方法
        me.snake.change(e.keyCode);
    }
}

// 游戏结束
Game.prototype.gameOver = function() {
    // 终止游戏
    clearInterval(this.timebar)
    // 游戏结束
    this.state = false;
    // 提示用户
    alert('游戏结束，您的分数：' + this.snake.arr.length)
}

// 检测边界
Game.prototype.checkMap = function() {
    // 判断蛇的头部
    var head = this.snake.arr[0];
    // 判断是否超出边界
    if (head.x < 0 || head.y < 0 || head.x >= this.map.col || head.y >= this.map.row) {
        // 终止游戏
        this.gameOver();
    }
}

// 检测是否碰撞障碍物
Game.prototype.checkBlock = function() {
    // 获取头部
    var head = this.snake.arr[0];
    // 遍历障碍物
    for (var i = 0; i < this.block.arr.length; i++) {
        // 比较头部与障碍物是否在同一个问题
        // 获取障碍物
        var block = this.block.arr[i];
        // 比较：在同一个位置就是说横纵坐标是相同的。
        if (head.x === block.x && head.y === block.y) {
            // 游戏结束
            this.gameOver();
            // 打断执行
            return;
        }
    }
}

// 蛇是否吃到食物
Game.prototype.checkFood = function() {
    // 蛇的头部与食物重合
    if (this.snake.arr[0].x === this.food.x && this.snake.arr[0].y === this.food.y) {
        // 吃到食物了，蛇要成长
        this.snake.growUp();
        // 重置食物
        this.resetFood();
    }
}
// 重置食物
Game.prototype.resetFood = function() {
    // 随机一个食物的位置
    let x = parseInt(Math.random() * this.map.col);
    let y = parseInt(Math.random() * this.map.row);
    // 判断坐标是否在墙体中
    for (var i = 0; i < this.block.arr.length; i++) {
        // 缓存一个障碍物
        let block = this.block.arr[i];
        // 判断坐标是否重合
        if (block.x === x && block.y === y) {
            // 在墙体中，重新随机食物. 
            this.resetFood();
            // 中断执行
            return;
        }
    }
    // 判断坐标是否在蛇身上
    for (var i = 0; i < this.snake.arr.length; i++) {
        // 缓存蛇的一个部位
        let snake = this.snake.arr[i];
        // 判断坐标是否重合
        if (snake.x === x && snake.y === y) {
            // 重新随机食物
            this.resetFood();
            // 终止执行
            return;
        }
    }
    // 更改食物位置
    this.food.reset(x, y);
}

// window.onkeydown = function(e) {
//     console.log(e.keyCode);
// }