# React Weather Map Application

This is a web application built with React that displays weather information for lakes on a map.

## Features

- Display lakes on a Google Map with weather information markers.
- Predict the amount of ice on each lake.
- Filter the number of lakes displayed on the map using a slider.
- Hover over a lake marker to view detailed weather information in an info window.
- Cluster markers for improved performance and visualization.

# Fullstack Architecture Diagram
```mermaid
graph LR;
  A[User] --> B[React Frontend]
  B --> C[CloudFront]
  C --> D[S3 Bucket]
  B --> F[API Gateway]
  F --> G[AWS Lambda]
  G --> H[FastAPI Backend]
  H --> I[RDS Postgres]
  H --> J[Weather API]
```

# React Components Diagram
```mermaid
graph TD;
  A[Map Component] --> B[LakeFilterBox Component]
  B --> C[Slider Component]
  C --> D[onLimitChange Event]
  D --> A

  A --> E[GoogleMap Component]
  E --> F[LakeMarker Components]
  F --> G[LakeInfoBox Components]
```


