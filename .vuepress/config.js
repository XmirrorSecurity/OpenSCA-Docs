const dev = process.argv.includes('dev')

module.exports = {
    dest: '../build/docs',
    base: dev ? '/' : '/docs/',
    title: 'OpenSCA-用开源的方式做开源风险治理 | 软件成分分析 |  SBOM清单 | 漏洞解析 | 依赖解析 | 许可证合规分析-支持离线/在线免费使用',
    description: 'OpenSCA是一款开源免费的SCA工具，免费轻量、覆盖离线及在线场景，支持多种主流语言检测及标准格式SBOM清单，能够输出开源组件及漏洞清单，为企业及个人用户提供低成本、高精度、稳定易用的开源软件供应链安全解决方案',
    themeConfig: {
        type: 'home',
        subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        logo: '/img/OpenSCAlogo.svg',
        noFoundPageByTencent: false,
        codeTheme: 'solarizedlight', // default 'tomorrow'
        modePicker: false,
        sidebarDepth: 0,
        sidebar: {
            '/v1/': [
                {
                  title: '关于OpenSCA',   // 必要的
                  path: '/v1/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
                {
                  title: '快速开始',   // 必要的
                  path: 'start',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
                {
                  title: 'OpenSCA-cli检测指南',   // 必要的
                  path: 'cli',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
                {
                  title: 'IDEA插件使用',   // 必要的
                  path: 'idea',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
            },
                  {
                  title: 'VS Code插件使用',   // 必要的
                  path: 'vscode',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
                {
                  title: '支持语言',   // 必要的
                  path: 'language',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
                {
                  title: '常见问题',   // 必要的
                  path: 'FAQ',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true
                },
                {
                  title: '问题反馈',   // 必要的
                  path: 'contact',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                },
            ]
        },
        nav: [
            {
                text: '文档',
                items: [
                    {text: '1.x', link: '/v1/'},
                ]
            },
            {text: '官网', link: 'https://opensca.xmirror.cn/', target: '_blank'},
            {text: '了解悬镜', link: 'https://www.xmirror.cn/', target: '_blank'},
            {text: 'GitHub', link: 'https://github.com/XmirrorSecurity/OpenSCA-cli', target: '_blank'},
            {text: 'Gitee', link: 'https://gitee.com/XmirrorSecurity/OpenSCA-cli/releases', target: '_blank'},
        ],
        record: '© 2021 Copyright All Rights Reserved By Beijing Anpro Information Technology Co.,Ltd. |京ICP备14059751号-2',
        recordLink: 'https://beian.miit.gov.cn/#/Integrated/index',
        startYear: '2021',
        author: 'xmirror'
    },
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.png'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
    ],
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        require('./plugins/copy/index')
    ]
}
