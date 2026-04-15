# TrueStory — Container Diagram (2019–2020)

```mermaid
C4Container
  title TrueStory — Container Diagram (2019–2020)

  Person(user, "User / Reader", "On a news page in Chrome")
  Container(ext, "Chrome Extension", "Bootstrap + jQuery", "Captures active tab URL; shows 3 opposing articles")
  Container(api, "Flask REST API", "Python, Flask, GCP", "Scores contradiction strength; returns top 3 matches")
  System_Ext(news, "News Sources", "RSS feeds and crawled sites")

  Rel(user, ext, "opens extension / views contradictions")
  Rel(ext, api, "article URL / contradicting articles")
  %% api→news: dashed line + filled arrowhead in export (cron dependency, not async queue)
  Rel(api, news, "crawls articles [cron]")

  UpdateElementStyle(ext, $fontColor="#FFFFFF", $bgColor="#5B9BD5", $borderColor="#3C7FC0")
  UpdateElementStyle(api, $fontColor="#FFFFFF", $bgColor="#26A69A", $borderColor="#00897B")

  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```
