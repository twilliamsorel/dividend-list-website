---
layout: default
pagination:
  data: stocks 
  size: 1
  alias: stock 
permalink: stocks/{{ stock.ticker | slugify }}.html
---

{{ stock.company }}
{{ stock.ticker }}
{{ stock.stockPrice }}