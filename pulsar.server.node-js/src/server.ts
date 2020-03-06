import app from "./app";

const server = app.listen(app.get("port"), () => {
    console.log("Server Started on port 8080");
});