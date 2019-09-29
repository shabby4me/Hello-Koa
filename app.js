const Koa = require('koa');

const app = new Koa();

const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const nunjucks = require('nunjucks');

const Sequelize = require('sequelize');

const config = require('./config');

const templating = require('./templating');

const isProduction = process.env.NODE_ENV === 'production';

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config=host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '\\static'));
}

app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));



app.use(controller());

app.use(async (ctx,next)=>{
    await next();
    console.log(ctx.response.type);
    console.log(ctx.response.body);
    
});


app.listen(3000);
console.log('app started at port 3000!');