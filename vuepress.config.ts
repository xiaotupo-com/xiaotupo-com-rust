import { defaultTheme, defineUserConfig } from 'vuepress';


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Rust 私人笔记 - 小土坡',
    description: '这是我的私人 Rust 笔记站点。',
    base: '/rust/',
    head: [
        ['link', {rel: 'icon', href: '/images/xiaotupo-logo.svg'}]
    ],
    theme: defaultTheme({
        logo: '/images/xiaotupo-logo.svg',
        colorMode: 'light',
        home: '/',

        sidebar: {
            '/guide/': [
                {
                    text: '指南',
                    children: ['/guide/README.md', '/guide/closure/', '/guide/iter.md']
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