function Snake(img) {
    // 存储坐标
    this.arr = [
        // { x: 8, y: 4 },
        // { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        // { x: 3, y: 4 },
        // { x: 2, y: 4 },
    ];
    // 存储图片
    this.img = img;
    // this.headImage = img.head;
    // this.tailImage = img.tail;
    // this.bodyImg = img.body;
    // 方向  左：37，   上：38，    右：39，    下：40
    // 根据方向确定头部图片 (direction - 37) 就是数组中，图片的序号
    this.direction = 39;
    this.headImage = this.img.head[this.direction - 37];
    this.bodyImage = this.img.body;
    this.tailImage = this.img.tail[this.direction - 37];
    // 是否可以改变方向
    this.lock = false;
}

// 让蛇移动
Snake.prototype.move = function() {
    // 创建一个新的头部对象
    var item = { x: this.arr[0].x, y: this.arr[0].y };
    // 判断方向
    switch (this.direction) {
        // 向左
        case 37:
            // y不变，x减1
            item.x -= 1;
            break;
        // 向上
        case 38:
            // x不变，y减1
            item.y -= 1;
            break;
        // 向右
        case 39:
            // y不变，x加1
            item.x += 1
            break;
        // 向下
        case 40:
            // x不变，y加1
            item.y += 1;
            break;
        default:
            break;
    }
    // 添加头部
    this.arr.unshift(item);
    // 删除尾部
    this.arr.pop();
    // 先处理数组，再判断图片是否应该改变。
    // 确定尾部图片的方向
    // 后去倒数第二个成员
    var second = this.arr[this.arr.length - 2];
    // 尾部是倒数第一个成员
    var tail = this.arr[this.arr.length - 1];
    // 如果x方向相同
    if (second.x === tail.x) {
        // 在垂直方向上，比较y值
        if (second.y > tail.y) {
            // 往下移动
            this.tailImage = this.img.tail[3];
        } else {
            // 向上移动
            this.tailImage = this.img.tail[1];
        }
    } else {
        // x不等，说明在水平方向上
        if (second.x > tail.x) {
            // 向右移动
            this.tailImage = this.img.tail[2];
        } else {
            // 向左移动
            this.tailImage = this.img.tail[0]
        }
    }
    // 蛇移动之后可以解锁
    this.lock = false;
}
// 改变方法
Snake.prototype.change = function(code) {
    // 如果锁住了，不能改变
    if (this.lock) {
        return;
    }
    // 锁住
    this.lock = true;
    // 改变方向
    // 左右移动只能往上下改变方向，上下移动只能往左右改变方向 
    // 获取方向键值之差
    // Math.abs表示取绝对值
    var num = Math.abs(code - this.direction);
    // 同向或者相反方向是不允许的。
    if (num === 0 || num === 2) {
        return;
    }
    // 可以改变方向
    this.direction = code;
    // 更换头部图片方向
    this.headImage = this.img.head[this.direction - 37];
}

// 让蛇成长
Snake.prototype.growUp = function() {
    // 获取尾部
    var tail = this.arr[this.arr.length - 1];
    // 尾部添加
    this.arr.push(tail);
}