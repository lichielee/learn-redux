# 使用指南

src文件夹下面的每一个文件夹，都表示一个用例。但是在使用每个用例前，需要做如下的准备工作

## 使用用例前的准备工作

+ 每个用例都由一个名为App.js的文件，将这个文件导入index.js中。然后在Provider标签中，引入App.js文件即可。
- 每个用例有自己的store.js文件。这个文件也需要导入index.js中，并且还需要屏蔽其他用例的store。
+ 在项目的根目录下，使用"npm start"命令来启动应用。