function scheduleHtmlParser(html) {
  let result = []

  // 星期
  for (let day = 1; day < 8; day++) {
    // 一天所有课
    let all_course = $(
      `div.ivu-table-overflowY tr>td:nth-of-type(${day + 1}) .codedd-wrap`
    )

    // 每节课
    for (let course_n = 0; course_n < all_course.length; course_n++) {
      var txt = all_course[course_n].firstChild.data

      // 过滤网课
      if (txt == null || txt == undefined || txt.search("节") == -1) continue

      let course = {
        name: "未知", // 课程名称
        position: "未知", // 上课地点
        teacher: "未知", // 教师名称
        weeks: [], // 周数
        day: day, // 星期
        sections: [], // 节次
      }

      let name = txt.match(/\S+/)
      if (name && name.length) course["name"] = name[0]

      // 处理体育课例外
      if (txt.search("体育") != -1) {
        let position = txt.match(/\[.*?\]/g)
        if (position && position.length > 2)
          course["position"] = position[2].slice(1, -1)
      } else {
        let position = txt.match(/\[[A-Z]\d+\]/g)
        if (position && position.length)
          course["position"] = position[0].slice(1, -1)
      }

      let teacher = txt.match(/\[.*?\]/g)
      if (teacher && teacher.length) {
        if (teacher[0].search("-") == -1)
          course["teacher"] = teacher[0].slice(1, -1)
      }

      let weeks_txt = txt.match(/\[[0-9,-]+周\]/g)
      if (weeks_txt && weeks_txt.length) {
        let weeks_list = weeks_txt[0].slice(1, -2).split(",")

        for (let i = 0; i < weeks_list.length; i++) {
          if (weeks_list[i].search("-") == -1) {
            course["weeks"].push(parseInt(weeks_list[i]))
            continue
          }

          let start_end = weeks_list[i].split("-")
          let start = parseInt(start_end[0])
          let end = parseInt(start_end[1])
          for (let j = start; j < end + 1; j++) {
            course["weeks"].push(parseInt(j))
          }
        }
      }

      let sections = txt.match(/[0-9-]+节/g)
      if (sections && sections.length) {
        let section = sections[0].slice(0, -1)

        if (section.search("-") == -1) {
          course["sections"].push(parseInt(section))
        } else {
          let start_end = section.split("-")
          let start = parseInt(start_end[0])
          let end = parseInt(start_end[1])
          for (let j = start; j < end + 1; j++) {
            course["sections"].push(parseInt(j))
          }
        }
      }
      result.push(course)
    }
  }
  return result
}

// let ht = document.querySelector(
//   "div.course-content-lists>:nth-child(2)"
// ).innerHTML
// scheduleHtmlParser(ht)
