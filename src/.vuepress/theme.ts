import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";


const hostname =
  process.env.HOSTNAME || 'https://weekly.nnxx.me' || 'https://blog.lxip.top/weekly-vuepress';

export default hopeTheme({
  hostname,

  author: {
    name: "Mr.keney",
    url: "https://blog.lxip.top",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",

  repo: "mynxg/weekly-vuepress",

  docsDir: "src",

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: true,

      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    /**
     * Chinese locale config
     */
    // "/zh/": {
    //   // navbar
    //   navbar: zhNavbar,

    //   // sidebar
    //   sidebar: zhSidebar,

    //   footer: "默认页脚",

    //   displayFooter: true,

    //   // page meta
    //   metaLocales: {
    //     editLink: "在 GitHub 上编辑此页",
    //   },
    // },
  },

  footer: "",

  displayFooter: true,

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },
  breadcrumbIcon: false,
  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "mynxg/weekly-giscus",
      repoId: "R_kgDOJtoalA",
      category: "Announcements",
      categoryId: "DIC_kwDOJtoalM4CXGyQ",
    },
    searchPro: {
      // 索引全部内容
      indexContent: true,
      autoSuggestions: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter(page: any) {
            return page.frontmatter.category;
          },
          formatter: {
            '/': '分类：$content',
            '/en/': 'Category: $content',
          },
        },
        {
          getter(page: any) {
            return page.frontmatter.tag;
          },
          formatter: {
            '/': '标签：$content',
            '/en/': 'Tag: $content',
          },
        },
      ],
    },

    components: {

      // 在MD文件中启用的组件
      components: [
        // 为站点提供了在MD文档中自定义颜色的徽章
        "Badge",
        // 为站点提供了在MD文档中加载B站视频的功能，但是不建议使用
        "BiliBili",
        "FontIcon",
        // 为站点提供了在MD文档中加载PDF阅读器的功能，但是不建议使用
        // 原因一：PDF书籍较大，上传到码云后会大量占用码云空间
        // 原因二：当PDF阅读器较多的时候，将MD文档渲染成HTML页面比较耗费性能，使页面加载速度变慢
        "PDF",
        "VPCard",
      ],
      //组件的全局配置
      componentOptions: {
        fontIcon: {
          assets: "fontawesome",
        },
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
        },
      },
      //会被挂载到根节点的组件。
      // rootComponents: {
      //  // addThis: "ra-5f829c59e6c6bc9a",
      //   backToTop: true,
      //   // notice: [
      //   //   {
      //   //     match: /^\/$/,
      //   //     title: "Notice Title",
      //   //     content: "Notice Content",
      //   //     //每次浏览主页执行的动作
      //   //     // actions: [
      //   //     //   {
      //   //     //     text: "Primary Action",
      //   //     //     link: "https://theme-hope.vuejs.press/",
      //   //     //     type: "primary",
      //   //     //   },
      //   //     //   { text: "Default Action" },
      //   //     // ],
      //   //     fullscreen: false,
      //   //   },
      //   // ],
      // },
    },
    // These features are enabled for demo, only preserve features you need here
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },
    // markdownMath: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    // },

    // This features is enabled for demo, only preserve if you need it
    markdownTab: true,
    //订阅插件SSR
    feed: {
      // 插件选项
      //hostname: "https://blog.lxip.top",
      atom: true,
      json: true,
      rss: true,
    },
    //评论插件
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline.lxip.top",
    // },
    // 代码复制功能-vuepress-plugin-copy-code2
    copyCode: {
      // 在移动端也可以实现复制代码
      showInMobile: true,
      // 代码复制成功提示消息的时间-ms
      duration: 3000,
    },
    // MarkDown文件增强
    // These features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // Install chart.js before enabling it
      // chart: true,

      // insert component easily

      // Install echarts before enabling it
      // echarts: true,

      // Install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // Install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // Install @vue/repl before enabling it
      // vuePlayground: true,

      // Install sandpack-vue3 before enabling it
      // sandpack: true,
    },
    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    git: false,
    // 关闭sitemap插件
    sitemap: true,
    seo:
      hostname === "https://weekly.nnxx.me" || "https://blog.lxip.top/weekly-vuepress"
        ? {}
        : { canonical: "https://weekly.nnxx.me" },
  },
});
