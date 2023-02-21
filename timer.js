async function scheduleTimer({ providerRes, parserRes } = {}) {
  const now = new Date();
  let nowMonth = now.getMonth() + 1;

  let target = new Date(now.getFullYear(), 8, 1, 8);
  if (nowMonth >= 2 && nowMonth <= 6) {
    target = new Date(now.getFullYear(), 2, 1, 8);
  }
  if (nowMonth === 7) {
    target = new Date(now.getFullYear(), 6, 1, 8);
  }

  target.setDate(target.getDate() - ((target.getDay() + 6) % 7));
  let mondayTime = target.getTime();

  return {
    totalWeek: 20, // 总周数：[1, 30]之间的整数
    startSemester: "" + mondayTime, // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 4, // 晚间课程节数：[0, 10]之间的整数
    // {{{
    sections: [
      {
        section: 1,
        startTime: "08:30",
        endTime: "09:20",
      },
      {
        section: 2,
        startTime: "09:25",
        endTime: "10:15",
      },
      {
        section: 3,
        startTime: "10:30",
        endTime: "11:20",
      },
      {
        section: 4,
        startTime: "11:25",
        endTime: "12:15",
      },
      {
        section: 5,
        startTime: "14:00",
        endTime: "14:50",
      },
      {
        section: 6,
        startTime: "14:55",
        endTime: "15:45",
      },
      {
        section: 7,
        startTime: "16:00",
        endTime: "16:50",
      },
      {
        section: 8,
        startTime: "16:55",
        endTime: "17:45",
      },
      {
        section: 9,
        startTime: "18:45",
        endTime: "19:35",
      },
      {
        section: 10,
        startTime: "19:40",
        endTime: "20:30",
      },
      {
        section: 11,
        startTime: "20:45",
        endTime: "21:35",
      },
      {
        section: 12,
        startTime: "21:40",
        endTime: "22:30",
      },
    ],
    // }}}
  };
}
