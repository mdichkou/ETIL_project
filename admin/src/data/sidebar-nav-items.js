export default function() {
  return [
    {
      title: "Dashboard",
      to: "/overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Places",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/places"
    },
    {
      title: "Articles",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/articles"
    },
    {
      title: "Add New Place",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-place"
    },
    {
      title: "Add New Article",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post"
    }
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview"
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables"
    // }
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: "/user-profile-lite"
    // }
  ];
}
