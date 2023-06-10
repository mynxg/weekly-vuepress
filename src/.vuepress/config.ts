import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Weekly",
  description: "行动胜于空谈",

  theme,
  //头部引入样式字体等
  head: [
    // 导入相应链接
    //引入文楷
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css",
        media: "print",
        onload: "this.media='all'"
      }
    ],
    // 添加一段脚本,用于统计,51.la统计
    [
      "script",
      {},
      `\
  <script src="https://sdk.51.la/perf/js-sdk-perf.min.js" crossorigin="anonymous"></script>
  <script src="https://sdk.51.la/perf/js-sdk-perf.min.js" crossorigin="anonymous"></script>
  <script>
    new LingQue.Monitor().init({id:"3EihReVc3LtQWqwp",sendSpaPv:true});
  </script> 
  <script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
  <script>LA.init({id:"3EiiSsWg8gwKtBjC",ck:"3EiiSsWg8gwKtBjC",hashMode:true})</script>
      `,
    ],
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
  plugins: [
    searchProPlugin({
      // 配置选项
      //多语言支持
      locales: {
        "/": {
          placeholder: "搜索本站",
        },
      },
      indexContent: true,
      hotReload: true,
      customFields: [
        {
          getter: ({ frontmatter }) => frontmatter.tag as string[],
          formatter: `Tag: $content`,
        },
      ],
    }),
  ],
});
