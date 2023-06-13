import express from 'express';

import type { Request, Response, NextFunction } from 'express';

function startServer() {
	const app = express();

    // rest of our server code will be dynamically imported here

	app.use((error: any, req: Request, res: Response, next: NextFunction) => {
		console.log(error);
		res.status(500).json({ error: 'Internal Sever Error' });
	});

	app.get('/healthcheck', (req, res) => res.sendStatus(200));

	const server = app
		.listen(3000, () => {
			console.log(`Server Running on port 3000`);
		})
		.on('error', error => {
			console.log(error);
			process.exit(1);
		});

	process.on('SIGTERM', () => {
		console.log('SIGTERM signal received: closing HTTP server');
		server.close(() => {
			console.log('HTTP server closed');
		});
	});

	process.on('SIGINT', () => {
        console.log('SIGINT signal received: closing HTTP server');
		server.close(() => {
			console.log('HTTP server closed');
		});
    });
}

startServer();
