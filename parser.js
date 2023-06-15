function scheduleHtmlParser(html) {
  let result = [];
  try {
    let all_course = JSON.parse(html);

    // 每节课
    for (let course_n = 0; course_n < all_course.length; course_n++) {
      // 过滤网课
      if (all_course[course_n].KEY === "bz") continue;
      // 去重
      if (all_course[course_n].KEY.search("_jc1") === -1) continue;

      let day = parseInt(all_course[course_n].KEY.slice(2, 3));
      let txt = all_course[course_n].SKSJ;

      let course = {
        name: "未知", // 课程名称
        position: "未知", // 上课地点
        teacher: "未知", // 教师名称
        weeks: [], // 周数
        day: day, // 星期
        sections: [], // 节次
      };

      let name = txt.match(/.+(?=\n)/);
      if (name && name.length) course["name"] = name[0];

      // 处理体育课例外
      let position = txt.match(/\[[A-Z]\d+\]/g);
      if (position && position.length) {
        course["position"] = position[0].slice(1, -1);
      } else {
        let position = txt.match(/\[.*?\]/g);
        if (position && position.length > 2)
          course["position"] = position[2].slice(1, -1);
      }

      let teacher = txt.match(/\[.*?\]/g);
      if (teacher && teacher.length) {
        if (teacher[0].search("-") === -1)
          course["teacher"] = teacher[0].slice(1, -1);
      }

      let weeks_txt = txt.match(/\[[0-9,-单双]+周\]/g);
      if (weeks_txt && weeks_txt.length) {
        let weeks_list = weeks_txt[0].slice(1, -1).split(",");

        for (let i = 0; i < weeks_list.length; i++) {
          let textNow = weeks_list[i];
          // 10
          if (textNow.search("-") === -1) {
            course["weeks"].push(parseInt(textNow));
            continue;
          }

          // 11-17双周
          let skipWeek = false;
          if (textNow.search("双") != -1 || textNow.search("单") != -1) {
            skipWeek = true;
            textNow = textNow.slice(0, -2);
          } else if (textNow.search("周") != -1) {
            textNow = textNow.slice(0, -1);
          }

          let start_end = textNow.split("-");
          let start = parseInt(start_end[0]);
          let end = parseInt(start_end[1]);
          for (let j = start; j < end + 1; j++) {
            course["weeks"].push(j);
            if (skipWeek) {
              j++;
            }
          }
        }
      }

      let sections = txt.match(/[0-9-]+节/g);
      if (sections && sections.length) {
        let section = sections[0].slice(0, -1);

        if (section.search("-") === -1) {
          course["sections"].push(parseInt(section));
        } else {
          let start_end = section.split("-");
          let start = parseInt(start_end[0]);
          let end = parseInt(start_end[1]);
          for (let j = start; j < end + 1; j++) {
            course["sections"].push(parseInt(j));
          }
        }
      }
      result.push(course);
    }
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
}
