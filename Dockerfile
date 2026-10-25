# Ruby 3.3 matches the Ruby version GitHub Pages builds with (Jekyll 3.10)
FROM ruby:3.3-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/* \
    && git config --system --add safe.directory '*'

WORKDIR /srv/jekyll

# Only the dependency manifests are needed to install gems; the source is bind-mounted at runtime
COPY Gemfile Gemfile.lock beautiful-jekyll-theme.gemspec ./
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling", "--future"]
