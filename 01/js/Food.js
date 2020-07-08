// 食物类
function Food(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
}

// 重置位置
Food.prototype.reset = function(x, y) {
    // 更新坐标。
    this.x = x;
    this.y = y;
}