async function scheduleHtmlProvider() {
  await loadTool("AIScheduleTools");

  let school_year = await AISchedulePrompt({
    titleText: "学年",
    tipText: "请输入学年",
    defaultText: "" + new Date().getFullYear(),
    validator: (value) => {
      console.log(value);
      try {
        if (parseInt(value) < 2100 && parseInt(value) > 2010) {
          return false;
        }
        return "输入错误 例子: 2022";
      } catch (e) {
        return "输入错误 例子: 2022";
      }
    },
  });

  const now = new Date();
  let nowMonth = now.getMonth() + 1;
  let target = 1;

  if (nowMonth >= 2 && nowMonth <= 6) {
    target = 2;
  }
  if (nowMonth === 7) {
    target = 3;
  } else {
    target = 1;
  }

  let semester = await AISchedulePrompt({
    titleText: "请输入学期",
    tipText: "秋季输入1 春季输入2 小学期输入3",
    defaultText: target,
    validator: (value) => {
      console.log(value);
      try {
        if (value === "1" || value === "2" || value === "3") {
          return false;
        }
        return "输入错误 例子: 2";
      } catch (e) {
        return "输入错误 例子: 2";
      }
    },
  });

  if (semester === "1") {
    school_year = school_year + "-" + (parseInt(school_year) + 1);
  } else {
    school_year = parseInt(school_year) - 1 + "-" + school_year;
  }

  let fetch_body = `xn=${school_year}&xq=${semester}`;

  try {
    let response = await fetch(
      "http://jw.hitsz.edu.cn/xszykb/queryxszykbzong",
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        referrer: "http://jw.hitsz.edu.cn/authentication/main",
        referrerPolicy: "unsafe-url",
        body: fetch_body,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    let data_json = await response.json();
    let data = JSON.stringify(data_json);
    return data;
  } catch (e) {
    await AIScheduleAlert("fetch error: " + e.message);
    return "";
  }
}
