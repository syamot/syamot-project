/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posted").del();
  await knex("posted").insert([
    {
      title: "useStateの使い方が分からなかった",
      posted_date: "2023-05-01",
      tag: "react",
      keyword: "react 公式ドキュメント",
      url: "https://",
      pict_url: "https://design",
    },
    {
      title: "PostgreSQL Doc",
      posted_date: "2023-05-10",
      tag: "PostgreSQL",
      keyword: "PostgreSQL 公式ドキュメント",
      url: "https://www",
      pict_url: "",
    },
    {
      title: "超初心者向け GitHubの使い方 ~ ブランチ",
      posted_date: "2023-05-20",
      tag: "git",
      keyword: "git branch, git checkout",
      url: "https://magazine.techacademy.jp/magazine/6235",
      pict_url: "https://ma",
      // <meta property="og:image" content="https://~" から持ってくる
    },
    {
      title: "TypeScript + Node.js プロジェクトのはじめかた2020",
      posted_date: "2023-05-30",
      tag: "TypeScript",
      keyword: "TypeScript + Node.js のプロジェクトを作成",
      url: "https://qi",
      pict_url: "https://qii",
      //何故か表示されず？
    },
    {
      title: "React, Express でSSRを実現する",
      posted_date: "2023-05-30",
      tag: "Express",
      keyword: "CSR(Client Side Rendering), SSR (Server Side Rendering)",
      url: "https://zenn",
      pict_url: "https://res.",
    },
  ]);
};
