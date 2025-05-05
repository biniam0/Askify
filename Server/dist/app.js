"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello World with TypeScript and Express!');
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
