# ThreeCDE
Three-dimensional Collaborative Design Environment<br>
三维协同设计环境<br>
Licensed under the MIT license<br>
Copyright © 2016 buaadpy. All Rights Reserved<br>
<br>
**部署方法**<br>
0.用户管理模块使用了LeanCloud提供的云服务<br>
1.安装与配置java，下载apache-tomcat并解压<br>
2.将工程放置于tomcat的webapps目录下，启动tomcat即可访问单机模式，路径：<br>
http://localhost:8080/ThreeCDE/<br>
3.使用IDEA打开server项目并配置Project，包括：<br>
----Libraries中添加lib中的json.jar，以及整个tomcat\lib下的文件<br>
----Artifacts中output directory路径指向tomcat的webapps中（新建一个文件夹）<br>
运行IDEA使server产生输出<br>
4.修改js目录下的Struct.js文件中部署服务器的IP地址<br>
5.启动tomcat即可同时支持单机模式与协同模式<br>
<br>
**协同效果**<br>
![Version1.0](/release_v1.0.jpg)<br>
<br>
**参考文献**<br>
[1] P Du, Y Song, and L Deng. "A real-time collaborative framework for 3D design based on HTML5." IEEE, International Conference on Computer Supported Cooperative Work in Design IEEE, 2016:215-220.<br>
[2] Y Song, W Wei, L Deng, P Du, et al. "3D-colladesign: A real-time collaborative system for web 3D design." IEEE, International Conference on Computer Supported Cooperative Work in Design IEEE, 2015:407-412.<br>