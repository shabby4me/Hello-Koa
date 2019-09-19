let fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = '<h1>Index Page</h1>';
};

let fn_about = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('about.html',{title:'welcome'});
};

module.exports = {
    'GET /': fn_hello,
    'GET /about': fn_about
};