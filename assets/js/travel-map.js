(function () {
  var container = document.getElementById('world-map');
  if (!container || typeof d3 === 'undefined' || typeof topojson === 'undefined') {
    return;
  }

  var VISITED_COUNTRIES = {
    'South Africa': 'south_africa',
    'eSwatini': null,
    'Comoros': null,
    'Seychelles': null,
    'Madagascar': null,
    'United States of America': null,
    'United Kingdom': null,
    'Switzerland': null,
    'France': null,
    'Andorra': null,
    'Ireland': null,
    'Greece': null,
    'Indonesia': null,
    'Thailand': null,
    'Singapore': null,
    'Australia': null,
    'New Zealand': null,
    'Hong Kong': null,
    'Mauritius': null,
    'Canada': null,
    'Belgium': null,
    'Netherlands': null,
    'Italy': null,
    'Turkey': null,
    'Morocco': null,
    'Mexico': null,
    'Austria': null,
    'Spain': null,
    'Lesotho': null,
    'Mozambique': null,
    'Germany': null,
    'Qatar': null,
    'United Arab Emirates': null,
    'Maldives': null,
    'Zimbabwe': null,
    'Botswana': null,
    'Zambia': null
  };

  var manifestEl = document.getElementById('travel-photo-manifest');
  var TRAVEL_PHOTOS = {};
  if (manifestEl) {
    try {
      TRAVEL_PHOTOS = JSON.parse(manifestEl.textContent);
    } catch (e) {
      TRAVEL_PHOTOS = {};
    }
  }

  function isVisited(name) {
    return Object.prototype.hasOwnProperty.call(VISITED_COUNTRIES, name);
  }

  var galleryImages = [];
  var galleryIndex = 0;
  var galleryTitleEl = document.getElementById('travel-photo-modal-title');
  var galleryImgEl = document.getElementById('travel-photo-img');
  var galleryPositionEl = document.getElementById('travel-photo-position');
  var galleryModalEl = document.getElementById('travel-photo-modal');

  function photosFor(name) {
    var slug = VISITED_COUNTRIES[name];
    if (!slug) return null;
    var images = TRAVEL_PHOTOS[slug];
    return images && images.length ? images : null;
  }

  function updateGallerySlide() {
    if (!galleryImages.length) return;
    galleryImgEl.src = galleryImages[galleryIndex];
    galleryPositionEl.textContent = (galleryIndex + 1) + ' of ' + galleryImages.length;
  }

  function showNextPhoto() {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGallerySlide();
  }

  function showPrevPhoto() {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallerySlide();
  }

  function openGallery(name, images) {
    galleryImages = images;
    galleryIndex = 0;
    galleryTitleEl.textContent = name;
    updateGallerySlide();
    if (typeof jQuery !== 'undefined') {
      jQuery(galleryModalEl).modal('show');
    }
  }

  var prevBtn = document.getElementById('travel-photo-prev');
  var nextBtn = document.getElementById('travel-photo-next');
  if (prevBtn) prevBtn.addEventListener('click', showPrevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', showNextPhoto);

  if (galleryModalEl) {
    galleryModalEl.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') showNextPhoto();
      if (event.key === 'ArrowLeft') showPrevPhoto();
    });

    var wheelCooldown = false;
    galleryModalEl.addEventListener('wheel', function (event) {
      event.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      if (event.deltaY > 0) {
        showNextPhoto();
      } else {
        showPrevPhoto();
      }
      setTimeout(function () { wheelCooldown = false; }, 250);
    }, { passive: false });
  }

  var svg = d3.select(container).append('svg').attr('class', 'world-map-svg');
  var sphere = svg.append('path').attr('class', 'world-map-sphere');
  var countryGroup = svg.append('g');

  var tooltip = d3.select(container)
    .append('div')
    .attr('class', 'world-map-tooltip');

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var countries = [];

  function onCountryMouseMove(event, d) {
    var rect = container.getBoundingClientRect();
    var name = (d.properties && d.properties.name) || '';
    tooltip
      .text(name)
      .style('opacity', 1)
      .style('left', (event.clientX - rect.left + 12) + 'px')
      .style('top', (event.clientY - rect.top + 12) + 'px');
  }

  function onCountryMouseLeave() {
    tooltip.style('opacity', 0);
  }

  function onCountryClick(event, d) {
    var name = (d.properties && d.properties.name) || '';
    var images = photosFor(name);
    if (images) {
      openGallery(name, images);
    }
  }

  var MIN_VISIBLE_SIZE = 6;

  function isTooSmallToSee(feature) {
    var bounds = path.bounds(feature);
    var w = bounds[1][0] - bounds[0][0];
    var h = bounds[1][1] - bounds[0][1];
    return !(w >= MIN_VISIBLE_SIZE || h >= MIN_VISIBLE_SIZE);
  }

  function render() {
    var width = container.clientWidth || 900;
    var height = Math.round(width * 0.52);

    svg.attr('viewBox', '0 0 ' + width + ' ' + height);
    projection.fitSize([width, height], { type: 'Sphere' });

    sphere.attr('d', path({ type: 'Sphere' }));

    countryGroup.selectAll('path')
      .data(countries)
      .join('path')
      .attr('class', function (d) {
        var name = (d.properties && d.properties.name) || '';
        return isVisited(name) ? 'world-map-country world-map-country--visited' : 'world-map-country';
      })
      .attr('d', path)
      .on('mousemove', onCountryMouseMove)
      .on('mouseleave', onCountryMouseLeave)
      .on('click', onCountryClick);

    // Small island nations can be sub-pixel at world-map scale, making a
    // visited marking invisible. Draw a fixed-size dot on top for those.
    var markerCountries = countries.filter(function (d) {
      var name = (d.properties && d.properties.name) || '';
      return isVisited(name) && isTooSmallToSee(d);
    });

    countryGroup.selectAll('circle.world-map-marker')
      .data(markerCountries)
      .join('circle')
      .attr('class', 'world-map-country world-map-country--visited world-map-marker')
      .attr('cx', function (d) { return path.centroid(d)[0]; })
      .attr('cy', function (d) { return path.centroid(d)[1]; })
      .attr('r', 3.5)
      .on('mousemove', onCountryMouseMove)
      .on('mouseleave', onCountryMouseLeave)
      .on('click', onCountryClick);
  }

  function splitOverseasPolygons(feature, lonThreshold) {
    var geom = feature && feature.geometry;
    if (!geom || geom.type !== 'MultiPolygon') return null;
    var near = [];
    var far = [];
    geom.coordinates.forEach(function (polygon) {
      var lon = polygon[0][0][0];
      (lon >= lonThreshold ? near : far).push(polygon);
    });
    if (!far.length) return null;
    geom.coordinates = near;
    return {
      type: 'Feature',
      properties: { name: feature.properties.name + ' (overseas territory)' },
      geometry: { type: 'MultiPolygon', coordinates: far }
    };
  }

  d3.json('https://unpkg.com/world-atlas@2/countries-50m.json').then(function (world) {
    countries = topojson.feature(world, world.objects.countries).features;

    countries.forEach(function (feature) {
      var name = feature.properties && feature.properties.name;
      if (name === 'France') {
        // French Guiana / Guadeloupe / Martinique are part of the same
        // multipolygon as mainland France; split them out so visiting
        // mainland France doesn't also mark South America as visited.
        var overseas = splitOverseasPolygons(feature, -20);
        if (overseas) countries.push(overseas);
      }
    });

    render();
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });
})();
