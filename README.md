
#### 技术栈: webpack + react + react-router + redux + sass  + es6

### 1.运行
##### 开发环境
```
npm run vendor (提取公共js)
npm run start(启动服务)
```
##### 生产环境
```
npm run prod
```
***
### 2.文件目录

> - dist文件是打包的生产代码
> - node_modules 是开发需要的插件
> - src是开发目录
> - package.json 插件配置,运行命令的配置
> - server.js 开发环境的服务配置
> - webpack.config.js 开发环境的配置
> - webpack.dll.config.js 提取开发环境的公共js
> - webpack.prod.config.js 生产环境的配置
> - webpack.prod.dll.config.js 提取生产环境的公共js

****
### 3.项目目录

> - action 组件改变状态的行为 
> - components 公共组件库
> - containers 首页
> - image 图片库
> - lib 公共js库
> - reducers reducer库
> - router 路由的汇总
> - routers 每个单独的页面,包含页面的路由配置
> - scss 样式库
> - index.html 开发环境页面模板
> - index.js 应用入口文件

***
### 4.命名规范
##### 整个项目以模块为单位

比如建立一个帮助中心模块,取名为***

**(1)image存在***模块,公共icon放入icon目录**


***

**(2)reducers 存在***模块,reducer里面写***模块下的页面reducer,**
**index.js把***模块下reducer统一汇总**

***

**(3)routers 存在page模块,demo1,demo2为page模块下面的页面,**
**index.js把page模块下面的路由统一汇总**

***

**(4)scss下面index.scss汇总项目的scss**

**animate为动画样式,common为公共样式,**

**component为组件样式**

**icon为图标样式,page为每个页面的样式汇总,**

**reset为重置样式,**

**variable为项目变量**


**图片懒加载,是image组件,建议所有的图片采用image组件**

***

### 5.代码分析

> 我把页面分为4种情况,分别编写了4个逻辑组件

> 1.页面无数据,静态页面 使用GetPage组件

> 2.页面有数据,需要渲染页面的, 使用GetData组件

> 3.页面是表单页面,使用GetInput组件

> 4.页面为需要翻页的列表页,使用GetNextPage组件

**注:逻辑组件内部会与redux关联,然后会把一些公共组件,**
**比如一些头部组件,底部组件之类的放在逻辑组件内部,**
**进行统一化管理,所以所有页面尽量采用这4种逻辑组件**
**作为统一外部组件,实现统一管理**


### 6.总结

> 1.开发spa应用,利用webpack进行了按需加载,大大提高了页面的性能

> 2.使用逻辑组件,页面根据对应的需求采用对应的逻辑组件,
> 大大提高了页面的开发效率,方便进行统一管理

> 3.采用redux进行页面的状态管理,把每个页面具备的公共状态抽离出来,
> 如alert组件,loading组件的状态,在逻辑组件统一管理

> 4.每个页面都有对应的reducer唯一标识,用来记录每个页面的独立状态,
> 在reducers目录进行配置

> 5.每个页面都会获取自己页面的状态,通过在reducer配置的唯一标识来区分

> 6.页面需要改变状态,需要发送action行为,统一定义为setState,用来改变状态

> 7.为了页面还原到离开之前的状态,在离开页面的时候
> 会把当前的离开位置,记录在当前页面的状态中,回来的时候还回到离开的位置

> 8.离开页面会把当前页面的数据存储在状态中,重新回到页面,
> 会首先加载状态中的数据,后面再通过数据请求,
> 比较新旧数据的区别进行替换,大大加快了页面的2次打开速度

> 9.借助webpack可以编译sass,px转rem,es6编译成es5,模块化开发,代码压缩混淆,图片压缩......

> 10.项目以模块化为基准,每个目录下面都会对应模块的分类,
请注意模块的分类，相同子模块放到一个父模块里面。
图片名称,文件夹名称,文件名称,样式名称,统一采用-命名
如: about-us 采用中划线的命名方式


*****
统一类解析
GetPage({
    id:'home',//当前页面id
    component: Main,//当前页面类名
    title:'首页//当前页面title
})
** 如果要在GetPage内传入fun，一定要在componentDidMount内将this定义给window._this，然后fun内使用_this代替this

新增MainList通讯录组件，使用方法可查看Applicant页面。
!!!!console别写一大堆。而且发布生产一定把console删了。