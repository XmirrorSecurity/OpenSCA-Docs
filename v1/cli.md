# OpenSCA-cli检测指南

##  下载安装

1. 从 [GitHub](https://github.com/XmirrorSecurity/OpenSCA-cli/releases)或 [Gitee ](https://gitee.com/XmirrorSecurity/OpenSCA-cli/releases) 下载对应系统架构的可执行文件压缩包

2. 或者下载源码编译(需要 `go 1.18` 及以上版本)

   ```
   //github
   git clone https://github.com/XmirrorSecurity/OpenSCA-cli.git opensca && cd opensca
   go build
   ```

   ```
   //gitee
   git clone https://gitee.com/XmirrorSecurity/OpenSCA-cli.git opensca && cd opensca
   go build
   ```

   默认生成当前系统架构的程序，如需生成其他系统架构可配置环境变量后编译

   - 禁用`CGO_ENABLED` `CGO_ENABLED=0`
   - 指定操作系统 `GOOS=${OS} \\ darwin,freebsd,liunx,windows`
   - 指定体系架构 `GOARCH=${arch} \\ 386,amd64,arm`



## 使用样例

```shell
# 使用opensca-cli检测
opensca-cli -path ${project_path} -config ${config_path} -out ${filename}.${suffix} -token ${token}

# 写好配置文件后也可以直接执行opensca-cli
opensca-cli
```

### 使用Docker容器进行检测

```shell
# 检测当前目录的依赖信息
docker run -ti --rm -v $(PWD):/src opensca/opensca-cli

# 使用云端漏洞数据库:
docker run -ti --rm -v $(PWD):/src opensca/opensca-cli -token ${put_your_token_here}
```

如需在docker容器中使用配置文件，将config.json放到src挂载目录即可。

也可以使用-config指定其他容器内路径。

更多信息请参考[Docker Hub 主页](https://hub.docker.com/r/opensca/opensca-cli)

### 检测并输出检测结果文件（使用`out`参数）

`out`参数支持范围如下：

| 类型     | 文件格式 | 识别的文件后缀                   | 支持版本        |
| -------- | -------- | -------------------------------- | --------------- |
| 检测报告 | `json`   | `.json`                          | `*`             |
|          | `xml`    | `.xml`                           | `*`             |
|          | `html`   | `.html`                          | `v1.0.6`及以上  |
|          | `sqlite` | `.sqlite`                        | `v1.0.13`及以上 |
|          | `csv`    | `.csv`                           | `v1.0.13`及以上 |
| SBOM清单 | `spdx`   | `.spdx` `.spdx.json` `.spdx.xml` | `v1.0.8`及以上  |
|          | `cdx`    | `.cdx.json` `.cdx.xml`           | `v1.0.11`及以上 |
|          | `swid`   | `.swid.json` `.swid.xml`         | `v1.0.11`及以上 |
|          | `dsdx`   | `.dsdx` `.dsdx.json` `.dsdx.xml` | `v3.0.0`及以上 |



## 参数说明

**可在配置文件中配置参数，也可在命令行输入参数，两者冲突时优先使用输入参数**

| 参数       | 类型     | 描述                                                         | 使用样例                                                     |
| ---------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`   | `string` | 指定配置文件路径 | `-config config.json`                                        |
| `path`     | `string` | 指定检测项目路径                                   | `-path ./foo`                                                |
| `out`      | `string` | 根据后缀生成报告| `-out out.json,out.html`  |
| `log`      | `bool`   | 指定日志文件路径                                             | `-log`                                                       |
| `token`    | `string` | 云服务验证 `token` | `-token xxx`                                             |

完整的检测参数需在配置文件中配置 
（*v3.0.0开始url参数不再通过命令行指定，默认为OpenSCA云漏洞库服务[https://opensca.xmirror.cn/](https://opensca.xmirror.cn/)，也可通过配置文件指定其他数据格式相符的云漏洞库；使用过往版本可在命令行或配置文件指定url参数。）

配置字段及说明详见`config.json`

配置文件与命令行参数冲突时优先使用命令行输入参数

指定了配置文件路径但目标位置不存在文件时会在目标位置生成默认配置文件

未指定配置文件路径会依次尝试访问以下位置:
1. 工作目录下的config.json
2. 用户目录下的opensca_config.json
3. opensca-cli目录下的config.json


## 配置本地漏洞库（可选）

### 漏洞库文件格式

```json
[
  {
    "vendor": "org.apache.logging.log4j",
    "product": "log4j-core",
    "version": "[2.0-beta9,2.12.2)||[2.13.0,2.15.0)",
    "language": "java",
    "name": "Apache Log4j2 远程代码执行漏洞",
    "id": "XMIRROR-2021-44228",
    "cve_id": "CVE-2021-44228",
    "cnnvd_id": "CNNVD-202112-799",
    "cnvd_id": "CNVD-2021-95914",
    "cwe_id": "CWE-502,CWE-400,CWE-20",
    "description": "Apache Log4j是美国阿帕奇（Apache）基金会的一款基于Java的开源日志记录工具。\r\nApache Log4J 存在代码问题漏洞，攻击者可设计一个数据请求发送给使用 Apache Log4j工具的服务器，当该请求被打印成日志时就会触发远程代码执行。",
    "description_en": "Apache Log4j2 2.0-beta9 through 2.12.1 and 2.13.0 through 2.15.0 JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP and other JNDI related endpoints. An attacker who can control log messages or log message parameters can execute arbitrary code loaded from LDAP servers when message lookup substitution is enabled. From log4j 2.15.0, this behavior has been disabled by default. From version 2.16.0, this functionality has been completely removed. Note that this vulnerability is specific to log4j-core and does not affect log4net, log4cxx, or other Apache Logging Services projects.",
    "suggestion": "2.12.1及以下版本可以更新到2.12.2，其他建议更新至2.15.0或更高版本，漏洞详情可参考：https://github.com/apache/logging-log4j2/pull/608 \r\n1、临时解决方案，适用于2.10及以上版本：\r\n\t（1）设置jvm参数：“-Dlog4j2.formatMsgNoLookups=true”；\r\n\t（2）设置参数：“log4j2.formatMsgNoLookups=True”；",
    "attack_type": "远程",
    "release_date": "2021-12-10",
    "security_level_id": 1,
    "exploit_level_id": 1
  }
]
```

### 漏洞库字段说明

| 字段                | 描述                              | 是否必填 |
| :------------------ | :-------------------------------- | :------- |
| `vendor`            | 组件厂商                          | 否（组件语言为JAVA时必填）|
| `product`           | 组件名                            | 是       |
| `version`           | 漏洞影响版本                      | 是       |
| `language`          | 组件语言                          | 是       |
| `name`              | 漏洞名                            | 否       |
| `id`                | 自定义编号                        | 是（需唯一）|
| `cve_id`            | cve 编号                          | 否       |
| `cnnvd_id`          | cnnvd 编号                        | 否       |
| `cnvd_id`           | cnvd 编号                         | 否       |
| `cwe_id`            | cwe 编号                          | 否       |
| `description`       | 漏洞描述                          | 否       |
| `description_en`    | 漏洞英文描述                      | 否       |
| `suggestion`        | 漏洞修复建议                      | 否       |
| `attack_type`       | 攻击方式                          | 否       |
| `release_date`      | 漏洞发布日期                      | 否       |
| `security_level_id` | 漏洞风险评级(1~4 风险程度递减)    | 否       |
| `exploit_level_id`  | 漏洞利用评级(0:不可利用,1:可利用) | 否       |

*本地漏洞库中language字段设定值包含java、js、golang、rust、php、ruby、python，其他语言不受设定匹配限制，按实际情况填写即可。

### 漏洞库配置示例

```shell
{
  "origin":{
    "json":"db.json",
    "mysql":{
      "dsn":"user:password@tcp(ip:port)/dbname",
      "table":"table_name"
    },
    "sqlite":{
      "dsn":"sqlite.db",
      "table":"table_name"
    }
  }
}
```


## 版本记录

v3

v3.0.0 重构引擎，升级解析逻辑，可基于SBOM清单输出漏洞和许可证信息

v1

v1.0.13 新增多格式漏洞库兼容，支持SQLite及CSV格式报告导出

v1.0.12 升级许可证检出能力

v1.0.11 优化Java解析逻辑，支持CycloneDX及SWID标准格式SBOM清单输出

v1.0.10 修复本地漏洞库下空指针错误及Linux下python项目无检出的问题

v1.0.9 提高Python解析能力，支持指定maven私服库进行检测

v1.0.8 支持SPDX格式的SBOM清单导出，同时还支持spdx.json、spdx.xml等格式

v1.0.7 支持Python解析，Gradle文件静态解析，相同组件路径去重

v1.0.6 添加Gradle支持，可选输出HTML格式报告

v1.0.5 添加对Erlang语言的支持

v1.0.4 支持`cargo.lock`解析

v1.0.3 支持`go.mod` `go.sum` `composer.json` `yarn.lock` `gems.locked`

v1.0.1 修复POM解析中部分exclusion标记的组件没有排除的问题

v1.0.0 正式发布
