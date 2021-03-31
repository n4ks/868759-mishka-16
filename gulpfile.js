import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import rename from "gulp-rename";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "gulp-csso";
import imagemin from "gulp-imagemin";
import gulpwebp from "gulp-webp";
import svgstore from "gulp-svgstore";
import posthtml from "gulp-posthtml";
import include from "posthtml-include";
import del from "del";
import browsersync from "browser-sync";
import imageminmozjpeg from "imagemin-mozjpeg";

const styles = () => {
  return gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browsersync.stream());
};

const images = () => {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3,
        }),
        imageminmozjpeg({
          progressive: true,
          quality: 75,
        }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("source/img"));
};

const webp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(
      gulpwebp({
        quality: 90,
      })
    )
    .pipe(gulp.dest("source/img"));
};

const sprite = () => {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
};

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
        "source/css/**/normalize.css",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
};

const clean = () => {
  return del("build");
};

const server = () => {
  browsersync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });
};

// const refresh = (done) => {
//   server.reload();
//   done();
// };

const watch = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/img/icon-*.svg", gulp.series(sprite, html));
  gulp.watch("source/img/**/*", gulp.series(webp, images));
  gulp.watch("source/*.html", gulp.series(html));
};

// gulp.task("build", gulp.series(clean, copy, styles, sprite, html));
// gulp.task("start", gulp.series(build, server));

export default gulp.series(
  clean,
  sprite,
  gulp.parallel(html, styles, webp, images, copy),
  gulp.parallel(watch, server)
);
