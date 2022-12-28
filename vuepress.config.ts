import { defaultTheme, defineUserConfig } from 'vuepress';


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Rust 私人笔记 - 小土坡',
    description: '这是我的私人 Rust 笔记站点。',
    base: '/rust/',
    head: [
        ['link', {rel: 'icon', href: '/rust/images/xiaotupo-logo.svg'}]
    ],
    theme: defaultTheme({
        logo: '/images/xiaotupo-logo.svg',
        colorMode: 'light',
        home: '/',

        sidebar: {
            '/guide/': [
                {
                    text: '指南',
                    children: ['/guide/README.md', '/guide/closure/', '/guide/iter/', '/guide/serde/', '/guide/rand/', '/guide/regex/', '/guide/library/']
                }
            ],
            '/examples/': [
                {
                    text: '例子',
                    children: ['/examples/circle/']
                }
            ]
        },

        navbar: [
            {
                text: '指南',
                link: '/guide/',
                children: [
                    {
                        text: "闭包",
                        link: '/guide/closure/'
                    },
                    {
                        text: '迭代器',
                        link: '/guide/iter/'
                    },
                    {
                        text: '序列化和反序列化',
                        link: '/guide/serde/'
                    },
                    {
                        text: '随机数生成',
                        link: '/guide/rand/'
                    },
                    {
                        text: '正则表达式',
                        link: '/guide/regex/'
                    },
                    {
                        text: '常用开发库',
                        link: '/guide/library/'
                    }
                ]
            },
            {
                text: "Example",
                children: [
                    {
                        text: "Circle例子",
                        link: '/examples/circle/'
                    }
                ]
            },
            {
                text: 'Rust官网',
                link: 'https://www.rust-lang.org/zh-CN/'
            }
        ]
    })
})