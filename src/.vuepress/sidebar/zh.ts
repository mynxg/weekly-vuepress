import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/weekly/": [
    {
      text: "2023",
      // icon: "laptop-code",
      collapsible: true,
      prefix: "2023/",
      link: "/weekly/2023/",
      children: "structure",
    },
    {
      text: "2024",
      // icon: "laptop-code",
      collapsible: true,
      prefix: "2024/",
      link: "/weekly/2024/",
      children: "structure",
    },
    {
      text: "2025",
      // icon: "laptop-code",
      collapsible: true,
      prefix: "2025/",
      link: "/weekly/2025/",
      children: "structure",
    },
  ],
});
