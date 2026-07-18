# Matches JEKYLL_VERSION used in .github/workflows/ci.yml
FROM jekyll/jekyll:3.8

WORKDIR /srv/jekyll

COPY . .
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
