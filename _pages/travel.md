---
layout: page
title: Travel
permalink: /travel
full-width: true
ext-js:
  - https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js
  - https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js
js: /assets/js/travel-map.js
---

<div id="world-map" class="world-map"></div>

{% assign travel_files = site.static_files | where_exp: "f", "f.path contains '/assets/travel/'" %}
{% assign travel_groups = travel_files | group_by_exp: "f", "f.path | remove: '/assets/travel/' | split: '/' | first" %}
<script id="travel-photo-manifest" type="application/json">
{
  {% for group in travel_groups %}
    {% assign sorted_items = group.items | sort: "name" %}
    {{ group.name | jsonify }}: [
      {% for f in sorted_items %}{{ f.path | relative_url | jsonify }}{% unless forloop.last %},{% endunless %}{% endfor %}
    ]{% unless forloop.last %},{% endunless %}
  {% endfor %}
}
</script>

<div class="modal fade" id="travel-photo-modal" tabindex="-1" role="dialog" aria-labelledby="travel-photo-modal-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="travel-photo-modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body text-center">
        <button type="button" id="travel-photo-prev" class="travel-photo-nav travel-photo-nav--prev" aria-label="Previous photo">&#8249;</button>
        <img id="travel-photo-img" src="" alt="">
        <button type="button" id="travel-photo-next" class="travel-photo-nav travel-photo-nav--next" aria-label="Next photo">&#8250;</button>
      </div>
      <div class="modal-footer justify-content-center">
        <span id="travel-photo-position"></span>
      </div>
    </div>
  </div>
</div>

<style>
.world-map {
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}
.world-map-svg {
  width: 100%;
  height: auto;
  display: block;
}
.world-map-sphere {
  fill: #f5fafb;
  stroke: #dddddd;
  stroke-width: 1;
}
.world-map-country {
  fill: #cfe4e8;
  stroke: #ffffff;
  stroke-width: 0.5;
  transition: fill 0.15s ease-in-out;
}
.world-map-country:hover,
.world-map-country.is-hovered {
  fill: #0085a1;
  cursor: pointer;
}
.world-map-country--visited {
  fill: #68b5c5;
}
.world-map-marker {
  stroke-width: 1;
}
.world-map-tooltip {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  background: #404040;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}
#travel-photo-modal .modal-dialog {
  max-width: 700px;
}
#travel-photo-modal .modal-content {
  border-radius: 0.75rem;
  overflow: hidden;
}
#travel-photo-modal .modal-body {
  position: relative;
  padding: 1rem 3rem;
}
#travel-photo-img {
  max-width: 640px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 0.4rem;
}
#travel-photo-position {
  color: #777777;
  font-size: 0.9rem;
}
.travel-photo-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(64, 64, 64, 0.6);
  color: #ffffff;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}
.travel-photo-nav--prev {
  left: 0.5rem;
}
.travel-photo-nav--next {
  right: 0.5rem;
}
.travel-photo-nav:hover {
  background: #0085a1;
}
</style>
