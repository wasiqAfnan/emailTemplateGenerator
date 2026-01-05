import app from "./app.js";
import constants from "./constants.js";

app.listen(constants.PORT, () => {
    console.log(`Server is running on port ${constants.PORT}`);
});