# Comfy → Siemens: gRPC Smart Building APIs (2019–2020) — Container Diagram

```mermaid
C4Container
  title Comfy → Siemens: gRPC Smart Building APIs (2019–2020)

  System_Ext(restClient, "REST Client", "FE / mobile app — HTTP/JSON only, never speaks gRPC")
  System_Ext(iot, "IoT Devices", "Sensors, HVAC, access control hardware")
  System_Ext(proto, ".proto contract", "Protocol Buffers spec — shared source of truth for all stubs")

  UpdateElementStyle(restClient, $fontColor="#868e96", $bgColor="#e9ecef", $borderColor="#868e96")
  UpdateElementStyle(iot, $fontColor="#868e96", $bgColor="#e9ecef", $borderColor="#868e96")
  UpdateElementStyle(proto, $fontColor="#ca8a04", $bgColor="#fef9c3", $borderColor="#ca8a04")

  Boundary(k8s, "Kubernetes Cluster", "deployment") {

    Container(gateway, "gRPC-gateway", "Go", "Reverse proxy — transcodes HTTP/JSON ↔ gRPC for all upstream services")
    UpdateElementStyle(gateway, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")

    ContainerDb(db, "PostgreSQL", "PostgreSQL", "Primary relational store — sensor readings, occupancy records")
    UpdateElementStyle(db, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")

    Boundary(grpcSvcs, "gRPC Services", "polyglot microservices") {
      Container(goSvc, "gRPC Service (Go)", "Go", "Occupancy sensing + core smart-building logic")
      UpdateElementStyle(goSvc, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")

      Container(pySvc, "gRPC Service (Python)", "Python", "Data processing + analytics")
      UpdateElementStyle(pySvc, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")

      Container(nodeSvc, "gRPC Service (Node.js)", "Node.js", "Notification + event fanout")
      UpdateElementStyle(nodeSvc, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
    }

    Boundary(bmw, "BMW Campus Track", "parallel track") {
      Container(geoSvc, "Geolocation Service", "Python + PostGIS + Mapbox", "BMW campus navigation + spatial queries")
      UpdateElementStyle(geoSvc, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")

      ContainerDb(geoDb, "PostGIS", "PostgreSQL + PostGIS", "Spatial index for campus map data")
      UpdateElementStyle(geoDb, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")
    }
  }

  %% Runtime edges
  Rel(restClient, gateway, "HTTP/JSON request / response (transcoded)")
  Rel(gateway, goSvc, "gRPC call: occupancy / sensor APIs")
  Rel(gateway, pySvc, "gRPC call: analytics APIs")
  Rel(gateway, nodeSvc, "gRPC call: notification / event APIs")
  Rel(goSvc, iot, "read / write device state")
  Rel(goSvc, db, "persist sensor + occupancy data")
  Rel(restClient, geoSvc, "campus nav request")
  Rel(geoSvc, geoDb, "PostGIS spatial query")

  %% Build-time dependencies (consumers → shared spec)
  Rel(gateway, proto, "consumes spec [cron]")
  Rel(goSvc, proto, "consumes spec [cron]")
  Rel(pySvc, proto, "consumes spec [cron]")
  Rel(nodeSvc, proto, "consumes spec [cron]")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")
```
