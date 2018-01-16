var gulp=require("gulp");
var rename=require("gulp-rename");
var uglify=require("gulp-uglify");

gulp.task("default",function(){
    gulp.src("js/index.js").pipe(rename("leaflet.min.js")).pipe(uglify()).pipe(gulp.dest("./build"));
});