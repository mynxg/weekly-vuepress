import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
// import { cut } from "nodejs-jieba";
// import { searchProPlugin } from "vuepress-plugin-search-pro";
// import { sassPalettePlugin } from "vuepress-plugin-sass-palette";

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
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-D9GDKK1N1T"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D9GDKK1N1T');
        </script>    
		<script src="https://analytics.ahrefs.com/analytics.js" data-key="33paAd59GWIcFdSX+IarGg" defer="true"></script>
  `,
    ],
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
  plugins: [
    // sassPalettePlugin({ id: "test" }),
    // searchProPlugin({
    //   // 配置选项
    //   //多语言支持
    //   locales: {
    //     "/": {
    //       placeholder: "搜索本站",
    //     },
    //   },
    //   // 索引全部内容
    //   indexContent: true,
    //   hotReload: true,
    //   // 搜索结果的标题 路径 简介
    //   customFields: [
    //     {
    //       getter: ({ frontmatter }) => frontmatter.tag as string[],
    //       formatter: `Tag: $content`,
    //     },
    //   ],
    //   indexOptions: {
    //     // 使用 nodejs-jieba 进行分词
    //     tokenize: (text, fieldName) =>
    //       fieldName === "id" ? [text] : cut(text, true),
    //   },
    // }),
  ],
  // Enable it with pwa
  shouldPrefetch: false,
  // Enable it with pwa
  // shouldPrefetch: false,
});
