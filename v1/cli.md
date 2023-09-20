# OpenSCA-cli检测指南

##  下载安装

1. 从 [GitHub](https://github.com/XmirrorSecurity/OpenSCA-cli/releases)或 [Gitee ](https://gitee.com/XmirrorSecurity/OpenSCA-cli/releases) 下载对应系统架构的可执行文件压缩包

2. 或者下载源码编译(需要 `go 1.18` 及以上版本)

   ```
   git clone https://github.com/XmirrorSecurity/OpenSCA-cli.git opensca
   cd opensca
   go work init cli analyzer util
   go build -o opensca-cli cli/main.go
   ```

   默认生成当前系统架构的程序，如需生成其他系统架构可配置环境变量后编译

   - 禁用`CGO_ENABLED` `CGO_ENABLED=0`
   - 指定操作系统 `GOOS=${OS} \\ darwin,freebsd,liunx,windows`
   - 指定体系架构 `GOARCH=${arch} \\ 386,amd64,arm`



## 使用样例

### 检测并输出检测结果到命令行/终端界面（默认）

仅检测组件信息

```shell
opensca-cli -path ${project_path}
```

连接云平台

```shell
opensca-cli -url ${url} -token ${token} -path ${project_path}
```

或使用本地漏洞库

```shell
opensca-cli -db db.json -path ${project_path}
```

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

#### 样例

```shell
opensca-cli -url ${url} -token ${token} -path ${project_path} -out ${filename}.${suffix}
```

## 参数说明

**可在配置文件中配置参数，也可在命令行输入参数，两者冲突时优先使用输入参数**

| 参数       | 类型     | 描述                                                         | 使用样例                                                     |
| ---------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`   | `string` | 指定配置文件路径，程序启动时将配置文件中的参数作为启动参数，配置参数与命令行输入参数冲突时优先使用输入参数 | `-config config.json`                                        |
| `path`     | `string` | 指定要检测的文件或目录路径                                   | `-path ./foo`                                                |
| `url`      | `string` | 从云漏洞库查询漏洞，指定要连接云服务的地址，与 `token` 参数一起使用 | `-url https://opensca.xmirror.cn`                            |
| `token`    | `string` | 云服务验证 `token`，需要在云服务平台申请，与 `url` 参数一起使用 | `-token xxxxxxx`                                             |
| `cache`    | `bool`   | 建议开启，缓存下载的文件(例如 `.pom` 文件)，重复检测相同组件时会节省时间，下载的文件会保存到工具所在目录的.cache 目录下 | `-cache`                                                     |
| `vuln`     | `bool`   | 结果仅保留有漏洞信息的组件，使用该参数将不会保留组件层级结构 | `-vuln`                                                      |
| `out`      | `string` | 将检测结果保存到指定文件，根据后缀生成不同格式的文件，默认为 `JSON` 格式 | `-out output.json` <br />`-out output.xml`<br />`-out output.html`<br />`-out output.sqlite`<br />`-out output.csv`<br />`-out output.spdx`<br />`-out output.spdx.xml`<br />`-out output.spdx.json`<br />`-out output.swid.xml`<br />`-out output.swid.json`<br />`-out output.cdx.xml`<br />`-out output.cdx.json`<br /> |
| `db`       | `string` | 指定本地漏洞库文件，希望使用自己漏洞库时可用，漏洞库文件支持 `json` 或`sql`格式，样例见后文；若同时使用云端漏洞库与本地漏洞库，漏洞查询结果取并集 | `-db db.json`                                                |
| `progress` | `bool`   | 显示进度条                                                   | `-progress`                                                  |
| `dedup`    | `bool`   | 相同组件去重                                                 | `-dedup`                                                     |
| `dironly`  | `bool`   | 跳过解压步骤直接分析目录                                     | `-dironly`                                                   |
| `log`      | `bool`   | 指定日志文件位置                                             | `-log`                                                       |

**1.0.9及以上版本**支持配置maven私服库，需要在配置文件config.json里进行配置，格式如下：

```json
{
    "maven": [
        {
            "repo": "url",
            "user": "user",
            "password": "password"
        }
    ]
}
```

---

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

#### 漏洞库字段说明

| 字段                | 描述                              | 是否必填 |
| :------------------ | :-------------------------------- | :------- |
| `vendor`            | 组件厂商                          | 否       |
| `product`           | 组件名                            | 是       |
| `version`           | 漏洞影响版本                      | 是       |
| `language`          | 组件语言                          | 是       |
| `name`              | 漏洞名                            | 否       |
| `id`                | 自定义编号                        | 是       |
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

v1.0.13开始支持`sql`类的数据源，需要按照上述字段预先创建好数据表并在配置文件中作相应配置：

```json
{
  "origin":{
    "mysql":{
      "dsn":"user:password@tcp(ip:port)/dbname",
      "table":"table_name"
    },
    "json":{
      "dsn":"db.json"
    }
  }
}
```

## 版本记录

### [#](https://opensca.xmirror.cn/docs/v1/cli.html#v1)v1

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