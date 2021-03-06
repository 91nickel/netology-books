const express = require('express');
const http = require('http');
const store = require('../models/store');
const Book = require('../models/book');
const router = express.Router();
let io;

const {passport} = require('../middleware/passport');
router.use(passport.initialize());
router.use(passport.session());

router.get('/', async function (request, response) {
    return response.render('books/index', {title: 'Все книги', items: await store.select()})
})
router.get('/view/:id', async function (request, response) {
    const book = await store.select(request.params.id);
    if (book) {
        await http.get(`http:counter/counter/${request.params.id}`, (res) => {
            const statusCode = res.statusCode;
            if (statusCode !== 200) {
                book.counter = 0;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                book.counter = Number(rawData);
                console.log('book.counter', book.counter);
                return includeTemplate();
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            book.counter = 0;
            return includeTemplate();
        });

        const options = {host: 'counter', path: `/counter/${request.params.id}/incr`, port: 80, method: 'POST',}
        const post = http.request(options, function (response) {
            response.resume();
        });
        post.on('error', function (err) {
            console.error(err)
        });
        post.write('');
        post.end();

        function includeTemplate() {
            if (!io)
                io = require('./../models/socket').createBookViewIO();
            const data = {title: `Просмотр ${book.title}`, item: book};
            if (request.isAuthenticated && request.isAuthenticated()) {
                data.user = request.user.username;
            }
            return response.render('books/view', data)
        }
    } else {
        return response.status(404).render('404')
    }
})
router.get('/create', function (request, response) {
    return response.render('books/create', {title: 'Создание новой книги', fields: (new Book())})
})
router.post('/create', async function (request, response) {
    await store.add(request.body);
    return response.redirect(`/books`);
})
router.get('/update/:id', async function (request, response) {
    const book = await store.select(request.params.id);
    if (book) {
        return response.render('books/update', {title: `Просмотр ${book.title}`, item: book})
    }
    return response.status(404).render('404')
})
router.post('/update/:id', async function (request, response) {
    const book = await store.select(request.params.id);
    if (book) {
        await book.update(request.body).save();
        return response.redirect(`/books`);
    }
    return response.status(404).render('404')
})
router.post('/delete/:id', async function (request, response) {
    const book = await store.select(request.params.id);
    if (book) {
        await book.delete();
        return response.redirect(`/books`);
    }
    return response.status(404).render('404')
})

module.exports = router;