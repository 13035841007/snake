// 障碍物类
function Block(img) {
    // 障碍物绘制图片
    this.img = img;
    // 障碍物数组
    this.arr = [
        // 每一个成员代表一个障碍物，保存它的位置
        { x: 3, y: 6 },
        { x: 4, y: 6 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 7, y: 6 },
        { x: 8, y: 6 }
    ]
}