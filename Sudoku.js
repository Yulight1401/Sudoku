/**
 * Created by yul on 16-12-21.
 */
var Sudo=(function () {
    var generateArr=function () {
        var arr=[];
        for (var i = 0; i < 9; i++) {
            arr[i] = [];
            for (var j = 0; j < 9; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }
    var check=function (arr) {
        var status={status:true,i:1,j:1};
        for(var i in arr){
            if(!checkRow(arr,i)) {status.status=false;(function(i){status.i=++i;console.log(i)})(i)}
        }
        for(var j in arr[i]){
            if(!checkLine(arr,j)) {status.status=false;status.j=function(j){return ++j}(j)}
        }
        return status;
    }
    var getBlanks=function (easy) {
        var i=0,blanks=new Array(9);
        for(var i=0;i<9;i++){
            blanks[i]=new Array(9);
            for(var k=0;k<9;k++){
                blanks[i][k]=1;
            }
        }
        while(true){
            if(i==easy) break;
            var x=Math.floor(Math.random()*9);
            var y=Math.floor(Math.random()*9);
            if(blanks[x][y]==1){
                blanks[x][y]=0;
            }
            i++
        }
        return blanks;
    }
    /**
     * 获取n-m的随机整数
     * @param {} n
     * @param {} m
     * @return {}
     */
    var random=function(n, m) {
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    }

    /**
     * 检测行是否符合标准
     * @param {} arr
     * @param {} row
     * @return {Boolean}
     */
    var checkRow=function (arr, row) {
        for (var j = 0; j < 8; j++) {
            if (arr[row][j] == 0) {
                continue;
            }
            for (var k = j + 1; k < 9; k++) {
                if (arr[row][j] == arr[row][k]||arr[row][j]==-1) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 检测列是否符合标准
     * @param {} arr
     * @param {} col
     * @return {Boolean}
     */
    var checkLine=function(arr, col) {
        for (var j = 0; j < 8; j++) {
            if (arr[j][col] == 0) {
                continue;
            }
            for (var k = j + 1; k < 9; k++) {
                if (arr[j][col] == arr[k][col]||arr[j][col]==-1) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 检测3X3是否符合标准
     * @param {} arr
     * @param {} row
     * @param {} col
     * @return {Boolean}
     */
    var checkNine=function(arr, row, col) {
        // 获得左上角的坐标
        var j = Math.floor(row / 3) * 3;
        var k = Math.floor(col / 3) * 3;
        // 循环比较
        for (var i = 0; i < 8; i++) {
            if (arr[j + Math.floor(i / 3)][k + i % 3] == 0) {
                continue;
            }
            for (var m = i + 1; m < 9; m++) {
                if (arr[j + Math.floor(i / 3)][k + Math.round(i % 3)] == arr[j + Math.floor(m / 3)][k + Math.round(m % 3)]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 检查对角线是否符合标准(左上->右下)
     * @param {} arr
     * @param {} row
     * @param {} col
     */
    var checkDiagonalLeftToRight=function (arr, row, col) {
        if (row != col) {
            return true;
        }
        for (var i = 0; i < 8; i++) {
            if (i == row) {
                continue;
            }
            if (arr[i][i] == arr[row][col]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检查对角线是否符合标准(右上->左下)
     * @param {} arr
     * @param {} row
     * @param {} col
     */
    var checkDiagonalRightToLeft=function (arr, row, col) {
        if ((row + col) != 8) {
            return true;
        }
        for (var i = 0; i < 8; i++) {
            if (i == row) {
                continue;
            }
            if (arr[i][8 - i] == arr[row][col]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 是否满足行、列和3X3区域不重复的要求
     * @param {} arr
     * @param {} row
     * @param {} col
     * @return {}
     */
    var isCorret=function (arr, row, col) {
        return (checkRow(arr, row) && checkLine(arr, col) && checkNine(arr, row, col));
    }

    /**
     * 生成1-9的随机整数
     * @return {}
     */
    var generateRandom=function () {
        return Math.floor(Math.random() * 9 + 1);
    }

    var generateShuDu=function () {
        var arr = generateArr();
        for (var i = 0; i < 9; i++) {
            var time = 0;
            for (var j = 0; j < 9; j++) {
                arr[i][j] = time == 9 ? 0 : generateRandom();
                if (arr[i][j] == 0) {// 不是第一列，则倒退一列
                    if (j > 0) {
                        j -= 2;
                        continue;
                    }
                    else {// 是第一列，则倒退到上一行的最后一列
                        i--;
                        j = 8;
                        continue;
                    }
                }
                if (isCorret(arr, i, j)) {
                    time = 0;// 初始化time，为下一次填充做准备
                }
                else {
                    time++;// 次数增加1
                    j--;// 继续填充当前格
                }
            }
        }
        return arr;
    }
    return {
        creatSudo:generateShuDu,
        getBlanks:getBlanks,
        check:check
    }
})()
