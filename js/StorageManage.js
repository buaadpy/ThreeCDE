/******************************************
 * 类名：存储管理
 * 作用：负责文件存储逻辑
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/

var StorageManage = function () {
}
StorageManage.prototype = {
    //利用json数据初始化场景
    reRenderSceneByData: function (data) {
        //记录组合关系
        for (var i in data) {
            if (i[0] == 'c') {
                Struct.structManage.combid[Struct.structManage.combid.length] = data[i].id;
                var temp = data[i].idList.split(',');
                var total = Struct.structManage.idLists.length;
                Struct.structManage.idLists[total] = [];
                for (var j = 0; j < temp.length; j++)
                    Struct.structManage.idLists[total][j] = parseInt(temp[j]);
            }
        }
        //设置计数器，计数器为0时表示模型加载完成，可以进行组件组合
        Struct.structManage.callBackCount = data['Total'];
        //依次加载模型
        for (var i in data) {
            if (i[0] == 's') {
                var model = new Structure();
                Struct.structures.push(model);
                model.id = data[i].id;
                model.data.name = data[i].data.name;
                model.data.quality = data[i].data.quality;
                model.data.consumption = data[i].data.consumption;
                model.data.initSize = data[i].data.initSize;
                //由于模型导入的多线程操作，需要采用回调的方法
                model.initByOBJMTL(data[i].pathobj, data[i].pathmtl, data[i].position, data[i].rotation, data[i].scale, function () {
                    Struct.structManage.callBackCount--;
                    if (Struct.structManage.callBackCount == 0) {
                        for (var i = 0; i < Struct.structManage.idLists.length; i++)
                            Struct.structManage.combineByID(Struct.structManage.idLists[i], Struct.structManage.combid[i]);
                        Struct.structManage.idLists = [];
                        Struct.structManage.allUnselect(false);
                    }
                });
            }
        }
        Struct.render();
    },

    //初始化锁设定
    initLockState: function (data) {
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].selectFlag) {
                Struct.structures[i].unselect();
            }
        }
        if (data == null || data.length == 0) return;
        var temp = data.split(',');
        for (var i = 0; i < temp.length; i++) {
            if (Struct.structManage.searchIndexByID(temp[i]) != null)
                Struct.structManage.searchModelByID(temp[i]).lock();
        }
        Struct.render();
        Struct.windowManage.updateLW();
    },

    //场景数据提取
    getSceneJsonData: function () {
        var id = [];
        var total = 0;
        //记录组合体状态
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].combinaFlag) {
                id[id.length] = Struct.structures[i].idList;
                total += Struct.structures[i].idList.length;
            }
            else
                total++;
        }
        //json字符串，total代表组件数
        var ans = "{\"Total\":" + total;
        var no = 0;
        if (total != 0) ans += ",\n";
        for (var i = 0; i < Struct.structures.length; i++) {
            var temp = Struct.structures[i];
            //添加单一组件
            if (!temp.combinaFlag) {
                ans += "\"s" + no + "\" :";
                no++;
                var json = {
                    'id': temp.id,
                    'pathobj': temp.pathobj,
                    'pathmtl': temp.pathmtl,
                    'position': {
                        'x': temp.object.position.x,
                        'y': temp.object.position.y,
                        'z': temp.object.position.z
                    },
                    'rotation': {
                        'x': temp.object.rotation.x,
                        'y': temp.object.rotation.y,
                        'z': temp.object.rotation.z
                    },
                    'scale': {
                        'x': temp.object.scale.x,
                        'y': temp.object.scale.y,
                        'z': temp.object.scale.z
                    },
                    'data': {
                        'name': temp.data.name,
                        'quality': temp.data.quality,
                        'consumption': temp.data.consumption,
                        'initSize': temp.data.initSize
                    }
                };
                ans += JSON.stringify(json);
                if (no != total || id.length != 0)
                    ans += ",\n"
                else
                    ans += "\n"
            } else {
                //对于结构体添加每一个子组件
                for (var j = 0; j < Struct.structures[i].idList.length; j++) {
                    ans += "\"s" + no + "\" :";
                    no++;
                    var tempPosition = new THREE.Vector3(
                            temp.object.children[j].position.x * temp.object.scale.x,
                            temp.object.children[j].position.y * temp.object.scale.y,
                            temp.object.children[j].position.z * temp.object.scale.z);
                    tempPosition.applyMatrix4(Matrixs.axisZRotationMatrix(temp.object.rotation.z));
                    tempPosition.applyMatrix4(Matrixs.axisYRotationMatrix(temp.object.rotation.y));
                    tempPosition.applyMatrix4(Matrixs.axisXRotationMatrix(temp.object.rotation.x));
                    var json = {
                        'id': temp.idList[j],
                        'pathobj': temp.pathobj[j],
                        'pathmtl': temp.pathmtl[j],
                        'position': {
                            'x': temp.object.position.x + tempPosition.x,
                            'y': temp.object.position.y + tempPosition.y,
                            'z': temp.object.position.z + tempPosition.z
                        },
                        'rotation': {
                            'x': temp.object.rotation.x + temp.object.children[j].rotation.x,
                            'y': temp.object.rotation.y + temp.object.children[j].rotation.y,
                            'z': temp.object.rotation.z + temp.object.children[j].rotation.z
                        },
                        'scale': {
                            'x': temp.object.scale.x * temp.object.children[j].scale.x,
                            'y': temp.object.scale.y * temp.object.children[j].scale.y,
                            'z': temp.object.scale.z * temp.object.children[j].scale.z
                        },
                        'data': {
                            'name': temp.data.name[j],
                            'quality': temp.data.quality[j],
                            'consumption': temp.data.consumption[j],
                            'initSize': temp.data.initSize[j]
                        }
                    };
                    ans += JSON.stringify(json);
                    if (no != total || id.length != 0)
                        ans += ",\n"
                    else
                        ans += "\n"
                }
            }
        }
        //记录组合逻辑
        for (var i = 0; i < id.length; i++) {
            ans += "\"c" + i + "\" :";
            var json = {
                'idList': id[i].join()
            }
            ans += JSON.stringify(json);
            if (i != id.length - 1)
                ans += ",\n"
            else
                ans += "\n"
        }
        ans += "}";
        return ans;
    },

    //导出obj格式场景
    exportObj: function () {
        //将组件数据转化为obj数据
        var objExporter = function (id, vOffset, vtOffset, vnOffset) {
            var ans = {
                v: "",
                vLength: 0,
                vt: "",
                vtLength: 0,
                vn: "",
                vnLength: 0,
                f: "",
                fLength: 0
            }
            var no = Struct.structManage.searchIndexByID(id);
            var object = Struct.structures[no].object.children[0];
            var geometry = null;
            // v数据部分
            geometry = object.children[object.children.length - 1].geometry;
            for (var i = 0; i < geometry.vertices.length; i++) {
                var vertex = new THREE.Vector3(geometry.vertices[ i ].x, geometry.vertices[ i ].y, geometry.vertices[ i ].z);
                vertex.applyMatrix4(Struct.structures[no].object.matrixWorld);
                ans.v += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';
                ans.vLength++;
            }
            // vt数据部分
            for (var k = 0; k < object.children.length; k++) {
                geometry = object.children[k].geometry;
                if (geometry.faceVertexUvs[ 0 ].length != 0) {
                    for (var i = 0; i < geometry.faceVertexUvs[ 0 ].length; i++) {
                        var vertexUvs = geometry.faceVertexUvs[ 0 ][ i ];
                        for (var j = 0; j < vertexUvs.length; j++) {
                            var uv = vertexUvs[ j ];
                            ans.vt += 'vt ' + uv.x + ' ' + uv.y + '\n';
                            ans.vtLength++;
                        }
                    }
                }
            }
            // vn数据部分
            for (var k = 0; k < object.children.length; k++) {
                geometry = object.children[k].geometry;
                if (geometry.faces.length != 0) {
                    for (var i = 0; i < geometry.faces.length; i++) {
                        var normals = geometry.faces[ i ].vertexNormals;
                        for (var j = 0; j < normals.length; j++) {
                            var normal = new THREE.Vector3(normals[ j ].x, normals[ j ].y, normals[ j ].z);
                            normal.applyMatrix4(Struct.structures[no].object.matrixWorld);
                            ans.vn += 'vn ' + normal.x + ' ' + normal.y + ' ' + normal.z + '\n';
                            ans.vnLength++;
                        }
                    }
                }
            }
            // f数据部分
            for (var k = 0; k < object.children.length; k++) {
                geometry = object.children[k].geometry;
                if (geometry.faces.length != 0) {
                    var mtlname = object.children[k].material.name;
                    if (mtlname.length != 0)
                        ans.f += 'usemtl ' + mtlname + '\n';
                    for (var i = 0, j = 1; i < geometry.faces.length; i++, j += 3) {
                        var face = geometry.faces[ i ];
                        ans.f += 'f ';
                        ans.f += ( face.a + 1 + vOffset) + '/' + ( j + vtOffset) + '/' + ( j + vnOffset) + ' ';
                        ans.f += ( face.b + 1 + vOffset) + '/' + ( j + 1 + vtOffset) + '/' + ( j + 1 + vnOffset) + ' ';
                        ans.f += ( face.c + 1 + vOffset) + '/' + ( j + 2 + vtOffset) + '/' + ( j + 2 + vnOffset) + '\n';
                        ans.fLength++;
                    }
                }
            }
            return ans;
        }

        var id = [];
        //先解散组合体
        for (var i = 0; i < Struct.structures.length; i++) {
            if (Struct.structures[i].combinaFlag) {
                id[id.length] = Struct.structManage.breakByID(Struct.structures[i].id);
                i = -1;
            }
        }
        //分别记录obj的四大数据部分
        var output = {
            v: "",
            vt: "",
            vn: "",
            f: ""
        };
        //为了将f数据合并需要增加偏移量
        var offset = {
            v: 0,
            vt: 0,
            vn: 0,
            f: 0
        };
        for (var i = 0; i < Struct.structures.length; i++) {
            var ans = objExporter(Struct.structures[i].id, offset.v, offset.vt, offset.vn);
            output.v += ans.v;
            output.vt += ans.vt;
            output.vn += ans.vn;
            output.f += ans.f;
            offset.v += ans.vLength;
            offset.vt += ans.vtLength;
            offset.vn += ans.vnLength;
            offset.f += ans.fLength;
        }
        //重新组合结构体
        for (var i = 0; i < id.length; i++)
            Struct.structManage.combineByID(id[i], 0);
        return output.v + output.vt + output.vn + output.f;
    }
}