import App from './app';

const app = new App()

const port = 3000;

app.server.listen(port, () => {
    console.log('running...');
    
})