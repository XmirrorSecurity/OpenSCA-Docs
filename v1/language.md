# 支持语言

| 支持语言     | 包管理器   | 解析文件                                                     |
| ------------ | ---------- | ------------------------------------------------------------ |
| `Java`       | `Maven`    | `pom.xml`                                                    |
| `Java`       | `Gradle`   | `.gradle` `.gradle.kts`                                      |
| `JavaScript` | `Npm`      | `package-lock.json` `package.json` `yarn.lock`               |
| `PHP`        | `Composer` | `composer.json` `composer.lock`                              |
| `Ruby`       | `gem`      | `gemfile.lock`                                               |
| `Golang`     | `gomod`    | `go.mod` `go.sum`                                            |
| `Python`     | `Pip`      | `Pipfile` `Pipfile.lock` `setup.py` `requirements.txt` `requirements.in` （后两者的解析需要具备pipenv环境，需要联网。） |
| `Rust`       | `cargo`    | `Cargo.lock`                                                 |
| `Erlang`     | `Rebar`    | `rebar.lock`  