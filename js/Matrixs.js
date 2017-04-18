/******************************************
 * 类名：矩阵函数
 * 作用：提供各种矩阵计算
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20150701
 *****************************************/

var Matrixs = {
    //绕X轴旋转矩阵(弧度制参数)
    axisXRotationMatrix: function (angle) {
        var matrix = new THREE.Matrix4();
        matrix.set(
            1, 0, 0, 0,
            0, Math.cos(angle), -Math.sin(angle), 0,
            0, Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        );
        return matrix;
    },

    //绕Y轴旋转矩阵(弧度制参数)
    axisYRotationMatrix: function (angle) {
        var matrix = new THREE.Matrix4();
        matrix.set(
            Math.cos(angle), 0, Math.sin(angle), 0,
            0, 1, 0, 0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0, 0, 0, 1
        );
        return matrix;
    },

    //绕轴旋转矩阵(弧度制参数)
    axisZRotationMatrix: function (angle) {
        var matrix = new THREE.Matrix4();
        matrix.set(
            Math.cos(angle), -Math.sin(angle), 0, 0,
            Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return matrix;
    },

    //A向量旋转成B向量的变换矩阵
    vectorRotation: function (vectorBefore, vectorAfter) {
        //计算旋转轴
        var a = vectorBefore;
        var b = vectorAfter;
        var cosa = (a.x * b.x + a.y * b.y + a.z * b.z) / Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z) / Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z);
        if (Math.abs(cosa - 1) <= 0.0001) return new THREE.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        if (Math.abs(cosa + 1) <= 0.0001) return new THREE.Matrix4(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
        var c = new THREE.Vector3();
        c.x = a.y * b.z - a.z * b.y;
        c.y = a.z * b.x - a.x * b.z;
        c.z = a.x * b.y - a.y * b.x;
        var rotationAxis = c;
        //计算旋转角度
        a = vectorBefore.x * vectorAfter.x + vectorBefore.y * vectorAfter.y + vectorBefore.z * vectorAfter.z;
        b = Math.sqrt(vectorBefore.x * vectorBefore.x + vectorBefore.y * vectorBefore.y + vectorBefore.z * vectorBefore.z);
        c = Math.sqrt(vectorAfter.x * vectorAfter.x + vectorAfter.y * vectorAfter.y + vectorAfter.z * vectorAfter.z)
        var rotationAngle = Math.acos(a / b / c);
        //计算旋转矩阵
        var angle = rotationAngle;
        var u = rotationAxis;
        var norm = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
        var rotatinMatrix = new THREE.Matrix4();
        u.x = u.x / norm;
        u.y = u.y / norm;
        u.z = u.z / norm;
        rotatinMatrix.set(
                Math.cos(angle) + u.x * u.x * (1 - Math.cos(angle)),
                u.x * u.y * (1 - Math.cos(angle)) - u.z * Math.sin(angle),
                u.y * Math.sin(angle) + u.x * u.z * (1 - Math.cos(angle)),
            0,

                u.z * Math.sin(angle) + u.x * u.y * (1 - Math.cos(angle)),
                Math.cos(angle) + u.y * u.y * (1 - Math.cos(angle)),
                -u.x * Math.sin(angle) + u.y * u.z * (1 - Math.cos(angle)),
            0,

                -u.y * Math.sin(angle) + u.x * u.z * (1 - Math.cos(angle)),
                u.x * Math.sin(angle) + u.y * u.z * (1 - Math.cos(angle)),
                Math.cos(angle) + u.z * u.z * (1 - Math.cos(angle)),
            0,

            0, 0, 0, 1
        );
        return rotatinMatrix;
    }
}