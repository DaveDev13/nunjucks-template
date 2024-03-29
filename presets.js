const fs = require('fs');
const path = require('path');

// Check if the user has correctly specified a name
// for the new page template he wants
function createComponentsFiles() {
    if (!process.argv[2]) {
        return console.log(
            `You must specify a page name like so:\n\nnpm run create pageName\n\n`
        );
    }
    const requestedPage = process.argv[2];
    const requestedPath = path.join(
        __dirname,
        'src',
        'components',
        requestedPage
    );

    // Chcek if the folder for desired page already exists

    if (fs.existsSync(requestedPath)) {
        /* eslint-disable-next-line */
        return console.log('Page folder already exists!');
    }

    // Create necessary .njk, .js and .scss files
    fs.mkdirSync(path.join(requestedPath));
    fs.mkdirSync(path.join(requestedPath, 'images'));

    fs.writeFile(
        path.join(requestedPath, `/${requestedPage}.js`),
        '',
        () => console.log(`Created file: ${requestedPage}.js`)
    );

    fs.writeFile(
        path.join(requestedPath, `/${requestedPage}.scss`),
        '',
        () => console.log(`Created file: ${requestedPage}.scss`)
    );

    fs.writeFile(
        path.join(requestedPath, `/${requestedPage}.njk`),
        '',
        () => console.log(`Created file: ${requestedPage}.njk`)
    );
}

createComponentsFiles();
