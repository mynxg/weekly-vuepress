import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/2023/": [
    {
      text: "2023",
      // icon: "laptop-code",
      collapsible: true,
      prefix: "/",
      children: "structure",
    },
    // {
    //   text: "2023",
    //   // icon: "laptop-code",
    //   collapsible: true,
    //   prefix: "07/",
    //   children: "structure",
    // },
    // {
    //   text: "2023",
    //   // icon: "laptop-code",
    //   collapsible: true,
    //   prefix: "08/",
    //   children: "structure",
    // },
    // {
    //   text: "2023",
    //   // icon: "laptop-code",
    //   collapsible: true,
    //   prefix: "08/",
    //   children: "structure",
    // },
  ],
});
