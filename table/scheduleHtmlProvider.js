async function scheduleHtmlProvider() {
  await loadTool("AIScheduleTools")

  // 去除第一次使用引导,防止页面无法点击
  localStorage.setItem("sfyd", "1")

  let table = document.querySelector("div.course-content-lists>:nth-child(2)")
  if (table && table != null) {
    return table.innerHTML
  } else {
    await AIScheduleAlert(
      "请退出该页面，重新点击教务网站导入，确保打开课表后，点击一键导入"
    )
    return "do not continue"
  }
}
