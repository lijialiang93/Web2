const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = [
  "./node_modules/tether/dist/css/tether.css",
  "./src/styles/variables.scss",
  "./src/styles/custom.scss"
];

const jsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/tether/dist/js/tether.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js",
  "./public/js/modal.js",
  "./public/js/tota11y.min.js"
];



gulp.task("sass",async function(){
    gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./public/css/"));
})

gulp.task("js", async function() {
  gulp
    .src(jsFiles)
    .pipe(concatenate("myjs.min.js"))
    .pipe(gulp.dest("./public/js/"));
});


gulp.task("default",gulp.series("sass","js"));
