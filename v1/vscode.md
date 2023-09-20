

# VS Code插件使用

## 安装插件

**安装方法一**：在[适配的VS Code](https://code.visualstudio.com/)中通过应用商店安装（推荐）

在VS Code中左边栏打开扩展->扩展的搜索框中输入“OpenSCA Xcheck”，点击“Install”

<img src="https://opensca.xmirror.cn/docs/img/vscode_01.jpg" alt="xcheck_market" />

**安装方法二**：在[OpenSCA平台](https://opensca.xmirror.cn/pages/plug-in)下载插件安装

- 从OpenSCA平台下载 “OpenSCA-Xcheck.vsix”；
- 打开VS Code，依次操作：左边栏打开扩展->扩展顶栏的更多操作->“从VSIX安装”->找到并安装“OpenSCA-Xcheck.vsix”；

**安装方法三**：[下载源码](https://github.com/XmirrorSecurity/)自行编译安装

- 环境要求：

  - node v18及以上版本
  - 系统支持MacOS、Windows、Linux

- 从[gitee](https://gitee.com/XmirrorSecurity/OpenSCA-VSCode-plugin)或[github](https://github.com/XmirrorSecurity/OpenSCA-VSCode-plugin/)下载源码

* 全局安装vsce

  ```
  npm install --global @vscode/vsce
  ```

* 执行打包命令

  ```
  vsce package
  ```

## 使用插件

### 插件功能

- 开始检测：点击操作栏的“Run”，开始检测当前项目内的组件漏洞风险情况；
- 停止检测：点击操作栏的“Stop”，停止检测当前项目内的组件漏洞风险情况；
- 清除检测结果：点击操作栏的“Clean”，清除当前项目的检测结果；
- 连接配置：点击操作栏的“Test”按钮，配置平台Url及Token信息，点击“测试连接”按钮可测试连接配置是否正确，连接成功后就可以开始检测啦；
- 设置：点击操作栏的“Setting”，查看OpenSCA Xcheck相关设置信息。
- 使用说明：点击操作栏的“Instructions”，查看OpenSCA Xcheck相关使用说明。
- 查看更多：点击操作栏的“See more”，跳转到[opensca.xmirror.cn](https://opensca.xmirror.cn)查看OpenSCA Xcheck更多相关信息。

<img src="https://opensca.xmirror.cn/docs/img/vscode_02.jpg" alt="xcheck_function" />

### 插件执行流程

<img src="https://opensca.xmirror.cn/docs/assets/img/xcheck_process.7083b869.jpg" alt="xcheck流程图"  />

### 使用插件

点击OpenSCA Xcheck可打开OpenSCA窗口。首先在配置界面中配置服务器参数（参考：插件功能-配置），然后在OpenSCA窗口中点击“Run”（参考：插件功能-运行）
